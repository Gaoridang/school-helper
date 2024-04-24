import PageTitle from "@/app/components/PageTitle";
import { createClient } from "@/app/utils/supabase/server";
import { Checkbox } from "@/components/ui/checkbox";
import Comments from "../../_components/Comments";

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

  return (
    <div className="pt-14 px-4 md:pt-20 md:px-12">
      <PageTitle
        title="오늘의 내 점수"
        description="하루를 되돌아보며\n더 나은 내일을 만들어 봅시다."
      />
      <div className="flex flex-col space-y-1 my-4">
        {data.map((item, index) => (
          <div key={index} className="flex items-center gap-2 border-b pb-2 mb-2">
            <span className="font-light">{index + 1}.</span>
            <span>{item.content}</span>
            <Checkbox checked={item.is_passed!} className="pointer-events-none" />
          </div>
        ))}
      </div>
      <Comments sessionId={params.sessionId} />
    </div>
  );
};

export default ReviewPages;
