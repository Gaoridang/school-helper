import { User } from "@supabase/supabase-js";
import { createClient } from "../utils/supabase/server";
import NoClass from "./NoClass";
import CreateTemplateBox from "../(home)/_components/CreateTemplateBox";
import StudentList from "../(home)/_components/StudentList";

interface Props {
  user: User;
}

const TeacherMainPage = async ({ user }: Props) => {
  const supabase = createClient();
  const { data } = await supabase
    .from("user_classes")
    .select("class_id, is_primary, classes(school, grade, class_number, id)")
    .eq("user_id", user.id);

  if (data?.length === 0) {
    return <NoClass href="/classes/create" description="아래 버튼을 눌러 학급을 개설해보세요!" />;
  }

  return (
    <div className="p-4 md:p-8">
      <section>
        <div className="grid gap-8">
          <div className="grid md:grid-cols-2 gap-8">
            <CreateTemplateBox />
            <StudentList />
          </div>
        </div>
      </section>
    </div>
  );
};

export default TeacherMainPage;
