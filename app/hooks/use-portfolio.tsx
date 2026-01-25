import { useQuery, useMutation } from "@tanstack/react-query";
// import { type InsertMessage, type Project, type Experience, type Skill, type Post } from "@shared/schema";

/* =======================
   Skills
======================= */

export interface Skill {
    id: number;
    category: SkillCategory;
    items: string[];
  }
  
  export type SkillCategory =
    | "Frontend"
    | "Backend & APIs"
    | "Tools & Platforms";
  
  
  /* =======================
     Experience
  ======================= */
  
  export interface Experience {
    id: number;
    company: string;
    role: string;
    period: string; // e.g. "03/2023 – 01/2026"
    description: string;
    location: string;
  }
  
  
  /* =======================
     Projects
  ======================= */
  
  export interface Project {
    id: number;
    title: string;
    description: string;
    techStack: string[];
    imageUrl: string;
    link: string;
    githubLink: string | null;
  }
  
  
  /* =======================
     Blog Posts
  ======================= */
  
  export interface Post {
    id: number;
    title: string;
    slug: string;
    summary: string;
    content: string;
    publishedAt: Date;
  }
  

// --- MOCK DATA ---

const MOCK_SKILLS: Skill[] = [
  {
    id: 1,
    category: "Frontend",
    items: ["React.js", "Next.js", "JavaScript (ES6+)", "TypeScript", "HTML5", "CSS3", "Tailwind CSS", "Bootstrap", "Material UI (MUI)", "Redux"]
  },
  {
    id: 2,
    category: "Backend & APIs",
    items: ["Node.js", "Express.js", "REST APIs", "MongoDB"]
  },
  {
    id: 3,
    category: "Tools & Platforms",
    items: ["Git", "Postman", "PWA",  "Vite"]
  }
];

const MOCK_EXPERIENCE: Experience[] = [
  {
    id: 1,
    company: "Hikal Pvt. Limited",
    role: "React.js Developer",
    period: "03/2023 – 01/2026",
    description: "Developed a multi-tenant SaaS CRM system from scratch. Built a custom CMS platform with secure API integrations. Integrated Facebook Graph APIs and Google APIs (Maps, Auth). Delivered an Employee Attendance Management System.",
    location: "Dubai, Remote"
  },
  {
    id: 2,
    company: "Prow Techs",
    role: "React.js Developer",
    period: "09/2022 – 03/2023",
    description: "Developed a custom storefront for Abante Cart e-commerce platform using React.js. Integrated backend APIs for products, cart, and checkout. Built reusable components and custom hooks.",
    location: "Islamabad, Pakistan"
  }
];

const MOCK_PROJECTS: Project[] = [
  {
    id: 1,
    title: "SaaS CRM Platform",
    description: "A multi-tenant SaaS CRM with subscription management, payment processing, and personalized client portals.",
    techStack: ["React.js","tailwind css", "MUI", "Node.js", "REST APIs"],
    // imageUrl: "https://placehold.co/600x400/1e293b/cbd5e1?text=SaaS+CRM",
    imageUrl: "/portfolio_images/dodealcrm_main.png",
    link: "",
    githubLink: null
  },
  {
    id: 2,
    title: "Custom CMS",
    description: "Secure, API-driven Content Management System for centralized management of multiple client websites.",
    techStack: ["React.js","tailwind css", "Material UI","Restful APIs"],
    // imageUrl: "https://placehold.co/600x400/1e293b/cbd5e1?text=Custom+CMS",
    imageUrl: "/portfolio_images/cms.png",
    link: "",
    githubLink: null
  },
  {
    id: 3,
    title: "Dodeal website",
    description: "Its the official website for the crm throught which user can buy the crm and go through complete onboarding process.",
    techStack: ["React.js","tailwind css", "Material UI","Restful APIs"],
    // imageUrl: "https://placehold.co/600x400/1e293b/cbd5e1?text=Custom+CMS",
    imageUrl: "/portfolio_images/dodeal_web.png",
    link: "",
    githubLink: null
  },
  {
    id: 4,
    title: "Dodeal cms",
    description: "Its a complete cms to manager the clients , users ,payments and other other onbooarding options.",
    techStack: ["React.js","tailwind css", "Material UI","Restful APIs"],
    // imageUrl: "https://placehold.co/600x400/1e293b/cbd5e1?text=Custom+CMS",
    imageUrl: "/portfolio_images/dodeal_cms.png",
    link: "",
    githubLink: null
  },
  {
    id: 5,
    title: "Apraj ",
    description: "These website is for the real estate company to show the property to the clients and users to buy the property.",
    techStack: ["Nextjs","tailwind css", "Material UI","Restful APIs"],
    // imageUrl: "https://placehold.co/600x400/1e293b/cbd5e1?text=Custom+CMS",
    imageUrl: "/portfolio_images/apraj.png",
    link: "",
    githubLink: null
  },
  {
    id: 6,
    title: "Arkan Tech ",
    description: "Its the official website for tech services company.",
    techStack: ["Nextjs","tailwind css", "Material UI","Restful APIs"],
    // imageUrl: "https://placehold.co/600x400/1e293b/cbd5e1?text=Custom+CMS",
    imageUrl: "/portfolio_images/arkan.png",
    link: "https://arkantech.com/",
    githubLink: null
  },
  // {
  //   id: 3,
  //   title: "E-commerce Storefront",
  //   description: "Modern, responsive frontend for an existing e-commerce platform with cart and checkout functionality.",
  //   techStack: ["React.js", "Bootstrap", "AbanteCart API"],
  //   imageUrl: "https://placehold.co/600x400/1e293b/cbd5e1?text=E-commerce",
  //   link: "#",
  //   githubLink: null
  // },
  // {
  //   id: 4,
  //   title: "Employee Attendance System",
  //   description: "Internal tool for tracking attendance, managing salaries, and generating automated PDF reports.",
  //   techStack: ["React.js", "Node.js", "PDF Generation"],
  //   imageUrl: "https://placehold.co/600x400/1e293b/cbd5e1?text=Attendance+System",
  //   link: "#",
  //   githubLink: null
  // }
];

const MOCK_POSTS: Post[] = [
  {
    id: 1,
    title: "Building Scalable React Applications",
    slug: "building-scalable-react-apps",
    summary: "Lessons learned from building multi-tenant SaaS platforms.",
    content: "Content coming soon...",
    publishedAt: new Date()
  }
];

// --- HOOKS ---

export function useSkills() {
    return {skills:MOCK_SKILLS,isLoading:false}
//   return useQuery({
//     queryKey: ["/api/skills"],
//     queryFn: async () => MOCK_SKILLS,
//   });
}

export function useExperience() {
    return {experiences:MOCK_EXPERIENCE,isLoading:false}
//   return useQuery({
//     queryKey: ["/api/experience"],
//     queryFn: async () => MOCK_EXPERIENCE,
//   });
}

export function useProjects() {
    return {projects:MOCK_PROJECTS,isLoading:false}
//   return useQuery({
//     queryKey: ["/api/projects"],
//     queryFn: async () => MOCK_PROJECTS,
//   });
}

export function usePosts() {
    return MOCK_POSTS
//   return useQuery({
//     queryKey: ["/api/posts"],
//     queryFn: async () => MOCK_POSTS,
//   });
}

export function usePost(slug: string) {
  return useQuery({ 
    queryKey: ["/api/posts", slug],
    queryFn: async () => MOCK_POSTS.find(p => p.slug === slug) || null,
    enabled: !!slug,
  });
}

// export function useContactMutation() {
//   return useMutation({
//     mutationFn: async (data: InsertMessage) => {
//       console.log("Contact form submission (mock):", data);
//       // Simulate API delay
//       await new Promise(resolve => setTimeout(resolve, 1000));
//       return { ...data, id: Math.floor(Math.random() * 1000), createdAt: new Date() };
//     },
//   });
// }
