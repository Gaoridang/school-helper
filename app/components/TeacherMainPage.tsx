import { User } from "@supabase/supabase-js";
import StudentList from "../(teacher)/components/StudentList";
import { createClient } from "../utils/supabase/server";
import NoClass from "./NoClass";
import MainLink from "./main/MainLink";

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
        <h2 className="text-2xl font-semibold mb-10">
          <p className="font-light mb-2">Nice to meet</p>
          <p className="text-3xl">You 👋</p>
        </h2>
        <h3 className="text-lg font-semibold text-slate-800 mb-2">점검하기</h3>
        <div className="grid grid-cols-12 gap-[20px]">
          <MainLink
            href="/evaluate/friend/new"
            classNames="bg-[#D5E7F4]"
            title="평가지 제작"
            description="새로운 평가지를 만들어보세요."
            slice={8}
          />
          <MainLink
            href="/evaluate/friend"
            classNames="bg-[#D0E0D1]"
            title="평가지 조회"
            description="만들어 둔 평가지를 확인해보세요."
            slice={10}
          />
          <div className="col-span-12">
            <h3 className="text-lg font-semibold text-slate-800 mb-2">학생목록</h3>
            <StudentList />
          </div>
        </div>
      </section>
    </div>
  );
};

export default TeacherMainPage;
