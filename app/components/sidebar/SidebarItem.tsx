import { cn } from "@/lib/utils";
import Link from "next/link";
import React, { ReactNode } from "react";

interface Props {
  icon: ReactNode;
  text: string;
  active?: boolean;
  alert?: boolean;
}

const SidebarItem = ({ icon, text, active, alert }: Props) => {
  return (
    <li>
      <Link
        href="/"
        className={cn(
          active ? "text-slate-900" : "text-gray-400 hover:text-gray-700",
          "group relative flex items-center py-2 px-3 md:px-8 my-3 cursor-pointer transition-colors",
        )}
      >
        {icon}
        <span className="overflow-hidden w-0 md:w-48 md:ml-4 text-lg whitespace-nowrap">
          {text}
        </span>
        <div className="md:hidden invisible opacity-20 absolute left-full rounded-md ml-3 px-2 py-1 whitespace-nowrap bg-slate-200 text-slate-800 text-sm -translate-x-3 group-hover:visible group-hover:opacity-100 group-hover:translate-x-0 transition-all">
          {text}
        </div>
      </Link>
    </li>
  );
};

export default SidebarItem;
