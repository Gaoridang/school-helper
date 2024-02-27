import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import useSupabaseServer from "../utils/supabase/server";
import TeacherMain from "./teacher/TeacherMain";
import StudentMain from "./student/StudentMain";
import SideBarLayout from "./layouts/SideBarLayout";
import MainLayout from "./layouts/MainLayout";
import TeacherSidebar from "./teacher/TeacherSidebar";
import StudentSidebar from "./student/StudentSidebar";

const data = [{ label: "" }];

const MainContents = async () => {
  const cookieStore = cookies();
  const supabase = useSupabaseServer(cookieStore);

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/signin");
  }

  if (user.user_metadata.role === "teacher") {
    return (
      <div className="flex">
        <SideBarLayout>
          <TeacherSidebar />
        </SideBarLayout>
        <MainLayout>
          <TeacherMain />
        </MainLayout>
      </div>
    );
  }

  return (
    <div className="flex gap-8 pt-4">
      <SideBarLayout>
        <StudentSidebar />
      </SideBarLayout>
      <MainLayout>
        <StudentMain />
      </MainLayout>
    </div>
  );
};

export default MainContents;
