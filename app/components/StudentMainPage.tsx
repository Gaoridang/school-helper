import { redirect } from "next/navigation";
import useSupabaseServer from "../utils/supabase/server";
import CheckCalendar from "./CheckCalendar";
import ReviewCalendar from "./ReviewCalender";

const StudentMainPage = async () => {
  const supabase = useSupabaseServer();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/signin");
  }

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="col-span-1">
          <CheckCalendar />
        </div>
        <div className="col-span-1">
          <ReviewCalendar />
        </div>
      </div>
    </>
  );
};

export default StudentMainPage;
