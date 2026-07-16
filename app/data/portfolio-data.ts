/* =========================================================
   PORTFOLIO STATIC DATA
   All portfolio content lives here. Hooks in use-portfolio.tsx
   import from this file — no API calls are made.
   ========================================================= */

export type SkillCategory = "Frontend" | "Backend & APIs" | "Tools & Platforms";

export interface Skill {
  id: number;
  category: SkillCategory;
  items: string[];
}

export interface Experience {
  id: number;
  company: string;
  role: string;
  period: string;
  description: string;
  location: string;
}

export interface SolutionFeature {
  title: string;
  description: string;
}

export interface Project {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  longDescription: string;
  techStack: string[];
  imageUrl: string;
  screenshots: string[];
  link: string | null;
  githubLink: string | null;
  details: {
    client: string;
    duration: string;
    role: string;
  };
  challenge: {
    description: string;
    hurdles: string;
  };
  solution: {
    description: string;
    features: SolutionFeature[];
  };
  keyFeatures: string[];
  performanceMetrics: {
    lighthouseScore: number;
    coreWebVitals: string;
  };
}

export interface Post {
  id: number;
  title: string;
  slug: string;
  summary: string;
  content: string;
  publishedAt: Date;
}

/* ─── SKILLS ─────────────────────────────────────────────── */
export const SKILLS: Skill[] = [
  {
    id: 1,
    category: "Frontend",
    items: [
      "React.js",
      "Next.js",
      "JavaScript (ES6+)",
      "TypeScript",
      "HTML5",
      "CSS3",
      "Tailwind CSS",
      "Bootstrap",
      "Material UI (MUI)",
      "Redux",
    ],
  },
  {
    id: 2,
    category: "Backend & APIs",
    items: ["Node.js", "Express.js", "REST APIs", "MongoDB"],
  },
  {
    id: 3,
    category: "Tools & Platforms",
    items: ["Git", "Postman", "PWA", "Vite"],
  },
];

/* ─── EXPERIENCE ─────────────────────────────────────────── */
export const EXPERIENCES: Experience[] = [
  {
    id: 1,
    company: "Hikal Pvt. Limited",
    role: "React.js Developer",
    period: "03/2023 – 01/2026",
    description:
      "Developed a multi-tenant SaaS CRM system from scratch. Built a custom CMS platform with secure API integrations. Integrated Facebook Graph APIs and Google APIs (Maps, Auth). Delivered an Employee Attendance Management System.",
    location: "Dubai, Remote",
  },
  {
    id: 2,
    company: "Prow Techs",
    role: "React.js Developer",
    period: "09/2022 – 03/2023",
    description:
      "Developed a custom storefront for Abante Cart e-commerce platform using React.js. Integrated backend APIs for products, cart, and checkout. Built reusable components and custom hooks.",
    location: "Islamabad, Pakistan",
  },
];

/* ─── PROJECTS ───────────────────────────────────────────── */
export const PROJECTS: Project[] = [
  {
    id: 1,
    title: "SaaS CRM Platform",
    subtitle:
      "A high-performance, multi-tenant CRM solution engineered for scalability, featuring complex subscription management and real-time data visualization.",
    description:
      "A multi-tenant SaaS CRM with subscription management, payment processing, and personalized client portals.",
    longDescription:
      "This project is a comprehensive, enterprise-grade CRM platform designed to serve multiple clients from a single deployment. The system handles everything from lead capture and sales pipeline management to advanced subscription billing and real-time analytics dashboards. Built to support sales teams working across different verticals and geographies, the platform provides each tenant with an isolated, branded experience while sharing a common infrastructure for cost efficiency.",
    techStack: ["React.js", "Tailwind CSS", "MUI", "Node.js", "REST APIs"],
    imageUrl: "/portfolio_images/crm/dodealcrm_main.png",
    screenshots: [
      "/portfolio_images/crm/dodealcrm_main.png",
      "/portfolio_images/crm/dodealcrm_2.png",
    ],
    link: null,
    githubLink: null,
    details: {
      client: "Nexus Systems Inc.",
      duration: "6 Months",
      role: "Frontend Engineer",
    },
    challenge: {
      description:
        "Small to medium enterprises often struggle with fragmented data across multiple platforms. The client required a centralized system that could handle high-volume lead ingestion, automate complex sales workflows, and provide multi-tenant security without compromising on performance or ease of use.",
      hurdles:
        "Key hurdles included real-time data synchronization between different team members and creating a flexible subscription engine that could adapt to various billing cycles and user tiers.",
    },
    solution: {
      description:
        "We developed a modular architecture using React and Node.js, leveraging a robust PostgreSQL backend for data integrity. By implementing a custom WebSocket layer, we achieved sub-second latency for live updates, ensuring all sales reps are working with the most current data.",
      features: [
        {
          title: "Multi-tenant Architecture",
          description:
            "Isolated data environments for enterprise-grade security.",
        },
        // {
        //   title: "Automated Pipelines",
        //   description:
        //     "Draggable kanban boards for intuitive lead management.",
        // },
      ],
    },
    keyFeatures: [
      "Real-time collaboration and notification system.",
      // "Deep integration with Stripe for automated subscription billing.",
      "Customizable reporting dashboard with Export to PDF/CSV.",
      "Advanced RBAC (Role-Based Access Control) for granular permissions.",
    ],
    performanceMetrics: {
      lighthouseScore: 98,
      coreWebVitals: "Passed",
    },
  },
  // {
  //   id: 2,
  //   title: "Custom CMS",
  //   subtitle:
  //     "Secure, API-driven Content Management System for centralized management of multiple client websites.",
  //   description:
  //     "Secure, API-driven Content Management System for centralized management of multiple client websites.",
  //   longDescription:
  //     "A powerful headless CMS platform built to manage content across multiple client-facing websites from a single admin interface. The system features fine-grained access control, multi-language support, and a flexible content schema designer that allows non-technical users to model their own content types without developer intervention.",
  //   techStack: ["React.js", "Tailwind CSS", "Material UI", "RESTful APIs"],
  //   imageUrl: "/portfolio_images/cms.png",
  //   screenshots: ["/portfolio_images/cms.png"],
  //   link: null,
  //   githubLink: null,
  //   details: {
  //     client: "Internal Product",
  //     duration: "4 Months",
  //     role: "Frontend Engineer",
  //   },
  //   challenge: {
  //     description:
  //       "Managing content updates for multiple client websites through separate dashboards was inefficient and error-prone. The client needed a unified interface that could handle diverse content types across different domains.",
  //     hurdles:
  //       "The primary challenge was designing a schema system flexible enough to accommodate varied content structures while keeping the authoring experience intuitive.",
  //   },
  //   solution: {
  //     description:
  //       "We built a dynamic schema engine paired with a clean React-based admin UI that lets content editors create and manage structured content types visually, with API endpoints auto-generated for each schema.",
  //     features: [
  //       {
  //         title: "Dynamic Schema Builder",
  //         description: "Visual tool to create custom content models.",
  //       },
  //       {
  //         title: "Multi-site Management",
  //         description: "Manage all client sites from one dashboard.",
  //       },
  //     ],
  //   },
  //   keyFeatures: [
  //     "Role-based access with granular editorial permissions.",
  //     "API-first architecture for headless integrations.",
  //     "Rich text editor with media library support.",
  //     "Scheduled publishing and content versioning.",
  //   ],
  //   performanceMetrics: {
  //     lighthouseScore: 95,
  //     coreWebVitals: "Passed",
  //   },
  // },
  {
    id: 2,
    title: "Custom CMS",
    subtitle:
      "A custom built internal CMS designed to manage all tennats and clients of the Dodeal CRM platform from a single admin interface.",
    description:
      "A custom built internal CMS designed to manage all tennats and clients of the Dodeal CRM platform from a single admin interface.",
    longDescription:
      "A custom built internal CMS designed to manage all tennats and clients of the Dodeal CRM platform from a single admin interface. User can view and manage all clients who have purchased CRM and manage their subscription. User can take overview of all active,expired and pending client accounts across the platform.  ",
    techStack: ["React.js", "Tailwind CSS", "Material UI", "RESTful APIs"],
    imageUrl: "/portfolio_images/cms/dodeal_cms.png",
    screenshots: ["/portfolio_images/cms/dodeal_cms.png", "/portfolio_images/cms/dodeal_cms_2.png"],
    link: null,
    githubLink: null,
    details: {
      client: "Internal Product",
      duration: "4 Months",
      role: "Frontend Engineer",
    },
    challenge: {
      description:
        "Building a centralized admin interface that could handle multi-tenant data in isolation, each client's payment,subscription,users and other data should be isolated from other clients.",
      hurdles:
        "Ensuring strict data isolation between tenants while providing a unified admin view was complex, each client's subscription state, payment history, and user roster had to remain completely siloed from others.",
    },
    solution: {
      description:
        "Built a secure, role-protected admin dashboard with tenant-scoped data access, giving operators a  snapshot of every client account's status, subscription tier, and payment standing from a single interface.",
      features: [
        {
          title: "Tenant-Scoped Data Views",
          description: "Isolated client data with strict per-tenant access control.",
        },
        {
          title: "Subscription & Account Management",
          description: "Full control over active, expired, and pending client accounts.",
        },
      ],
    },
    keyFeatures: [
      "Overview of active, expired, and pending client accounts.",
      // "Subscription management with upgrade, downgrade, and cancellation controls.",
      "Per-tenant user roster and permission management.",
      "Payment history and invoice tracking per client.",
    ],
    performanceMetrics: {
      lighthouseScore: 95,
      coreWebVitals: "Passed",
    },
  },
  {
    id: 3,
    title: "Dodeal Website",
    subtitle:
      "The official onboarding experience for our flagship CRM product.",
    description:
      "Its the official website for the crm through which user can buy the crm and go through complete onboarding process.",
    longDescription:
      "The marketing and onboarding website for the Dodeal CRM product. This site serves as the primary conversion funnel ,introducing the product features, showcasing pricing plans, and guiding new users through a streamlined registration and subscription flow that connects directly to the SaaS CRM backend.",
    techStack: ["React.js", "Tailwind CSS", "Material UI", "RESTful APIs"],
    imageUrl: "/portfolio_images/crm_landing_page/dodeal_web.png",
    screenshots: [
      "/portfolio_images/crm_landing_page/dodeal_web.png",
      "/portfolio_images/crm_landing_page/dodeal_web_2.png",
    ],
    link: "https://dodealcrm.com/",
    githubLink: null,
    details: {
      client: "Dodeal",
      duration: "2 Months",
      role: "Frontend Engineer",
    },
    challenge: {
      description:
        "The product needed a compelling marketing presence that could convert visitors into subscribers while seamlessly integrating with the existing CRM's onboarding API.",
      hurdles:
        "Balancing rich animations and visual storytelling with fast page load times and SEO requirements was a key challenge.",
    },
    solution: {
      description:
        "Built with Next.js for SEO performance and React for interactivity, the site uses code-split animations and optimized asset loading to deliver a premium feel without sacrificing core web vitals.",
      features: [
        {
          title: "Conversion-Optimized Layouts",
          description: "Data-driven landing page designs for higher sign-up rates.",
        },
        {
          title: "Seamless API Integration",
          description: "Connects directly to the CRM's subscription engine.",
        },
      ],
    },
    keyFeatures: [
      "Interactive product feature showcase with animations.",
      "Stripe-powered subscription checkout flow.",
      "Fully responsive across all device sizes.",
      "SEO-optimized with structured data markup.",
    ],
    performanceMetrics: {
      lighthouseScore: 97,
      coreWebVitals: "Passed",
    },
  },
  {
    id: 4,
    title: "Dodeal CMS",
    subtitle:
      "A complete CMS to manage clients, users, payments and onboarding options.",
    description:
      "Its a complete cms to manage the clients, users, payments and other onboarding options.",
    longDescription:
      "The internal administration platform for the Dodeal ecosystem. This CMS gives the Dodeal operations team full control over client accounts, subscription statuses, payment records, and onboarding configurations. Built with an emphasis on data clarity and workflow efficiency, it enables the support team to resolve client issues quickly.",
    techStack: ["React.js", "Tailwind CSS", "Material UI", "RESTful APIs"],
    imageUrl: "/portfolio_images/dodeal_cms.png",
    screenshots: ["/portfolio_images/dodeal_cms.png"],
    link: null,
    githubLink: null,
    details: {
      client: "Dodeal (Internal)",
      duration: "3 Months",
      role: "Frontend Developer",
    },
    challenge: {
      description:
        "The operations team was managing client data through spreadsheets and fragmented tools, leading to delays and data inconsistencies during client onboarding.",
      hurdles:
        "Consolidating payment records, user accounts, and onboarding workflows into a single coherent view required careful UX design to avoid information overload.",
    },
    solution: {
      description:
        "Designed a dashboard-first admin interface with context-aware data tables, inline editing capabilities, and a guided onboarding wizard that walks operators through each client setup step.",
      features: [
        {
          title: "Unified Client Dashboard",
          description: "All client data accessible from a single view.",
        },
        {
          title: "Guided Onboarding Wizard",
          description: "Step-by-step client configuration tool.",
        },
      ],
    },
    keyFeatures: [
      "Full CRUD operations for clients, users, and subscriptions.",
      "Payment history and invoice management.",
      "Searchable and filterable data tables with export.",
      "Audit logs for all administrative actions.",
    ],
    performanceMetrics: {
      lighthouseScore: 93,
      coreWebVitals: "Passed",
    },
  },
  // {
  //   id: 5,
  //   title: "Apraj",
  //   subtitle:
  //     "A modern real estate platform to showcase properties to potential buyers.",
  //   description:
  //     "These website is for the real estate company to show the property to the clients and users to buy the property.",
  //   longDescription:
  //     "A real estate listing and showcase platform for Apraj, designed to help potential buyers discover and inquire about properties. The site features high-quality property galleries, detailed specification pages, location maps, and a direct inquiry system that routes leads to the sales team.",
  //   techStack: ["Next.js", "Tailwind CSS", "Material UI", "RESTful APIs"],
  //   imageUrl: "/portfolio_images/apraj.png",
  //   screenshots: ["/portfolio_images/apraj.png"],
  //   link: null,
  //   githubLink: null,
  //   details: {
  //     client: "Apraj Real Estate",
  //     duration: "3 Months",
  //     role: "Frontend Engineer",
  //   },
  //   challenge: {
  //     description:
  //       "The client needed an online presence that could effectively showcase high-value properties with rich media while generating qualified leads.",
  //     hurdles:
  //       "Optimizing large property image galleries for fast load times without compromising visual quality was a significant technical challenge.",
  //   },
  //   solution: {
  //     description:
  //       "Leveraged Next.js Image optimization to deliver crisp property photos at optimal file sizes, paired with an intuitive search and filter system.",
  //     features: [
  //       {
  //         title: "Optimized Property Galleries",
  //         description: "Next.js Image-powered fast-loading photo carousels.",
  //       },
  //       {
  //         title: "Lead Capture System",
  //         description: "Integrated inquiry forms with CRM routing.",
  //       },
  //     ],
  //   },
  //   keyFeatures: [
  //     "Advanced property search with filter by price, area, and type.",
  //     "Interactive location maps with nearby amenities.",
  //     "Mobile-first responsive property listing pages.",
  //     "Direct inquiry forms.",
  //   ],
  //   performanceMetrics: {
  //     lighthouseScore: 96,
  //     coreWebVitals: "Passed",
  //   },
  // },
  {
    id: 5,
    title: "Apoelezz",
    subtitle:
      "A modern real estate platform to showcase properties to potential buyers.",
    description:
      "These website is for the real estate company to show the property to the clients and users to buy the property.",
    longDescription:
      "A real estate listing and showcase platform for Apoelezz, designed to help potential buyers discover and inquire about properties. The site features high-quality property galleries, detailed specification pages, location maps, and a direct inquiry system that routes leads to the sales team.",
    techStack: ["Next.js", "Tailwind CSS", "Material UI", "RESTful APIs"],
    imageUrl: "/portfolio_images/apoelezz/apoelezz.png",
    screenshots: ["/portfolio_images/apoelezz/apoelezz.png", "/portfolio_images/apoelezz/apoelezz_2.jpg"],
    link: null,
    githubLink: null,
    details: {
      client: "Apoelezz Real Estate",
      duration: "3 Months",
      role: "Frontend Engineer",
    },
    challenge: {
      description:
        "The client needed an online presence that could effectively showcase high-value properties with rich media while generating qualified leads.",
      hurdles:
        "Optimizing large property image galleries for fast load times without compromising visual quality was a significant technical challenge.",
    },
    solution: {
      description:
        "Leveraged Next.js Image optimization to deliver crisp property photos at optimal file sizes, paired with an intuitive search and filter system.",
      features: [
        {
          title: "Optimized Property Galleries",
          description: "Next.js Image-powered fast-loading photo carousels.",
        },
        {
          title: "Lead Capture System",
          description: "Integrated inquiry forms with CRM routing.",
        },
      ],
    },
    keyFeatures: [
      "Advanced property search with filter by price, area, and type.",
      "Interactive location maps with nearby amenities.",
      "Mobile-first responsive property listing pages.",
      "Direct inquiry forms.",
    ],
    performanceMetrics: {
      lighthouseScore: 96,
      coreWebVitals: "Passed",
    },
  },
  {
    id: 6,
    title: "Arkan Tech",
    subtitle: "The official website for a professional tech services company.",
    description: "Its the official website for tech services company.",
    longDescription:
      "Corporate website for Arkan Tech, a technology services firm. The site communicates the company's expertise, service offerings, and industry experience to potential enterprise clients. Designed with a professional aesthetic and clear information architecture to build credibility and drive consultation bookings.",
    techStack: ["Next.js", "Tailwind CSS", "Material UI", "RESTful APIs"],
    imageUrl: "/portfolio_images/arkan.png",
    screenshots: ["/portfolio_images/arkan.png"],
    // link: "https://arkantech.com/",
    link: null,
    githubLink: null,
    details: {
      client: "Arkan Tech",
      duration: "2 Months",
      role: "Frontend Engineer",
    },
    challenge: {
      description:
        "The company lacked an online presence befitting their enterprise client base. The website needed to convey technical authority while remaining approachable.",
      hurdles:
        "Crafting messaging that resonates with both technical decision-makers and non-technical business stakeholders required careful content architecture.",
    },
    solution: {
      description:
        "Built a clean, performance-focused corporate site with strong visual hierarchy, service-specific landing sections, and prominent calls-to-action directing visitors to schedule consultations.",
      features: [
        {
          title: "Service Showcase Pages",
          description: "Dedicated pages for each core service offering.",
        },
        {
          title: "Consultation Booking",
          description: "Integrated scheduling widget for client meetings.",
        },
      ],
    },
    keyFeatures: [
      "Fast, SEO-optimized Next.js architecture.",
      "Services, team, and case study sections.",
      "Contact and consultation booking forms.",
      "Fully responsive across desktop and mobile.",
    ],
    performanceMetrics: {
      lighthouseScore: 99,
      coreWebVitals: "Passed",
    },
  },
  {
    id: 7,
    title: "Manager Dashboard",
    subtitle:
      "A comprehensive dashboard to track managers and agents performances, calls, meetings, and targets.",
    description:
      "A manager dashboard where users can login and check calls, meetings targets, agent modes, list of agents, and different charts to track weekly and monthly targets.",
    longDescription:
      "A complete dashboard application designed for tracking team performance metrics. It allows managers to login and monitor calls and meetings targets, check the real-time modes and lists of agents, and visualize performance through intuitive weekly and monthly charts.",
    techStack: ["React.js", "Tailwind CSS", "Material UI", "REST APIs", "Recharts"],
    imageUrl: "/portfolio_images/manger_dashboard/manger_dashboard.jpg",
    screenshots: [
      "/portfolio_images/manger_dashboard/manger_dashboard.jpg",
      "/portfolio_images/manger_dashboard/manager_dashboard_2.jpg",

    ],
    link: null,
    githubLink: null,
    details: {
      client: "Internal Tool",
      duration: "2 Months",
      role: "Frontend Engineer",
    },
    challenge: {
      description:
        "Managers lacked a centralized way to track agent performance, calls, and meetings, having to aggregate data manually from various tools.",
      hurdles:
        "Aggregating real-time data into a cohesive, performant dashboard while maintaining intuitive data visualization for weekly and monthly tracking.",
    },
    solution: {
      description:
        "Developed a customized React dashboard that visualizes targets, agent statuses, and overall performance metrics. Integrated dynamic charts to track targets against actual performance over time.",
      features: [
        {
          title: "Performance Charts",
          description: "Interactive weekly and monthly target tracking charts.",
        },
        {
          title: "Agent Monitoring",
          description: "Tracking of agent modes and statuses.",
        },
      ],
    },
    keyFeatures: [
      "Role-based login and authentication.",
      "Real-time calls and meetings target tracking.",
      "Weekly and monthly performance visualization charts.",
      "Agent mode tracking and list management.",
    ],
    performanceMetrics: {
      lighthouseScore: 96,
      coreWebVitals: "Passed",
    },
  },
];

/* ─── POSTS ──────────────────────────────────────────────── */
export const POSTS: Post[] = [
  {
    id: 1,
    title: "Building Scalable React Applications",
    slug: "building-scalable-react-apps",
    summary: "Lessons learned from building multi-tenant SaaS platforms.",
    content: "Content coming soon...",
    publishedAt: new Date(),
  },
];
