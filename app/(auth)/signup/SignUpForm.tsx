"use client";

import { Form, FormField, FormItem } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import SignUpTextInput from "./TextInput";

import { type SignUpFormItemType, SignUpData, SignUpSchema } from "./types/formTypes";
import SelectRole from "./SelectRole";
import { Button } from "@/components/ui/button";
import { supabase } from "../../utils/supabase/client";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { AuthError } from "@supabase/supabase-js";
import { AUTH_ERROR_MESSAGES } from "@/app/types/errorTypes";

export const formItems: SignUpFormItemType[] = [
  // { label: "역할", name: "role", type: "select", placeholder: "" },
  // {
  //   label: "부모선택",
  //   name: "detail_role",
  //   type: "select",
  //   placeholder: "",
  //   condition: "parents",
  // },
  // {
  //   label: "이름",
  //   name: "name",
  //   type: "text",
  //   placeholder: "본인의 이름을 입력하세요.",
  //   description: "반드시 실명을 입력해주세요.",
  // },
  {
    label: "이메일",
    name: "email",
    type: "text",
    placeholder: "아이디를 입력하세요.",
  },
  { label: "비밀번호", name: "password", type: "password", placeholder: "********" },
  {
    label: "비밀번호 확인",
    name: "passwordConfirmation",
    type: "password",
    placeholder: "********",
  },
  // {
  //   label: "번호",
  //   name: "student_number",
  //   type: "text",
  //   placeholder: "나의 번호를 입력하세요.",
  //   condition: "student",
  //   description: "학생의 경우 학번을 입력해주세요.",
  // },
];

const SignUpForm = () => {
  const form = useForm<SignUpData>({
    resolver: zodResolver(SignUpSchema),
    defaultValues: {
      email: "",
      password: "",
      passwordConfirmation: "",
    },
  });

  const router = useRouter();
  const onSubmit = async (value: SignUpData) => {
    const { error } = await supabase.auth.signUp({
      email: value.email,
      password: value.password,
    });

    if (error) {
      form.setError("email", {
        message: AUTH_ERROR_MESSAGES[error.status as keyof typeof AUTH_ERROR_MESSAGES],
      });
    } else {
      router.replace("/onboarding");
    }
  };

  return (
    <Form {...form}>
      <form className="grid gap-4 w-[300px]" onSubmit={form.handleSubmit(onSubmit)}>
        {formItems.map((item) => {
          return (
            <FormField
              key={item.name}
              name={item.name}
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <SignUpTextInput label={item.label} field={field} formField={item} />
                </FormItem>
              )}
            />
          );
        })}
        <div className="grid">
          <Button type="submit" className="mt-2 font-semibold text-base">
            체크메이트 시작하기
          </Button>
          <Button variant="link">
            <Link href="/signin">로그인</Link>
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default SignUpForm;
