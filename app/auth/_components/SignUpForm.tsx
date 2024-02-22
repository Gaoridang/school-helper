"use client";

import { SignUpType, signUpSchema } from "@/app/api/authSchema";
import Spinner from "@/app/components/Spinner";
import { createClient } from "@/app/utils/supabase/client";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  Form,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { CheckCircle } from "lucide-react";
import React, { useState } from "react";
import { useForm } from "react-hook-form";

const SignUpForm = () => {
  const form = useForm<SignUpType>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      email: "",
      password: "",
      passwordConfirm: "",
    },
    mode: "onBlur",
  });
  const isLoading = form.formState.isSubmitting;
  const supabase = createClient();

  const onSubmit = async (values: SignUpType) => {
    const validation = signUpSchema.safeParse(values);
    if (!validation.success) {
      console.log(validation.error.errors);
    }

    const { data, error } = await supabase.auth.signUp({
      email: values.email,
      password: values.password,
      options: {
        emailRedirectTo: "https://www.togethers.info",
      },
    });

    if (error) {
      toast({
        title: "회원가입 실패",
        description: "학교를 등록해주세요.",
      });
    } else if (data.user?.identities?.length === 0) {
      toast({
        title: "회원가입 실패",
        description: "이미 가입된 이메일입니다.",
      });
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>회원가입</CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="grid space-y-4">
            <FormField
              name="email"
              control={form.control}
              render={({ field, fieldState }) => (
                <FormItem>
                  <FormLabel>이메일</FormLabel>
                  <FormControl>
                    <Input placeholder="example@email.com" {...field} />
                  </FormControl>
                  <FormDescription className="text-red-400">
                    {fieldState.error && fieldState.error.message}
                  </FormDescription>
                </FormItem>
              )}
            />
            <FormField
              name="password"
              control={form.control}
              render={({ field, fieldState }) => (
                <FormItem>
                  <FormLabel>비밀번호</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="••••••••" {...field} />
                  </FormControl>
                  <FormDescription className={cn(fieldState.error && "text-red-400")}>
                    {fieldState.error
                      ? fieldState.error.message
                      : "영문 소문자, 대문자, 숫자 조합 10자리 이상"}
                  </FormDescription>
                </FormItem>
              )}
            />
            <FormField
              name="passwordConfirm"
              control={form.control}
              render={({ field, fieldState }) => (
                <FormItem>
                  <FormLabel>비밀번호 확인</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="••••••••" {...field} />
                  </FormControl>
                  <FormDescription className="text-red-400">
                    {fieldState.error && fieldState.error.message}
                  </FormDescription>
                </FormItem>
              )}
            />
            <Button type="submit" disabled={isLoading} className="flex items-center space-x-2">
              {isLoading && <Spinner />} <span>회원가입</span>
            </Button>
          </form>
        </Form>
        {form.formState.isSubmitSuccessful && (
          <Alert>
            <CheckCircle className="w-4 h-4" />
            <AlertTitle>이메일 인증</AlertTitle>
            <AlertDescription>회원가입 시 입력한 이메일을 확인해주세요.</AlertDescription>
          </Alert>
        )}
      </CardContent>
    </Card>
  );
};

export default SignUpForm;
