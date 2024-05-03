"use client";

import { getRoleBadge } from "@/app/(auth)/signup/utils/getRoleBadge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { User } from "@supabase/supabase-js";
import { MoreVertical, Plus } from "lucide-react";
import LogoutButton from "../../components/sidebar/LogoutButton";
import { useEffect } from "react";
import useClassStore from "../store/classStore";
import { Tables } from "@/app/types/schema";
import Link from "next/link";
import { Button } from "@/components/ui/button";

interface Props {
  user: User | null;
  selectedClass?: Tables<"user_class_details">;
}

const UserInfo = ({ user, selectedClass }: Props) => {
  useEffect(() => {
    useClassStore.setState({ classId: selectedClass?.class_id! });
  }, [selectedClass?.class_id]);

  const selectedClassName = `${selectedClass?.school} ${selectedClass?.grade}학년 ${selectedClass?.class_number}반`;
  const isTeacher = user?.user_metadata.role === "teacher";

  return (
    <>
      <div className="hidden md:block">
        {selectedClass ? (
          <p className="text-center px-3 py-2 text-white bg-black">{selectedClassName}</p>
        ) : (
          <div className="flex flex-col justify-center items-center mb-4">
            <p className="hidden md:block mb-2">속한 학급이 없습니다.</p>
            <Link href={isTeacher ? "/classes/create" : "/classes/register"}>
              <Button className="hidden md:inline">
                {isTeacher ? "학급 만들기" : "학급 가입하기"}
              </Button>
              <span className="md:hidden text-sm">{isTeacher ? "개설" : "가입"}</span>
              <Plus className="md:hidden" />
            </Link>
          </div>
        )}
      </div>
      <div className="py-4 md:p-4 border-t flex justify-center md:justify-between items-center">
        <div className="hidden md:block">
          <p className="font-semibold text-lg">{user?.user_metadata.name}</p>
          <p className="font-light text-sm">{getRoleBadge(user?.user_metadata.role)}</p>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger>
            <div>
              <MoreVertical />
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start">
            <DropdownMenuGroup>
              <DropdownMenuItem>
                {/* register or create class */}
                <Link href={isTeacher ? "/classes/create" : "/classes/register"} className="w-full">
                  {isTeacher ? "학급 만들기" : "학급 가입하기"}
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <LogoutButton />
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </>
  );
};

export default UserInfo;
