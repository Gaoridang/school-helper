"use client";

import { cn } from "@/lib/utils";
import CheckMateIcon from "@/public/checkmate-logo.png";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import SelectClass from "./(teacher)/components/SelectSchool";
import { menuItems } from "./FloatingMenus";
import LogoutButton from "./components/LogoutButton";
import UserInfo from "./components/UserInfo";

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

const Sidebar = () => {
  const pathname = usePathname();

  if (pathname === "/signin" || pathname === "/signup") return null;

  return (
    <aside className="fixed min-h-screen p-4 pb-8 flex-col items-start justify-between md:flex hidden gap-1 border-r bg-white w-[300px]">
      <div>
        <Link href="/" className="flex items-center gap-2 font-bold">
          <Image src={CheckMateIcon} alt="CheckMate Logo" priority />
        </Link>
        <div className="mb-4 w-full">
          <UserInfo />
          <SelectClass />
        </div>
        {menuItems.map((item) => (
          <Link
            key={item.name}
            href={item.href}
            className={cn(
              pathname === item.href ? "bg-primary font-medium text-white" : "bg-white font-light",
              "flex items-center gap-3 p-3 rounded-lg w-full hover:bg-primary hover:text-white transition-colors text-sm mb-2",
            )}
          >
            <item.icon
              className={cn(pathname === item.href ? "opacity-100" : "opacity-50", "h-5 w-5")}
            />
            <span className="whitespace-nowrap">{item.name}</span>
          </Link>
        ))}
      </div>
      <LogoutButton />
    </aside>
  );
};

export default Sidebar;
