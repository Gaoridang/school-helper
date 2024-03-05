import useSupabaseServer from "./utils/supabase/server";
import TeacherMainPage from "./components/TeacherMainPage";
import { redirect } from "next/navigation";
import StudentMainPage from "./components/StudentMainPage";

export default async function Home() {
  const supabase = useSupabaseServer();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const isTeacher = user?.user_metadata?.role === "teacher";

  if (!user) redirect("/signin");

  return isTeacher ? <TeacherMainPage user={user} /> : <StudentMainPage user={user} />;
}
