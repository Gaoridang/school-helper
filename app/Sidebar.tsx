"use client";

import Link from "next/link";
import React from "react";
import { menuItems } from "./FloatingMenus";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";

const Sidebar = () => {
  const pathname = usePathname();

  return (
    <aside className="p-4 flex-col items-start justify-start md:flex hidden gap-4 border-r">
      {menuItems.map((item) => (
        <Link
          key={item.name}
          href={item.href}
          className={cn(
            pathname === item.href ? "bg-indigo-500 text-white" : "bg-white",
            "flex items-center gap-3 p-2 rounded-lg w-full hover:bg-indigo-50 transition-colors",
          )}
        >
          <item.icon className="h-5 w-5" />
          <span className="whitespace-nowrap">{item.name}</span>
        </Link>
      ))}
    </aside>
  );
};

export default Sidebar;
