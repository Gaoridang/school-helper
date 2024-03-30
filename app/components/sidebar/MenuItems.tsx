"use client";

import { menuItems } from "@/app/FloatingMenus";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const MenuItems = () => {
  const pathname = usePathname();

  return (
    <div>
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
  );
};

export default MenuItems;
