import Image from "next/image";
import { ReactNode } from "react";
import { createClient } from "./utils/supabase/server";
import logo from "@/public/logo.webp";
import Link from "next/link";
import UserInfo from "./components/sidebar/UserInfo";

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

interface Props {
  children: ReactNode;
}

const Sidebar = async ({ children }: Props) => {
  const supbase = createClient();
  const {
    data: { user },
  } = await supbase.auth.getUser();

  return (
    <aside className="h-screen">
      <nav className="h-full flex flex-col border-r bg-[#f9f9f9] shadow-sm">
        <div className="w-0 md:w-32 p-4 pb-2 mb-4 md:flex justify-between items-center transition-all">
          <Link href="/">
            <Image src={logo} alt="CheckMate" className="w-32" />
          </Link>
        </div>

        <ul className="flex-1">{children}</ul>

        <UserInfo user={user} />
      </nav>
    </aside>
  );
};

export default Sidebar;
