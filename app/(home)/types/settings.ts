import { z } from "zod";

export const SettingsFormSchema = z.object({
  name: z.string().min(1),
  school: z.string(),
  student: z.string().optional(),
});

export type SettingsFormType = z.infer<typeof SettingsFormSchema>;

export type FoundClassType = {
  school: string;
  grade: number;
  class_number: number;
  id: string;
};

export type FoundStudentType = {
  id: string;
  name: string;
  student_code: string;
};
