"use client";

import { Menu, X } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { HERO_AVATAR_SRC, nav, person } from "../lib/portfolio-content";

type Props = {
  dark: boolean;
  onToggle: () => void;
  avatarSrc?: string | null;
  isSubpage?: boolean;
};

export function Header({ dark, onToggle, avatarSrc = null, isSubpage = false }: Props) {
  const [menuOpen, setMenuOpen] = useState(false);

  const brandHref = isSubpage ? "/" : "#top";
  const talkHref = isSubpage ? "/#contact" : "#contact";

  const resolveHref = (href: string, external?: boolean) => {
    if (external) return href;
    return isSubpage && href.startsWith("#") ? `/${href}` : href;
  };

  return (
    <header className="relative z-40 px-[clamp(16px,2.4vw,36px)] pt-[clamp(14px,2.2vh,22px)]">
      <div className="mx-auto flex max-w-[1380px] items-center justify-between gap-8">
        {/* Zone 1: Single-line brand mark */}
        <Link
          href={brandHref}
          className="flex shrink-0 items-center gap-2.5 whitespace-nowrap font-display text-[15px] font-bold tracking-[-0.015em] text-ink"
        >
          <span className="relative size-8 shrink-0 overflow-hidden rounded-full bg-disc">
            <img
              src={avatarSrc ?? HERO_AVATAR_SRC}
              alt=""
              width={32}
              height={32}
              decoding="async"
              referrerPolicy="no-referrer"
              className="absolute top-[2%] left-[-14%] w-[128%] max-w-none"
            />
          </span>
          <span>{person.handle}</span>
        </Link>

        {/* Zone 2: Clean single-line text navigation links */}
        <nav aria-label="Main navigation" className="hidden items-center gap-7 md:flex">
          {nav.map((item) =>
            item.external ? (
              <a
                key={item.href}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className="shrink-0 whitespace-nowrap text-[13px] font-medium text-mute transition-colors hover:text-ink hover:underline hover:decoration-line hover:underline-offset-4"
              >
                {item.label}
              </a>
            ) : (
              <a
                key={item.href}
                href={resolveHref(item.href, item.external)}
                className="shrink-0 whitespace-nowrap text-[13px] font-medium text-mute transition-colors hover:text-ink hover:underline hover:decoration-line hover:underline-offset-4"
              >
                {item.label}
              </a>
            ),
          )}
        </nav>

        {/* Zone 3: Theme switch + primary action / mobile trigger */}
        <div className="flex shrink-0 items-center gap-3">
          <button
            type="button"
            onClick={onToggle}
            aria-pressed={dark}
            aria-label={dark ? "Switch to light mode" : "Switch to dark mode"}
            className="flex h-7 w-12 shrink-0 cursor-pointer items-center rounded-full bg-sun p-1 transition-colors"
          >
            <span
              className={`size-5 rounded-full bg-ink transition-transform duration-300 ${dark ? "translate-x-5" : ""}`}
            />
          </button>

          <a
            href={talkHref}
            className="hidden shrink-0 whitespace-nowrap rounded-full bg-ink px-4 py-2 text-[12px] font-semibold text-page transition-opacity hover:opacity-88 md:inline-flex"
          >
            Let’s Talk
          </a>

          <button
            type="button"
            onClick={() => setMenuOpen((v) => !v)}
            aria-expanded={menuOpen}
            aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
            className="inline-flex size-10 items-center justify-center rounded-full border border-line text-ink md:hidden"
          >
            {menuOpen ? <X className="size-4" /> : <Menu className="size-4" />}
          </button>
        </div>
      </div>

      {/* Mobile navigation panel */}
      {menuOpen && (
        <nav
          aria-label="Mobile navigation"
          className="mt-3 flex flex-col gap-1 border-y border-line bg-page py-3 md:hidden"
        >
          {nav.map((item) => (
            <a
              key={item.href}
              href={resolveHref(item.href, item.external)}
              target={item.external ? "_blank" : undefined}
              rel={item.external ? "noopener noreferrer" : undefined}
              onClick={() => setMenuOpen(false)}
              className="flex min-h-11 items-center justify-between px-2 text-[15px] font-medium text-ink transition-colors hover:text-disc"
            >
              <span>{item.label}</span>
              <span aria-hidden className="text-mute">
                →
              </span>
            </a>
          ))}
        </nav>
      )}
    </header>
  );
}
