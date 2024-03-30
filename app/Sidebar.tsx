import CheckMateIcon from "@/public/checkmate-logo.png";
import Image from "next/image";
import Link from "next/link";
import SelectClass from "./(teacher)/components/SelectSchool";
import LogoutButton from "./components/LogoutButton";
import UserInfo from "./components/UserInfo";
import MenuItems from "./components/sidebar/MenuItems";
import { createClient } from "./utils/supabase/server";

export interface UserClasses {
  class_id: string;
  is_primary: boolean | null;
  classes: {
    school: string;
    grade: number;
    class_number: number;
    id: string;
  } | null;
}

const Sidebar = async () => {
  const supbase = createClient();
  const {
    data: { user },
  } = await supbase.auth.getUser();

  return (
    <aside className="fixed min-h-screen p-4 pb-8 flex-col items-start justify-between md:flex hidden gap-1 border-r bg-white w-[300px]">
      <div>
        <Link href="/" className="flex items-center gap-2 font-bold">
          <Image src={CheckMateIcon} alt="CheckMate Logo" priority />
        </Link>
        <div className="mb-4 w-full">
          <UserInfo />
          {user?.user_metadata.role === "teacher" && (
            <Link href="/classes/create" className="text-sm text-primary underline">
              새로운 학급 개설
            </Link>
          )}
          {user?.user_metadata.role === "student" && (
            <Link href="/classes/register" className="text-sm text-primary underline">
              새로운 학급 가입
            </Link>
          )}
          <SelectClass />
        </div>
        <MenuItems />
      </div>
      <LogoutButton />
    </aside>
  );
};

export default Sidebar;
