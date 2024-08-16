"use client";

import React, { PropsWithChildren } from "react";
import { OnboardingProvider } from "./provider/OnboardingProvider";

const OnboardingLayout = ({ children }: PropsWithChildren) => {
  return <OnboardingProvider>{children}</OnboardingProvider>;
};

export default OnboardingLayout;
