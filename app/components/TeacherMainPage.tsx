import { User } from "@supabase/supabase-js";
import SelectClass from "../(teacher)/components/SelectSchool";
import StudentList from "../(teacher)/components/StudentList";
import useSupabaseServer from "../utils/supabase/server";
import CheckCalendar from "./CheckCalendar";
import NoClass from "./NoClass";

interface Props {
  user: User;
}

const TeacherMainPage = async ({ user }: Props) => {
  const supabase = useSupabaseServer();
  const { data } = await supabase
    .from("user_classes")
    .select("class_id, is_primary, classes(school, grade, class_number, id)")
    .eq("user_id", user.id);

  if (data?.length === 0) {
    return <NoClass href="/classes/create" description="아래 버튼을 눌러 학급을 개설해보세요!" />;
  }

  return (
    <>
      <SelectClass data={data} />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="col-span-1">
          <CheckCalendar />
        </div>
        <div className="col-span-1">
          <StudentList />
        </div>
      </div>
    </>
  );
};

export default TeacherMainPage;
