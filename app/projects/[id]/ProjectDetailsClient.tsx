"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ChevronRight,
  ExternalLink,
  Github,
  CheckCircle2,
  ChevronLeft,
  ChevronRight as ChevronRightIcon,
  Code2,
  Menu,
  X,
} from "lucide-react";
import { Badge } from "../../component/components/ui/Badge";
import { Button } from "../../component/components/ui/Button";
import { Card, CardContent } from "../../component/components/ui/Card";
import type { Project } from "../../data/portfolio-data";

/* ──────────────────────────────────────────────────────────────
   NAVBAR  (aligned with site's existing Navbar style)
────────────────────────────────────────────────────────────── */
function DetailNavbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  const navLinks = [
    { label: "Projects", href: "/#projects" },
    { label: "About", href: "/#about" },
    { label: "Contact", href: "/#contact" },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border/50 py-3">
      <div className="container mx-auto px-4 md:px-6 flex items-center justify-between">
        {/* Brand */}
        <Link href="/" className="flex items-center gap-2 group cursor-pointer">
          <div className="bg-primary/10 p-2 rounded-lg group-hover:bg-primary/20 transition-colors">
            <Code2 className="w-6 h-6 text-primary" />
          </div>
          <span className="font-heading font-bold text-xl tracking-tight">
            Ubaid<span className="text-primary">.dev</span>
          </span>
        </Link>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
            >
              {link.label}
            </Link>
          ))}
          <div className="h-4 w-px bg-border mx-2" />
          <Button
            className="rounded-full px-6 bg-white text-black hover:bg-gray-200"
            onClick={() =>
              window.open("/ubaid_ur_rehman_resume.pdf", "_blank")
            }
          >
            Resume
          </Button>
        </div>

        {/* Mobile toggle */}
        <button
          className="md:hidden p-2 text-foreground hover:text-primary transition-colors"
          onClick={() => setMobileOpen((o) => !o)}
        >
          {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-background border-b border-border p-4">
          <div className="flex flex-col gap-4">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="text-lg font-medium text-muted-foreground hover:text-primary py-2 border-b border-border/50 last:border-0"
              >
                {link.label}
              </Link>
            ))}
            <Button
              className="w-full mt-2"
              onClick={() =>
                window.open("/ubaid_ur_rehman_resume.pdf", "_blank")
              }
            >
              Download Resume
            </Button>
          </div>
        </div>
      )}
    </nav>
  );
}

/* ──────────────────────────────────────────────────────────────
   IMAGE CAROUSEL
────────────────────────────────────────────────────────────── */
function ImageCarousel({ screenshots }: { screenshots: string[] }) {
  const [current, setCurrent] = useState(0);

  const prev = () =>
    setCurrent((c) => (c - 1 + screenshots.length) % screenshots.length);
  const next = () =>
    setCurrent((c) => (c + 1) % screenshots.length);

  if (screenshots.length === 0) return null;

  return (
    <div className="relative w-full rounded-2xl overflow-hidden border border-white/10 shadow-2xl bg-secondary/30 group">
      {/* Image */}
      <motion.img
        key={current}
        src={screenshots[current]}
        alt={`Screenshot ${current + 1}`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4 }}
        className="w-full object-cover"
        style={{ maxHeight: "420px", objectFit: "cover" }}
      />

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-background/40 via-transparent to-transparent pointer-events-none" />

      {/* Prev / Next arrows — only shown if more than 1 screenshot */}
      {screenshots.length > 1 && (
        <>
          <button
            onClick={prev}
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-background/70 backdrop-blur-sm border border-white/10 rounded-full p-2 text-foreground hover:text-primary hover:border-primary/50 transition-all opacity-0 group-hover:opacity-100"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={next}
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-background/70 backdrop-blur-sm border border-white/10 rounded-full p-2 text-foreground hover:text-primary hover:border-primary/50 transition-all opacity-0 group-hover:opacity-100"
          >
            <ChevronRightIcon className="w-5 h-5" />
          </button>
        </>
      )}

      {/* Dots */}
      {screenshots.length > 1 && (
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
          {screenshots.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={`w-2 h-2 rounded-full transition-all ${
                i === current
                  ? "bg-primary w-6"
                  : "bg-white/40 hover:bg-white/70"
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
}

/* ──────────────────────────────────────────────────────────────
   FOOTER (aligned with site Footer)
────────────────────────────────────────────────────────────── */
function DetailFooter() {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="bg-card border-t border-border py-12 mt-24">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-center md:text-left">
            <h3 className="font-heading font-bold text-xl mb-2">
              Ubaid Ur Rehman
            </h3>
            <p className="text-muted-foreground text-sm max-w-xs">
              Building scalable digital experiences with React, Node.js, and
              modern web technologies.
            </p>
          </div>
          <div className="flex gap-4 text-sm text-muted-foreground">
            <a
              href="https://linkedin.com/in/ubaid-ur-rehman-se"
              target="_blank"
              rel="noreferrer"
              className="hover:text-primary transition-colors"
            >
              LinkedIn
            </a>
            <a
              href="https://github.com/ubaid541"
              target="_blank"
              rel="noreferrer"
              className="hover:text-primary transition-colors"
            >
              GitHub
            </a>
            <a
              href="mailto:ubaidrehmanse@gmail.com"
              className="hover:text-primary transition-colors"
            >
              Email
            </a>
          </div>
        </div>
        <div className="border-t border-border mt-8 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-muted-foreground">
          <p>© {currentYear} Ubaid Ur Rehman. All rights reserved.</p>
          <p className="mt-2 md:mt-0">Designed & Built with ❤️</p>
        </div>
      </div>
    </footer>
  );
}

/* ──────────────────────────────────────────────────────────────
   MAIN COMPONENT
────────────────────────────────────────────────────────────── */
interface Props {
  project: Project;
  otherProjects: Project[];
}

export default function ProjectDetailsClient({ project, otherProjects }: Props) {
  return (
    <div className="min-h-screen bg-background">
      <DetailNavbar />

      <main className="pt-20">
        {/* ── HEADER SECTION ──────────────────────────────────── */}
        <section className="py-12 border-b border-border/50">
          <div className="container mx-auto px-4 md:px-6">
            {/* Breadcrumbs */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="flex items-center gap-2 text-sm text-muted-foreground mb-6"
            >
              <Link href="/" className="hover:text-primary transition-colors">
                Projects
              </Link>
              <ChevronRight className="w-4 h-4" />
              <span className="text-foreground">{project.title}</span>
            </motion.div>

            {/* Title */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h1 className="text-4xl md:text-5xl font-heading font-bold mb-4">
                {project.title}
              </h1>
              <p className="text-lg text-muted-foreground max-w-2xl">
                {project.subtitle}
              </p>
            </motion.div>
          </div>
        </section>

        {/* ── CAROUSEL ────────────────────────────────────────── */}
        <section className="py-8">
          <div className="container mx-auto px-4 md:px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <ImageCarousel screenshots={project.screenshots} />
            </motion.div>
          </div>
        </section>

        {/* ── TWO-COLUMN CONTENT ──────────────────────────────── */}
        <section className="py-12">
          <div className="container mx-auto px-4 md:px-6">
            <div className="grid lg:grid-cols-3 gap-10">

              {/* ── LEFT COLUMN ─────────────────────────────── */}
              <div className="lg:col-span-2 space-y-10">

                {/* Project Description */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                >
                  <p className="text-muted-foreground leading-relaxed">
                    {project.longDescription}
                  </p>
                </motion.div>

                {/* The Challenge */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.05 }}
                >
                  <Card className="bg-card border-border/50">
                    <CardContent className="p-8">
                      <h2 className="text-2xl font-heading font-bold mb-4 flex items-center gap-3">
                        <span className="text-xl">🎯</span> The Challenge
                      </h2>
                      <p className="text-muted-foreground leading-relaxed mb-4">
                        {project.challenge.description}
                      </p>
                      {project.challenge.hurdles && (
                        <p className="text-muted-foreground leading-relaxed">
                          {project.challenge.hurdles}
                        </p>
                      )}
                    </CardContent>
                  </Card>
                </motion.div>

                {/* The Solution */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                >
                  <Card className="bg-card border-border/50">
                    <CardContent className="p-8">
                      <h2 className="text-2xl font-heading font-bold mb-4 flex items-center gap-3">
                        <span className="text-xl">⚡</span> The Solution
                      </h2>
                      <p className="text-muted-foreground leading-relaxed mb-6">
                        {project.solution.description}
                      </p>
                      {project.solution.features.length > 0 && (
                        <div className="grid sm:grid-cols-2 gap-4">
                          {project.solution.features.map((feature) => (
                            <div
                              key={feature.title}
                              className="flex items-start gap-3"
                            >
                              <CheckCircle2 className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                              <div>
                                <p className="font-semibold text-sm">
                                  {feature.title}
                                </p>
                                <p className="text-muted-foreground text-sm">
                                  {feature.description}
                                </p>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </motion.div>

                {/* Key Features */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.15 }}
                >
                  <Card className="bg-card border-border/50">
                    <CardContent className="p-8">
                      <h2 className="text-2xl font-heading font-bold mb-6">
                        Key Features
                      </h2>
                      <ul className="space-y-3">
                        {project.keyFeatures.map((feature) => (
                          <li
                            key={feature}
                            className="flex items-start gap-3 text-muted-foreground"
                          >
                            <span className="text-primary mt-1 flex-shrink-0">◆</span>
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                </motion.div>
              </div>

              {/* ── RIGHT SIDEBAR ────────────────────────────── */}
              <div className="space-y-6">

                {/* CTA Buttons — conditional on links existing */}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="space-y-3"
                >
                  {project.link && project.link !== "" && (
                    <Button
                      className="w-full h-12 bg-primary hover:bg-primary/90 text-white rounded-lg gap-2"
                      onClick={() => window.open(project.link!, "_blank")}
                    >
                      <ExternalLink className="w-4 h-4" /> Live Demo
                    </Button>
                  )}
                  {project.githubLink && (
                    <Button
                      variant="outline"
                      className="w-full h-12 border-border/70 gap-2 rounded-lg"
                      onClick={() => window.open(project.githubLink!, "_blank")}
                    >
                      <Github className="w-4 h-4" /> GitHub Repository
                    </Button>
                  )}
                </motion.div>

                {/* Project Details Card */}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.25 }}
                >
                  <Card className="bg-card border-border/50">
                    <CardContent className="p-6 space-y-4">
                      {/* Client
                      <div className="flex justify-between items-center text-sm border-b border-border/40 pb-4">
                        <span className="text-muted-foreground uppercase tracking-wider text-xs font-semibold">
                          Client
                        </span>
                        <span className="font-medium text-right">
                          {project.details.client}
                        </span>
                      </div>
                      */}
                      {/* Duration
                      <div className="flex justify-between items-center text-sm border-b border-border/40 pb-4">
                        <span className="text-muted-foreground uppercase tracking-wider text-xs font-semibold">
                          Duration
                        </span>
                        <span className="font-medium">
                          {project.details.duration}
                        </span>
                      </div>
                      */}
                      {/* Role */}
                      <div className="flex justify-between items-center text-sm border-b border-border/40 pb-4">
                        <span className="text-muted-foreground uppercase tracking-wider text-xs font-semibold">
                          Role
                        </span>
                        <span className="font-medium text-right">
                          {project.details.role}
                        </span>
                      </div>

                      {/* Tech Stack */}
                      <div className="pt-2">
                        <span className="text-muted-foreground uppercase tracking-wider text-xs font-semibold block mb-3">
                          Tech Stack
                        </span>
                        <div className="flex flex-wrap gap-2">
                          {project.techStack.map((tech) => (
                            <Badge
                              key={tech}
                              className="bg-primary/20 text-primary border-primary/30 hover:bg-primary/30 transition-colors"
                            >
                              {tech}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>

                {/*
                  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
                  PERFORMANCE METRICS — temporarily commented out
                  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                >
                  <Card className="bg-card border-border/50">
                    <CardContent className="p-6">
                      <span className="text-muted-foreground uppercase tracking-wider text-xs font-semibold block mb-4">
                        Performance Metrics
                      </span>
                      <div className="space-y-4">
                        <div>
                          <div className="flex justify-between text-sm mb-1">
                            <span>Lighthouse Score</span>
                            <span className="font-bold text-primary">
                              {project.performanceMetrics.lighthouseScore}%
                            </span>
                          </div>
                          <div className="w-full h-2 bg-secondary rounded-full overflow-hidden">
                            <motion.div
                              initial={{ width: 0 }}
                              animate={{ width: `${project.performanceMetrics.lighthouseScore}%` }}
                              transition={{ duration: 1, delay: 0.5 }}
                              className="h-full bg-primary rounded-full"
                            />
                          </div>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span>Core Web Vitals</span>
                          <span className="font-bold text-green-400">
                            {project.performanceMetrics.coreWebVitals}
                          </span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
                */}
              </div>
            </div>
          </div>
        </section>

        {/*
          ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          MORE PROJECTS SECTION — temporarily commented out
          ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

        <section className="py-16 border-t border-border/50">
          <div className="container mx-auto px-4 md:px-6">
            <h2 className="text-2xl font-heading font-bold mb-8">More Projects</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {otherProjects.map((p, i) => (
                <Link key={p.id} href={`/projects/${p.id}`}>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="group rounded-xl overflow-hidden border border-border/50 bg-secondary/20 hover:border-primary/50 transition-all duration-300 cursor-pointer"
                  >
                    <div className="aspect-video overflow-hidden">
                      <img
                        src={p.imageUrl}
                        alt={p.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>
                    <div className="p-4">
                      <h3 className="font-heading font-bold mb-1 group-hover:text-primary transition-colors">
                        {p.title}
                      </h3>
                      <p className="text-sm text-muted-foreground line-clamp-2">
                        {p.description}
                      </p>
                    </div>
                  </motion.div>
                </Link>
              ))}
            </div>
          </div>
        </section>
        */}
      </main>

      <DetailFooter />
    </div>
  );
}
