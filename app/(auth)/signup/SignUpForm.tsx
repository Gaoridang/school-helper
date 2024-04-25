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

export const formItems: SignUpFormItemType[] = [
  { label: "역할", name: "role", type: "select", placeholder: "" },
  {
    label: "부모선택",
    name: "detail_role",
    type: "select",
    placeholder: "",
    condition: "parents",
  },
  {
    label: "이름",
    name: "name",
    type: "text",
    placeholder: "본인의 이름을 입력하세요.",
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
      detail_role: "부",
    },
  });
  const role = form.watch("role");

  const router = useRouter();
  const { toast } = useToast();
  const onSubmit = async (value: SignUpData) => {
    let studentCode = "";

    if (value.role === "student") {
      const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
      for (let i = 0; i < 6; i++) {
        studentCode += characters.charAt(Math.floor(Math.random() * characters.length));
      }
    }

    const {
      data: { user },
      error,
    } = await supabase.auth.signUp({
      email: `${value.id}@togethers.com`,
      password: value.password,
      options: {
        data: {
          name: value.name,
          role: value.role,
          student_number: parseInt(value.student_number!),
          student_code: studentCode,
          detail_role: value.detail_role,
        },
      },
    });

    if (user?.identities?.length === 0) {
      return toast({
        title: "회원가입에 실패했습니다.",
        description: "이미 존재하는 아이디입니다.",
      });
    }

    if (error) {
      return toast({
        title: "회원가입에 실패했습니다.",
        description: "이미 존재하는 아이디입니다.",
      });
    }

    toast({
      title: "회원가입되었습니다.",
    });

    localStorage.setItem("user", JSON.stringify(user));

    // if user is student or parents, redirect to register class page
    // if user is teacher, redirect to create class page
    if (value.role === "student" || value.role === "parents") {
      router.push("/classes/register");
      router.refresh();
    } else if (value.role === "teacher") {
      router.push("/classes/create");
      router.refresh();
    }
  };

  return (
    <Form {...form}>
      <form className="grid gap-2 w-full" onSubmit={form.handleSubmit(onSubmit)}>
        {formItems.map((item) => {
          if (item.condition === "student" && role !== "student") return null;
          if (item.condition === "parents" && role !== "parents") return null;
          const Component = item.type === "select" ? SelectRole : SignUpTextInput;

          return (
            <FormField
              key={item.name}
              name={item.name}
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <Component field={field} formField={item} selectDataType={field.name} />
                </FormItem>
              )}
            />
          );
        })}
        <div>
          <Button type="submit" className="mt-2">
            회원가입
          </Button>
          <Button variant="link" className="ml-2">
            <Link href="/signin">로그인</Link>
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default SignUpForm;
