import { z } from "zod";

export const skillSchema = z.object({
  name: z.string().min(1, {
    message: "Skill name is required.",
  }),
  category: z.string().min(1, {
    message: "Category is required (e.g. Frontend, Backend).",
  }),
  iconUrl: z.string().optional().or(z.literal("")),
  proficiency: z.coerce.number().min(1).max(100).optional(),
});

export type SkillFormValues = z.infer<typeof skillSchema>;
