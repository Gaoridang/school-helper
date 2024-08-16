import { Input } from "@/components/ui/input";
import React from "react";
import { useOnboarding } from "../../provider/OnboardingProvider";

const OnboardingName = () => {
  const { name, updateName } = useOnboarding();

  return (
    <div>
      <h2 className="mb-4 text-center text-xl font-bold">이름이 무엇인가요?</h2>
      <Input
        variant="borderBottom"
        placeholder="실명을 입력해 주세요."
        onChange={(e) => updateName(e.target.value)}
        value={name}
      />
    </div>
  );
};

export default OnboardingName;
