import { BarChart, MessageCircle } from "lucide-react";
import Link from "next/link";
import LinkChild from "../(parents)/_components/LinkChild";
import ScoreChart from "../reviews/_components/ScoreChart";
import { createClient } from "../utils/supabase/server";
import ChildInfo from "../(parents)/_components/ChildInfo";

const ParentsMainPage = async () => {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return <LinkChild user={user} />;
  }

  return (
    <div className="p-4 md:p-8">
      <section>
        <h2 className="text-2xl font-semibold mb-10">
          <p className="font-light mb-2">평가를 바탕으로</p>
          <p className="text-3xl">아이와 대화해요 👋</p>
        </h2>
        <h3 className="text-lg font-semibold text-slate-800 mb-2">결과보기</h3>
        <div className="grid grid-cols-12 gap-[20px]">
          <Link
            href="/"
            className="col-span-12 md:col-span-4 h-[100px] min-h-[100px] flex flex-col justify-center items-center rounded-xl text-lg text-slate-900 border"
          >
            <ChildInfo user={user} />
          </Link>
          <Link
            href="/evaluate/reviews/me"
            className="col-span-12 md:col-span-4 h-[100px] min-h-[100px] flex flex-col justify-center items-center rounded-xl bg-[#F1EEE9] text-lg text-slate-900"
          >
            <div className="flex items-center">
              <BarChart className="mr-2 opacity-60" /> <span>자기평가</span>
            </div>
            <p className="text-sm text-center text-slate-800 opacity-50 mt-2">
              매일 하는 자기평가
              <br />
              결과를 확인하세요.
            </p>
          </Link>
          <Link
            href="/evaluate/reviews/friend"
            className="col-span-12 md:col-span-4 h-[100px] min-h-[100px] flex flex-col justify-center items-center rounded-xl bg-[#E6F5FA] text-lg text-slate-900"
          >
            <div className="flex items-center">
              <MessageCircle className="mr-2 opacity-60" /> <span>동료평가</span>
            </div>
            <p className="text-sm text-center text-slate-800 opacity-50 mt-2">
              친구가 보낸 평가를
              <br />
              확인하세요.
            </p>
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

export default ParentsMainPage;
