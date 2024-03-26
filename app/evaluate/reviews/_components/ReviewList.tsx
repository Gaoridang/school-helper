"use client";

import { useClass } from "@/app/(teacher)/hooks/useClass";
import { Tables } from "@/app/types/schema";
import { fetchLinkedStudent } from "@/app/utils/fetchLinkedStudent";
import { fetchReviews } from "@/app/utils/fetchReviews";
import { User } from "@supabase/supabase-js";
import Link from "next/link";
import { useEffect, useState } from "react";

interface Props {
  user: User | null;
  type: "self" | "peer";
}

const ReviewList = ({ user, type }: Props) => {
  const [sessions, setSessions] = useState<Tables<"session_evaluation_summary">[]>();
  const { selectedClassId } = useClass();
  const urlType = type === "self" ? "me" : "friend";

  useEffect(() => {
    if (!user || !selectedClassId) return;

    const getReviewData = async () => {
      if (user.user_metadata.role === "parents") {
        const linkedStudent = await fetchLinkedStudent(user);
        if (linkedStudent) {
          const reviews = await fetchReviews(selectedClassId, linkedStudent.student_id, type);
          setSessions(reviews);
        }
      } else {
        const reviews = await fetchReviews(selectedClassId, user.id, type);
        setSessions(reviews);
      }
    };
    getReviewData();
  }, [selectedClassId, user, type]);

  const groupReviewsByMonth = () => {
    const groupedReviews: { [month: string]: Tables<"session_evaluation_summary">[] } = {};

    sessions?.forEach((review) => {
      const month = new Date(review.date!).toLocaleString("default", { month: "long" });
      if (!groupedReviews[month]) {
        groupedReviews[month] = [];
      }
      groupedReviews[month].push(review);
    });

    return groupedReviews;
  };

  const groupedReviews = groupReviewsByMonth();

  return (
    <div>
      {Object.entries(groupedReviews).map(([month, monthReviews]) => (
        <div key={month} className="relative">
          <h3 className="w-12 h-12 rounded-full bg-pastel-green-100 flex justify-center items-center p-2 text-sm">
            {month}
          </h3>
          <div className="ml-6 border-l flex flex-col gap-4 relative">
            {monthReviews.map((review) => (
              <Link
                href={`/evaluate/reviews/${urlType}/${review.session_id}`}
                key={review.session_id}
                className="relative shadow-none border-none"
              >
                <div className="pl-4 relative flex items-center gap-4 before:absolute before:left-0 before:top-1/4 before:content-['_'] before:w-[6px] before:h-1/2 before:rounded-r-2xl before:bg-[#C8DD9D]">
                  <h4 className="text-muted-foreground text-xl font-semibold after:content-['일'] after:text-sm after:font-light after:ml-1">
                    {review.date?.split("-")[2]}
                  </h4>
                  <div className="text-slate-900 p-3 border rounded-lg">
                    {review.total_passed}점
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ReviewList;
