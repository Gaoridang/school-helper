import PageTitle from "@/app/components/PageTitle";
import SignUpForm from "./SignUpForm";

const SignUpPage = () => {
  return (
    <div className="p-4 max-w-xl m-auto flex flex-col">
      <PageTitle title="환영합니다!" description="효율적인 학생 관리 도구를 사용해보세요 ✨" />
      <SignUpForm />
    </div>
  );
};

export default SignUpPage;
