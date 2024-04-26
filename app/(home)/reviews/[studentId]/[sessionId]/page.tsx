import PageTitle from "@/app/components/PageTitle";
import { createClient } from "@/app/utils/supabase/server";
import Comments from "../../_components/Comments";
import dynamic from "next/dynamic";
import ReviewItem from "../../_components/ReviewItem";
import BreadCrumb from "../../_components/BreadCrumb";
const EvaluatorToEvaluatee = dynamic(() => import("../../_components/EvaluatorToEvaluatee"), {
  ssr: false,
});

interface Props {
  params: { sessionId: string };
}

const ReviewPages = async ({ params }: Props) => {
  const supabase = createClient();

  const { data, error: resultError } = await supabase
    .from("review_results_view")
    .select("*")
    .eq("session_id", params.sessionId);

  if (resultError) {
    console.error(resultError);
    return;
  }

  const evaluator = data[0].evaluator_name!;
  const evaluatee = data[0].evaluatee_name!;

  return (
    <div className="pt-14 px-4 md:pt-20 md:px-12">
      <BreadCrumb />
      <PageTitle title="나의 하루" description="하루를 되돌아보며\n더 나은 내일을 만들어 봅시다." />
      <EvaluatorToEvaluatee evaluatee={evaluatee} evaluator={evaluator} />
      <div className="flex flex-col gap-3 my-4">
        {data.map((item) => (
          <ReviewItem key={item.item_id} item={item} />
        ))}
      </div>
      <Comments sessionId={params.sessionId} />
    </div>
  );
};

export default ReviewPages;
