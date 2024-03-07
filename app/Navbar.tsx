import NavMenus from "@/components/nav-menu";
import { CheckCircle } from "lucide-react";
import Link from "next/link";

export async function Navbar() {
  return (
    <div className="flex items-center justify-between gap-4 px-5 py-2 border-b">
      <Link href="/" className="flex items-center gap-2 font-bold">
        <CheckCircle strokeWidth={3} className="w-5 h-5 text-indigo-500" /> CHECKMATE
      </Link>
      <NavMenus />
    </div>
  );
}
