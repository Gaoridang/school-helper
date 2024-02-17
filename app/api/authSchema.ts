import { z } from "zod";

export const authSchema = z
  .object({
    email: z.string().email({ message: "이메일 형식에 맞지 않습니다." }).min(1).max(30),
    password: z.string().min(1, "비밀번호를 입력하세요.").max(15, "비밀번호는 최대 15자리 입니다."),
    passwordConfirm: z.string().min(1).max(15),
  })
  .refine((data) => data.password === data.passwordConfirm, {
    message: "비밀번호가 일치하지 않습니다.",
    path: ["passwordConfirm"],
  });

export const sendEmailSchema = z.object({
  email: z.string().email(),
});

export type AuthType = z.infer<typeof authSchema>;
export type SendEmailType = z.infer<typeof sendEmailSchema>;
