"use client";

import { useClass } from "@/app/(teacher)/hooks/useClass";
import { useUser } from "@/app/hooks/useUser";
import { useReviewSessionsByDateRange } from "@/app/queries/getReviewList";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

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

// six colors
const colors = [
  "#8884d8",
  "#82ca9d",
  "#ffc658",
  "#ff7a45",
  "#ff6f91",
  "#0088FE",
  "#00C49F",
  "#FFBB28",
  "#FF8042",
  "#FF6F91",
];

const ScoreChart = () => {
  // 해당 날짜에 통과한 개수를 가져옵니다.
  const user = useUser();
  const { selectedClassId } = useClass();
  const { data } = useReviewSessionsByDateRange(
    "2024-03-01",
    "2024-03-31",
    selectedClassId,
    user?.id!,
  );

  if (!data) return <div>loading...</div>;

  const ReviewData = data as ReviewData[];
  const aggregatedData = ReviewData.reduce(
    (
      acc: {
        [key: string]: {
          date: string;
          total: number;
          subjects: { [subject_name: string]: number };
        };
      },
      { start_time, subject_name, contents },
    ) => {
      const date = start_time?.split("T")[0];
      const passedCounts = contents.reduce(
        (acc: { [key: string]: number }, { is_passed }) => ({
          ...acc,
          [subject_name]: (acc[subject_name] || 0) + (is_passed ? 1 : 0),
        }),
        {},
      );

      if (!acc[date]) acc[date] = { date, total: 0, subjects: {} };

      Object.entries(passedCounts).forEach(([subject_name, count]) => {
        acc[date].total += count;
        acc[date].subjects[subject_name] = (acc[date].subjects[subject_name] || 0) + count;
      });

      return acc;
    },
    {},
  );

  const ChartData = Object.values(aggregatedData);

  const CustomizedDot = (props: any) => {
    const { cx, cy, stroke, payload, value } = props;

    // filled, border 5 white width 15 height 15
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

  return (
    <Card className="border-none">
      <CardHeader>
        <CardTitle className="px-4 text-xl opacity-70">나의 성장 점수</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={400}>
          <LineChart data={ChartData} margin={{ right: 30, top: 30 }}>
            <CartesianGrid vertical={false} opacity={0.5} />
            <XAxis
              dataKey="date"
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
            <Tooltip />
            <Line
              type="monotone"
              dataKey="total"
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
