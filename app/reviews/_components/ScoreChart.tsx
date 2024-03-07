"use client";

import { useClass } from "@/app/(teacher)/hooks/useClass";
import { useUser } from "@/app/hooks/useUser";
import { useReviewSessionsByDateRange } from "@/app/queries/getReviewList";
import { format } from "date-fns";
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
  class_id: string | null;
  contents: { content: string; is_passed: boolean }[];
  date: string | null;
  evaluatee_id: string | null;
  evaluator_id: string | null;
  period: string | null;
  session_id: string | null;
  subject_name: string | null;
  template_id: number | null;
  start_time: string | null;
}

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
  const aggregatedData = ReviewData.reduce((acc, cur) => {
    const date = format(new Date(cur.start_time!), "yyyy-MM-dd");
    const passedCount = cur.contents.filter((content) => content.is_passed).length;

    if (!date) return acc;

    return {
      ...acc,
      [date]: {
        date,
        passed: passedCount,
      },
    };
  }, {});

  const ChartData = Object.values(aggregatedData);

  console.log(ChartData);

  return (
    <ResponsiveContainer width="100%" height={500}>
      <LineChart data={ChartData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" padding={{ left: 40, right: 40 }} />
        <YAxis />
        <Tooltip />
        <Line type="monotone" dataKey="passed" stroke="#8884d8" />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default ScoreChart;
