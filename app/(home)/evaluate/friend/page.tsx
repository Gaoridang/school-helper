import PeerReviews from "@/app/components/main/PeerReviews";
import PageTitle from "@/app/components/PageTitle";
import { createClient } from "@/app/utils/supabase/server";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const EvaluateFriendPage = async () => {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const title = user?.user_metadata.student ? "✨ 친구에게 보내기" : "✨ 평가지 목록";

  return (
    <div className="p-4 md:p-8">
      <PageTitle title={title} />
      <Link href="/">
        <Button variant="outline" className="mb-2">
          돌아가기
        </Button>
      </Link>
      <PeerReviews />
    </div>
  );
};

export default EvaluateFriendPage;
