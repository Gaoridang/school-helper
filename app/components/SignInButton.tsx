"use client";

import { supabase } from "../utils/supabase/client";
import { Button } from "@/components/ui/button";

const SignInButton = () => {
  const signInWithEmail = async () => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: "spark1725@gmail.com",
      password: "1234",
    });

    if (error) throw error;

    return data;
  };

  return (
    <Button variant="ghost" onClick={signInWithEmail}>
      로그인
    </Button>
  );
};

export default SignInButton;
