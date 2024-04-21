"use client";

import { Button } from "@/components/ui/button";
import { Form, FormField, FormItem } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useForm } from "react-hook-form";
import Spinner from "../../components/Spinner";
import { signInWithEmailPassword } from "./actions";
import SignInTextInput from "./components/SignInTextInput";
import { SignInDataType, SignInFormItemType, SignInSchema } from "./types/signInFormTypes";
import { toast } from "sonner";

const formItems: SignInFormItemType[] = [
  { label: "이메일", name: "id", type: "text", placeholder: "아이디를 입력하세요." },
  { label: "비밀번호", name: "password", type: "password", placeholder: "비밀번호를 입력하세요." },
];

const SignInForm = () => {
  const form = useForm<SignInDataType>({
    resolver: zodResolver(SignInSchema),
    defaultValues: {
      id: "",
      password: "",
    },
  });

  const onSubmit = async (data: SignInDataType) => {
    try {
      toast("로그인 시도 중", {
        description: "로그인 중입니다. 잠시만 기다려주세요.",
      });
      await signInWithEmailPassword(data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-2">
        {formItems.map((item) => (
          <FormField
            key={item.name}
            name={item.name}
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <SignInTextInput field={field} formField={item} />
              </FormItem>
            )}
          />
        ))}
        <div>
          <Button type="submit" disabled={form.formState.isSubmitting} className="space-x-2">
            {form.formState.isSubmitting && <Spinner />} <span>로그인</span>
          </Button>
          <Button variant="link" className="ml-2">
            <Link href="/signup">회원가입</Link>
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default SignInForm;
