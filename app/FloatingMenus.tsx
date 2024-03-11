"use client";

import { Drawer, DrawerClose, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";
import { AtSign, Home, Menu, ScanSearch } from "lucide-react";
import { useRouter } from "next/navigation";

export const menuItems = [
  {
    icon: Home,
    name: "대시보드",
    href: "/",
  },
  {
    icon: ScanSearch,
    name: "내 결과 요약",
    href: "/reviews",
  },
  {
    icon: AtSign,
    name: "문의하기",
    href: "/contact",
  },
];

const FloatingMenus = () => {
  const router = useRouter();

  return (
    <div className="md:hidden">
      <Drawer>
        <DrawerTrigger asChild>
          <button className="fixed bottom-0 p-2 m-4 rounded-full bg-indigo-500 z-10 hover:bg-indigo-500 active:scale-95 transition">
            <Menu className="text-white" />
          </button>
        </DrawerTrigger>
        <DrawerContent>
          <ul className="p-4 flex flex-col gap-4">
            {menuItems.map((item) => (
              <li key={item.name}>
                <DrawerClose asChild>
                  <button
                    onClick={() => router.push(item.href)}
                    className="flex items-center gap-3 hover:bg-indigo-100 p-2 rounded-md transition-colors"
                  >
                    <item.icon className="h-5 w-5" />
                    <span>{item.name}</span>
                  </button>
                </DrawerClose>
              </li>
            ))}
          </ul>
        </DrawerContent>
      </Drawer>
    </div>
  );
};

export default FloatingMenus;
