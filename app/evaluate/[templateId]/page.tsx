import PageTitle from "@/app/components/PageTitle";
import EvalForm from "./_components/EvalForm";
import SelectStudent from "./_components/SelectStudent";

const EvalPage = async () => {
  return (
    <div className="p-4 md:p-8 h-full grid grid-rows-[auto_1fr]">
      <PageTitle title="평가 제출하기" description="고고싱" />
      <SelectStudent />
      <EvalForm />
    </div>
  );
};

export default EvalPage;
