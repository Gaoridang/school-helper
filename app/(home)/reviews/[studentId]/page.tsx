import ReviewList from "@/app/(home)/evaluate/reviews/_components/ReviewList";
import PageTitle from "@/app/components/PageTitle";
import { createClient } from "@/app/utils/supabase/server";

interface Props {
  params: { studentId: string };
}

const StudentReviewsPage = async ({ params }: Props) => {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <div className="pt-14 px-4 md:pt-20 md:px-12">
      <PageTitle title="전체 평가 결과" description="결과보기를 눌러서 내용을 확인해보세요!" />
      <ReviewList user={user} studentId={params.studentId} />
    </div>
  );
};

export default StudentReviewsPage;
