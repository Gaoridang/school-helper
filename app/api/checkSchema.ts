import { z } from "zod";

export const activitySchema = z.object({
  name: z.string().min(1).max(255),
  description: z.string().max(255).optional(),
  questions: z.array(z.object({ content: z.string().min(1).max(255) })),
});

export type ActivityType = z.infer<typeof activitySchema>;
