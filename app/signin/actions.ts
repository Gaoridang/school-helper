"use server";

import { createClient } from "@/app/utils/supabase/server";

import { SignInDataType } from "./page";

export async function signIn(formData: SignInDataType) {
  const supabase = createClient();
  const { error } = await supabase.auth.signInWithPassword({
    email: formData.email,
    password: formData.password,
  });

  if (error) {
    if (error.status === 400) {
      console.log(error);
      return {
        status: 400,
        message: "아이디 또는 비밀번호가 틀렸습니다.",
      };
    }
  }

  return { status: 200, message: "" };
}
