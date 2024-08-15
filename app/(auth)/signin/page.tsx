import PageTitle from "../../components/PageTitle";
import SignInForm from "./SignInForm";

const SignInPage = () => {
  return (
    <div className="flex flex-col justify-center items-center gap-4 h-screen">
      <PageTitle title="로그인" />
      <SignInForm />
    </div>
  );
};

export default SignInPage;
