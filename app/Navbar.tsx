import NavMenus from "@/components/nav-menu";
import { cookies } from "next/headers";
import { createClient } from "./utils/supabase/server";

export async function Navbar() {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return <NavMenus user={user} />;
}
