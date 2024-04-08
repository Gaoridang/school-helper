import { Button } from "@/components/ui/button";
import CheckMateIcon from "@/public/checkmate-logo.png";
import Image from "next/image";
import Link from "next/link";
import SelectClass from "./(teacher)/components/SelectSchool";
import LogoutButton from "./components/LogoutButton";
import UserInfo from "./components/UserInfo";
import ClassInfo from "./components/sidebar/ClassInfo";
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
          <UserInfo user={user} />
          <SelectClass user={user} />
          <div className="grid grid-cols-2 gap-2">
            {user?.user_metadata.role === "teacher" && (
              <Button>
                <Link href="/classes/create">새로운 학급 개설</Link>
              </Button>
            )}
            {user?.user_metadata.role === "student" && (
              <Button>
                <Link href="/classes/register">새로운 학급 가입</Link>
              </Button>
            )}
            {user?.user_metadata.role === "parents" && (
              <Button>
                <Link href="/students/register">학생 추가하기</Link>
              </Button>
            )}
            <ClassInfo user={user} />
          </div>
        </div>
        <MenuItems />
      </div>
      <LogoutButton />
    </aside>
  );
};

export default Sidebar;
