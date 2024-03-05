import useSupabaseServer from "@/app/utils/supabase/server";
import { cookies } from "next/headers";
import PageTitle from "@/app/components/PageTitle";
import EvalSelfForm from "./EvalSelfForm";

interface Props {
  params: { templateId: string };
}

const EvalSelfPage = async ({ params }: Props) => {
  const supabase = useSupabaseServer();

  const { data: evalItems, error } = await supabase
    .from("evaluation_items")
    .select("*")
    .eq("template_id", params.templateId);

  if (error) {
    return <div>평가 항목을 불러오지 못했습니다. 다시 시도해주세요.</div>;
  }

  return (
    <>
      <PageTitle title="오늘의 😀는 어땠나요?" description="정성껏 하루를 되돌아보아요." />
      {evalItems && <EvalSelfForm evalItems={evalItems} templateId={params.templateId} />}
    </>
  );
};

export default EvalSelfPage;
