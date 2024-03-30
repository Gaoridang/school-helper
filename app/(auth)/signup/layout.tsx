import { PropsWithChildren } from "react";
import PageTitle from "../../components/PageTitle";

const SignUpPageLayout = ({ children }: PropsWithChildren) => {
  return (
    <div className="grid gap-4 mt-5 max-w-md m-auto">
      <PageTitle title="환영합니다!" description="효율적인 학생 관리 도구를 사용해보세요 ✨" />
      {children}
    </div>
  );
};

export default SignUpPageLayout;
