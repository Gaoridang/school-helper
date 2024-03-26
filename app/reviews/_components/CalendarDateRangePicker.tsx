"use client";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { PopoverClose } from "@radix-ui/react-popover";
import { format, subBusinessDays } from "date-fns";
import { ko } from "date-fns/locale";
import { CalendarIcon } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { DateRange } from "react-day-picker";

export function CalendarDateRangePicker({ className }: { className?: string }) {
  const router = useRouter();
  const pathname = usePathname();
  const [date, setDate] = useState<DateRange | undefined>({
    from: subBusinessDays(new Date(), 5),
    to: new Date(),
  });

  // update query params when date changes
  const updateQueryParams = () => {
    if (date?.from && date?.to) {
      const from = format(date.from, "yyyy-MM-dd");
      const to = format(date.to, "yyyy-MM-dd");
      router.push(`${pathname}?from=${from}&to=${to}`);
    }
  };

  return (
    <div className={cn("flex justify-start", className)}>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant={"outline"}
            className={cn("justify-start text-left font-normal", !date && "text-muted-foreground")}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {date?.from ? (
              date.to ? (
                <>
                  {format(date.from, "LLL dd, y")} - {format(date.to, "LLL dd, y")}
                </>
              ) : (
                format(date.from, "LLL dd, y")
              )
            ) : (
              <span>Pick a date</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            initialFocus
            mode="range"
            defaultMonth={date?.from}
            selected={date}
            onSelect={setDate}
            numberOfMonths={1}
            locale={ko}
          />
          <PopoverClose asChild>
            <Button className="ml-4 mb-4" variant="outline" onClick={updateQueryParams}>
              확인
            </Button>
          </PopoverClose>
        </PopoverContent>
      </Popover>
    </div>
  );
}
