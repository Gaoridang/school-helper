import { ControllerRenderProps, FieldValues, Path } from "react-hook-form";
import { z } from "zod";

export const SignUpSchema = z
  .object({
    email: z.string().email().min(1, "이메일을 입력하세요"),
    password: z.string().min(8, "비밀번호는 8자 이상이어야 합니다"),
    passwordConfirmation: z.string().min(8, "비밀번호는 8자 이상이어야 합니다"),
  })
  .refine((data) => data.password === data.passwordConfirmation, {
    message: "비밀번호가 일치하지 않습니다",
    path: ["passwordConfirmation"],
  });

export type SignUpData = z.infer<typeof SignUpSchema>;
export type SignUpFormItemType = {
  label: string;
  name: keyof SignUpData;
  type: "email" | "password" | "text" | "select";
  description?: string;
  placeholder?: string;
  condition?: "student" | "teacher" | "parents";
  selectDataType?: "role" | "detailRole";
};

export interface CommonInputTypes<T extends FieldValues, VItem> {
  field: ControllerRenderProps<T, Path<T>>;
  formField: VItem;
  label: string;
}

export interface School {
  ORG_RDNMA: string; // 주소
  SCHUL_NM: string; // 이름
  SD_SCHUL_CODE: string; // 학교 코드}
}
