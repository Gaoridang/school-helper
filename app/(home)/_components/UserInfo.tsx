"use client";

import { getRoleBadge } from "@/app/(auth)/signup/utils/getRoleBadge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { User } from "@supabase/supabase-js";
import { MoreVertical } from "lucide-react";
import LogoutButton from "../../components/sidebar/LogoutButton";
import { useEffect } from "react";
import useClassStore from "../store/classStore";
import { Tables } from "@/app/types/schema";

interface Props {
  user: User | null;
  selectedClass: Tables<"user_class_details">;
}

const UserInfo = ({ user, selectedClass }: Props) => {
  useEffect(() => {
    useClassStore.setState({ classId: selectedClass.class_id! });
  }, [selectedClass.class_id]);

  const selectedClassName = `${selectedClass.school} ${selectedClass.grade}학년 ${selectedClass.class_number}반`;

  return (
    <>
      <div className="hidden md:block">
        <p className="text-center px-3 py-2 text-white bg-black">{selectedClassName}</p>
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
