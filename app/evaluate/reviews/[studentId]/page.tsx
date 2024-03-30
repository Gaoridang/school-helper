import { createClient } from "@/app/utils/supabase/server";
import React from "react";
import ReviewList from "../_components/ReviewList";

interface Props {
  params: { studentId: string };
}

const StudentReviewsPage = async ({ params }: Props) => {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return <ReviewList user={user} studentId={params.studentId} />;
};

export default StudentReviewsPage;
