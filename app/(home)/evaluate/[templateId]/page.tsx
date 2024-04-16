import PageTitle from "@/app/components/PageTitle";
import CreateAssessmentForm from "../../assessment/[templateId]/_components/CreateAssessmentForm";
import SelectStudent from "./_components/SelectStudent";
import { createClient } from "@/app/utils/supabase/server";

const EvalPage = async () => {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <div className="p-4 md:p-8 grid gap-4">
      <PageTitle title="✅ 평가지 제출" description="성취한 항목에 체크하세요." />
      <SelectStudent />
      <CreateAssessmentForm user={user} />
    </div>
  );
};

export default EvalPage;
