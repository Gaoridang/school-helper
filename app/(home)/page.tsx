import { redirect } from "next/navigation";
import ParentsMainComponent from "./_components/ParentsMainComponent";
import StudentMainComponent from "./_components/StudentMainComponent";
import { createClient } from "../utils/supabase/server";
import TeacherMainComponent from "./_components/TeacherMainComponent";

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
    <div className="flex">
      <div className="flex-1 h-full">
        {isTeacher && <TeacherMainComponent />}
        {isStudent && <StudentMainComponent />}
        {isParents && <ParentsMainComponent />}
      </div>
    </div>
  );
}
