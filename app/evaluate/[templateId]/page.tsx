import PageTitle from "@/app/components/PageTitle";
import useSupabaseServer from "@/app/utils/supabase/server";
import { Button } from "@/components/ui/button";
import { CheckCircle } from "lucide-react";
import Link from "next/link";
import { getSubjectName } from "../getSubjectName";
import ActionButton from "./_components/AcionButton";
import EvalItemList from "./_components/EvalItemList";

interface Props {
  params: { templateId: string };
}

const EvalPage = async ({ params }: Props) => {
  const supabase = useSupabaseServer();

  const { data: evalItems, error } = await supabase
    .from("evaluation_items")
    .select("*")
    .eq("template_id", params.templateId);

  console.log(evalItems);

  return (
    <div className="m-auto max-w-2xl mt-5">
      <CheckCircle className="w-8 h-8 text-indigo-500 mb-2" />
      <h1 className="text-2xl">
        평가지 생성이 <br /> 완료되었습니다!
      </h1>
      <div className="px-4 pb-5 mt-4 rounded-md border-2 border-indigo-500 bg-slate-50">
        <PageTitle title="오늘의 😀는 어땠나요?" />
        {evalItems ? (
          <>
            <p>{`${evalItems[0].date} ${getSubjectName(evalItems[0].subject_name)} ${evalItems[0].period}`}</p>
            <EvalItemList evalItems={evalItems} disabled={true} />
          </>
        ) : (
          "항목이 없습니다."
        )}
      </div>
      <div className="flex space-x-2 mt-5">
        <Link href="/evaluate">
          <Button variant="secondary">목록으로 가기</Button>
        </Link>
        <ActionButton templateId={params.templateId}>평가하러 가기</ActionButton>
      </div>
    </div>
  );
};

export default EvalPage;
