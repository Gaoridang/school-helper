"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import ScheduleCard from "./assessment/ScheduleCard";

export default function Home() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>시간표</CardTitle>
        <CardDescription>과목을 눌러서 평가를 시작해보세요.</CardDescription>
      </CardHeader>
      <CardContent className="overflow-auto w-full">
        <ScheduleCard />
      </CardContent>
    </Card>
  );
}
