"use client";

import React, { useState } from "react";
import OnboardingName from "./_components/name";
import OnboardingRole from "./_components/role";
import OnboardingImage from "./_components/image";
import { OnboardingProvider } from "./provider/OnboardingProvider";
import { Button } from "@/components/ui/button";

const OnboardingPage = () => {
  const [step, setStep] = useState(0);

  const renderStep = () => {
    switch (step) {
      case 0:
        return <OnboardingRole />;
      case 1:
        return <OnboardingName />;
      case 2:
        return <OnboardingImage />;
    }
  };

  return (
    <OnboardingProvider>
      <div className="h-screen md:p-6 p-4">
        <div>{renderStep()}</div>
        <div>
          {step !== 0 && (
            <Button
              className="absolute bottom-6 left-6 w-20"
              variant="outline"
              onClick={() => setStep((prev) => prev - 1)}
            >
              이전
            </Button>
          )}
          <Button
            className="absolute bottom-6 right-6 w-20"
            onClick={() => setStep((prev) => prev + 1)}
          >
            {step === 2 ? "완료" : "다음"}
          </Button>
        </div>
      </div>
    </OnboardingProvider>
  );
};

export default OnboardingPage;
