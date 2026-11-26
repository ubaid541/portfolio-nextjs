"use client";

import { useEffect, useRef, type RefObject } from "react";
import {
  faces,
  // releaseFaces,
  rig,
  type FaceKey,
} from "../lib/portfolio-content";
import { makePortraitCutout } from "./cutout";
import { FaceEngine } from "./engine";

export type Mood = { face: FaceKey; patience: number; pulls: number };

type Props = {
  stageRef: RefObject<HTMLDivElement | null>;
  discColor: string;
  onMood: (m: Mood) => void;
  onAvatarReady?: (dataUrl: string) => void;
  onReady?: () => void;
};

/** Neutral hold time after a release before returning to cursor gaze tracking. */
const HOLD_MS = 5000;

function load(src: string) {
  return new Promise<HTMLImageElement | null>((resolve) => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.decoding = "async";
    img.onload = () => resolve(img);
    img.onerror = () => resolve(null);
    img.src = src;
  });
}

/**
 * Desktop-only WebGL2 portrait canvas for subtle cursor gaze tracking.
 * Skips initialization on mobile/touch/reduced-motion devices and consumes
 * pre-cut transparent WebP textures directly without main-thread BFS processing.
 */
export function FaceCanvas({ stageRef, discColor, onMood, onReady }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const hitRef = useRef<HTMLDivElement>(null);
  const onMoodRef = useRef(onMood);
  onMoodRef.current = onMood;
  const onReadyRef = useRef(onReady);
  onReadyRef.current = onReady;

  useEffect(() => {
    const isMobileOrReduced = window.matchMedia(
      "(max-width: 767px), (hover: none), (pointer: coarse), (prefers-reduced-motion: reduce)",
    ).matches;
    if (isMobileOrReduced) return;

    const canvas = canvasRef.current!;
    const hit = hitRef.current!;
    let engine: FaceEngine | null = null;
    let disposed = false;
    const cleanups: (() => void)[] = [];

    const stage = { x: 0, y: 0, size: 1 };
    const layout = () => {
      const s = stageRef.current;
      if (!s) return;
      const c = canvas.getBoundingClientRect();
      const r = s.getBoundingClientRect();
      Object.assign(stage, { x: r.left - c.left, y: r.top - c.top, size: r.width });
      Object.assign(hit.style, {
        left: `${stage.x}px`,
        top: `${stage.y}px`,
        width: `${stage.size}px`,
        height: `${stage.size}px`,
      });
      engine?.resize(c.width, c.height, Math.min(window.devicePixelRatio || 1, 2));
      engine?.setStage(stage);
    };

    (async () => {
      const keys = Object.keys(faces) as FaceKey[];
      const uniqueSrcs = [...new Set(keys.map((k) => faces[k].src))];
      const loadedEntries = await Promise.all(
        uniqueSrcs.map(async (src) => {
          const img = await load(src);
          if (!img) return [src, null] as const;
          // Pre-cut transparent WebP assets bypass runtime 1024x1024 BFS flood fill.
          const cutout: TexImageSource = src.endsWith(".webp") ? img : makePortraitCutout(img, 1024);
          return [src, cutout] as const;
        }),
      );
      if (disposed) return;

      const bySrc = new Map<string, TexImageSource | null>(loadedEntries);
      const baseCutout = bySrc.get(faces.base.src);
      if (!baseCutout) return;

      const images = new Map<string, TexImageSource>();
      const available = new Set<FaceKey>();
      keys.forEach((k) => {
        const cutout = bySrc.get(faces[k].src);
        images.set(k, cutout ?? baseCutout);
        if (cutout) available.add(k);
      });

      try {
        engine = new FaceEngine(canvas, images, "base", discColor);
      } catch {
        return;
      }
      const e = engine;
      layout();
      e.start();
      e.warm();

      const readyRaf = requestAnimationFrame(() => {
        if (!disposed) onReadyRef.current?.();
      });

      // --- director -------------------------------------------------------
      let face: FaceKey = "base";
      let mode: "neutral" | "held" | "after" = "neutral";
      const afterAt = 0;
      const pulls = 0;
      let cursor: { x: number; y: number } | null = null;
      let reported = "";

      const report = () => {
        const m = { face, patience: Math.round((1 - e.flush) * 100), pulls };
        const key = `${m.face}|${m.patience}|${m.pulls}`;
        if (key !== reported) {
          reported = key;
          onMoodRef.current(m);
        }
      };

      const resolve = (k: FaceKey): FaceKey =>
        available.has(k) ? k : k.startsWith("g_") && available.has("g_grimace") ? "g_grimace" : "base";

      const show = (k: FaceKey) => {
        k = resolve(k);
        face = k;
        e.setFace(k);
        report();
      };

      // Idle: eyes track cursor smoothly; hovering the nose makes him cross-eyed.
      const neutralFace = (): FaceKey => {
        if (!cursor) {
          e.setLook(0, 0);
          return "base";
        }
        const p = e.pick(cursor.x, cursor.y);
        if (p && Math.hypot(p.u - rig.nose.x, p.v - rig.nose.y) < rig.nose.r * 1.45) {
          e.setLook(0, 0);
          return "x_cross";
        }
        const dx = (cursor.x - (stage.x + stage.size / 2)) / (stage.size * 0.85);
        const dy = (cursor.y - (stage.y + stage.size * 0.42)) / (stage.size * 0.85);
        e.setLook(dx, dy);
        if (dx < -0.45) return "l_left";
        if (dx > 0.45) return "l_right";
        return "base";
      };

      const local = (ev: PointerEvent) => {
        const c = canvas.getBoundingClientRect();
        return { x: ev.clientX - c.left, y: ev.clientY - c.top };
      };

      const onWindowMove = (ev: PointerEvent) => {
        if (ev.pointerType !== "mouse") return;
        cursor = local(ev);
        if (mode === "neutral") {
          const n = neutralFace();
          if (n !== face) show(n);
        }
      };

      window.addEventListener("pointermove", onWindowMove, { passive: true });

      const timer = window.setInterval(() => {
        if (mode === "after" && !e.held && performance.now() - afterAt > HOLD_MS) {
          mode = "neutral";
          show(neutralFace());
        }
        report();
      }, 120);

      const io = new IntersectionObserver(([entry]) => (entry.isIntersecting ? e.start() : e.stop()));
      io.observe(canvas);

      cleanups.push(() => {
        cancelAnimationFrame(readyRaf);
        window.removeEventListener("pointermove", onWindowMove);
        window.clearInterval(timer);
        io.disconnect();
        e.destroy();
      });
    })();

    const ro = new ResizeObserver(layout);
    ro.observe(canvas);
    if (stageRef.current) ro.observe(stageRef.current);
    document.fonts?.ready.then(layout);

    return () => {
      disposed = true;
      ro.disconnect();
      cleanups.forEach((f) => f());
    };
  }, [stageRef, discColor]);

  return (
    <>
      <canvas ref={canvasRef} aria-hidden className="pointer-events-none absolute inset-0 z-20 h-full w-full" />
      <div
        ref={hitRef}
        aria-hidden
        className="pointer-events-none absolute z-30 select-none"
      />
    </>
  );
}
