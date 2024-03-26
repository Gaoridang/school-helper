"use client";

import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { LogOut } from "lucide-react";
import { useRouter } from "next/navigation";
import { supabase } from "../utils/supabase/client";

const LogoutButton = () => {
  const { toast } = useToast();
  const router = useRouter();
  const logout = async () => {
    const { error } = await supabase.auth.signOut();

    if (error) {
      return toast({
        title: "로그아웃에 실패했습니다.",
        description: "다시 시도해주세요.",
      });
    }

    localStorage.removeItem("user");

    router.push("/signin");
    router.refresh();
  };

  return (
    <Button variant="secondary" className="w-full" onClick={logout}>
      로그아웃
      <LogOut className="ml-4 w-4 h-4" />
    </Button>
  );
};

export default LogoutButton;
