"use client";

import { Calendar } from "@/components/ui/calendar";
import React, { useState } from "react";
import { ActiveModifiers } from "react-day-picker";
import { ko } from "date-fns/locale";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useClass } from "../(teacher)/hooks/useClass";
import { useReviews } from "../queries/getReviewList";
import { format } from "date-fns";
import { useUser } from "../hooks/useUser";

const ReviewCalendar = () => {
  const user = useUser();
  const { selectedClassId } = useClass();
  const [selectedDay, setSelectedDay] = useState<Date>();
  const selectedDayFormatted = format(selectedDay ?? new Date(), "y-M-d", { locale: ko });
  const { data: reviews } = useReviews(selectedDayFormatted, selectedClassId, user?.id!);

  const handleSelect = async (
    day: Date | undefined,
    selectedDay: Date,
    modifiers: ActiveModifiers,
  ) => {
    setSelectedDay(day);
  };

  const footer = (
    <div className="grid gap-2 mt-4">
      {reviews && reviews.length > 0 ? (
        reviews?.map((review) => (
          <Button key={review.session_id} onClick={() => console.log(review.session_id)}>
            {`${review.period} ${review.subject_name}`}
          </Button>
        ))
      ) : (
        <p>자료가 없습니다.</p>
      )}
    </div>
  );

  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle>내 결과 보기</CardTitle>
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

export default ReviewCalendar;
