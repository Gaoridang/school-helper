import { z } from "zod";

export const CreateAssessmentFormSchema = z.object({
  items: z.array(
    z.object({
      item_id: z.number(),
      is_passed: z.boolean(),
    }),
  ),
  evaluatee: z.string().optional(),
});

export type CreateAssessmentFormType = z.infer<typeof CreateAssessmentFormSchema>;
