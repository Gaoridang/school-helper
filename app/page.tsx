import useSupabaseServer from "./utils/supabase/server";
import TeacherMainPage from "./components/TeacherMainPage";
import { redirect } from "next/navigation";

export default async function Home() {
  const supabase = useSupabaseServer();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  console.log("main", user);

  if (!user) redirect("/signin");

  return <TeacherMainPage user={user} />;
}
