# Feature: Skills & Tech Stack Management

## Goal
To showcase technical expertise in a categorized manner (e.g., Frontend, Backend, Tools). The admin must be able to add, remove, or categorize skills dynamically without touching the code.

## Tech Stack Specifics
- **Data Fetching**: React Server Components (fetching data directly from Prisma).
- **Data Grouping**: The raw flat data fetched from DB must be grouped by "category" on the server-side before rendering.
- **UI Representation**: Skills will be displayed as modern badges or small cards containing the skill name and optionally an icon.

## 1. Database Schema (Prisma)
We need a simple model to hold the skill name and to which category it belongs.

**Add to `prisma/schema.prisma`:**
```prisma
model Skill {
  id       Int    @id @default(autoincrement())
  name     String // e.g. "React", "Node.js", "Docker"
  category String // e.g. "frontend", "backend", "devops", "tools"
  iconUrl  String? // Optional: URL to an SVG/PNG icon
  proficiency Int? // Optional: 1-100 scale (for progress bars if needed later)
  createdAt DateTime @default(now())
}
