import { User } from "@supabase/supabase-js";
import SelectSchool from "../(teacher)/components/SelectSchool";
import useSupabaseServer from "../utils/supabase/server";
import CheckCalendar from "./CheckCalendar";
import ReviewCalendar from "./ReviewCalender";

interface Props {
  user: User;
}

const TeacherMainPage = async ({ user }: Props) => {
  const supabase = useSupabaseServer();
  const { data } = await supabase
    .from("user_classes")
    .select("class_id, is_primary, classes(school, grade, class_number, id)")
    .eq("user_id", user.id);

  return (
    <>
      <SelectSchool data={data} />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="col-span-1">
          <CheckCalendar />
        </div>
        <div>
          <ReviewCalendar />
        </div>
      </div>
    </>
  );
};

export default TeacherMainPage;
