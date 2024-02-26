"use client";

import { Form, FormField, FormItem } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import TextInput from "./TextInput";

import { type FormItemType, SignUpData, SignUpSchema } from "./types/formTypes";
import SelectRole from "./SelectRole";
import { Button } from "@/components/ui/button";
import useSupabaseBrowser from "../utils/supabase/client";
import { toast } from "sonner";

export const formItems: FormItemType[] = [
  { label: "역할", name: "role", type: "select", placeholder: "" },
  {
    label: "이름",
    name: "name",
    type: "text",
    placeholder: "이름을 입력하세요.",
    description: "반드시 실명을 입력해주세요.",
  },
  {
    label: "아이디",
    name: "id",
    type: "text",
    placeholder: "아이디를 입력하세요.",
  },
  { label: "비밀번호", name: "password", type: "password", placeholder: "비밀번호를 입력하세요." },
  {
    label: "비밀번호 확인",
    name: "passwordConfirmation",
    type: "password",
    placeholder: "비밀번호를 다시 입력하세요.",
  },
  {
    label: "번호",
    name: "student_number",
    type: "text",
    placeholder: "나의 번호를 입력하세요.",
    condition: "student",
    description: "학생의 경우 학번을 입력해주세요.",
  },
  {
    label: "고유번호",
    name: "student_code",
    type: "text",
    placeholder: "고유번호",
    condition: "student",
  },
];

const SignUpForm = () => {
  const form = useForm<SignUpData>({
    resolver: zodResolver(SignUpSchema),
    defaultValues: {
      id: "",
      password: "",
      passwordConfirmation: "",
      name: "",
      role: "teacher",
      student_code: "",
      student_number: "",
    },
  });

  const role = form.watch("role");

  const supabase = useSupabaseBrowser();
  const onSubmit = async (value: SignUpData) => {
    console.log(value);

    const { data, error } = await supabase.auth.signUp({
      email: `${value.id}@togethers.com`,
      password: value.password,
      options: {
        data: {
          name: value.name,
          role: value.role,
          student_code: value.student_code,
          student_number: value.student_number,
        },
      },
    });

    console.log(data);

    if (error) {
      toast("회원가입에 실패했습니다.");
      return;
    }
  };

  return (
    <Form {...form}>
      <form className="grid gap-2 w-full" onSubmit={form.handleSubmit(onSubmit)}>
        {formItems.map((item) => {
          if (item.condition === "student" && role !== "student") return null;
          const Component = item.type === "select" ? SelectRole : TextInput;

          return (
            <FormField
              key={item.name}
              name={item.name}
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <Component field={field} formField={item} />
                </FormItem>
              )}
            />
          );
        })}
        <Button type="submit" className="mt-2">
          회원가입
        </Button>
      </form>
    </Form>
  );
};

export default SignUpForm;
