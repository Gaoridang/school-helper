import { z } from "zod";

export const SettingsFormSchema = z.object({
  name: z.string().min(1),
  role: z.string().min(1),
  email: z.string().email(),
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
