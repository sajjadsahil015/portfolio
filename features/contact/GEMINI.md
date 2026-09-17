# Feature: Contact System & Admin Inbox

## Goal
To allow visitors to send professional inquiries directly from the portfolio. These messages are saved to the SQLite database and can be managed (Read/Delete) via the Admin Dashboard.

## Tech Stack Specifics
- **Form Handling**: React Hook Form (Client Side) + Server Actions (Backend Processing).
- **Validation**: Zod (Schema validation for Email format and Message length).
- **Feedback**: Hot Toast (or similar) for success/error notifications.
- **Data Privacy**: Messages are stored securely in SQLite, accessible only via the protected Admin route.

## 1. Database Schema (Prisma)
We need a model to store incoming messages and track their status (Read vs Unread).

**Add to `prisma/schema.prisma`:**
```prisma
model Message {
  id        Int      @id @default(autoincrement())
  name      String
  email     String
  subject   String?
  content   String   // The actual message body
  isRead    Boolean  @default(false) // To highlight unread messages in Admin
  createdAt DateTime @default(now())
}
