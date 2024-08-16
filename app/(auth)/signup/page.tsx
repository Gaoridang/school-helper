import PageTitle from "@/app/components/PageTitle";
import SignUpForm from "./SignUpForm";

const SignUpPage = () => {
  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <PageTitle title="회원가입" />
      <SignUpForm />
    </div>
  );
};

export default SignUpPage;
