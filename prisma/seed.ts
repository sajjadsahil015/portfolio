import "dotenv/config";
import { PrismaClient } from '../lib/generated/client/client';
import { PrismaPg } from '@prisma/adapter-pg';
import { Pool } from 'pg';

const connectionString = process.env.DATABASE_URL;
const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  // 1. Clear existing data
  try {
    await prisma.message.deleteMany();
    await prisma.project.deleteMany();
    await prisma.skill.deleteMany();
    await prisma.experience.deleteMany();
    console.log("Deleted existing data.");
  } catch (e) {
    console.log("No existing data to delete or error clearing:", e);
  }

  // 2. Seed Skills
  const skillsData = [
    // Agentic AI & LLMs
    { name: "OpenAI Agents SDK", category: "Agentic AI & LLMs", proficiency: 95, iconUrl: "/icons/openai.svg" },
    { name: "Claude-based Agent Development", category: "Agentic AI & LLMs", proficiency: 95, iconUrl: "/icons/anthropic.svg" },
    { name: "Prompt Engineering", category: "Agentic AI & LLMs", proficiency: 90, iconUrl: "/icons/prompt_engineering.svg" },
    { name: "Context Engineering", category: "Agentic AI & LLMs", proficiency: 85, iconUrl: "/icons/context_engineering.svg" },
    { name: "Retrieval-Augmented Generation (RAG)", category: "Agentic AI & LLMs", proficiency: 90, iconUrl: "/icons/rag.svg" },
    { name: "Google Gemini API", category: "Agentic AI & LLMs", proficiency: 90, iconUrl: "/icons/gemini.svg" },
    { name: "Cohere API", category: "Agentic AI & LLMs", proficiency: 80, iconUrl: "/icons/cohere.svg" },
    { name: "Hugging Face", category: "Agentic AI & LLMs", proficiency: 85, iconUrl: "/icons/huggingface.svg" },

    // Vector & Data
    { name: "Qdrant Cloud", category: "Vector & Data", proficiency: 85, iconUrl: "/icons/qdrant.svg" },
    { name: "PostgreSQL (Neon)", category: "Vector & Data", proficiency: 90, iconUrl: "/icons/neon.svg" },
    { name: "SQLite", category: "Vector & Data", proficiency: 90, iconUrl: "/icons/sqlite.svg" },
    { name: "SQLModel", category: "Vector & Data", proficiency: 85, iconUrl: "/icons/sqlmodel.svg" },
    { name: "SQLAlchemy", category: "Vector & Data", proficiency: 85, iconUrl: "/icons/sqlmodel.svg" },
    { name: "Pydantic", category: "Vector & Data", proficiency: 90, iconUrl: "/icons/pydantic.svg" },

    // Backend Development
    { name: "Python", category: "Backend Development", proficiency: 95, iconUrl: "/icons/python.svg" },
    { name: "FastAPI", category: "Backend Development", proficiency: 90, iconUrl: "/icons/fastapi.svg" },
    { name: "RESTful API Design", category: "Backend Development", proficiency: 90, iconUrl: "/icons/api.svg" },
    { name: "Docker", category: "Backend Development", proficiency: 80, iconUrl: "/icons/docker.svg" },

    // Frontend Development
    { name: "React", category: "Frontend Development", proficiency: 95, iconUrl: "/icons/react.svg" },
    { name: "Next.js (App Router)", category: "Frontend Development", proficiency: 95, iconUrl: "/icons/nextjs.svg" },
    { name: "TypeScript", category: "Frontend Development", proficiency: 90, iconUrl: "/icons/typescript.svg" },
    { name: "Redux Toolkit", category: "Frontend Development", proficiency: 85, iconUrl: "/icons/redux.svg" },
    { name: "Tailwind CSS", category: "Frontend Development", proficiency: 95, iconUrl: "/icons/tailwind.svg" },
    { name: "Leaflet", category: "Frontend Development", proficiency: 80, iconUrl: "/icons/leaflet.svg" },
    { name: "Docusaurus", category: "Frontend Development", proficiency: 80, iconUrl: "/icons/docusaurus.svg" },

    // Tools & Practices
    { name: "Git/GitHub", category: "Tools & Practices", proficiency: 95, iconUrl: "/icons/github.svg" },
    { name: "Vercel", category: "Tools & Practices", proficiency: 90, iconUrl: "/icons/vercel.svg" },
    { name: "Render", category: "Tools & Practices", proficiency: 85, iconUrl: "/icons/render.svg" },
    { name: "uv", category: "Tools & Practices", proficiency: 85, iconUrl: "/icons/uv.svg" },
    { name: "Spec-Driven Development (SDD)", category: "Tools & Practices", proficiency: 95, iconUrl: "/icons/sdd.svg" },
    { name: "Claude Code", category: "Tools & Practices", proficiency: 90, iconUrl: "/icons/claude_code.svg" },
  ];

  for (const skill of skillsData) {
    await prisma.skill.create({ data: skill });
  }
  console.log("Seeded Skills.");

  // 3. Seed Projects
  const projectsData = [
    {
      title: "E-Commerce Dashboard",
      description: "A comprehensive admin dashboard for an e-commerce platform. Features include real-time sales tracking, inventory management, and user analytics.",
      imageUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1000&auto=format&fit=crop",
      techStack: "Next.js, TypeScript, Tailwind, Prisma",
      liveUrl: "https://example.com",
      githubUrl: "https://github.com",
      featured: true,
    },
    {
      title: "AI Content Generator",
      description: "SaaS application that uses OpenAI API to generate blog posts and social media captions. Includes subscription management via Stripe.",
      imageUrl: "https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=1000&auto=format&fit=crop",
      techStack: "React, Node.js, OpenAI API, Stripe",
      liveUrl: "https://example.com",
      githubUrl: "https://github.com",
      featured: true,
    },
    {
      title: "Task Management App",
      description: "Collaborative task manager allowing teams to organize workflows. Features include drag-and-drop boards and real-time updates.",
      imageUrl: "https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?q=80&w=1000&auto=format&fit=crop",
      techStack: "Vue.js, Firebase, Tailwind",
      liveUrl: "https://example.com",
      githubUrl: "https://github.com",
      featured: false,
    },
  ];

  for (const project of projectsData) {
    await prisma.project.create({ data: project });
  }
  console.log("Seeded Projects.");

  // 4. Seed Experience
  const experienceData = [
    {
      type: "work",
      position: "Senior Full Stack Developer",
      company: "Tech Solutions Inc.",
      location: "San Francisco, CA",
      startDate: new Date("2023-01-01"),
      endDate: null,
      description: "Leading a team of 5 developers in building scalable web applications. Architected a microservices-based backend using Node.js."
    },
    {
      type: "work",
      position: "Frontend Developer",
      company: "Creative Agency",
      location: "Remote",
      startDate: new Date("2020-06-01"),
      endDate: new Date("2022-12-31"),
      description: "Developed responsive websites for high-profile clients. Collaborated with designers to implement pixel-perfect UIs."
    },
    {
      type: "education",
      position: "BS Computer Science",
      company: "University of Technology",
      location: "New York, NY",
      startDate: new Date("2016-09-01"),
      endDate: new Date("2020-05-01"),
      description: "Graduated with Honors. Specialized in Software Engineering and Artificial Intelligence."
    }
  ];

  for (const exp of experienceData) {
    await prisma.experience.create({ data: exp });
  }
  console.log("Seeded Experience.");

  // 5. Seed Admin User if not exists
  const existingAdmin = await prisma.user.findFirst({
    where: { role: "admin" },
  });

  if (!existingAdmin) {
    const bcrypt = await import("bcryptjs");
    const hashedPassword = await bcrypt.default.hash("adminpassword", 10);
    await prisma.user.create({
      data: {
        name: "Sajjad Hassan",
        email: "sajjadsahil015@gmail.com",
        password: hashedPassword,
        role: "admin",
      },
    });
    console.log("Seeded default Admin User.");
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });