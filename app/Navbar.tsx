import NavMenus from "@/components/nav-menu";
import { getUserInfo } from "./utils/getUserInfo";
import Link from "next/link";

export async function Navbar() {
  const user = await getUserInfo();

  return (
    <div className="flex items-center justify-between gap-4 px-5 py-2 border-b">
      <Link href="/">HOME</Link>
      <NavMenus data={user} />
    </div>
  );
}
