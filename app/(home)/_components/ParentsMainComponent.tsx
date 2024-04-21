import MainTitle from "./MainTitle";
import PeerReviewBox from "./PeerReviewBox";
import ScoreChartLoadingSkeleton from "./ScoreChartLoadingSkeleton";
import SelfReviewBox from "./SelfReviewBox";
import { createClient } from "../../utils/supabase/server";
import dynamic from "next/dynamic";
const ScoreChart = dynamic(() => import("./ScoreChart"), {
  ssr: false,
  loading: () => <ScoreChartLoadingSkeleton />,
});

const ParentsMainComponent = async () => {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return null;

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

export default ParentsMainComponent;
