import { BarChart, FileText, MessageCircle, SquareGantt } from "lucide-react";
import Link from "next/link";
import ScoreChart from "../reviews/_components/ScoreChart";
import { createClient } from "../utils/supabase/server";
import MainLink from "./main/MainLink";

const StudentMainPage = async () => {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data } = await supabase.from("user_classes").select("class_id").eq("user_id", user?.id!);

  if (!data || !data.length) {
    return (
      <div>
        <p>아무 학급에도 속해있지 않습니다.</p>
        <Link href="/classes/register">학급 가입하기</Link>
      </div>
    );
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
            href="/evaluate/me"
            classNames="bg-[#ffefd9]"
            title="나에게"
            description="오늘의 나는 어땠나요?"
            slice={6}
          />
          <MainLink
            href="/evaluate/friend"
            classNames="bg-[#e3f3da]"
            title="친구에게"
            description="친구에 대한 생각을 말해봐요."
            slice={6}
          />
          <MainLink
            href={`/evaluate/reviews/${user?.id}`}
            classNames="bg-[#f4edf8]"
            title="전체보기"
            description="나에게 온 편지를 확인하세요!"
            slice={9}
          />
          <div className="col-span-12">
            <h3 className="text-lg font-semibold text-slate-800 mb-2">점수보기</h3>
            <ScoreChart user={user} />
          </div>
        </div>
      </section>
    </div>
  );
};

export default StudentMainPage;
