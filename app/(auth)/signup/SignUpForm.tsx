"use client";

import { Form, FormField, FormItem } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import SignUpTextInput from "./TextInput";

import Spinner from "@/app/components/Spinner";
import { AUTH_ERROR_MESSAGES } from "@/app/types/errorTypes";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { supabase } from "../../utils/supabase/client";
import { type SignUpFormItemType, SignUpData, SignUpSchema } from "./types/formTypes";

export const formItems: SignUpFormItemType[] = [
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
            {form.formState.isSubmitting && <Spinner />} <span>체크메이트 시작하기</span>
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
