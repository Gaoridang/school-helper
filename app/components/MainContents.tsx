"use client";

import { Button } from "@/components/ui/button";
import { User } from "@supabase/supabase-js";
import { LogIn } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const MainContents = () => {
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      setUser(JSON.parse(user));
    }
  }, []);

  if (!user) {
    return (
      <Button onClick={() => router.push("/signin")}>
        로그인 하러가기 <LogIn className="w-4 h-4 ml-2" />
      </Button>
    );
  }

  return <div>MainContents</div>;
};

export default MainContents;
