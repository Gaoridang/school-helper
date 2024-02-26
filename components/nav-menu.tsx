"use client";

import { ChevronDown, LogOut, User as LucideUser, Settings } from "lucide-react";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { useRouter } from "next/navigation";
import Link from "next/link";
import useSupabaseBrowser from "@/app/utils/supabase/client";

const NavMenus = () => {
  const router = useRouter();
  const signOut = async () => {
    const supabase = useSupabaseBrowser();
    const { error } = await supabase.auth.signOut();

    if (error) {
      router.push("/error");
    }

    router.push("/");
    router.refresh();
  };

  // if (!data)
  //   return (
  //     <div className="flex items-center gap-4 py-2">
  //       <Link href="/signin">로그인</Link>
  //       <Link href="/signup">회원가입</Link>
  //     </div>
  //   );

  return (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost">
            <span className="text-base flex items-center gap-1">
              <LucideUser className="w-4 h-4" /> 내 정보
            </span>
            <ChevronDown className="w-4 h-4 ml-1" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel></DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem>
              <Settings className="w-4 h-4 mr-2" /> 설정
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={signOut}>
              <LogOut className="w-4 h-4 mr-2" /> 로그아웃
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default NavMenus;
