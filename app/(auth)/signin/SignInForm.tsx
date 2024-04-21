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
    toast("로그인 시도 중", {
      description: "로그인 중입니다. 잠시만 기다려주세요.",
    });
    const res = await signInWithEmailPassword(data);

    if (res?.error) {
      toast("로그인 실패", {
        description: "로그인에 실패했습니다. 다시 시도해주세요.",
      });
    } else {
      toast("로그인 성공", {
        description: "홈 화면을 그리는 중입니다.",
      });
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
