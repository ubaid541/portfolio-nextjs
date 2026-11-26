"use client";

import { Check, Copy } from "lucide-react";
import { useCallback, useRef, useState } from "react";
import { ContactSection } from "./components/ContactSection";
import { ExperienceSkillsSection } from "./components/ExperienceSkillsSection";
import { Header } from "./components/Header";
import { ProjectsSection } from "./components/ProjectsSection";
import { FaceCanvas, type Mood } from "./face/FaceCanvas";
import { useFitHeadline, useTheme } from "./hooks/use-ui-hooks";
import { bio, faces, person, stackStrip } from "./lib/portfolio-content";

const DISC = "#2f4bf0";

function QuickReach() {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(person.email);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2200);
    } catch {
      /* clipboard blocked */
    }
  };

  return (
    <div className="w-full max-w-[380px]">
      <p className="mb-2.5 text-micro font-medium uppercase text-mute">Available for new opportunities</p>
      <div className="flex h-11 gap-1.5">
        <a
          href="#projects"
          className="inline-flex flex-1 items-center justify-center whitespace-nowrap rounded-full bg-disc px-5 text-ui font-semibold uppercase text-white transition-transform active:scale-95"
        >
          View Projects →
        </a>
        <button
          type="button"
          onClick={copy}
          aria-label="Copy email address"
          className="inline-flex shrink-0 cursor-pointer items-center gap-1.5 whitespace-nowrap rounded-full border border-line bg-field px-4 text-[12px] font-semibold text-ink transition-colors hover:border-ink"
        >
          {copied ? <Check className="size-3.5 text-disc" /> : <Copy className="size-3.5 text-mute" />}
          <span>{copied ? "Copied" : "Email"}</span>
        </button>
      </div>
    </div>
  );
}

function MoodMeter({ mood }: { mood: Mood }) {
  const p = mood.patience;
  return (
    <div className="w-full max-w-[380px] space-y-3" aria-live="polite">
      <div className="flex items-baseline justify-between text-micro uppercase">
        <span className="text-mute">Current mood</span>
        <span className="font-display text-[15px] font-bold tracking-[-0.01em] normal-case text-ink">
          {faces[mood.face].mood}
        </span>
      </div>
      <div>
        <div className="mb-1.5 flex justify-between text-micro uppercase text-mute">
          <span>Patience</span>
          <span className="font-mono tabular-nums">{p}%</span>
        </div>
        <div className="h-1.5 overflow-hidden rounded-full bg-line">
          <div
            className="h-full rounded-full transition-[width] duration-150"
            style={{ width: `${p}%`, background: `color-mix(in oklab, var(--disc) ${p}%, #e8412c)` }}
          />
        </div>
      </div>
    </div>
  );
}

export default function Home() {
  const [dark, toggle] = useTheme();
  const title = useFitHeadline<HTMLHeadingElement>();
  const stageRef = useRef<HTMLDivElement>(null);
  const [mood, setMood] = useState<Mood>({ face: "base", patience: 100, pulls: 0 });
  const [avatarSrc, setAvatarSrc] = useState<string | null>(null);
  const onMood = useCallback((m: Mood) => setMood(m), []);
  const onAvatarReady = useCallback((url: string) => setAvatarSrc(url), []);

  return (
    <div id="top" className="min-h-[100svh] bg-page text-ink">
      {/* Full-viewport interactive hero frame */}
      <div className="flex min-h-[100svh] flex-col">
        <Header dark={dark} onToggle={toggle} avatarSrc={avatarSrc} />

        <main className="relative isolate flex flex-1 flex-col px-[clamp(16px,2.4vw,36px)] pt-[clamp(20px,5vh,52px)] text-center">
          <h1 ref={title} className="headline relative z-0 inline-block text-[20vw] md:whitespace-nowrap">
            <span className="block md:inline">Hey, I’m </span>
            <span className="marker">{person.name}</span>
          </h1>

          <div className="relative mx-auto grid w-full max-w-[1380px] flex-1 grid-cols-1 items-end gap-x-8 gap-y-8 text-left md:grid-cols-[1fr_auto_1fr]">
            <div
              ref={stageRef}
              className="stage relative mx-auto aspect-square w-[min(92vw,540px)] md:order-2 md:w-[min(44vw,76svh)]"
            >
              {/*
              <p
                className={`hint pointer-events-none absolute top-[22%] right-[-2%] rotate-6 font-serif text-[clamp(17px,1.45vw,22px)] italic md:right-[-8%] ${
                  mood.pulls ? "translate-y-2 opacity-0" : ""
                }`}
              >
                pull my face
                <svg viewBox="0 0 60 40" className="ml-6 block h-8 w-12 -scale-x-100" fill="none" aria-hidden>
                  <path d="M4 4c18 2 34 12 44 30" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
                  <path
                    d="M40 31l8 4 1-9"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </p>
              */}
            </div>

            <div className="relative z-10 max-w-[380px] space-y-3 pb-[clamp(20px,5vh,48px)] text-lede md:order-1">
              {bio.map((b, i) => (
                <p
                  key={i}
                  className={i === 0 ? "font-display text-[1.25em] font-bold tracking-[-0.015em]" : "text-mute"}
                >
                  {b}
                </p>
              ))}
            </div>

            <div className="relative z-10 flex flex-col gap-7 pb-[clamp(20px,5vh,48px)] md:order-3 md:items-end">
              <MoodMeter mood={mood} />
              <QuickReach />
            </div>
          </div>

          <FaceCanvas stageRef={stageRef} discColor={DISC} onMood={onMood} onAvatarReady={onAvatarReady} />
        </main>

        {/* Core stack wordmark strip */}
        <div className="relative z-10 border-t border-line px-[clamp(16px,2.4vw,36px)] py-5">
          <ul className="mx-auto flex max-w-[1380px] flex-wrap items-center justify-between gap-x-8 gap-y-3 text-mute">
            <li className="text-micro font-medium uppercase">Core stack</li>
            {stackStrip.map((item) => (
              <li key={item.name} className={`text-wordmark ${item.font}`}>
                {item.name}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Portfolio sections below the interactive hero */}
      <ProjectsSection />
      <ExperienceSkillsSection />
      <ContactSection />
    </div>
  );
}
