import NavMenus from "@/components/nav-menu";
import { createClient } from "./utils/supabase/server";

export async function Navbar() {
  const supabase = createClient();
  const { data: user } = await supabase.from("profiles").select("*").single();

  return <NavMenus user={user} />;
}
