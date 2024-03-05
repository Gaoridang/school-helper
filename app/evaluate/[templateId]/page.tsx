import useSupabaseServer from "@/app/utils/supabase/server";
import EvalForm from "./_components/EvalForm";
import PageTitle from "@/app/components/PageTitle";
import SelectStudent from "./_components/SelectStudent";

interface Props {
  params: { templateId: string };
}

const EvalPage = async ({ params }: Props) => {
  const supabase = useSupabaseServer();

  const { data: evalItems, error } = await supabase
    .from("evaluation_items")
    .select("*")
    .eq("template_id", params.templateId);

  if (!evalItems || error) {
    return <div>항목이 없습니다.</div>;
  }

  return (
    <div>
      <PageTitle title="평가 제출하기" description="고고싱" />
      <SelectStudent />
      <EvalForm evalItems={evalItems} templateId={params.templateId} />
    </div>
  );
};

export default EvalPage;
