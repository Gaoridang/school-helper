import { cookies } from "next/headers";
import useSupabaseServer from "./utils/supabase/server";
import TeacherMainPage from "./teacher/page";
import StudentMainPage from "./student/page";

export default async function Home() {
  const cookieStore = cookies();
  const supabase = useSupabaseServer(cookieStore);

  const {
    data: { user },
  } = await supabase.auth.getUser();

  return user?.user_metadata.role === "teacher" ? <TeacherMainPage /> : <StudentMainPage />;
}
