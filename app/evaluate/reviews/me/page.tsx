import PageTitle from "@/app/components/PageTitle";
import React from "react";
import ReviewList from "../_components/ReviewList";
import { createClient } from "@/app/utils/supabase/server";

const ResultsMePage = async () => {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <div className="p-4 md:p-8">
      <PageTitle title="자기평가 결과" description="클릭해서 댓글을 남겨주세요." />
      <ReviewList user={user} type="self" />
    </div>
  );
};

export default ResultsMePage;
