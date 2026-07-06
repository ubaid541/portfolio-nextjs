# Project Agent Guide: Ubaid Ur Rehman's Developer Portfolio

This documentation provides a comprehensive overview of the repository configuration, architectural structure, file layouts, and active features. It is designed to enable onboarding developers or AI agents to rapidly understand the codebase and begin contributing or modifying elements immediately.

---

## 1. Project Overview

This repository houses a modern, interactive, and responsive personal developer portfolio website for **Ubaid Ur Rehman**, a Senior React.js/Frontend Developer (3+ years experience, specializing in the MERN stack and clean UI/UX).

### Key Architectural Traits
1. **Core Framework**: Built using **Next.js (App Router)** with **TypeScript**.
2. **Styling & Theme**: Crafted using **Tailwind CSS**, styled using modern CSS variables with support for glassmorphism utilities, dark mode, custom scrollbars, and typography utilizing **Space Grotesk** for headings and **Inter** for body text.
3. **Animations**: Implemented via **Framer Motion** transitions and state-based page entry animations defined in Tailwind utility layers.
4. **Icons**: Utilizing **Lucide React** for outline icons.
5. **Form Handling**: Ready for **React Hook Form** + **Zod** schema validations, though currently disabled in the main production entry points.

---

## 2. Repository Directory tree

Ensure you understand the nesting scheme of components inside `app/component/components/`:

```
d:/portfolio-nextjs/
├── app/
│   ├── component/
│   │   ├── components/
│   │   │   ├── ui/                # Core Shadcn UI element wrappers
│   │   │   │   ├── Badge.tsx      # Tailwind Badge variant component
│   │   │   │   ├── Button.tsx     # Custom Button with multi-variants (CVA)
│   │   │   │   ├── Card.tsx       # Standard container layout blocks
│   │   │   │   ├── Form.tsx       # Form fields validation context provider
│   │   │   │   ├── Input.tsx      # Input fields
│   │   │   │   ├── Label.tsx      # Form labels
│   │   │   │   ├── Textarea.tsx   # Text boxes
│   │   │   │   └── Toast.tsx      # Notification display framework
│   │   │   ├── Footer.tsx         # Site footer with social anchor highlights
│   │   │   ├── ProjectCard.tsx    # Renders individual portfolio items
│   │   │   └── SectionHeader.tsx  # Dynamic headers wrapper using Framer Motion
│   │   ├── Hero_bak               # Backup backup script featuring early config designs
│   │   └── Navbar.tsx             # Sticky ReactScroll viewport-aware navigation header
│   ├── hooks/
│   │   ├── use-portfolio.tsx      # Central mockup state, hooks, and Type interfaces
│   │   └── use-toast.tsx          # System dispatcher for alert notification states
│   ├── favicon.ico
│   ├── globals.css                # Base Tailwind variables, styles, scrollbar, fonts config
│   ├── layout.tsx                 # Base App html wrapper, SEO metadata tags, and font loads
│   ├── page.tsx                   # Main React entry page composing interactive sections
│   └── utils.tsx                  # Clsx + Tailwind Merge utility helper
├── public/
│   ├── portfolio_images/          # Preview screenshots referenced by Projects section
│   │   ├── apraj.png
│   │   ├── arkan.png
│   │   ├── cms.png
│   │   ├── dodeal_cms.png
│   │   ├── dodeal_web.png
│   │   └── dodealcrm_main.png
│   ├── ubaid_logo.png             # Tab brand favicon logo
│   ├── ubaid_ur_rehman_resume.pdf # The document retrieved by CV buttons
│   ├── vercel.svg
│   └── window.svg
├── eslint.config.mjs
├── next.config.ts                 # Next JS options config
├── package.json                   # Dependencies lists and developer scripts
├── postcss.config.js
├── tailwind.config.js             # Theme extensions, keyframe configs & animations
└── tsconfig.json                  # TypeScript options configuration
```

---

## 3. High-Level Coding Blocks & Active Components

The main portal is composed in `app/page.tsx`, rendering sections dynamically.

### A. Navigation & Navbar (`app/component/Navbar.tsx`)
- Detects page scrolling (`scrollY > 50`) to transition backgrounds from transparent glassmorphism to solid blurs.
- Uses `react-scroll` to smoothly slide page viewports downwards to active IDs: `#about`, `#skills`, `#experience`, and `#projects` on client action.
- Displays download links triggering current CV retrieval from `/ubaid_ur_rehman_resume.pdf`.

### B. Hero Section (`app/page.tsx` -> `Hero()`)
- Contains developer details & introductory pitches.
- Renders an interactive abstract mock code card built with standard TypeScript snippets highlighting name, skills, and operations.

### C. About Section (`app/page.tsx` -> `About()`)
- Introduces Ubaid's workflow and domain experience.
- Features a decorative grid displaying active career statistics (Years of experience, Projects built, Global client reach, Tech Stack).

### D. Skills Section (`app/page.tsx` -> `Skills()`)
- Consumes list categories fetched from `useSkills()` hook.
- Grouped list badges render Frontend tools (React, Tailwind, Redux, etc.), Backend and APIs (Node, Express, Mongo, REST), and general developer environments (Git, Postman, Vite).

### E. Experience Section (`app/page.tsx` -> `Experience()`)
- Renders an vertical timeline path indicating work locations (Hikal Pvt Ltd, Prow Techs) inside custom card wrappers decorated with timeline track dots.

### F. Projects Grid (`app/page.tsx` -> `Projects()`)
- Integrates `ProjectCard.tsx` helper components loaded dynamically from mock hooks.
- Displays responsive image previews, dynamic stacks, descriptions, codebase repositories (GitHub target links), and live deployment platforms.

### G. Footer (`app/component/components/Footer.tsx`)
- Displays branding details & direct mail paths (`mailto:ubaidrehmanse@gmail.com`).
- Features hover transitions targeting GitHub and LinkedIn social accounts.

---

## 4. Key Configurations & Setup

### Styling Theme System (`app/globals.css`)
Tailwind uses curated **HSL colors** for custom theme structures:
```css
--background: 224 71% 4%;     /* Sleek dark blue/black background */
--foreground: 213 31% 91%;
--primary: 263 70% 50%;       /* Purple theme highlight color */
--secondary: 222 47% 11%;
--border: 216 34% 17%;
```

### Static Data & Mock State Layer (`app/hooks/use-portfolio.tsx`)
All client visual records are managed dynamically inside custom hooks returned directly from mock declarations:
- **`useSkills()`**: Returns categories with relevant technologies lists.
- **`useExperience()`**: Supplies timelines, responsibilities, locations, and schedules.
- **`useProjects()`**: Supplies product images, live demo URLs, code repositories, and descriptions.

---

## 5. Important Notices for Developers & Changing Code

### ⚠️ Commented-out Form Integrity
In `app/page.tsx` and `app/hooks/use-portfolio.tsx`, the **Contact Form** (`<Contact />` component, schema verification code, and submission handler API mutations) is currently commented out to lock live endpoint queries. If re-enabling:
- Ensure the schema imports (e.g. `@shared/schema`) are properly configured inside the directories.
- Un-comment the Hook-form setup and state mappings inside `app/page.tsx`.

### ⚠️ Unused Dependencies / Legacy Packages
The root `package.json` contains several Node server and DB libraries:
- Database: `drizzle-orm`, `drizzle-zod`, `pg`, `connect-pg-simple`.
- Backend: `express`, `express-session`, `passport`, `passport-local`.
These dependencies are currently inactive and not referenced in standard directory compiles. They are left in the configurations list for potential backend or headless server upgrades.

---

## 6. Commands Reference

To manage or run this repository, launch the following commands from your workspace terminal:

```bash
# 1. Install Workspace packages
npm install

# 2. Run developer local server with hot reloading
npm run dev

# 3. Compile optimization build for production deployment
npm run build

# 4. Spin up locally built production server
npm run start

# 5. Run lint checker rules
npm run lint
```
