import React from "react";
import ScoreChart from "./_components/ScoreChart";
import useSupabaseServer from "../utils/supabase/server";

const ReviewDetailPage = async () => {
  const supabase = useSupabaseServer();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return null;
  }

  return (
    <div className="grid md:grid-cols-2 ">
      <ScoreChart user={user} />
    </div>
  );
};

export default ReviewDetailPage;
