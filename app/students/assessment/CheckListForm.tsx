import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const days = ["월", "화", "수", "목", "금"];
const periods = Array.from({ length: 6 }, (_, index) => `${index + 1}교시`);

const DayScheduleSchema = z.array(z.string().min(1, "Subject is required").or(z.literal("")));
const ScheduleSchema = z.object({
  school: z.string().min(1, "학교 이름은 필수입니다"),
  grade: z.string().min(1, "학년을 입력해주세요"),
  classNumber: z.string().min(1, "반을 입력해주세요"),
  schedule: z.array(DayScheduleSchema),
  confirm: z.boolean(),
});

type ScheduleFormData = z.infer<typeof ScheduleSchema>;

const CheckListForm = () => {
  const [editing, setEditing] = useState(false);
  const [open, setOpen] = React.useState(false);
  const [school, setSchool] = useState("");
  const form = useForm<ScheduleFormData>({
    resolver: zodResolver(ScheduleSchema),
    defaultValues: {
      school: "",
      grade: "",
      classNumber: "",
      schedule: days.map(() => periods.map(() => "")),
      confirm: false,
    },
  });

  const onSubmit = (data: ScheduleFormData) => {
    const validation = ScheduleSchema.safeParse(data);
    if (!validation.success) return;

    console.log(data);
  };

  const handleSelectSchool = (name: string) => {
    setSchool(name);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col">
        <div className="flex mb-4">
          {days.map((day, dayIndex) => (
            <div key={day} className="flex flex-col gap-2 mr-2 last:mr-0">
              <h3 className="font-semibold text-xl mb-2 text-center">{day}</h3>
              {periods.map((period, periodIndex) => (
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
        {editing && (
          <FormField
            key="confirm"
            name="confirm"
            control={form.control}
            render={({ field }) => (
              <FormItem
                key="confirm"
                className="flex flex-row items-center space-x-2 space-y-0 mb-3"
              >
                <FormControl>
                  <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                </FormControl>
                <FormLabel>시간표가 정확한가요?</FormLabel>
              </FormItem>
            )}
          />
        )}
        {editing ? (
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
        ) : (
          <Button variant="secondary" type="button" onClick={() => setEditing(true)}>
            수정
          </Button>
        )}
      </form>
    </Form>
  );
};

export default CheckListForm;
