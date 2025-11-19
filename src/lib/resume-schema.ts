import { z } from "zod";

// JSON Resume Schema (based on https://jsonresume.org/schema/)
export const resumeSchema = z.object({
  basics: z.object({
    name: z.string().default("Your Name"),
    label: z.string().default("Full Stack Developer"),
    image: z.string().optional(),
    email: z.string().email().default("your.email@example.com"),
    phone: z.string().default("+1 (555) 123-4567"),
    url: z.string().url().optional(),
    summary: z.string().default("I'm a passionate developer with a love for creating beautiful, functional, and user-friendly applications."),
    location: z.object({
      address: z.string().optional(),
      postalCode: z.string().optional(),
      city: z.string().default("San Francisco"),
      countryCode: z.string().default("US"),
      region: z.string().default("CA"),
    }),
    profiles: z.array(z.object({
      network: z.string(),
      username: z.string(),
      url: z.string().url(),
    })).default([
      { network: "GitHub", username: "yourusername", url: "https://github.com" },
      { network: "LinkedIn", username: "yourusername", url: "https://linkedin.com" },
      { network: "Twitter", username: "yourusername", url: "https://twitter.com" },
    ]),
  }),
  work: z.array(z.object({
    name: z.string(),
    position: z.string(),
    url: z.string().url().optional(),
    startDate: z.string(),
    endDate: z.string().optional(),
    summary: z.string(),
    highlights: z.array(z.string()).optional(),
  })).default([]),
  education: z.array(z.object({
    institution: z.string(),
    url: z.string().url().optional(),
    area: z.string(),
    studyType: z.string(),
    startDate: z.string().optional(),
    endDate: z.string().optional(),
    score: z.string().optional(),
    courses: z.array(z.string()).optional(),
  })).default([]),
  skills: z.array(z.object({
    name: z.string(),
    level: z.string().optional(),
    keywords: z.array(z.string()),
  })).default([]),
  projects: z.array(z.object({
    name: z.string(),
    description: z.string(),
    highlights: z.array(z.string()).optional(),
    keywords: z.array(z.string()).default([]),
    startDate: z.string().optional(),
    endDate: z.string().optional(),
    url: z.string().url().optional(),
    roles: z.array(z.string()).optional(),
    entity: z.string().optional(),
    type: z.string().optional(),
  })).default([]),
  // New Vibe Coding Projects Section
  vibeProjects: z.array(z.object({
    name: z.string(),
    description: z.string(),
    status: z.enum(["Inflight", "Completed", "Ideation"]).default("Inflight"),
    vibe: z.string().optional(), // e.g. "Chill", "Chaotic", "Hyper-optimized"
    tools: z.array(z.string()).default([]),
    url: z.string().url().optional(),
  })).default([]),
  awards: z.array(z.object({
    title: z.string(),
    date: z.string().optional(),
    awarder: z.string(),
    summary: z.string().optional(),
  })).default([]),
  publications: z.array(z.object({
    name: z.string(),
    publisher: z.string(),
    releaseDate: z.string().optional(),
    url: z.string().url().optional(),
    summary: z.string().optional(),
  })).default([]),
  languages: z.array(z.object({
    language: z.string(),
    fluency: z.string(),
  })).default([]),
  interests: z.array(z.object({
    name: z.string(),
    keywords: z.array(z.string()).optional(),
  })).default([]),
  references: z.array(z.object({
    name: z.string(),
    reference: z.string(),
  })).default([]),
});

export type Resume = z.infer<typeof resumeSchema>;

export const defaultResume: Resume = {
  basics: {
    name: "Your Name",
    label: "Full Stack Developer | Designer | Problem Solver",
    email: "your.email@example.com",
    phone: "+1 (555) 123-4567",
    summary: "I'm a passionate developer with a love for creating beautiful, functional, and user-friendly applications. With years of experience in web development, I specialize in building modern web applications using cutting-edge technologies.",
    location: {
      city: "San Francisco",
      region: "CA",
      countryCode: "US",
    },
    profiles: [
      { network: "GitHub", username: "yourusername", url: "https://github.com" },
      { network: "LinkedIn", username: "yourusername", url: "https://linkedin.com" },
      { network: "Twitter", username: "yourusername", url: "https://twitter.com" },
    ],
  },
  work: [
    {
      name: "Tech Company Inc.",
      position: "Senior Full Stack Developer",
      startDate: "2022-01",
      summary: "Leading development of scalable web applications, mentoring junior developers, and implementing best practices across the team.",
      highlights: ["React", "Node.js", "AWS", "TypeScript"],
    },
    {
      name: "Startup Solutions",
      position: "Full Stack Developer",
      startDate: "2020-01",
      endDate: "2022-01",
      summary: "Built and maintained multiple client projects, implemented CI/CD pipelines, and improved application performance by 40%.",
      highlights: ["Next.js", "PostgreSQL", "Docker", "GraphQL"],
    },
  ],
  education: [
    {
      institution: "University Name",
      area: "Computer Science",
      studyType: "Bachelor's",
      startDate: "2014-09",
      endDate: "2018-06",
    },
  ],
  skills: [
    {
      name: "Frontend",
      keywords: ["React", "Next.js", "TypeScript", "Tailwind CSS", "HTML/CSS"],
    },
    {
      name: "Backend",
      keywords: ["Node.js", "Express", "PostgreSQL", "MongoDB", "REST APIs"],
    },
    {
      name: "Tools & Others",
      keywords: ["Git", "Docker", "AWS", "CI/CD", "Agile"],
    },
  ],
  projects: [
    {
      name: "E-Commerce Platform",
      description: "A full-stack e-commerce solution with payment integration, inventory management, and admin dashboard.",
      keywords: ["Next.js", "TypeScript", "Stripe", "PostgreSQL"],
      url: "https://example.com",
    },
    {
      name: "Task Management App",
      description: "Collaborative task management tool with real-time updates, team collaboration features, and analytics.",
      keywords: ["React", "Node.js", "Socket.io", "MongoDB"],
      url: "https://example.com",
    },
  ],
  vibeProjects: [],
  awards: [],
  publications: [],
  languages: [],
  interests: [],
  references: [
    {
      name: "Sarah Johnson",
      reference: "Working with this developer was an absolute pleasure. They delivered a high-quality product on time and exceeded our expectations. Highly recommended!",
    },
    {
      name: "Michael Chen",
      reference: "Exceptional technical skills combined with great communication. The project was completed flawlessly and the attention to detail was impressive.",
    },
  ],
};