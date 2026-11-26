"use client";

import { ArrowUpRight, Check, ChevronLeft, ChevronRight, X } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import {
  PORTFOLIO_PROJECTS,
  type PortfolioProject,
  type ProjectCategory,
} from "../lib/portfolio-content";

const CATEGORIES: ProjectCategory[] = ["All", "SaaS & Dashboards", "Web Platforms"];

function ProjectImage({ src, title }: { src: string; title: string }) {
  const [errored, setErrored] = useState(false);

  if (errored) {
    return (
      <div className="flex h-full w-full flex-col items-center justify-center bg-surface p-6 text-center">
        <span className="font-display text-lg font-bold text-ink">{title}</span>
        <span className="mt-1 text-xs text-mute">Interface preview</span>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={`${title} interface showcase`}
      referrerPolicy="no-referrer"
      onError={() => setErrored(true)}
      className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
    />
  );
}

function ProjectModal({
  project,
  onClose,
}: {
  project: PortfolioProject;
  onClose: () => void;
}) {
  const screenshots = project.screenshots?.length ? project.screenshots : [project.imageUrl];
  const [currentShot, setCurrentShot] = useState(0);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        if (lightboxIndex !== null) {
          setLightboxIndex(null);
        } else {
          onClose();
        }
      } else if (lightboxIndex !== null && screenshots.length > 1) {
        if (e.key === "ArrowLeft") {
          setLightboxIndex((i) => (i === null ? null : (i - 1 + screenshots.length) % screenshots.length));
        } else if (e.key === "ArrowRight") {
          setLightboxIndex((i) => (i === null ? null : (i + 1) % screenshots.length));
        }
      }
    };
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [onClose, lightboxIndex, screenshots.length]);

  const prevShot = () => setCurrentShot((c) => (c - 1 + screenshots.length) % screenshots.length);
  const nextShot = () => setCurrentShot((c) => (c + 1) % screenshots.length);

  return (
    <>
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="project-modal-title"
        onClick={onClose}
        className="fixed inset-0 z-50 flex items-center justify-center bg-ink/60 p-4 backdrop-blur-sm sm:p-6"
      >
        <div
          onClick={(e) => e.stopPropagation()}
          className="relative max-h-[90vh] w-full max-w-4xl overflow-y-auto rounded-2xl border border-line bg-page text-ink shadow-2xl"
        >
          <div className="sticky top-0 z-10 flex items-center justify-between gap-4 border-b border-line bg-page/95 px-6 py-4 backdrop-blur-sm">
            <div className="flex min-w-0 items-center gap-2 text-xs text-mute">
              <span className="font-mono tabular-nums">{project.number}</span>
              <span aria-hidden>·</span>
              <span className="truncate">{project.category}</span>
              <span aria-hidden>·</span>
              <span className="truncate">{project.details.role}</span>
            </div>
            <div className="flex items-center gap-2">
              <Link
                href={`/projects/${project.id}`}
                onClick={onClose}
                className="inline-flex items-center gap-1 rounded-full border border-line bg-field px-3 py-1.5 text-[12px] font-medium text-ink transition-colors hover:border-ink"
              >
                <span>Full Page</span>
                <ArrowUpRight className="size-3.5" />
              </Link>
              <button
                type="button"
                onClick={onClose}
                aria-label="Close project details"
                className="inline-flex size-9 shrink-0 cursor-pointer items-center justify-center rounded-full border border-line bg-field text-ink transition-colors hover:bg-ink hover:text-page"
              >
                <X className="size-4" />
              </button>
            </div>
          </div>

          <div className="p-6 sm:p-8">
            <div className="group relative aspect-video w-full overflow-hidden rounded-xl border border-line bg-surface">
              <img
                src={screenshots[currentShot]}
                alt={`${project.title} screenshot ${currentShot + 1}`}
                onClick={() => setLightboxIndex(currentShot)}
                className="h-full w-full cursor-zoom-in object-cover"
              />
              <span className="pointer-events-none absolute top-3 right-3 rounded-full bg-ink/75 px-2.5 py-1 text-[11px] font-medium text-page opacity-0 transition-opacity group-hover:opacity-100">
                Click to expand
              </span>

              {screenshots.length > 1 && (
                <>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      prevShot();
                    }}
                    aria-label="Previous screenshot"
                    className="absolute top-1/2 left-3 -translate-y-1/2 cursor-pointer rounded-full border border-line bg-page/85 p-2 text-ink backdrop-blur-sm transition-colors hover:bg-ink hover:text-page"
                  >
                    <ChevronLeft className="size-4" />
                  </button>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      nextShot();
                    }}
                    aria-label="Next screenshot"
                    className="absolute top-1/2 right-3 -translate-y-1/2 cursor-pointer rounded-full border border-line bg-page/85 p-2 text-ink backdrop-blur-sm transition-colors hover:bg-ink hover:text-page"
                  >
                    <ChevronRight className="size-4" />
                  </button>
                  <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 gap-1.5 rounded-full bg-page/80 px-2.5 py-1.5 backdrop-blur-sm">
                    {screenshots.map((_, i) => (
                      <button
                        key={i}
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setCurrentShot(i);
                        }}
                        aria-label={`View screenshot ${i + 1}`}
                        className={`h-1.5 cursor-pointer rounded-full transition-all ${
                          i === currentShot ? "w-5 bg-disc" : "w-1.5 bg-ink/30 hover:bg-ink/60"
                        }`}
                      />
                    ))}
                  </div>
                </>
              )}
            </div>

            <div className="mt-7 flex flex-col justify-between gap-4 border-b border-line pb-6 sm:flex-row sm:items-end">
              <div>
                <h3
                  id="project-modal-title"
                  className="font-display text-2xl font-bold tracking-[-0.02em] text-ink sm:text-3xl"
                >
                  {project.title}
                </h3>
                <p className="mt-1.5 text-[15px] text-mute">{project.subtitle}</p>
              </div>

              <div className="flex flex-wrap items-center gap-2.5">
                {project.githubLink && (
                  <a
                    href={project.githubLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex shrink-0 items-center gap-1.5 whitespace-nowrap rounded-full border border-line bg-field px-4 py-2.5 text-[13px] font-semibold text-ink transition-colors hover:border-ink"
                  >
                    <span>GitHub</span>
                    <ArrowUpRight className="size-4" />
                  </a>
                )}
                {project.link ? (
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex shrink-0 items-center gap-1.5 whitespace-nowrap rounded-full bg-disc px-5 py-2.5 text-[13px] font-semibold text-white transition-opacity hover:opacity-90"
                  >
                    <span>Visit Live Site</span>
                    <ArrowUpRight className="size-4" />
                  </a>
                ) : (
                  <span className="text-xs font-medium text-mute">Proprietary enterprise product</span>
                )}
              </div>
            </div>

            <div className="mt-6 space-y-6">
              <div>
                <h4 className="font-display text-sm font-bold text-ink">Overview</h4>
                <p className="mt-2 max-w-3xl text-[15px] leading-relaxed text-mute">
                  {project.longDescription}
                </p>
              </div>

              <div className="grid grid-cols-1 gap-6 border-y border-line py-6 md:grid-cols-2">
                <div>
                  <h4 className="font-display text-sm font-bold text-ink">The Challenge</h4>
                  <p className="mt-2 text-[14px] leading-relaxed text-mute">
                    {project.challenge.description}
                  </p>
                  {project.challenge.hurdles && (
                    <p className="mt-2.5 text-[14px] leading-relaxed text-mute">
                      {project.challenge.hurdles}
                    </p>
                  )}
                </div>
                <div>
                  <h4 className="font-display text-sm font-bold text-ink">The Solution</h4>
                  <p className="mt-2 text-[14px] leading-relaxed text-mute">
                    {project.solution.description}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div>
                  <h4 className="font-display text-sm font-bold text-ink">Key Features</h4>
                  <ul className="mt-3 space-y-2.5">
                    {project.keyFeatures.map((feat) => (
                      <li key={feat} className="flex items-start gap-2.5 text-[14px] leading-snug text-mute">
                        <Check className="mt-0.5 size-4 shrink-0 text-disc" aria-hidden />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="space-y-5">
                  {project.solution.features.length > 0 && (
                    <div>
                      <h4 className="font-display text-sm font-bold text-ink">Architecture Highlights</h4>
                      <div className="mt-3 space-y-3">
                        {project.solution.features.map((h) => (
                          <div key={h.title} className="border-b border-line pb-3 last:border-b-0 last:pb-0">
                            <p className="text-[14px] font-semibold text-ink">{h.title}</p>
                            <p className="mt-0.5 text-[13px] leading-relaxed text-mute">{h.description}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  <div>
                    <h4 className="font-display text-sm font-bold text-ink">Tech Stack</h4>
                    <p className="mt-1.5 font-mono text-[13px] text-mute">{project.techStack.join(" · ")}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Fullscreen Lightbox */}
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
                  setLightboxIndex((i) =>
                    i === null ? null : (i - 1 + screenshots.length) % screenshots.length,
                  );
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
                  setLightboxIndex((i) => (i === null ? null : (i + 1) % screenshots.length));
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
    </>
  );
}

export function ProjectsSection() {
  const [category, setCategory] = useState<ProjectCategory>("All");
  const [selected, setSelected] = useState<PortfolioProject | null>(null);

  const visible =
    category === "All"
      ? PORTFOLIO_PROJECTS
      : PORTFOLIO_PROJECTS.filter((p) => p.category === category);

  const countFor = (cat: ProjectCategory) =>
    cat === "All"
      ? PORTFOLIO_PROJECTS.length
      : PORTFOLIO_PROJECTS.filter((p) => p.category === cat).length;

  return (
    <section
      id="projects"
      aria-labelledby="projects-heading"
      className="border-t border-line px-[clamp(16px,2.4vw,36px)] py-20 md:py-28"
    >
      <div className="mx-auto max-w-[1380px]">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div className="max-w-xl">
            <h2
              id="projects-heading"
              className="text-balance font-display text-[clamp(1.75rem,3vw,2.75rem)] font-bold leading-[1.08] tracking-[-0.025em] text-ink"
            >
              01. Featured Projects
            </h2>
            <p className="mt-3 text-[15px] leading-relaxed text-mute">
              A showcase of my recent development work — multi-tenant SaaS applications, internal CMS tools, and
              commercial web platforms.
            </p>
          </div>

          {/* Interactive segmented filter control */}
          <div
            role="tablist"
            aria-label="Filter projects by category"
            className="inline-flex flex-wrap self-start rounded-xl border border-line bg-surface p-1"
          >
            {CATEGORIES.map((cat) => {
              const active = category === cat;
              return (
                <button
                  key={cat}
                  type="button"
                  role="tab"
                  aria-selected={active}
                  onClick={() => setCategory(cat)}
                  className={`cursor-pointer whitespace-nowrap rounded-lg px-3.5 py-2 text-[13px] font-medium transition-colors ${
                    active ? "bg-ink text-page" : "text-mute hover:text-ink"
                  }`}
                >
                  <span>{cat}</span>
                  <span className="ml-1.5 font-mono text-[11px] tabular-nums opacity-70">{countFor(cat)}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Project Grid */}
        <div className="mt-12 grid grid-cols-1 gap-x-8 gap-y-12 md:grid-cols-2">
          {visible.map((project) => (
            <article key={project.id} className="group flex flex-col">
              <button
                type="button"
                onClick={() => setSelected(project)}
                className="relative aspect-video w-full cursor-pointer overflow-hidden rounded-2xl border border-line bg-surface text-left"
              >
                <ProjectImage src={project.imageUrl} title={project.title} />
              </button>

              <div className="mt-5 flex flex-1 flex-col">
                <div className="flex items-center gap-2 text-[12px] text-mute">
                  <span className="font-mono tabular-nums">{project.number}</span>
                  <span aria-hidden>·</span>
                  <span>{project.category}</span>
                  <span aria-hidden>·</span>
                  <span className={project.link ? "font-medium text-disc" : ""}>{project.availability}</span>
                </div>

                <div className="mt-2 flex items-baseline justify-between gap-4">
                  <button
                    type="button"
                    onClick={() => setSelected(project)}
                    className="cursor-pointer text-left font-display text-[22px] font-bold tracking-[-0.02em] text-ink transition-colors hover:text-disc"
                  >
                    {project.title}
                  </button>
                </div>

                <p className="mt-2 flex-1 text-[15px] leading-relaxed text-mute">{project.description}</p>

                <p className="mt-4 font-mono text-[12px] text-mute">{project.techStack.join(" · ")}</p>

                <div className="mt-4 flex flex-wrap items-center gap-5 border-t border-line pt-4">
                  <button
                    type="button"
                    onClick={() => setSelected(project)}
                    className="inline-flex cursor-pointer items-center gap-1 whitespace-nowrap text-[13px] font-semibold text-ink transition-colors hover:text-disc"
                  >
                    <span>View Case Study</span>
                    <span aria-hidden>→</span>
                  </button>

                  <Link
                    href={`/projects/${project.id}`}
                    className="inline-flex items-center gap-1 whitespace-nowrap text-[13px] font-medium text-mute transition-colors hover:text-ink"
                  >
                    <span>Details Page</span>
                    <ArrowUpRight className="size-3.5" />
                  </Link>

                  {project.githubLink && (
                    <a
                      href={project.githubLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 whitespace-nowrap text-[13px] font-semibold text-ink transition-colors hover:text-disc"
                    >
                      <span>Code</span>
                      <ArrowUpRight className="size-3.5" />
                    </a>
                  )}

                  {project.link && (
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 whitespace-nowrap text-[13px] font-semibold text-disc transition-opacity hover:opacity-80"
                    >
                      <span>Live Demo</span>
                      <ArrowUpRight className="size-3.5" />
                    </a>
                  )}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>

      {selected && <ProjectModal project={selected} onClose={() => setSelected(null)} />}
    </section>
  );
}
