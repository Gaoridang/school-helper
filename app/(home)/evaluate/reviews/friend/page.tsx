import PageTitle from "@/app/components/PageTitle";
import { createClient } from "@/app/utils/supabase/server";
import React from "react";
import ReviewList from "../_components/ReviewList";

const ResultsFriendPage = async () => {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <div className="p-4 md:p-8">
      <PageTitle title="동료평가 결과" description="클릭해서 댓글을 남겨주세요." />
      <ReviewList user={user} type="peer" />
    </div>
  );
};

export default ResultsFriendPage;
