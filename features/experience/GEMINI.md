# Feature: Experience & Education Timeline

## Goal
Create a chronological timeline of professional experience and education. This data must be editable via the Admin Dashboard and displayed elegantly on the public "About" page.

## Tech Stack Specifics
- **Data Fetching**: React Server Components (fetching data directly from Prisma).
- **Sorting**: Data must be sorted by `startDate` in **Descending** order (Newest first).
- **Date Handling**: Use `date-fns` (or native JS Date) to format dates as "MMM yyyy" (e.g., "Jan 2023").

## 1. Database Schema (Prisma)
We need a model to store both Jobs and Education details.

**Add to `prisma/schema.prisma`:**
```prisma
model Experience {
  id          Int      @id @default(autoincrement())
  type        String   // "work" or "education"
  position    String   // Role (e.g. "Senior Developer" or "BS Computer Science")
  company     String   // Company Name or University Name
  location    String?  // e.g. "Karachi, Pakistan"
  startDate   DateTime
  endDate     DateTime? // If null, it means "Present" (Current Job)
  description String   // Stored as a paragraph or bullet points separated by newlines
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
}
