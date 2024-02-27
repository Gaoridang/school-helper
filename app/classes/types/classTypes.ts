import { z } from "zod";

//school, grade, class_number, class_code
// class code is formatted as capital letter and digit 6 characters

export const createClassSchema = z.object({
  school: z.string().min(1, "학교를 선택하세요."),
  grade: z.string().min(1, "학년을 선택하세요."),
  class_number: z.string().min(1, "반을 선택하세요."),
});

export type CreateClassData = z.infer<typeof createClassSchema>;

export type CreateClassFormItemType = {
  label: string;
  name: keyof CreateClassData;
  type: string;
  placeholder: string;
};
