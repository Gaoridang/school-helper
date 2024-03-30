import { redirect } from "next/navigation";
import ParentsMainPage from "./components/ParentsMainPage";
import StudentMainPage from "./components/StudentMainPage";
import TeacherMainPage from "./components/TeacherMainPage";
import { createClient } from "./utils/supabase/server";

export default async function Home() {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/signin");

  const isTeacher = user?.user_metadata?.role === "teacher";
  const isStudent = user?.user_metadata?.role === "student";
  const isParents = user?.user_metadata?.role === "parents";

  return (
    <>
      {isTeacher && <TeacherMainPage user={user} />}
      {isStudent && <StudentMainPage />}
      {isParents && <ParentsMainPage />}
    </>
  );
}
