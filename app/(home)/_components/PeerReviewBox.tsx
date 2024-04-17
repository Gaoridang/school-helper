import React from "react";
import LinkCard from "./LinkCard";
import MainTitle from "./MainTitle";
import Link from "next/link";
import { createClient } from "@/app/utils/supabase/server";
import MainBox from "./MainBox";

const PeerReviewBox = async () => {
  const supabase = createClient();
  const {
    data: { user },
    error: AuthError,
  } = await supabase.auth.getUser();

  const isStudent = user?.user_metadata.role === "student";

  const { data: mainClass, error: mainClassError } = await supabase
    .from("user_class_details")
    .select("class_id")
    .eq("user_id", user?.id!)
    .eq("is_primary", true)
    .single();

  if (mainClassError) {
    console.error("mainClassError", mainClassError);
    return;
  }

  const { data: linkedStudent, error: linkedStudentError } = await supabase
    .from("students_parents")
    .select("student_id, student_code")
    .eq("parent_id", user?.id!)
    .eq("class_id", mainClass?.class_id!)
    .single();

  const { data: mostRecentTemplate, error: templateError } = await supabase
    .from("templates")
    .select("*")
    .neq("subject", "")
    .eq("class_id", mainClass?.class_id!)
    .order("start_date", { ascending: false })
    .limit(1)
    .single();

  if (templateError) {
    console.error("templateError", templateError);
    return;
  }

  const studentId = isStudent ? user?.id : linkedStudent?.student_id;

  const { data: reviews, error: reviewsError } = await supabase
    .from("session_results")
    .select("*")
    .not("evaluator_id", "eq", studentId!)
    .in("evaluatee_id", [studentId!])
    .in("class_id", [mainClass?.class_id!])
    .order("session_date", { ascending: false });

  if (reviewsError) {
    console.error("reviewsError", reviewsError);
    return;
  }

  const mostRecentReviewUrl =
    reviews.length === 0 ? "/" : `/reviews/${user?.id}/${reviews[0].session_id}`;

  return (
    <MainBox>
      <div className="flex flex-col md:flex md:flex-row md:justify-between md:items-end">
        <MainTitle title="동료평가" description="모둠 활동 후 동료가 한 평가예요." />
        {isStudent && (
          <Link
            href={`/assessment/${mostRecentTemplate?.id}`}
            className="underline underline-offset-4 text-[#57BD9E] text-sm"
          >
            동료평가 시작하기
          </Link>
        )}
      </div>
      <LinkCard
        href={mostRecentReviewUrl}
        title="가장 최근 평가 보기"
        description={reviews.length > 0 ? reviews?.[0].session_date! : "아직 평가 결과가 없습니다."}
      />
      <LinkCard
        href={`/reviews/${user?.id}?type=peer`}
        title="모든 평가 보기"
        description={`총 ${reviews.length}개`}
      />
    </MainBox>
  );
};

export default PeerReviewBox;
