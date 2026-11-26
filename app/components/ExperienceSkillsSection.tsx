"use client";

import { useState } from "react";
import {
  metrics,
  PORTFOLIO_EXPERIENCES,
  PORTFOLIO_SKILLS,
} from "../lib/portfolio-content";

export function ExperienceSkillsSection() {
  const [activeGroup, setActiveGroup] = useState<string>("All");

  const visibleGroups =
    activeGroup === "All"
      ? PORTFOLIO_SKILLS
      : PORTFOLIO_SKILLS.filter((g) => g.category === activeGroup);

  return (
    <>
      {/* 02. Experience */}
      <section
        id="experience"
        aria-labelledby="experience-heading"
        className="border-t border-line px-[clamp(16px,2.4vw,36px)] py-20 md:py-28"
      >
        <div className="mx-auto max-w-[1380px]">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
            <div className="lg:col-span-4">
              <h2
                id="experience-heading"
                className="text-balance font-display text-[clamp(1.75rem,3vw,2.75rem)] font-bold leading-[1.08] tracking-[-0.025em] text-ink"
              >
                02. Work Experience
              </h2>
              <p className="mt-3 text-[15px] leading-relaxed text-mute">
                My professional journey in the tech industry — shipping production React and Next.js interfaces for
                multi-tenant SaaS products and e-commerce storefronts.
              </p>

              {/* Career metrics strip */}
              <dl className="mt-8 grid grid-cols-2 gap-x-6 gap-y-5 border-t border-line pt-6">
                {metrics.map((m) => (
                  <div key={m.label}>
                    <dt className="text-[12px] text-mute">{m.label}</dt>
                    <dd className="mt-1 font-display text-2xl font-bold tracking-[-0.02em] text-ink tabular-nums">
                      {m.value}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>

            <div className="divide-y divide-line lg:col-span-8">
              {PORTFOLIO_EXPERIENCES.map((job) => (
                <article key={job.id} className="py-8 first:pt-0 last:pb-0">
                  <div className="flex flex-col justify-between gap-2 sm:flex-row sm:items-baseline">
                    <div>
                      <h3 className="font-display text-xl font-bold tracking-[-0.015em] text-ink">{job.role}</h3>
                      <p className="mt-0.5 text-[15px] font-medium text-disc">{job.company}</p>
                    </div>
                    <div className="flex items-center gap-2 text-[13px] text-mute sm:text-right">
                      <span className="font-mono tabular-nums">{job.period}</span>
                      <span aria-hidden>·</span>
                      <span>{job.location}</span>
                    </div>
                  </div>

                  <ul className="mt-5 space-y-2.5 text-[15px] leading-relaxed text-mute">
                    {job.achievements.map((point) => (
                      <li key={point} className="flex items-start gap-3">
                        <span aria-hidden className="mt-2.5 block size-1 shrink-0 rounded-full bg-ink/50" />
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 03. Skills */}
      <section
        id="skills"
        aria-labelledby="skills-heading"
        className="border-t border-line px-[clamp(16px,2.4vw,36px)] py-20 md:py-28"
      >
        <div className="mx-auto max-w-[1380px]">
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div className="max-w-xl">
              <h2
                id="skills-heading"
                className="text-balance font-display text-[clamp(1.75rem,3vw,2.75rem)] font-bold leading-[1.08] tracking-[-0.025em] text-ink"
              >
                03. Technical Skills
              </h2>
              <p className="mt-3 text-[15px] leading-relaxed text-mute">
                A comprehensive toolkit for building modern digital products.
              </p>
            </div>

            <div
              role="tablist"
              aria-label="Filter skill groups"
              className="inline-flex flex-wrap self-start rounded-xl border border-line bg-surface p-1"
            >
              {["All", ...PORTFOLIO_SKILLS.map((g) => g.category)].map((tab) => {
                const active = activeGroup === tab;
                return (
                  <button
                    key={tab}
                    type="button"
                    role="tab"
                    aria-selected={active}
                    onClick={() => setActiveGroup(tab)}
                    className={`cursor-pointer whitespace-nowrap rounded-lg px-3.5 py-2 text-[13px] font-medium transition-colors ${
                      active ? "bg-ink text-page" : "text-mute hover:text-ink"
                    }`}
                  >
                    {tab}
                  </button>
                );
              })}
            </div>
          </div>

          <div
            className={`mt-12 grid grid-cols-1 gap-10 ${
              visibleGroups.length === 1 ? "max-w-2xl md:grid-cols-1" : "md:grid-cols-3"
            }`}
          >
            {visibleGroups.map((group, idx) => (
              <div key={group.id} className="border-t border-line pt-6">
                <div className="flex items-baseline justify-between gap-4">
                  <h3 className="font-display text-lg font-bold tracking-[-0.01em] text-ink">{group.category}</h3>
                  <span className="font-mono text-xs text-mute tabular-nums">
                    {String(idx + 1).padStart(2, "0")}
                  </span>
                </div>
                <p className="mt-1.5 text-[14px] leading-relaxed text-mute">{group.summary}</p>

                <ul className="mt-6 divide-y divide-line">
                  {group.items.map((skill) => (
                    <li
                      key={skill}
                      className="flex items-center justify-between py-2.5 text-[15px] font-medium text-ink"
                    >
                      <span>{skill}</span>
                      <span className="font-mono text-[11px] text-mute">{group.tag}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
