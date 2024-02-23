import { z } from "zod";

export const SignUpSchema = z
  .object({
    email: z.string().email({ message: "이메일 형식에 맞지 않습니다." }).min(1).max(30),
    password: z
      .string()
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{10,}$/,
        "영문 소문자, 대문자, 숫자를 조합해 10자리 이상 입력하세요",
      )
      .min(1, "비밀번호를 입력하세요.")
      .max(15, "비밀번호는 최대 15자리 입니다."),
    passwordConfirm: z.string(),
    school: z.string().min(1, "학교를 선택하세요"),
    grade: z.string().min(1, "학년을 선택하세요"),
    classNumber: z.string().min(1, "반을 선택하세요."),
  })
  .refine((data) => data.password === data.passwordConfirm, {
    message: "비밀번호가 일치하지 않습니다.",
    path: ["passwordConfirm"],
  });

export const sendEmailSchema = z.object({
  email: z.string().email(),
});

export type SignUpType = z.infer<typeof SignUpSchema>;
export type SendEmailType = z.infer<typeof sendEmailSchema>;
