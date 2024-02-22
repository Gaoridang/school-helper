"use client";

import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { FormField, FormItem, FormLabel, FormControl, Form } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import React from "react";
import { useForm } from "react-hook-form";
import { login } from "../actions";

interface FormValues {
  email: string;
  password: string;
}

const SignInForm = () => {
  const form = useForm<FormValues>({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle>로그인</CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        <Form {...form}>
          <form className="grid space-y-4">
            <FormField
              name="email"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>이메일</FormLabel>
                  <FormControl>
                    <Input placeholder="example@email.com" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              name="password"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>비밀번호</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="••••••••" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <div className="flex space-x-2">
              <Button formAction={login}>로그인</Button>
              <Button variant="ghost">비밀번호 재설정</Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default SignInForm;
