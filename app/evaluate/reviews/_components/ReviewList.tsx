"use client";

import { useClass } from "@/app/(teacher)/hooks/useClass";
import { Tables } from "@/app/types/schema";
import { fetchLinkedStudent } from "@/app/utils/fetchLinkedStudent";
import { fetchReviews } from "@/app/utils/fetchReviews";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { User } from "@supabase/supabase-js";
import Link from "next/link";
import { useEffect, useState } from "react";

interface Props {
  user: User | null;
  type?: "self" | "peer";
  studentId?: string;
}

const ReviewList = ({ user, type, studentId }: Props) => {
  const [sessions, setSessions] = useState<Tables<"session_evaluation_summary">[]>();
  const { selectedClassId } = useClass();

  useEffect(() => {
    if (!user || !selectedClassId) return;

    const getReviewData = async () => {
      if (user.user_metadata.role === "parents") {
        const linkedStudent = await fetchLinkedStudent(user, selectedClassId);
        if (linkedStudent) {
          const reviews = await fetchReviews(selectedClassId, linkedStudent.student_id, type);
          setSessions(reviews);
        }
      } else if (studentId) {
        const reviews = await fetchReviews(selectedClassId, studentId);
        setSessions(reviews);
      } else {
        const reviews = await fetchReviews(selectedClassId, user.id, type);
        setSessions(reviews);
      }
    };
    getReviewData();
  }, [selectedClassId, user, type, studentId]);

  const groupReviewsByMonth = () => {
    const groupedReviews: { [month: string]: Tables<"session_evaluation_summary">[] } = {};

    sessions?.forEach((review) => {
      const month = new Date(review.start_time!).toLocaleString("default", { month: "long" });
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
        <div key={month} className="relative p-4">
          <h3 className="px-4 py-2 bg-gray-100 text-sm font-semibold">{month}</h3>
          <Table>
            <TableHeader className="bg-gray-100">
              <TableRow>
                <TableHead>날짜</TableHead>
                <TableHead>점수</TableHead>
                <TableHead>한 줄 평</TableHead>
                <TableHead>결과 보기</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {monthReviews.map((review, index) => (
                <TableRow key={index}>
                  <TableCell>{review.start_time?.split("-")[2].split("T")[0]}일</TableCell>
                  <TableCell>{review.total_passed}점</TableCell>
                  <TableCell>{review.first_comment}</TableCell>
                  <TableCell>
                    <Link
                      href={`/evaluate/reviews/${review.type === "self" ? "me" : "friend"}/${review.session_id}`}
                      className="text-primary underline"
                    >
                      결과 보기
                    </Link>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      ))}
    </div>
  );
};

export default ReviewList;
