"use client";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format } from "date-fns";
import { ko } from "date-fns/locale";
import { useSearchParams } from "next/navigation";
import { useState } from "react";

const SubjectAndDate = () => {
  const searchParams = useSearchParams();
  const [date, setDate] = useState<Date | undefined>();
  const subject = searchParams.get("subject");
  const period = searchParams.get("period");

  return (
    <div className="flex gap-2 items-center mb-4">
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline">
            {!date
              ? format(new Date(), "M월 d일(E)", { locale: ko })
              : format(date, "M월 d일(E)", { locale: ko })}
          </Button>
        </PopoverTrigger>
        <PopoverContent align="start">
          <Calendar className="p-0" mode="single" selected={date} onSelect={setDate} />
        </PopoverContent>
      </Popover>
      <p className="font-base text-2xl">
        {period}교시 {subject}
      </p>
    </div>
  );
};

export default SubjectAndDate;
