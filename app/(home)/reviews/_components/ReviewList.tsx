"use client";

import useClassStore from "@/app/(home)/store/classStore";
import { Tables } from "@/app/types/schema";
import { fetchLinkedStudent } from "@/app/utils/fetchLinkedStudent";
import { fetchReviews } from "@/app/utils/fetchReviews";
import { Button } from "@/components/ui/button";
import { User } from "@supabase/supabase-js";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

interface Props {
  user: User | null;
  studentId?: string;
}

type ReviewType = Pick<
  Tables<"session_results">,
  "session_id" | "session_date" | "total_passed" | "first_comment"
>;

const ReviewList = ({ user, studentId }: Props) => {
  const [sessions, setSessions] = useState<ReviewType[]>();
  const selectedClassId = useClassStore((state) => state.classId);
  const searchParams = useSearchParams();
  const type = searchParams.get("type") as "self" | "peer";

  useEffect(() => {
    if (!user || !selectedClassId) return;

    const getReviewData = async () => {
      if (user.user_metadata.role === "parents") {
        const linkedStudent = await fetchLinkedStudent(user, selectedClassId);
        if (linkedStudent) {
          const reviews = await fetchReviews(linkedStudent.student_id, selectedClassId, type);
          setSessions(reviews);
        }
      } else if (studentId) {
        const reviews = await fetchReviews(studentId, selectedClassId, type);
        setSessions(reviews);
      } else {
        const reviews = await fetchReviews(user.id, selectedClassId, type);
        setSessions(reviews);
      }
    };
    getReviewData();
  }, [selectedClassId, user, studentId, type]);

  const groupReviewsByMonth = () => {
    const groupedReviews: { [month: string]: ReviewType[] } = {};

    sessions?.forEach((review) => {
      const month = new Date(review.session_date!).toLocaleString("default", { month: "long" });
      if (!groupedReviews[month]) {
        groupedReviews[month] = [];
      }
      groupedReviews[month].push(review);
    });

    return groupedReviews;
  };

  const groupedReviews = groupReviewsByMonth();

  return (
    <div className="max-w-4xl">
      {Object.entries(groupedReviews).map(([month, monthReviews]) => (
        <div key={month} className="relative">
          <h3 className="text-lg font-semibold">{month}</h3>
          <div className="space-y-4">
            {monthReviews.map((review) => (
              <div
                key={review.session_id}
                className="grid grid-cols-4 gap-2 border-b mb-2 font-light text-sm items-center"
              >
                <span>{review.session_date?.split("-")[2]}일</span>
                <span>{review.total_passed}점</span>
                <span>{review.first_comment}</span>
                <Link href={`/reviews/${studentId}/${review.session_id}`}>
                  <Button variant="link" className="text-[#57BD9E] underline underline-offset-4">
                    결과보기
                  </Button>
                </Link>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ReviewList;
