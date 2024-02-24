"use client";

import { createClient } from "@/app/utils/supabase/client";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";

import { format, subDays } from "date-fns";
import { ko } from "date-fns/locale";
import { CalendarIcon } from "lucide-react";
import React, { useState } from "react";
import { DateRange } from "react-day-picker";
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import ScheduleCard from "./ScheduleCard";

// Override console.error
// This is a hack to suppress the warning about missing defaultProps in recharts library as of version 2.12
// @link https://github.com/recharts/recharts/issues/3615
const error = console.error;
console.error = (...args: any) => {
  if (/defaultProps/.test(args[0])) return;
  error(...args);
};

const AssessmentPage = () => {
  const [isOpenPopover, setOpenPopover] = useState(false);
  const [date, setDate] = React.useState<DateRange | undefined>({
    from: subDays(new Date(), 5),
    to: new Date(),
  });

  const supabase = createClient();
  const { data: scores, refetch } = useQuery({
    queryKey: ["scores"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("scores")
        .select("*")
        .lte("created_at", date?.to?.toISOString())
        .gte("created_at", date?.from?.toISOString());
      if (error) throw error;
      return data;
    },
  });

  console.log(date?.to?.toISOString(), date?.from?.toISOString());

  return (
    <div className="flex flex-col gap-4 md:flex-row">
      <Card>
        <CardHeader>
          <CardTitle>오늘의 점검 현황</CardTitle>
          <CardDescription>학생 개인에게 적합한 체크리스트를 함께 만들어 보아요.</CardDescription>
        </CardHeader>
        <CardContent className="overflow-auto w-full">
          <ScheduleCard />
        </CardContent>
      </Card>

      <Card className=" flex-1">
        <CardHeader>
          <CardTitle>이재준</CardTitle>
          <CardDescription>날짜별 체크리스트 달성 현황</CardDescription>
        </CardHeader>
        <CardContent className="pl-0">
          <Popover open={isOpenPopover}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  "ml-5 mb-4 w-[260px] justify-start text-left font-normal",
                  !date && "text-muted-foreground",
                )}
                onClick={() => setOpenPopover(true)}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {date?.from ? (
                  date.to ? (
                    <>
                      {format(date.from, "LLL dd일", { locale: ko })} -{" "}
                      {format(date.to, "LLL dd일", { locale: ko })}
                    </>
                  ) : (
                    format(date.from, "LLL dd일", { locale: ko })
                  )
                ) : (
                  <span>날짜를 선택하세요.</span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar mode="range" defaultMonth={date?.from} selected={date} onSelect={setDate} />
              <Button
                className="mb-3 ml-5"
                onClick={() => {
                  refetch();
                  setOpenPopover(false);
                }}
              >
                선택
              </Button>
            </PopoverContent>
          </Popover>
          <ResponsiveContainer width="100%" height={350}>
            <LineChart data={scores}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                dataKey="created_at"
                tickLine={false}
                axisLine={false}
                tickSize={20}
                fontSize={12}
              />
              <YAxis tickLine={false} axisLine={false} tickSize={20} fontSize={12} />
              <Tooltip />
              <Line type="linear" dataKey="score" stroke="#888888" />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
};

export default AssessmentPage;
