import { User } from "@supabase/supabase-js";
import { ClipboardPlus, ListChecks } from "lucide-react";
import Link from "next/link";
import StudentList from "../(teacher)/components/StudentList";
import { createClient } from "../utils/supabase/server";
import NoClass from "./NoClass";

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
          <Link
            href="/evaluate/friend/new"
            className="col-span-12 md:col-span-6 h-[100px] min-h-[100px] flex flex-col justify-center items-center border rounded-xl bg-white text-lg text-green-600 border-green-600/20 hover:bg-green-50 transition-colors"
          >
            <div className="flex items-center">
              <ClipboardPlus className="mr-2 opacity-60" /> <span>평가지 제작</span>
            </div>
            <p className="text-sm text-slate-800 opacity-50 mt-2">새로운 평가지를 만들어보세요.</p>
          </Link>
          <Link
            href="/evaluate/friend"
            className="col-span-12 md:col-span-6 h-[100px] min-h-[100px] flex flex-col justify-center items-center border rounded-xl bg-white text-lg text-purple-500 border-purple-500/20 hover:bg-purple-50 transition-colors"
          >
            <div className="flex items-center">
              <ListChecks className="mr-2 opacity-60" /> <span>평가지 조회</span>
            </div>
            <p className="text-sm text-slate-800 opacity-50 mt-2">
              만들어 둔 평가지를 확인해보세요.
            </p>
          </Link>
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
