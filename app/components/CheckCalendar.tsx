"use client";

import { Calendar } from "@/components/ui/calendar";
import React, { useState } from "react";
import { ActiveModifiers } from "react-day-picker";
import { useTemplates } from "../queries/getTemplates";
import { ko } from "date-fns/locale";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useClass } from "../(teacher)/hooks/useClass";
import { format } from "date-fns";
import { getSubjectName } from "../evaluate/getSubjectName";
import { toWhom } from "../evaluate/toWhom";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { PlusCircle } from "lucide-react";
import Link from "next/link";

const CheckCalendar = () => {
  const { selectedClassId } = useClass();
  const [selectedDay, setSelectedDay] = useState<Date>();
  const selectedDayFormatted = format(selectedDay ?? new Date(), "y-M-d", { locale: ko });
  const { data: templates } = useTemplates(selectedDayFormatted, selectedClassId);
  const router = useRouter();

  const handleSelect = async (
    day: Date | undefined,
    selectedDay: Date,
    modifiers: ActiveModifiers,
  ) => {
    setSelectedDay(day);
  };

  const footer = (
    <div className="grid gap-2 grid-cols-2 mt-4">
      {templates && templates.length > 0 ? (
        templates?.map((template) => (
          <Button
            key={template.id}
            onClick={() => router.push(`/evaluate/${template.id}?type=${template.type}`)}
          >
            <span>{`${template.period} ${getSubjectName(template.subject_name)}`}</span>
            <span className="font-semibold text-xs">{toWhom(template.type)}</span>
          </Button>
        ))
      ) : (
        <p>자료가 없습니다.</p>
      )}
    </div>
  );

  return (
    <div>
      <Card className="hover:hover:shadow-lg transition">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <span>점검 시작하기</span>
            <TooltipProvider delayDuration={0}>
              <Tooltip>
                <TooltipTrigger>
                  <Link href={`/evaluate/create/${selectedClassId}`}>
                    <PlusCircle className="w-6 h-6 hover:rotate-90 transition text-purple-700" />
                  </Link>
                </TooltipTrigger>
                <TooltipContent side="right">
                  <span>새로 만들기</span>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </CardTitle>
          <CardDescription>점검할 날짜를 선택하세요.</CardDescription>
        </CardHeader>
        <CardContent className="flex justify-center">
          <Calendar
            locale={ko}
            mode="single"
            selected={selectedDay}
            onSelect={handleSelect}
            footer={footer}
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default CheckCalendar;
