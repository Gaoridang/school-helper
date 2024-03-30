"use client";

import { Skeleton } from "@/components/ui/skeleton";
import { User } from "@supabase/supabase-js";
import { getRoleBadge } from "../(auth)/signup/utils/getRoleBadge";

interface Props {
  user: User | null;
}

const UserInfo = ({ user }: Props) => {
  if (!user) return <Skeleton className="w-full h-10" />;

  return (
    <div className="border rounded-sm w-full p-2 flex gap-2 justify-center items-center shadow-sm">
      <span className="text-sm">{user?.user_metadata.name}</span>
      <span className="text-xs font-light">{getRoleBadge(user?.user_metadata.role)}</span>
    </div>
  );
};

export default UserInfo;
