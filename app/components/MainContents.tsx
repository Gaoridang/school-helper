import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import useSupabaseServer from "../utils/supabase/server";

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
    return <div>선생님 메인 페이지</div>;
  }

  return <div>학생 메인 페이지</div>;
};

export default MainContents;
