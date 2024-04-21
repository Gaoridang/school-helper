"use server";

import { createClient } from "@/app/utils/supabase/server";
import { redirect } from "next/navigation";

interface FormData {
  email: string;
  password: string;
}

export async function signInWithEmailPassword({ email, password }: FormData) {
  const supabase = createClient();
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  if (!error) {
    redirect(`/check?role=${data.user.user_metadata.role}`);
  }
  return data;
}
