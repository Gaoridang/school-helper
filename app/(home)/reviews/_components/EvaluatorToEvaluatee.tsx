"use client";

import Lottie from "react-lottie-player";
import ArrowRight from "@/public/arrowRight.json";

interface Props {
  evaluator: string;
  evaluatee: string;
}

const EvaluatorToEvaluatee = ({ evaluatee, evaluator }: Props) => {
  if (evaluator === evaluatee) return;

  return (
    <div className="flex gap-1 items-center">
      <span className="pt-1 text-sm">{evaluator}</span>
      <Lottie loop animationData={ArrowRight} play className="w-7 h-7" />
      <span className="pt-1 text-sm">{evaluatee}</span>
    </div>
  );
};

export default EvaluatorToEvaluatee;
