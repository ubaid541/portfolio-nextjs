"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  ArrowUpRight,
  Check,
  ChevronLeft,
  ChevronRight,
  X,
} from "lucide-react";
import { Header } from "../../components/Header";
import { useTheme } from "../../hooks/use-ui-hooks";
import { person } from "../../lib/portfolio-content";
import type { Project } from "../../data/portfolio-data";

function ImageCarousel({
  screenshots,
  title,
  onImageClick,
}: {
  screenshots: string[];
  title: string;
  onImageClick: (index: number) => void;
}) {
  const [current, setCurrent] = useState(0);

  const prev = () => setCurrent((c) => (c - 1 + screenshots.length) % screenshots.length);
  const next = () => setCurrent((c) => (c + 1) % screenshots.length);

  if (screenshots.length === 0) return null;

  return (
    <div className="group relative aspect-video w-full overflow-hidden rounded-2xl border border-line bg-surface">
      <img
        src={screenshots[current]}
        alt={`${title} screenshot ${current + 1}`}
        onClick={() => onImageClick(current)}
        className="h-full w-full cursor-zoom-in object-cover"
      />

      <span className="pointer-events-none absolute top-4 right-4 rounded-full bg-ink/75 px-3 py-1 text-[11px] font-medium text-page opacity-0 transition-opacity group-hover:opacity-100">
        Click to expand
      </span>

      {screenshots.length > 1 && (
        <>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              prev();
            }}
            aria-label="Previous screenshot"
            className="absolute top-1/2 left-4 -translate-y-1/2 cursor-pointer rounded-full border border-line bg-page/85 p-2.5 text-ink backdrop-blur-sm transition-colors hover:bg-ink hover:text-page"
          >
            <ChevronLeft className="size-4" />
          </button>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              next();
            }}
            aria-label="Next screenshot"
            className="absolute top-1/2 right-4 -translate-y-1/2 cursor-pointer rounded-full border border-line bg-page/85 p-2.5 text-ink backdrop-blur-sm transition-colors hover:bg-ink hover:text-page"
          >
            <ChevronRight className="size-4" />
          </button>

          <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-2 rounded-full bg-page/85 px-3 py-1.5 backdrop-blur-sm">
            {screenshots.map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setCurrent(i)}
                aria-label={`View screenshot ${i + 1}`}
                className={`h-2 cursor-pointer rounded-full transition-all ${
                  i === current ? "w-6 bg-disc" : "w-2 bg-ink/30 hover:bg-ink/60"
                }`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}

interface Props {
  project: Project;
  otherProjects: Project[];
}

export default function ProjectDetailsClient({ project }: Props) {
  const [dark, toggle] = useTheme();
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const currentYear = new Date().getFullYear();

  const screenshots = project.screenshots?.length ? project.screenshots : [project.imageUrl];

  const lightboxPrev = () =>
    setLightboxIndex((i) => (i === null ? null : (i - 1 + screenshots.length) % screenshots.length));
  const lightboxNext = () =>
    setLightboxIndex((i) => (i === null ? null : (i + 1) % screenshots.length));

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLightboxIndex(null);
      if (lightboxIndex !== null && screenshots.length > 1) {
        if (e.key === "ArrowLeft") lightboxPrev();
        if (e.key === "ArrowRight") lightboxNext();
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  });

  return (
    <div id="top" className="min-h-screen bg-page text-ink">
      <Header dark={dark} onToggle={toggle} avatarSrc={null} isSubpage />

      <main className="px-[clamp(16px,2.4vw,36px)]">
        <div className="mx-auto max-w-[1380px]">
          {/* Header Section */}
          <section className="border-b border-line py-12 md:py-16">
            <nav aria-label="Breadcrumb" className="mb-6 flex items-center gap-2 text-[13px] text-mute">
              <Link href="/#projects" className="transition-colors hover:text-ink">
                Projects
              </Link>
              <ChevronRight className="size-3.5" aria-hidden />
              <span className="font-medium text-ink">{project.title}</span>
            </nav>

            <h1 className="font-display text-[clamp(2rem,4vw,3.5rem)] font-bold leading-[1.06] tracking-[-0.03em] text-ink">
              {project.title}
            </h1>
            <p className="mt-4 max-w-2xl text-[16px] leading-relaxed text-mute">{project.subtitle}</p>
          </section>

          {/* Carousel */}
          <section className="py-10">
            <ImageCarousel
              screenshots={screenshots}
              title={project.title}
              onImageClick={(idx) => setLightboxIndex(idx)}
            />
          </section>

          {/* Two-Column Content */}
          <section className="border-t border-line py-12 md:py-16">
            <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
              {/* Left Column */}
              <div className="space-y-10 lg:col-span-8">
                <div>
                  <h2 className="font-display text-sm font-bold uppercase tracking-[0.06em] text-mute">
                    Overview
                  </h2>
                  <p className="mt-3 text-[16px] leading-relaxed text-ink/90">{project.longDescription}</p>
                </div>

                <div className="grid grid-cols-1 gap-8 border-y border-line py-8 md:grid-cols-2">
                  <div>
                    <h2 className="font-display text-lg font-bold tracking-[-0.015em] text-ink">
                      The Challenge
                    </h2>
                    <p className="mt-3 text-[15px] leading-relaxed text-mute">
                      {project.challenge.description}
                    </p>
                    {project.challenge.hurdles && (
                      <p className="mt-3 text-[15px] leading-relaxed text-mute">
                        {project.challenge.hurdles}
                      </p>
                    )}
                  </div>

                  <div>
                    <h2 className="font-display text-lg font-bold tracking-[-0.015em] text-ink">
                      The Solution
                    </h2>
                    <p className="mt-3 text-[15px] leading-relaxed text-mute">
                      {project.solution.description}
                    </p>
                    {project.solution.features.length > 0 && (
                      <div className="mt-5 space-y-3 border-t border-line pt-4">
                        {project.solution.features.map((feature) => (
                          <div key={feature.title}>
                            <p className="text-[14px] font-semibold text-ink">{feature.title}</p>
                            <p className="mt-0.5 text-[13px] leading-relaxed text-mute">
                              {feature.description}
                            </p>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                <div>
                  <h2 className="font-display text-lg font-bold tracking-[-0.015em] text-ink">
                    Key Features
                  </h2>
                  <ul className="mt-4 space-y-3">
                    {project.keyFeatures.map((feature) => (
                      <li key={feature} className="flex items-start gap-3 text-[15px] leading-relaxed text-mute">
                        <Check className="mt-1 size-4 shrink-0 text-disc" aria-hidden />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Right Sidebar */}
              <aside className="space-y-6 lg:col-span-4">
                <div className="space-y-3">
                  {project.link ? (
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-full bg-disc px-6 text-[13px] font-semibold text-white transition-opacity hover:opacity-90"
                    >
                      <span>Live Demo</span>
                      <ArrowUpRight className="size-4" />
                    </a>
                  ) : (
                    <div className="rounded-2xl border border-line bg-surface p-5 text-[14px] leading-relaxed text-mute">
                      <strong className="mb-1 block font-display text-ink">Proprietary Product</strong>
                      Due to company confidentiality, a live demo is not available. Please refer to the provided
                      screenshots and details.
                    </div>
                  )}

                  {project.githubLink && (
                    <a
                      href={project.githubLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-full border border-line bg-field px-6 text-[13px] font-semibold text-ink transition-colors hover:border-ink"
                    >
                      <span>GitHub Repository</span>
                      <ArrowUpRight className="size-4" />
                    </a>
                  )}
                </div>

                <div className="rounded-2xl border border-line bg-surface p-6 space-y-5">
                  <div className="flex items-center justify-between border-b border-line pb-4 text-[14px]">
                    <span className="font-mono text-[11px] uppercase tracking-[0.08em] text-mute">Role</span>
                    <span className="font-medium text-ink">{project.details.role}</span>
                  </div>

                  <div>
                    <span className="block font-mono text-[11px] uppercase tracking-[0.08em] text-mute">
                      Tech Stack
                    </span>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {project.techStack.map((tech) => (
                        <span
                          key={tech}
                          className="rounded-lg border border-line bg-field px-3 py-1.5 font-mono text-[12px] text-ink"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <Link
                  href="/#projects"
                  className="inline-flex items-center gap-2 text-[13px] font-semibold text-ink transition-colors hover:text-disc"
                >
                  <span aria-hidden>←</span>
                  <span>Back to all projects</span>
                </Link>
              </aside>
            </div>
          </section>
        </div>
      </main>

      <footer className="border-t border-line px-[clamp(16px,2.4vw,36px)] py-7">
        <div className="mx-auto flex max-w-[1380px] flex-col items-start justify-between gap-4 text-[13px] text-mute sm:flex-row sm:items-center">
          <p>© {currentYear} {person.fullName}. All rights reserved.</p>
          <div className="flex flex-wrap items-center gap-6">
            <Link href="/" className="transition-colors hover:text-ink">
              Home
            </Link>
            <a href={person.github} target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-ink">
              GitHub
            </a>
            <a
              href={person.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors hover:text-ink"
            >
              LinkedIn
            </a>
            <a
              href={person.resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors hover:text-ink"
            >
              Resume
            </a>
          </div>
        </div>
      </footer>

      {/* Lightbox Overlay */}
      {lightboxIndex !== null && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Expanded screenshot"
          onClick={() => setLightboxIndex(null)}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/85 p-4 backdrop-blur-md cursor-zoom-out sm:p-8"
        >
          <img
            src={screenshots[lightboxIndex]}
            alt={`${project.title} screenshot ${lightboxIndex + 1}`}
            onClick={(e) => e.stopPropagation()}
            className="max-h-[88vh] w-auto max-w-full cursor-default rounded-xl object-contain shadow-2xl"
          />

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setLightboxIndex(null);
            }}
            aria-label="Close lightbox"
            className="absolute top-4 right-4 cursor-pointer rounded-full border border-white/20 bg-black/60 p-2.5 text-white transition-transform hover:scale-110 md:top-6 md:right-6"
          >
            <X className="size-5" />
          </button>

          {screenshots.length > 1 && (
            <>
              <div className="absolute bottom-6 left-1/2 -translate-x-1/2 rounded-full bg-black/60 px-3 py-1.5 text-xs text-white backdrop-blur-sm">
                {lightboxIndex + 1} / {screenshots.length}
              </div>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  lightboxPrev();
                }}
                aria-label="Previous image"
                className="absolute top-1/2 left-3 -translate-y-1/2 cursor-pointer rounded-full border border-white/20 bg-black/60 p-3 text-white transition-transform hover:scale-110 md:left-6"
              >
                <ChevronLeft className="size-5" />
              </button>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  lightboxNext();
                }}
                aria-label="Next image"
                className="absolute top-1/2 right-3 -translate-y-1/2 cursor-pointer rounded-full border border-white/20 bg-black/60 p-3 text-white transition-transform hover:scale-110 md:right-6"
              >
                <ChevronRight className="size-5" />
              </button>
            </>
          )}
        </div>
      )}
    </div>
  );
}
