"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";

const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

/**
 * From md up, sizes the one-line headline (inline-block, nowrap) to span its
 * parent's content box exactly. Below md it keeps its CSS size and wraps.
 * Either way the final size is published on the parent as --mega, which the
 * stage uses to tuck up under the type.
 */
export function useFitHeadline<T extends HTMLElement>() {
  const ref = useRef<T>(null);

  useIsomorphicLayoutEffect(() => {
    const el = ref.current;
    const parent = el?.parentElement;
    if (!el || !parent) return;
    const wide = window.matchMedia("(min-width: 768px)");

    const PROBE = 100;
    const fit = () => {
      if (wide.matches) {
        el.style.fontSize = `${PROBE}px`;
        const styles = getComputedStyle(parent);
        const available =
          parent.clientWidth -
          parseFloat(styles.paddingLeft) -
          parseFloat(styles.paddingRight);
        const natural = el.offsetWidth;
        if (natural > 0) el.style.fontSize = `${(PROBE * available) / natural}px`;
      } else {
        el.style.fontSize = "";
      }
      parent.style.setProperty("--mega", getComputedStyle(el).fontSize);
    };

    fit();
    document.fonts?.ready.then(fit);
    const ro = new ResizeObserver(fit);
    ro.observe(parent);
    return () => ro.disconnect();
  }, []);

  return ref;
}

const THEME_KEY = "ubaid-theme";

function applyTheme(dark: boolean) {
  document.documentElement.dataset.theme = dark ? "dark" : "light";
  document
    .querySelector('meta[name="theme-color"]')
    ?.setAttribute("content", dark ? "#0e1015" : "#e8ebf1");
}

export function useTheme() {
  const [dark, setDark] = useState(true);
  const hydrated = useRef(false);

  useEffect(() => {
    let initial = true;
    try {
      const saved = localStorage.getItem(THEME_KEY);
      if (saved) {
        initial = saved === "dark";
      }
    } catch {
      /* storage blocked — keep default dark theme */
    }
    applyTheme(initial);
    setDark(initial);
    hydrated.current = true;
  }, []);

  const toggle = () => {
    setDark((prev) => {
      const next = !prev;
      applyTheme(next);
      try {
        localStorage.setItem(THEME_KEY, next ? "dark" : "light");
      } catch {
        /* not persisted; fine */
      }
      return next;
    });
  };

  return [dark, toggle] as const;
}
