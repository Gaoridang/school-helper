import PageTitle from "@/app/components/PageTitle";
import { createClient } from "@/app/utils/supabase/server";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { LineChart } from "lucide-react";
import Link from "next/link";

interface Props {
  params: { sessionId: string };
}

const ReviewPages = async ({ params }: Props) => {
  const supabase = createClient();

  const { data } = await supabase
    .from("evaluation_session_view")
    .select("*")
    .eq("session_id", params.sessionId);

  return (
    <div>
      <LineChart className="text-indigo-500" />
      <PageTitle
        title="오늘의 내 점수"
        description="하루를 되돌아보며 더 나은 내일을 만들어 봅시다."
      />
      <div className="flex flex-col space-y-1 mb-4">
        {data?.map((item, index) => (
          <div key={item.content} className="flex items-center gap-2 border-b pb-2 mb-2">
            <span className="font-semibold opacity-50">{index + 1}.</span>
            <span className="text-lg">{item.content}</span>
            <Checkbox checked={item.is_passed!} className="data-[state=checked]:bg-indigo-700" />
          </div>
        ))}
      </div>
      <div>
        <Link href="/">
          <Button variant="outline">돌아가기</Button>
        </Link>
      </div>
    </div>
  );
};

export default ReviewPages;
