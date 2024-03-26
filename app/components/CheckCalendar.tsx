"use client";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { format } from "date-fns";
import { ko } from "date-fns/locale";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { ActiveModifiers, DayContentProps } from "react-day-picker";
import { useClass } from "../(teacher)/hooks/useClass";
import { getSubjectName } from "../evaluate/getSubjectName";
import { toWhom } from "../evaluate/toWhom";
import { Tables } from "../types/schema";
import CustomTooltip from "./Tooltip";
import { supabase } from "../utils/supabase/client";

const CheckCalendar = () => {
  const { selectedClassId } = useClass();
  const [selectedDay, setSelectedDay] = useState<Date>();
  const selectedDayFormatted = format(selectedDay ?? new Date(), "y-M-d", { locale: ko });
  // const { data: templates } = useTemplates(selectedDayFormatted, selectedClassId);
  const [allTemplates, setAllTemplates] = useState<Tables<"evaluation_templates">[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    if (!selectedClassId) return;
    const fetchTemplates = async () => {
      const { data, error } = await supabase
        .from("evaluation_templates")
        .select("*")
        .eq("class_id", selectedClassId);
      if (error) {
        throw error;
      }
      setAllTemplates(data);
      setIsLoading(false);
    };
    fetchTemplates();
  }, [selectedClassId, setAllTemplates]);

  const handleSelect = async (
    day: Date | undefined,
    selectedDay: Date,
    modifiers: ActiveModifiers,
  ) => {
    setSelectedDay(day);
  };

  const footer = (
    <div className="grid gap-2 grid-cols-2 mt-4">
      {allTemplates && allTemplates.length > 0 ? (
        allTemplates?.map((template) => {
          if (format(new Date(template.date!), "y-M-d") === selectedDayFormatted) {
            return (
              <Button
                key={template.id}
                onClick={() => router.push(`/evaluate/${template.id}?type=${template.type}`)}
                className="flex flex-col items-center justify-center"
              >
                <span>{`${template.period} ${getSubjectName(template.subject_name)}`}</span>
                <span className="font-semibold text-xs">{toWhom(template.type)}</span>
              </Button>
            );
          }
        })
      ) : (
        <p>자료가 없습니다.</p>
      )}
    </div>
  );

  const DayContent = (props: DayContentProps) => {
    return (
      <div>
        <span>{props.date.getDate()}</span>
        {allTemplates.map((template) => {
          if (format(new Date(template.date!), "y-M-d") === format(props.date, "y-M-d")) {
            return (
              <div
                key={template.id}
                className="w-1 h-1 rounded-full bg-green-500 place-self-center"
              ></div>
            );
          }
        })}
      </div>
    );
  };

  return isLoading ? (
    <div className="border rounded-md p-4">
      <div className="flex flex-col items-center gap-2 mb-4">
        <Skeleton className="h-8 w-[200px]" />
        <Skeleton className="h-6 w-[150px]" />
      </div>
      <Skeleton className="h-[300px] w-full" />
    </div>
  ) : (
    <div>
      <Card>
        <CardHeader className="flex flex-col justify-center items-center">
          <CardTitle className="flex items-center space-x-2">
            <span>점검 시작하기</span>
            <CustomTooltip href={`/evaluate/create`}>
              <span>새로 만들기</span>
            </CustomTooltip>
          </CardTitle>
          <CardDescription>점검할 날짜를 선택하세요.</CardDescription>
        </CardHeader>
        <CardContent className="flex justify-center overflow-auto">
          <Calendar
            locale={ko}
            mode="single"
            selected={selectedDay}
            onSelect={handleSelect}
            footer={footer}
            DayContent={DayContent}
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default CheckCalendar;
