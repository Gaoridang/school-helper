import PageTitle from "@/app/components/PageTitle";
import EvalForm from "./_components/EvalForm";
import SelectStudent from "./_components/SelectStudent";

const EvalPage = async () => {
  return (
    <div className="p-4 md:p-8 grid gap-4">
      <PageTitle title="✅ 평가지 제출" description="성취한 항목에 체크하세요." />
      <SelectStudent />
      <EvalForm />
    </div>
  );
};

export default EvalPage;
