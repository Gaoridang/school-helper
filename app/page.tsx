"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import ScheduleCard from "./assessment/ScheduleCard";
import Link from "next/link";
import { useEffect, useState } from "react";
import { ArrowRightCircle, CalendarIcon, NotebookIcon } from "lucide-react";

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
        <Card className="group bg-slate-100">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              학급 만들기{" "}
              <ArrowRightCircle className="w-5 h-5 group-hover:translate-x-2 transition-transform" />{" "}
            </CardTitle>
            <CardDescription>새로운 학급을 만들어보세요.</CardDescription>
          </CardHeader>
        </Card>
      </Link>
      <Link href="/classes">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              내 학급 보기 <NotebookIcon className="w-5 h-5" />{" "}
            </CardTitle>
            <CardDescription>내가 개설한 학급을 한 번에 관리하세요.</CardDescription>
          </CardHeader>
        </Card>
      </Link>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            시간표 <CalendarIcon className="w-5 h-5" />{" "}
          </CardTitle>
          <CardDescription>과목을 눌러서 평가를 시작해보세요.</CardDescription>
        </CardHeader>
        <CardContent className="overflow-auto w-full">
          <ScheduleCard />
        </CardContent>
      </Card>
    </div>
  );
}
