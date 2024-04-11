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
import LogoutButton from "./LogoutButton";

interface Props {
  user: User | null;
}

const UserInfo = ({ user }: Props) => {
  return (
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
  );
};

export default UserInfo;
