import { z } from "zod";

export const CommentSchema = z.object({
  comment: z.string().min(1).max(1000),
});

export type CommentType = z.infer<typeof CommentSchema>;
