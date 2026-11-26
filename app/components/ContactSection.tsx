"use client";

import { ArrowUpRight, Check, Copy, Mail } from "lucide-react";
import { useState /*, type FormEvent */ } from "react";
import { person } from "../lib/portfolio-content";

// const PROJECT_TYPES = ["Web Application", "SaaS / Dashboard", "Full-Time Role", "Consulting"] as const;

export function ContactSection() {
  const [copied, setCopied] = useState(false);
  /*
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [scope, setScope] = useState<(typeof PROJECT_TYPES)[number]>("Web Application");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);
  */

  const currentYear = new Date().getFullYear();

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(person.email);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2200);
    } catch {
      /* clipboard blocked in embedded context */
    }
  };

  /*
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const mailtoHref = `mailto:${person.email}?subject=${encodeURIComponent(
    `${scope} inquiry from ${name || "Portfolio visitor"}`,
  )}&body=${encodeURIComponent(message)}`;
  */

  return (
    <>
      <section
        id="contact"
        aria-labelledby="contact-heading"
        className="border-t border-line px-[clamp(16px,2.4vw,36px)] py-20 md:py-28"
      >
        <div className="mx-auto max-w-[1380px]">
          <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-12">
            {/* Left column: Heading & intro */}
            <div className="lg:col-span-5">
              <h2
                id="contact-heading"
                className="text-balance font-display text-[clamp(1.75rem,3vw,2.75rem)] font-bold leading-[1.08] tracking-[-0.025em] text-ink"
              >
                04. Get in Touch
              </h2>
              <p className="mt-4 max-w-md text-[15px] leading-relaxed text-mute">
                Available for frontend engineering roles, multi-tenant SaaS builds, and React or Next.js
                collaborations. Reach out directly via email or connect through any channel alongside.
              </p>
            </div>

            {/* Right column: Direct contact channels */}
            <div className="rounded-2xl border border-line bg-surface p-6 sm:p-8 lg:col-span-7">
              <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
                <div>
                  <p className="text-[12px] text-mute">Direct email</p>
                  <div className="mt-2 flex flex-wrap items-center gap-3">
                    <a
                      href={`mailto:${person.email}`}
                      className="font-display text-lg font-bold tracking-[-0.01em] text-ink transition-colors hover:text-disc"
                    >
                      {person.email}
                    </a>
                    <button
                      type="button"
                      onClick={copyEmail}
                      className="inline-flex cursor-pointer items-center gap-1.5 rounded-lg border border-line bg-field px-3 py-1.5 text-[12px] font-medium text-ink transition-colors hover:border-ink"
                    >
                      {copied ? <Check className="size-3.5 text-disc" /> : <Copy className="size-3.5 text-mute" />}
                      <span>{copied ? "Copied" : "Copy"}</span>
                    </button>
                  </div>
                </div>

                <div>
                  <p className="text-[12px] text-mute">Location</p>
                  <p className="mt-2 text-[15px] font-medium text-ink">{person.location}</p>
                </div>
              </div>

              <div className="mt-8 flex flex-wrap items-center gap-6 border-t border-line pt-6 text-[14px] font-semibold">
                <a
                  href={person.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-ink transition-colors hover:text-disc"
                >
                  <span>GitHub</span>
                  <ArrowUpRight className="size-4" />
                </a>
                <a
                  href={person.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-ink transition-colors hover:text-disc"
                >
                  <span>LinkedIn</span>
                  <ArrowUpRight className="size-4" />
                </a>
                <a
                  href={person.resumeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-ink transition-colors hover:text-disc"
                >
                  <span>Resume</span>
                  <ArrowUpRight className="size-4" />
                </a>
                <a
                  href={`mailto:${person.email}`}
                  className="inline-flex items-center gap-1.5 text-ink transition-colors hover:text-disc"
                >
                  <Mail className="size-4" />
                  <span>Email</span>
                </a>
              </div>
            </div>

            {/*
            Right column: Interactive inquiry form (temporarily commented out)
            <div className="rounded-2xl border border-line bg-surface p-6 sm:p-8 lg:col-span-7">
              {submitted ? (
                <div className="flex h-full flex-col justify-between gap-6 py-4">
                  <div>
                    <p className="font-mono text-xs text-disc">Message logged</p>
                    <h3 className="mt-2 font-display text-2xl font-bold tracking-[-0.02em] text-ink">
                      Thanks, {name || "friend"}.
                    </h3>
                    <p className="mt-2 max-w-lg text-[15px] leading-relaxed text-mute">
                      Your note about <span className="font-medium text-ink">{scope}</span> is ready. You can also send
                      it straight via your mail client to reach {person.email} immediately.
                    </p>
                  </div>

                  <div className="flex flex-wrap items-center gap-3">
                    <a
                      href={mailtoHref}
                      className="inline-flex items-center gap-1.5 rounded-full bg-disc px-5 py-2.5 text-[13px] font-semibold text-white transition-opacity hover:opacity-90"
                    >
                      <span>Open in Mail App</span>
                      <ArrowUpRight className="size-4" />
                    </a>
                    <button
                      type="button"
                      onClick={() => {
                        setSubmitted(false);
                        setName("");
                        setEmail("");
                        setMessage("");
                      }}
                      className="cursor-pointer rounded-full border border-line bg-field px-5 py-2.5 text-[13px] font-semibold text-ink transition-colors hover:border-ink"
                    >
                      Send another message
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div>
                    <span className="block text-[13px] font-medium text-ink">What are we building?</span>
                    <div className="mt-2.5 flex flex-wrap gap-2">
                      {PROJECT_TYPES.map((type) => {
                        const active = scope === type;
                        return (
                          <button
                            key={type}
                            type="button"
                            onClick={() => setScope(type)}
                            className={`cursor-pointer whitespace-nowrap rounded-lg border px-3.5 py-2 text-[13px] font-medium transition-colors ${
                              active
                                ? "border-ink bg-ink text-page"
                                : "border-line bg-field text-mute hover:border-ink hover:text-ink"
                            }`}
                          >
                            {type}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div>
                      <label htmlFor="contact-name" className="block text-[13px] font-medium text-ink">
                        Your name
                      </label>
                      <input
                        id="contact-name"
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Alex Rivera"
                        className="mt-1.5 h-11 w-full rounded-xl border border-line bg-field px-4 text-[14px] text-ink outline-none placeholder:text-mute focus:border-ink"
                      />
                    </div>
                    <div>
                      <label htmlFor="contact-email" className="block text-[13px] font-medium text-ink">
                        Email address
                      </label>
                      <input
                        id="contact-email"
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="alex@company.com"
                        className="mt-1.5 h-11 w-full rounded-xl border border-line bg-field px-4 text-[14px] text-ink outline-none placeholder:text-mute focus:border-ink"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="contact-message" className="block text-[13px] font-medium text-ink">
                      Project details
                    </label>
                    <textarea
                      id="contact-message"
                      required
                      rows={4}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Tell me about the product, timeline, or role..."
                      className="mt-1.5 w-full resize-none rounded-xl border border-line bg-field p-4 text-[14px] text-ink outline-none placeholder:text-mute focus:border-ink"
                    />
                  </div>

                  <div className="flex flex-wrap items-center justify-between gap-4 pt-1">
                    <p className="text-[12px] text-mute">Typically responds within 24 hours.</p>
                    <button
                      type="submit"
                      className="cursor-pointer rounded-full bg-disc px-6 py-2.5 text-[13px] font-semibold text-white transition-transform active:scale-95"
                    >
                      Send Message →
                    </button>
                  </div>
                </form>
              )}
            </div>
            */}
          </div>
        </div>
      </section>

      <footer className="border-t border-line px-[clamp(16px,2.4vw,36px)] py-7">
        <div className="mx-auto flex max-w-[1380px] flex-col items-start justify-between gap-4 text-[13px] text-mute sm:flex-row sm:items-center">
          <p>© {currentYear} {person.fullName}. All rights reserved.</p>
          <div className="flex flex-wrap items-center gap-6">
            <a href="#top" className="transition-colors hover:text-ink">
              Back to top ↑
            </a>
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
    </>
  );
}
