import {
  SKILLS,
  EXPERIENCES,
  PROJECTS,
  type Project,
  type Experience,
  type Skill,
  type SkillCategory,
} from "../data/portfolio-data";

export const person = {
  name: "Ubaid",
  fullName: "Ubaid Ur Rehman",
  handle: "ubaid.dev",
  role: "Frontend Engineer",
  location: "Remote / Pakistan",
  email: "ubaidrehmanse@gmail.com",
  github: "https://github.com/ubaid541",
  linkedin: "https://linkedin.com/in/ubaid-ur-rehman-se",
  resumeUrl: "/ubaid_ur_rehman_resume.pdf",
};

export interface NavItem {
  label: string;
  href: string;
  external?: boolean;
}

export const nav: NavItem[] = [
  { label: "Projects", href: "#projects" },
  { label: "Experience", href: "#experience" },
  { label: "Skills", href: "#skills" },
  { label: "Contact", href: "#contact" },
  { label: "Resume", href: "/ubaid_ur_rehman_resume.pdf", external: true },
];

export const bio = [
  "Building Scalable Digital Experiences.",
  "I'm Ubaid Ur Rehman, a Frontend Engineer with over 3 years of experience in the JavaScript ecosystem, passionate about crafting performant, accessible, and beautiful web applications.",
  "Currently, I specialize in the MERN stack (MongoDB, Express, React, Node.js), with a strong focus on Frontend architecture and intuitive user experiences.",
];

export const metrics = [
  { value: "3+ Years", label: "Experience" },
  { value: "10+ Built", label: "Projects" },
  { value: "500+", label: "Users" },
  { value: "MERN", label: "Stack" },
];

/** Core stack wordmark strip — set in distinct typefaces right below the hero. */
export const stackStrip = [
  { name: "React.js", font: "font-display font-black tracking-[-0.03em]" },
  { name: "NEXT.JS", font: "font-wide tracking-[0.08em] text-[0.88em]" },
  { name: "TypeScript", font: "font-serif italic font-medium" },
  { name: "Node.js", font: "font-mono tracking-[0.02em] text-[0.92em]" },
  { name: "Tailwind", font: "font-display font-bold lowercase tracking-[-0.03em]" },
  { name: "MongoDB", font: "font-serif font-medium" },
];

export const HERO_PORTRAIT_SRC = "/images/hero_ubaid_desktop.webp";
export const HERO_PORTRAIT_MOBILE_SRC = "/images/hero_ubaid_mobile.webp";
export const HERO_AVATAR_SRC = "/images/hero_ubaid_avatar.webp";

/**
 * Mood & expression catalogue. Every expression drives both the mood readout
 * and real-time WebGL2 shader deformation.
 */
export const faces = {
  base: { src: HERO_PORTRAIT_SRC, mood: "ready to code" },
  l_left: { src: HERO_PORTRAIT_SRC, mood: "checking code" },
  l_right: { src: HERO_PORTRAIT_SRC, mood: "checking code" },
  x_cross: { src: HERO_PORTRAIT_SRC, mood: "debugging CSS" },
  x_tongue: { src: HERO_PORTRAIT_SRC, mood: "goofy" },
  x_shock: { src: HERO_PORTRAIT_SRC, mood: "prod bug?!" },
  x_laugh: { src: HERO_PORTRAIT_SRC, mood: "tests passed" },
  x_skeptic: { src: HERO_PORTRAIT_SRC, mood: "reviewing PR" },
  x_whistle: { src: HERO_PORTRAIT_SRC, mood: "works locally" },
  x_smug: { src: HERO_PORTRAIT_SRC, mood: "zero warnings" },
  x_dizzy: { src: HERO_PORTRAIT_SRC, mood: "seeing stars" },
  g_grimace: { src: HERO_PORTRAIT_SRC, mood: "being squeezed" },
  g_ouch: { src: HERO_PORTRAIT_SRC, mood: "OW — the hair!" },
  g_squish: { src: HERO_PORTRAIT_SRC, mood: "pinched" },
} as const;

export type FaceKey = keyof typeof faces;

/** Faces dealt at random when a stretch is let go. */
export const releaseFaces: FaceKey[] = [
  "x_tongue",
  "x_laugh",
  "x_skeptic",
  "x_whistle",
  "x_smug",
  "x_cross",
];

/**
 * Landmarks in image UV (0–1, v from the top) calibrated to hero_ubaid_base.
 * The disc clips the shoulders cleanly below disc.y while the quiff hair breaks
 * out above the disc and overlaps the giant headline.
 */
export const rig = {
  disc: { x: 0.5, y: 0.58, r: 0.41 },
  nose: { x: 0.5, y: 0.445, r: 0.044 },
  eyes: [
    { x: 0.43, y: 0.382 },
    { x: 0.57, y: 0.382 },
  ],
  mouth: { x: 0.5, y: 0.508 },
  cheeks: [
    { x: 0.395, y: 0.47 },
    { x: 0.605, y: 0.47 },
  ],
  face: { x: 0.5, y: 0.445, rx: 0.168, ry: 0.21 },
  hairLine: 0.27,
  /** |u − 0.5| beyond which a grab above the jaw is the ears / side hair. */
  sides: 0.175,
};

export type ProjectCategory = "All" | "SaaS & Dashboards" | "Web Platforms";

export interface PortfolioProject extends Project {
  number: string;
  category: Exclude<ProjectCategory, "All">;
  availability: "Live Demo" | "Proprietary Product";
}

function getProjectCategory(projectId: number): Exclude<ProjectCategory, "All"> {
  if (projectId === 1 || projectId === 2 || projectId === 7) {
    return "SaaS & Dashboards";
  }
  return "Web Platforms";
}

export const PORTFOLIO_PROJECTS: PortfolioProject[] = PROJECTS.map((project, idx) => ({
  ...project,
  number: String(idx + 1).padStart(2, "0"),
  category: getProjectCategory(project.id),
  availability: project.link ? "Live Demo" : "Proprietary Product",
}));

export interface PortfolioExperience extends Experience {
  achievements: string[];
}

export const PORTFOLIO_EXPERIENCES: PortfolioExperience[] = EXPERIENCES.map((job) => ({
  ...job,
  achievements: job.description
    .split(/(?<=\.)\s+/)
    .map((s) => s.trim())
    .filter(Boolean),
}));

export interface PortfolioSkillGroup extends Skill {
  summary: string;
  tag: "UI" | "API" | "Tool";
}

const SKILL_META: Record<SkillCategory, { summary: string; tag: "UI" | "API" | "Tool" }> = {
  Frontend: {
    summary: "Component systems, SSR, state management & responsive interfaces",
    tag: "UI",
  },
  "Backend & APIs": {
    summary: "MERN services, RESTful integrations & data persistence",
    tag: "API",
  },
  "Tools & Platforms": {
    summary: "Build tooling, progressive web apps & API verification workflows",
    tag: "Tool",
  },
};

export const PORTFOLIO_SKILLS: PortfolioSkillGroup[] = SKILLS.map((group) => ({
  ...group,
  summary: SKILL_META[group.category].summary,
  tag: SKILL_META[group.category].tag,
}));
