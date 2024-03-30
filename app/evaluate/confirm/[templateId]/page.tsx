import { CheckCircle } from "lucide-react";
import ActionButton from "./_components/AcionButton";
import RedirectButton from "./_components/RedirectButton";

interface Props {
  params: { templateId: string };
}

const EvalPage = async ({ params }: Props) => {
  return (
    <div className="m-auto max-w-2xl mt-5 flex flex-col justify-center items-center">
      <CheckCircle className="w-8 h-8 text-indigo-500 mb-2" />
      <h1 className="text-2xl">
        평가지 생성이 <br /> 완료되었습니다!
      </h1>
      <div className="flex space-x-2 mt-5">
        <RedirectButton />
        <ActionButton templateId={params.templateId}>평가하러 가기</ActionButton>
      </div>
    </div>
  );
};

export default EvalPage;
