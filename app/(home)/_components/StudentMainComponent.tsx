import Link from "next/link";
import MainTitle from "./MainTitle";
import PeerReviewBox from "./PeerReviewBox";
import SelfReviewBox from "./SelfReviewBox";
import { createClient } from "../../utils/supabase/server";
import dynamic from "next/dynamic";
import ScoreChartLoadingSkeleton from "./ScoreChartLoadingSkeleton";
import { Button } from "@/components/ui/button";
const ScoreChart = dynamic(() => import("./ScoreChart"), {
  ssr: false,
  loading: () => <ScoreChartLoadingSkeleton />,
});

const StudentMainComponent = async () => {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return null;

  const { data } = await supabase.from("user_classes").select("class_id").eq("user_id", user?.id!);

  if (!data || !data.length) {
    return (
      <div className="h-screen flex flex-col justify-center items-center">
        <p className="text-xl font-bold mb-4">새로운 학급에 가입해 보세요!</p>
        <Link href="/classes/register">
          <Button>학급 가입하기</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-8">
      <section>
        <div className="grid gap-8">
          <div className="grid md:grid-cols-2 gap-8">
            <SelfReviewBox />
            <PeerReviewBox />
          </div>
          <div className="grid gap-4">
            <MainTitle
              title="성취 그래프"
              description="선택한 기간의 자기평가 점수를\n그래프로 확인하세요."
            />
            <ScoreChart user={user} />
          </div>
        </div>
      </section>
    </div>
  );
};

export default StudentMainComponent;
