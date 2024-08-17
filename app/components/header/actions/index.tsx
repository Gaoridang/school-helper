"use client";

import { useGetProfile } from "@/app/queries/getProfile";
import { PickProfile } from "@/app/types/profile";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Skeleton } from "@/components/ui/skeleton";
import { ChevronDown, Settings } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

interface Props {
  userId: string | null;
}

const ActionButtons = ({ userId }: Props) => {
  const { data, isLoading, error } = useGetProfile(userId);

  if (isLoading || !data) {
    return (
      <div className="flex items-center">
        <Skeleton className="w-8 h-8 rounded-full" />
        <ChevronDown size={16} className="ml-2" />
      </div>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex items-center">
        <div className="relative w-8 h-8 flex justify-center items-center rounded-full border overflow-hidden">
          {data.image_url ? (
            <Image src={data.image_url} alt="profile" fill className="object-contain" sizes="32" />
          ) : (
            <div className="bg-slate-400 w-full h-full" />
          )}
        </div>
        <ChevronDown size={16} className="ml-2" />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>
          {data.name} {data.role}
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <Link href="/settings" className="flex items-center">
              <Settings size={16} className="mr-2" /> 내 정보 보기
            </Link>
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ActionButtons;
