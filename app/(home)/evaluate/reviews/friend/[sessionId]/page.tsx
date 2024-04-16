import { createClient } from "@/app/utils/supabase/server";
import Review from "../../_components/Review";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import GoBackButton from "../../_components/GoBackButton";

interface Props {
  params: {
    sessionId: string;
  };
}

const ReviewDetailPage = async ({ params }: Props) => {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <div className="p-8 bg-white rounded-md">
      <Review sessionId={params.sessionId} />
      {/* <Comments session_id={params.sessionId} user={user} /> */}
      <GoBackButton />
    </div>
  );
};

export default ReviewDetailPage;
