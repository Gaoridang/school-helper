import PageTitle from "@/app/components/PageTitle";
import CommentForm from "../_components/CommentForm";
import ReactCanvasConfetti from "../_components/ReactCanvasConfetti";

const AssessmentConfirmPage = () => {
  return (
    <div className="p-4 flex flex-col h-full justify-center items-center">
      <ReactCanvasConfetti />
      <PageTitle
        title="🎉 평가를 완료했습니다! 🎉"
        description="아래에 오늘의 한 줄 평을 남겨주세요!"
      />

      <CommentForm />
    </div>
  );
};

export default AssessmentConfirmPage;
