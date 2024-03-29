"use client";

import { Button } from "@/components/ui/button";
import { Form, FormField, FormItem } from "@/components/ui/form";
import { useToast } from "@/components/ui/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import Spinner from "../components/Spinner";
import SignInTextInput from "./components/SignInTextInput";
import { SignInDataType, SignInFormItemType, SignInSchema } from "./types/signInFormTypes";
import { supabase } from "../utils/supabase/client";
import Link from "next/link";

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

  const router = useRouter();
  const { toast } = useToast();
  const onSubmit = async (values: SignInDataType) => {
    const {
      data: { user },
      error,
    } = await supabase.auth.signInWithPassword({
      email: `${values.id}@togethers.com`,
      password: values.password,
    });

    if (error) {
      return toast({
        title: "로그인에 실패했습니다.",
        description: "이메일 또는 비밀번호가 일치하지 않습니다.",
      });
    }

    toast({
      title: "로그인되었습니다.",
    });

    // store user data to local storage
    localStorage.setItem("user", JSON.stringify(user));

    // FIXME: 로그인 로딩이 끝나고 일정 시간 이후 홈 페이지로 이동함
    router.push("/");
    router.refresh();
  };

  return (
    <Form {...form}>
      <form className="grid gap-2" onSubmit={form.handleSubmit(onSubmit)}>
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
