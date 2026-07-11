import { notFound } from "next/navigation";
import { PROJECTS } from "../../data/portfolio-data";
import ProjectDetailsClient from "./ProjectDetailsClient";

interface PageProps {
  params: Promise<{ id: string }>;
}

export async function generateStaticParams() {
  return PROJECTS.map((p) => ({ id: String(p.id) }));
}

export async function generateMetadata({ params }: PageProps) {
  const { id } = await params;
  const project = PROJECTS.find((p) => p.id === Number(id));
  if (!project) return { title: "Project Not Found" };
  return {
    title: `${project.title} — Ubaid.dev`,
    description: project.subtitle,
  };
}

export default async function ProjectPage({ params }: PageProps) {
  const { id } = await params;
  const project = PROJECTS.find((p) => p.id === Number(id));

  if (!project) notFound();

  // Pass other projects so the "More Projects" section (commented out for now) is ready
  const otherProjects = PROJECTS.filter((p) => p.id !== project.id).slice(0, 3);

  return <ProjectDetailsClient project={project} otherProjects={otherProjects} />;
}
