import { cookies } from "next/headers";
import useSupabaseServer from "./utils/supabase/server";
import TeacherMainPage from "./components/TeacherMainPage";
import StudentMainPage from "./components/StudentMainPage";
import { redirect } from "next/navigation";

export default async function Home() {
  const cookieStore = cookies();
  const supabase = useSupabaseServer(cookieStore);

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/signin");

  return user?.user_metadata.role === "teacher" ? <TeacherMainPage /> : <StudentMainPage />;
}
