import { createClient } from "../utils/supabase/server";
import ScoreChart from "./_components/ScoreChart";

const ReviewDetailPage = async () => {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return <ScoreChart user={user} />;
};

export default ReviewDetailPage;
