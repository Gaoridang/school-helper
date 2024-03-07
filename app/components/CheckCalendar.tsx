"use client";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { format } from "date-fns";
import { ko } from "date-fns/locale";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { ActiveModifiers } from "react-day-picker";
import { useClass } from "../(teacher)/hooks/useClass";
import { getSubjectName } from "../evaluate/getSubjectName";
import { toWhom } from "../evaluate/toWhom";
import { useTemplates } from "../queries/getTemplates";
import CustomTooltip from "./Tooltip";

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
        <CardHeader className="flex flex-col justify-center items-center">
          <CardTitle className="flex items-center space-x-2">
            <span>점검 시작하기</span>
            <CustomTooltip href={`/evaluate/create`}>
              <span>새로 만들기</span>
            </CustomTooltip>
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
