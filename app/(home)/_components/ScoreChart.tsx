"use client";

import { fetchLinkedStudent } from "@/app/utils/fetchLinkedStudent";
import { fetchReviewsByDateRange } from "@/app/utils/fetchReviewsByDateRange";
import { Card, CardContent, CardDescription, CardHeader } from "@/components/ui/card";
import { User } from "@supabase/supabase-js";
import { format, subBusinessDays } from "date-fns";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis } from "recharts";
import { CalendarDateRangePicker } from "../reviews/_components/CalendarDateRangePicker";
import { Tables } from "@/app/types/schema";
import useClassStore from "@/app/(home)/store/classStore";

// Override console.error
// This is a hack to suppress the warning about missing defaultProps in recharts library as of version 2.12
// @link https://github.com/recharts/recharts/issues/3615
const error = console.error;
console.error = (...args: any) => {
  if (/defaultProps/.test(args[0])) return;
  error(...args);
};

interface Props {
  user: User;
}

const ScoreChart = ({ user }: Props) => {
  const selectedClassId = useClassStore((state) => state.classId);
  const [isLoading, setIsLoading] = useState(true);
  const [reviews, setReviews] = useState<Tables<"session_results">[]>([]);
  const searchParams = useSearchParams();

  useEffect(() => {
    const startDate =
      searchParams.get("from") || format(subBusinessDays(Date.now(), 5), "yyyy-MM-dd");
    const endDate = searchParams.get("to") || format(Date.now(), "yyyy-MM-dd");

    if (!selectedClassId || !user) return;

    const getReviewsByDateRange = async () => {
      if (user.user_metadata.role === "parents") {
        const linkedStudent = await fetchLinkedStudent(user, selectedClassId);
        if (linkedStudent) {
          const reviews = await fetchReviewsByDateRange(
            selectedClassId,
            linkedStudent.student_id,
            startDate,
            endDate,
          );
          setReviews(reviews);
          setIsLoading(false);
        }
      } else {
        const reviews = await fetchReviewsByDateRange(selectedClassId, user.id, startDate, endDate);
        setReviews(reviews);
        setIsLoading(false);
      }
    };
    getReviewsByDateRange();
  }, [selectedClassId, user, searchParams]);

  if (isLoading || !reviews.length)
    return (
      <Card>
        <CardHeader>
          <CalendarDateRangePicker />
        </CardHeader>
        <CardContent>
          <CardDescription>해당 기간에 데이터가 없습니다.</CardDescription>
        </CardContent>
      </Card>
    );

  return (
    <Card>
      <CardHeader>
        <CalendarDateRangePicker />
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={200}>
          <LineChart
            data={reviews.filter((review) => !review.subject)}
            margin={{
              top: 10,
              right: 15,
              left: 15,
              bottom: 0,
            }}
          >
            <XAxis
              dataKey=""
              tickLine={false}
              axisLine={false}
              dy={30}
              height={60}
              tick={{ fontSize: "14px", opacity: 0.7 }}
            />
            <Tooltip
              content={({ active, payload }) => {
                if (active && payload && payload.length) {
                  return (
                    <div className="rounded-lg border bg-background p-2 shadow-sm">
                      <div className="grid grid-cols-2 gap-2">
                        <div className="flex flex-col">
                          <span className="text-[0.70rem] uppercase text-muted-foreground">
                            총점
                          </span>
                          <span className="font-bold text-muted-foreground">
                            {payload[0].value}점
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                }

                return null;
              }}
            />
            <Line
              type="linear"
              dataKey="total_passed"
              stroke="#16A349"
              strokeWidth={2}
              activeDot={{
                r: 8,
                style: { fill: "var(--theme-primary)" },
              }}
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default ScoreChart;
