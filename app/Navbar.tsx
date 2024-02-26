import NavMenus from "@/components/nav-menu";
import { getUserInfo } from "./utils/getUserInfo";

export async function Navbar() {
  const user = await getUserInfo();

  return <NavMenus data={user} />;
}
