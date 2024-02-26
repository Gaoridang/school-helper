import { PropsWithChildren } from "react";

const SignUpPageLayout = ({ children }: PropsWithChildren) => {
  return (
    <div className="grid gap-4 mt-5 max-w-md m-auto">
      <h1 className="text-2xl font-semibold">환영합니다!</h1>
      <p className="text-slate-600">효율적인 학생 관리 도구를 사용해보세요 ✨</p>
      {children}
    </div>
  );
};

export default SignUpPageLayout;
