import { BarChart, MessageCircle, SquareGantt } from "lucide-react";
import Link from "next/link";
import ScoreChart from "../reviews/_components/ScoreChart";
import { createClient } from "../utils/supabase/server";

const StudentMainPage = async () => {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

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
            href="/evaluate/me"
            className="col-span-12 md:col-span-4 h-[100px] min-h-[100px] flex flex-col justify-center items-center border rounded-xl bg-white text-lg text-green-600 border-green-600/20 hover:bg-green-50 transition-colors"
          >
            <div className="flex items-center">
              <BarChart className="mr-2 opacity-60" /> <span>나에게</span>
            </div>
            <p className="text-sm text-slate-800 opacity-50 mt-2">오늘의 나는 어땠나요?</p>
          </Link>
          <Link
            href="/evaluate/friend"
            className="col-span-12 md:col-span-4 h-[100px] min-h-[100px] flex flex-col justify-center items-center border rounded-xl bg-white text-lg text-purple-500 border-purple-500/20 hover:bg-purple-50 transition-colors"
          >
            <div className="flex items-center">
              <MessageCircle className="mr-2 opacity-60" /> <span>친구에게</span>
            </div>
            <p className="text-sm text-slate-800 opacity-50 mt-2">
              내 친구에 대한 생각을 말해봐요.
            </p>
          </Link>
          <Link
            href=""
            className="col-span-12 md:col-span-4 h-[100px] min-h-[100px] flex flex-col justify-center items-center border rounded-xl bg-white text-lg text-amber-900 border-amber-900/20 hover:bg-amber-50 transition-colors"
          >
            <div className="flex items-center">
              <SquareGantt className="mr-2 opacity-60" /> <span>전체 보기</span>
            </div>
            <p className="text-sm text-slate-800 opacity-50 mt-2">나에게 온 편지를 확인하세요!</p>
          </Link>
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
