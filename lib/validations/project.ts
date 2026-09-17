import { z } from "zod";

export const projectSchema = z.object({
  title: z.string().min(2, {
    message: "Title must be at least 2 characters.",
  }),
  description: z.string().min(10, {
    message: "Description must be at least 10 characters.",
  }),
  imageUrl: z.string().url({
    message: "Please enter a valid URL for the image.",
  }),
  techStack: z.string().min(2, {
    message: "Tech stack is required (comma separated).",
  }),
  liveUrl: z.string().url().optional().or(z.literal("")),
  githubUrl: z.string().url().optional().or(z.literal("")),
  featured: z.boolean().default(false),
});

export type ProjectFormValues = z.infer<typeof projectSchema>;
