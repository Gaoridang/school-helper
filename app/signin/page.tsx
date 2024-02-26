"use client";

import { Button } from "@/components/ui/button";
import { Form, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { signIn } from "./actions";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import Spinner from "../components/Spinner";

const SignInSchema = z.object({
  email: z.string().email({ message: "이메일 형식에 맞지 않습니다." }).min(1).max(30),
  password: z.string().min(1, "비밀번호를 입력하세요."),
});

export type SignInDataType = z.infer<typeof SignInSchema>;

const SignInPage = () => {
  const form = useForm<SignInDataType>({
    resolver: zodResolver(SignInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const { toast } = useToast();
  const router = useRouter();

  const onSubmit = async (formData: SignInDataType) => {
    try {
      const result = await signIn(formData);
      if (result.status === 400) {
        toast({
          title: "로그인 실패",
          description: result.message,
        });
      } else {
        router.push("/");
        router.refresh();
      }
    } catch (error) {
      toast({
        title: "서버 에러",
        description: "문제가 계속될 시 문의하세요.",
      });
    }
  };

  return (
    <Form {...form}>
      <form className="flex flex-col gap-4" onSubmit={form.handleSubmit(onSubmit)}>
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
          <Button type="submit" disabled={form.formState.isSubmitting} className="space-x-2">
            {form.formState.isSubmitting && <Spinner />} <span>로그인</span>
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default SignInPage;
