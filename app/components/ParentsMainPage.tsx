import Link from "next/link";
import ChildInfo from "../(parents)/_components/ChildInfo";
import LinkChild from "../(parents)/_components/LinkChild";
import ScoreChart from "../reviews/_components/ScoreChart";
import { createClient } from "../utils/supabase/server";
import MainLink from "./main/MainLink";

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
          <MainLink
            href="/evaluate/reviews/me"
            classNames="bg-[#ffefd9]"
            title="자기평가"
            description="매일 하는 자기평가 결과를 확인하세요."
            slice={10}
          />
          <MainLink
            href="/evaluate/reviews/friend"
            classNames="bg-[#eafae0]"
            title="동료평가"
            description="친구들이 보낸 평가를 확인하세요."
            slice={10}
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

export default ParentsMainPage;
