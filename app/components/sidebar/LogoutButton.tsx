"use client";

import { supabase } from "@/app/utils/supabase/client";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";

const LogoutButton = () => {
  const router = useRouter();
  const { toast } = useToast();
  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();

    if (error) {
      return toast({
        title: "로그아웃에 실패했습니다.",
      });
    }

    router.push("/signin");
  };

  return (
    <button className="border-none outline-none bg-transparent" onClick={handleLogout}>
      로그아웃
    </button>
  );
};

export default LogoutButton;
