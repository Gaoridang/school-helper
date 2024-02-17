"use client";

import React from "react";
import Link from "next/link";
import { useSession } from "@supabase/auth-helpers-react";
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarTrigger,
} from "@/components/ui/menubar";
import { supabase } from "./utils/supabase/client";
import { toast } from "@/components/ui/use-toast";

const Navbar = () => {
  const session = useSession();

  const handleSignOut = async () => {
    const { error } = await supabase.auth.signOut();

    if (error) {
      toast({
        title: "로그아웃 실패",
        description: "잠시후 다시 시도해주세요.",
      });
    }
  };

  return (
    <div className="border-b h-12 flex items-center justify-between px-5">
      <div>
        <Link href="/">가치가 로고</Link>
      </div>
      <div>
        {session ? (
          <Menubar className="text-sm">
            <MenubarMenu>
              <MenubarTrigger>{session.user.email}</MenubarTrigger>
              <MenubarContent>
                <MenubarItem onClick={handleSignOut}>로그아웃</MenubarItem>
              </MenubarContent>
            </MenubarMenu>
          </Menubar>
        ) : (
          <Link href="/auth" className="flex space-x-2 text-sm">
            <div>로그인</div>
          </Link>
        )}
      </div>
    </div>
  );
};

export default Navbar;
