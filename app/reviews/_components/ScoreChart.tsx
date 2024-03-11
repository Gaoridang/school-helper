"use client";

import { useClass } from "@/app/(teacher)/hooks/useClass";
import useSupabaseBrowser from "@/app/utils/supabase/client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { User } from "@supabase/supabase-js";
import { addDays, format } from "date-fns";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { CalendarDateRangePicker } from "./CalendarDateRangePicker";

// Override console.error
// This is a hack to suppress the warning about missing defaultProps in recharts library as of version 2.12
// @link https://github.com/recharts/recharts/issues/3615
const error = console.error;
console.error = (...args: any) => {
  if (/defaultProps/.test(args[0])) return;
  error(...args);
};

interface ReviewData {
  class_id: string;
  contents: { content: string; is_passed: boolean }[];
  date: string;
  evaluatee_id: string;
  evaluator_id: string;
  period: string;
  session_id: string;
  subject_name: string;
  template_id: number;
  start_time: string;
}

interface Props {
  user: User;
}

const ScoreChart = ({ user }: Props) => {
  const { selectedClassId } = useClass();
  const [isLoading, setIsLoading] = useState(true);
  const [reviews, setReviews] = useState<ReviewData[]>([]);
  const searchParams = useSearchParams();

  const supabase = useSupabaseBrowser();
  useEffect(() => {
    if (!selectedClassId) return;

    const fetchReviewSessionsByDateRange = async () => {
      const { data } = await supabase
        .from("session_evaluation_summary")
        .select("*")
        .eq("evaluatee_id", user.id)
        .eq("class_id", selectedClassId)
        .eq("type", "self")
        .gte("start_time", searchParams.get("from") || format(new Date(), "yyyy-MM-dd"))
        .lte("start_time", searchParams.get("to") || format(addDays(new Date(), 4), "yyyy-MM-dd"))
        .order("start_time", { ascending: true });

      setReviews(data as ReviewData[]);
      setIsLoading(false);
    };

    fetchReviewSessionsByDateRange();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedClassId, searchParams.get("from"), searchParams.get("to")]);

  if (isLoading || !reviews.length)
    return (
      <Card>
        <CardHeader>
          <CardTitle className="px-4 text-xl opacity-70">나의 성장 점수</CardTitle>
          <CalendarDateRangePicker />
        </CardHeader>
        <CardContent>
          <CardDescription>해당 기간에 데이터가 없습니다.</CardDescription>
        </CardContent>
      </Card>
    );

  const CustomizedDot = (props: any) => {
    const { cx, cy, stroke, payload, value } = props;

    return (
      <svg
        key={value}
        x={cx - 7.5}
        y={cy - 7.5}
        width={15}
        height={15}
        fill={stroke}
        stroke="white"
        strokeWidth={5}
        className="text-indigo-500"
      >
        <circle cx={7.5} cy={7.5} r={7.5} />
      </svg>
    );
  };

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-4 shadow-md">
          <p>{label.split("T")[0]}</p>
          <p>{payload[0].value}점</p>
        </div>
      );
    }

    return null;
  };

  return (
    <Card className="border-none">
      <CardHeader>
        <CardTitle className="px-4 text-xl opacity-70">나의 성장 점수</CardTitle>
        <CalendarDateRangePicker />
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={400}>
          <LineChart data={reviews} margin={{ right: 30, top: 30 }}>
            <CartesianGrid vertical={false} opacity={0.5} strokeDasharray={3} />
            <XAxis
              dataKey="start_time"
              tickLine={false}
              axisLine={false}
              dy={30}
              height={60}
              tick={{ fontSize: "14px", opacity: 0.7 }}
            />
            <YAxis
              tickLine={false}
              tickSize={20}
              axisLine={false}
              tick={{ fontSize: "14px", opacity: 0.7 }}
            />
            <Tooltip content={<CustomTooltip />} />
            <Line
              type="monotone"
              dataKey="total_passed"
              stroke="#8884d8"
              strokeWidth={2}
              dot={CustomizedDot}
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default ScoreChart;
