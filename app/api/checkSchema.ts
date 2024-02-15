import { z } from "zod";

export const checkSchema = z.object({
  title: z.string().min(1).max(255),
  items: z.array(z.object({ content: z.string().min(1).max(255) })),
});

export type CheckSchemaType = z.infer<typeof checkSchema>;
