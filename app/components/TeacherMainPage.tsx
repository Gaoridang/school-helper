import CreateTemplateBox from "../(home)/_components/CreateTemplateBox";
import StudentList from "../(home)/_components/StudentList";
import { createClient } from "../utils/supabase/server";
import NoClass from "./NoClass";

const TeacherMainPage = async () => {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data } = await supabase.from("user_classes").select("class_id").eq("user_id", user?.id!);

  if (!data || !data.length) {
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
