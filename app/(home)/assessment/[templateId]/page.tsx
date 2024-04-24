import { createClient } from "@/app/utils/supabase/server";
import dynamic from "next/dynamic";
const CreateNewAssessmentForm = dynamic(() => import("../_components/CreateNewAssessmentForm"), {
  ssr: false,
  loading: () => <div>로딩 중...</div>,
});

interface Props {
  params: { templateId: string };
}

const CreateAssessmentPage = async ({ params }: Props) => {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("assessment_view")
    .select("*")
    .eq("template_id", params.templateId);

  if (error) {
    return <div>에러가 발생했습니다. {error.message}</div>;
  }

  return (
    <div className="pt-14 px-4 md:pt-20 md:px-12">
      <CreateNewAssessmentForm data={data} templateId={params.templateId} />
    </div>
  );
};

export default CreateAssessmentPage;
