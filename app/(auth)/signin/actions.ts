"use server";

import { createClient } from "@/app/utils/supabase/server";
import { redirect } from "next/navigation";
import { SignInDataType } from "./types/signInFormTypes";

export async function signInWithEmailPassword({ id, password }: SignInDataType) {
  const supabase = createClient();
  const {
    data: { session },
    error,
  } = await supabase.auth.signInWithPassword({
    email: `${id}@togethers.com`,
    password,
  });

  if (error) {
    return { error: error.message };
  }

  redirect(`/check/${session?.access_token}`);
}
