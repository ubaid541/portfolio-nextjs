import { useQuery } from "@tanstack/react-query";
import {
  SKILLS,
  EXPERIENCES,
  PROJECTS,
  POSTS,
} from "../data/portfolio-data";

// Re-export all types so consumers don't need to import from two places
export type { Skill, SkillCategory, Experience, Project, SolutionFeature, Post } from "../data/portfolio-data";

// --- HOOKS ---

export function useSkills() {
  return { skills: SKILLS, isLoading: false };
}

export function useExperience() {
  return { experiences: EXPERIENCES, isLoading: false };
}

export function useProjects() {
  return { projects: PROJECTS, isLoading: false };
}

export function usePosts() {
  return POSTS;
}

export function usePost(slug: string) {
  return useQuery({
    queryKey: ["/api/posts", slug],
    queryFn: async () => POSTS.find((p) => p.slug === slug) || null,
    enabled: !!slug,
  });
}
