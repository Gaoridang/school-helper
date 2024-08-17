import { redirect } from "next/navigation";
import ParentsMainComponent from "./_components/ParentsMainComponent";
import StudentMainComponent from "./_components/StudentMainComponent";
import { createClient } from "../utils/supabase/server";
import TeacherMainComponent from "./_components/TeacherMainComponent";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default async function Home() {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/signin");

  const { data, error } = await supabase
    .from("profiles")
    .select("role, name, image_url")
    .eq("id", user.id)
    .single();

  if (error) {
    console.error(error);
    return;
  }

  if (!data.role || !data.name) {
    return (
      <div className="h-full flex flex-col justify-center items-center">
        <p className="text-xl font-bold mb-4">아직 프로필을 설정하지 않으셨네요!</p>
        <Link href="/settings">
          <Button>역할, 이름 추가하러 가기</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="h-full">
      {data.role === "teacher" && <TeacherMainComponent />}
      {data.role === "student" && <StudentMainComponent />}
      {data.role === "parents" && <ParentsMainComponent />}
    </div>
  );
}
