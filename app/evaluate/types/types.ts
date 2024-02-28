import { z } from "zod";

export const createEvalSchema = z.object({
  date: z.date(),
  subject: z.string().min(1, "과목을 선택하세요."),
  period: z.string().min(1, "교시를 선택하세요."),
  contents: z.array(
    z.object({
      content: z.string().min(1, "평가 내용을 입력하세요."),
    }),
  ),
  evaluation_type: z.string().min(1, "평가 유형을 선택하세요."),
});

export type CreateEvalData = z.infer<typeof createEvalSchema>;
export type CreateEvalFormItemType = {
  label: string;
  name: keyof CreateEvalData;
  type: string;
  placeholder: string;
};
