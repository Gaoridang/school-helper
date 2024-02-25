"use client";

import { createClient } from "@/app/utils/supabase/client";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import ScheduleTable from "./ScheduleTable";
import useSchedules from "./hooks/useSchedules";

const days = ["월", "화", "수", "목", "금"];
const periods = Array.from({ length: 6 }, (_, index) => `${index + 1}교시`);

const DayScheduleSchema = z.array(z.string().min(1, "Subject is required").or(z.literal("")));
const ScheduleSchema = z.object({
  schedule: z.array(DayScheduleSchema),
  confirm: z.boolean(),
});

type ScheduleFormData = z.infer<typeof ScheduleSchema>;

export interface ScheduleDataType {
  schedule: ScheduleFormData["schedule"];
}

const ScheduleCard = () => {
  const [editing, setEditing] = useState(false);
  const queryClient = useQueryClient();
  const form = useForm<ScheduleFormData>({
    resolver: zodResolver(ScheduleSchema),
    defaultValues: {
      schedule: days.map(() => periods.map(() => "")),
      confirm: false,
    },
  });

  const supabase = createClient();
  const onSubmit = async (data: ScheduleFormData) => {
    const validation = ScheduleSchema.safeParse(data);
    if (!validation.success) {
      console.log(validation.error.errors);
    }

    await supabase
      .from("schedules")
      .upsert(
        { schedule: data.schedule, class_id: "b857e7ca-6c3f-4744-b1ff-fd03331f94b5" },
        { onConflict: "class_id" },
      )
      .select();

    queryClient.invalidateQueries({ queryKey: ["schedule"] });
    setEditing(false);
  };

  const { schedule } = useSchedules();

  useEffect(() => {
    if (schedule) {
      form.reset({ schedule: schedule, confirm: false });
    }
  }, [schedule, form]);

  if (!editing) {
    return (
      <div className="flex flex-col gap-2">
        <ScheduleTable schedule={schedule} />
        <div className="flex flex-row items-center space-x-2 space-y-0 mb-3">
          <Button onClick={() => setEditing(true)}>수정</Button>
        </div>
      </div>
    );
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col min-w-[360px]">
        <div className="flex mb-4">
          {days.map((day, dayIndex) => (
            <div key={day} className="flex flex-col gap-2 mr-2 last:mr-0">
              <h3 className="font-semibold text-xl mb-2 text-center">{day}</h3>
              {periods.map((_period, periodIndex) => (
                <FormField
                  key={`${dayIndex}-${periodIndex}`}
                  name={`schedule.${dayIndex}.${periodIndex}`}
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          id={`${day}-period-${periodIndex}`}
                          {...field}
                          className="text-center"
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              ))}
            </div>
          ))}
        </div>

        <FormField
          key="confirm"
          name="confirm"
          control={form.control}
          render={({ field }) => (
            <FormItem key="confirm" className="flex flex-row items-center space-x-2 space-y-0 mb-3">
              <FormControl>
                <Checkbox checked={field.value} onCheckedChange={field.onChange} />
              </FormControl>
              <FormLabel>시간표가 정확한가요?</FormLabel>
            </FormItem>
          )}
        />

        <div className="grid gap-2 grid-cols-2">
          <Button
            variant="outline"
            type="button"
            onClick={() => setEditing(false)}
            className="cols-span-2"
          >
            취소
          </Button>
          <Button type="submit" disabled={!form.watch("confirm")} className="cols-span-2">
            저장
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default ScheduleCard;
