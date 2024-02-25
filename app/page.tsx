"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import ScheduleCard from "./assessment/ScheduleCard";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Home() {
  const [code, setCode] = useState("");

  useEffect(() => {
    const createRandomCode = () => {
      const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
      let result = "";
      const charactersLength = characters.length;
      for (let i = 0; i < 6; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
      }
      return result;
    };

    setCode(createRandomCode());
  }, []);

  return (
    <div className="flex flex-col gap-4">
      <Link href={`/classes/create/${code}`}>
        <Card>
          <CardHeader>
            <CardTitle>학급 만들기</CardTitle>
            <CardDescription>새로운 학급을 만들어보세요.</CardDescription>
          </CardHeader>
        </Card>
      </Link>
      <Card>
        <CardHeader>
          <CardTitle>시간표</CardTitle>
          <CardDescription>과목을 눌러서 평가를 시작해보세요.</CardDescription>
        </CardHeader>
        <CardContent className="overflow-auto w-full">
          <ScheduleCard />
        </CardContent>
      </Card>
    </div>
  );
}
