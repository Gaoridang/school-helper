import NavMenus from "@/components/nav-menu";
import Link from "next/link";
import useSupabaseServer from "./utils/supabase/server";
import { cookies } from "next/headers";

export async function Navbar() {
  const cookieStore = cookies();
  const supabase = useSupabaseServer(cookieStore);
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <div className="flex items-center justify-between gap-4 px-5 py-2 border-b">
      <Link href="/">HOME</Link>
      <NavMenus user={user} />
    </div>
  );
}
