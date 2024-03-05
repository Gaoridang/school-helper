import NavMenus from "@/components/nav-menu";
import Link from "next/link";

export async function Navbar() {
  return (
    <div className="flex items-center justify-between gap-4 px-5 py-2 border-b">
      <Link href="/">HOME</Link>
      <NavMenus />
    </div>
  );
}
