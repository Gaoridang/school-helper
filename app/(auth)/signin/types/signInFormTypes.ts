import { z } from "zod";

export const SignInSchema = z.object({
  email: z.string().email().min(1, "아이디를 입력하세요."),
  password: z.string().min(1, "비밀번호를 입력하세요."),
});

export type SignInDataType = z.infer<typeof SignInSchema>;
export type SignInFormItemType = {
  label: string;
  name: keyof SignInDataType;
  type: "text" | "password";
  description?: string;
  placeholder?: string;
};
