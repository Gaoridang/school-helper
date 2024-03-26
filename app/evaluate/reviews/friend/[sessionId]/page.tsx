import { format } from "date-fns";
import Comments from "../../_components/Comments";
import Review from "../../_components/Review";
import { createClient } from "@/app/utils/supabase/server";

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
      <Comments session_id={params.sessionId} user={user} />
    </div>
  );
};

export default ReviewDetailPage;
