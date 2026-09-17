# Project Architecture & Folder Structure

## STRICT UPDATE RULE
**IGNORE** any previous instructions regarding a "Finance Tracker" or "Transactions".
This is now a **Professional Portfolio Website**.

## Tech Stack
- Next.js 14+ (App Router)
- TypeScript
- Tailwind CSS
- Redux Toolkit (UI State)
- Prisma + SQLite (Data Layer)

## Directory Structure
Please follow this structure strictly for all future code generation:

my-portfolio/
├── app/
│   ├── (public)/              # Public Routes
│   │   ├── page.tsx           # Home (Hero + Skills + Projects Preview)
│   │   ├── projects/          # All Projects Grid
│   │   ├── about/             # Experience & Resume
│   │   └── contact/           # Contact Form
│   ├── (admin)/               # Protected Admin Routes
│   │   ├── dashboard/         # Admin Home
│   │   ├── layout.tsx         # Admin Sidebar Layout
│   │   ├── projects/          # CRUD Projects
│   │   ├── experience/        # CRUD Experience
│   │   ├── skills/            # CRUD Skills
│   │   └── messages/          # View Contact Inquiries
│   ├── api/                   # API Routes (if needed beyond Server Actions)
│   ├── globals.css            # Tailwind Imports
│   └── layout.tsx             # Root Layout (Redux Provider Wrapper)
├── components/
│   ├── ui/                    # Reusable (Button, Input, Modal, Card)
│   ├── shared/                # Navbar, Footer
│   ├── admin/                 # Admin-specific components (Sidebar, Tables)
│   └── features/              # Feature-specific components
│       ├── ProjectsGrid.tsx
│       ├── ExperienceTimeline.tsx
│       └── ContactForm.tsx
├── features/                  # DOCUMENTATION & PLANNING FILES (Do not put code here)
│   ├── projects/
│   │   └── GEMINI.md
│   ├── experience/
│   │   └── GEMINI.md
│   ├── skills/
│   │   └── GEMINI.md
│   └── contact/
│       └── GEMINI.md
├── lib/
│   ├── prisma.ts              # Prisma Client Singleton
│   └── utils.ts               # Helper functions
├── prisma/
│   └── schema.prisma          # Database Schema
├── redux/
│   ├── store.ts               # Store Configuration
│   └── slices/                # State Slices (uiSlice, etc.)
└── types/
    └── index.ts               # Shared Interfaces
