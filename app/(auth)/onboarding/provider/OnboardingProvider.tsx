import React, { createContext, useState, useContext, PropsWithChildren } from "react";

type OnboardingContextType = {
  name: string;
  role: string;
  image: string | null;
  detail: string | null;
  updateName: (newName: string) => void;
  updateRole: (newRole: string) => void;
  updateImage: (newImage: string | null) => void;
  updateDetail: (newDetail: string | null) => void;
};

// Context 생성
const OnboardingContext = createContext<OnboardingContextType>({
  name: "",
  role: "",
  image: null,
  detail: null,
  updateName: () => {},
  updateRole: () => {},
  updateImage: () => {},
  updateDetail: () => {},
});

// Provider 컴포넌트
export const OnboardingProvider = ({ children }: PropsWithChildren) => {
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [image, setImage] = useState<string | null>(null);
  const [detail, setDetail] = useState<string | null>(null);

  const updateName = (newName: string) => setName(newName);
  const updateRole = (newRole: string) => setRole(newRole);
  const updateImage = (newImage: string | null) => setImage(newImage);
  const updateDetail = (newDetail: string | null) => setDetail(newDetail);

  const value = {
    name,
    role,
    image,
    detail,
    updateName,
    updateRole,
    updateImage,
    updateDetail,
  };

  return <OnboardingContext.Provider value={value}>{children}</OnboardingContext.Provider>;
};

// Custom hook for using the context
export const useOnboarding = () => {
  const context = useContext(OnboardingContext);
  if (context === undefined) {
    throw new Error("useOnboarding must be used within an OnboardingProvider");
  }
  return context;
};
