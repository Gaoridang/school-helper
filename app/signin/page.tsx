"use client";

import { Button } from "@/components/ui/button";
import { Form, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { createClient } from "../utils/supabase/client";
import { useRouter } from "next/navigation";

interface SignInFormData {
  email: string;
  password: string;
}

const SignInSchema = z.object({
  email: z.string().email({ message: "이메일 형식에 맞지 않습니다." }).min(1).max(30),
  password: z.string().min(1, "비밀번호를 입력하세요."),
});

const SignInPage = () => {
  const form = useForm<SignInFormData>({
    resolver: zodResolver(SignInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const router = useRouter();
  const supabase = createClient();
  const onSubmit = async (data: SignInFormData) => {
    const validation = SignInSchema.safeParse(data);
    if (!validation.success) return;

    const { error } = await supabase.auth.signInWithPassword({
      email: data.email,
      password: data.password,
    });
    if (!error) {
      router.push("/students/assessment");
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-4">
        <FormField
          name="email"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>이메일</FormLabel>
              <Input {...field} placeholder="example@email.com" />
            </FormItem>
          )}
        />
        <FormField
          name="password"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>비밀번호</FormLabel>
              <Input type="password" {...field} placeholder="••••••••••" />
            </FormItem>
          )}
        />
        <div>
          <Button type="submit">로그인</Button>
        </div>
      </form>
    </Form>
  );
};

export default SignInPage;
