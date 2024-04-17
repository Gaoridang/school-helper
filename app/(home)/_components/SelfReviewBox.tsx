import React from "react";
import LinkCard from "./LinkCard";
import MainTitle from "./MainTitle";
import Link from "next/link";
import { createClient } from "@/app/utils/supabase/server";
import MainBox from "./MainBox";

const SelfReviewBox = async () => {
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
    .eq("creator_id", user?.id!)
    .eq("class_id", mainClass?.class_id!)
    .order("start_date", { ascending: false })
    .limit(1)
    .single();

  const studentId = isStudent ? user?.id : linkedStudent?.student_id;

  const { data: reviews, error: reviewsError } = await supabase
    .from("session_results")
    .select("*")
    .in("evaluator_id", [studentId!])
    .in("evaluatee_id", [studentId!])
    .in("class_id", [mainClass?.class_id!])
    .order("session_date", { ascending: false });

  if (reviewsError) {
    console.error(reviewsError);
    return;
  }

  const mostRecentReviewUrl =
    reviews.length === 0 ? "/" : `/reviews/${user?.id}/${reviews[0].session_id}`;

  return (
    <MainBox>
      <div className="flex flex-col md:flex md:flex-row md:justify-between md:items-end">
        <MainTitle title="자기평가" description="매일 스스로 한 평가예요." />
        {isStudent && (
          <Link
            href={`/assessment/${mostRecentTemplate?.id}` || "/templates/new"}
            className="underline underline-offset-4 text-[#57BD9E] text-sm"
          >
            자기평가 시작하기
          </Link>
        )}
      </div>
      <LinkCard
        href={mostRecentReviewUrl}
        title="가장 최근 평가 보기"
        description={reviews.length > 0 ? reviews?.[0].session_date! : "아직 평가 결과가 없습니다."}
      />
      <LinkCard
        href={`/reviews/${user?.id}?type=self`}
        title="모든 평가 보기"
        description={`총 ${reviews.length.toString()}개` || "총 0개"}
      />
    </MainBox>
  );
};

export default SelfReviewBox;
