# Feature: Projects Management (Showcase & Admin)

## Goal
To build a dynamic system where the Admin can add, edit, and delete projects, and Visitors can view them in a responsive grid.

## Tech Stack Specifics
- **Data Fetching**: React Server Components (RSC) via Prisma (Direct DB access).
- **Mutations**: Next.js Server Actions (for Create/Delete operations).
- **State Management**: Redux Toolkit (strictly for UI states like Modals/Drawers).
- **Database**: SQLite (via Prisma).
- **Validation**: Zod (schema validation for form inputs).

## 1. Database Schema (Prisma)
Since SQLite does not support scalar lists (arrays), we store the Tech Stack as a comma-separated string.

**Add to `prisma/schema.prisma`:**
```prisma
model Project {
  id          Int      @id @default(autoincrement())
  title       String
  description String
  imageUrl    String   // URL to image (or path in public folder)
  techStack   String   // Stored as "React, Next.js, Prisma"
  liveUrl     String?  // Optional
  githubUrl   String?  // Optional
  featured    Boolean  @default(false)
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
}