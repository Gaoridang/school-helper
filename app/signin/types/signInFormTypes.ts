import { z } from "zod";

export const SignInSchema = z.object({
  email: z.string().email({ message: "이메일 형식에 맞지 않습니다." }).min(1).max(30),
  password: z.string().min(1, "비밀번호를 입력하세요."),
});

export type SignInDataType = z.infer<typeof SignInSchema>;
export type SignInFormItemType = {
  label: string;
  name: keyof SignInDataType;
  type: "email" | "password";
  description?: string;
  placeholder?: string;
};
