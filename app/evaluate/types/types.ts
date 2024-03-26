import { z } from "zod";

export const createEvalSchema = z.object({
  date: z.date(),
  subject: z.string().optional(),
  period: z.string().optional(),
  contents: z.array(
    z.object({
      content: z.string().min(1, "평가 내용을 입력하세요."),
    }),
  ),
  evaluation_type: z.enum(["self", "peer"]),
});

export type CreateEvalData = z.infer<typeof createEvalSchema>;
export type CreateEvalFormItemType = {
  label: string;
  name: keyof CreateEvalData;
  type: string;
  placeholder: string;
};

export const submitEvalSchema = z.object({
  items: z.array(z.number()),
});

export type SubmitEvalData = z.infer<typeof submitEvalSchema>;
