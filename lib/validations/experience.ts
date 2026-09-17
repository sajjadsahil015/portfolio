import { z } from "zod";

export const experienceSchema = z.object({
  type: z.enum(["work", "education"]),
  position: z.string().min(2, {
    message: "Position/Role must be at least 2 characters.",
  }),
  company: z.string().min(2, {
    message: "Company/University name must be at least 2 characters.",
  }),
  location: z.string().optional().or(z.literal("")),
  startDate: z.string().refine((date) => !isNaN(Date.parse(date)), {
    message: "Start date is required.",
  }),
  endDate: z.string().optional().or(z.literal("")), // We will handle empty string as null/present in action
  description: z.string().min(10, {
    message: "Description must be at least 10 characters.",
  }),
});

export type ExperienceFormValues = z.infer<typeof experienceSchema>;
