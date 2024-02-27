import PageTitle from "../components/PageTitle";
import SignInForm from "./SignInForm";

const SignInPage = () => {
  return (
    <div className="max-w-md m-auto mt-5">
      <PageTitle title="로그인" description="로그인하고 다양한 기능을 이용해보세요 ⭐️" />
      <SignInForm />
    </div>
  );
};

export default SignInPage;
