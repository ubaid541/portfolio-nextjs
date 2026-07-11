"use client";
import Link from "next/link";
import { ExternalLink, Github } from "lucide-react";
import { Badge } from "./ui/Badge";
import { Card, CardContent, CardFooter, CardHeader } from "./ui/Card";
import { Button } from "./ui/Button";
import { motion } from "framer-motion";
import type { Project } from "../../data/portfolio-data";

interface ProjectCardProps {
  project: Project;
  index: number;
}

export default function ProjectCard({ project, index }: ProjectCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <Card className="overflow-hidden border-border/50 bg-secondary/20 hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary/5 h-full flex flex-col group">
        {/* Clickable image area → project detail page */}
        <Link href={`/projects/${project.id}`} className="block">
          <div className="aspect-video relative overflow-hidden bg-muted cursor-pointer">
            <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent opacity-60 z-10" />
            <img
              src={
                project?.imageUrl ||
                `https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&auto=format&fit=crop&q=60`
              }
              alt={project.title}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
          </div>
        </Link>

        <CardHeader className="p-6 pb-2">
          <div className="flex justify-between items-start mb-2">
            <Link href={`/projects/${project.id}`}>
              <h3 className="font-heading text-xl font-bold group-hover:text-primary transition-colors cursor-pointer">
                {project.title}
              </h3>
            </Link>
          </div>
          <div className="flex flex-wrap gap-2 mb-4">
            {project.techStack?.map((tech) => (
              <Badge
                key={tech}
                variant="secondary"
                className="text-xs bg-primary/10 text-primary-foreground border-transparent hover:bg-primary/20"
              >
                {tech}
              </Badge>
            ))}
          </div>
        </CardHeader>

        <CardContent className="p-6 pt-0 flex-grow">
          <p className="text-muted-foreground text-sm leading-relaxed">
            {project.description}
          </p>
        </CardContent>

        <CardFooter className="p-6 pt-0 gap-3">
          {project.githubLink && (
            <Button
              variant="outline"
              size="sm"
              className="gap-2 w-full"
              onClick={() => window.open(project.githubLink!, "_blank")}
            >
              <Github className="w-4 h-4" /> Code
            </Button>
          )}
          {project.link && project.link !== "" && (
            <Button
              size="sm"
              className="gap-2 w-full bg-white text-black hover:bg-gray-200"
              onClick={() => window.open(project.link!, "_blank")}
            >
              <ExternalLink className="w-4 h-4" /> Live Demo
            </Button>
          )}
          {/* Always show "View Details" link */}
          <Link href={`/projects/${project.id}`} className="w-full">
            <Button
              variant="outline"
              size="sm"
              className="gap-2 w-full border-primary/30 text-primary hover:bg-primary/10"
            >
              View Details
            </Button>
          </Link>
        </CardFooter>
      </Card>
    </motion.div>
  );
}
