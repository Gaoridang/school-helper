"use client";

import { useFieldArray, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { CalendarIcon, X } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import PageTitle from "@/app/components/PageTitle";
import { supabase } from "@/app/utils/supabase/client";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { ko } from "date-fns/locale";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";
import useClassStore from "@/app/(home)/store/classStore";
import { CreateEvalData, createEvalSchema } from "../_types/types";
import { periods, subjects } from "../_types/constants";
import { User } from "@supabase/supabase-js";

interface Props {
  user: User | null;
}

const CreateTemplateForm = ({ user }: Props) => {
  const selectedClassId = useClassStore((state) => state.classId);
  const form = useForm<CreateEvalData>({
    resolver: zodResolver(createEvalSchema),
    defaultValues: {
      date: {
        from: new Date(),
        to: new Date(),
      },
      subject: "",
      period: "",
      contents: [
        {
          content: "",
        },
        {
          content: "",
        },
      ],
    },
  });
  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "contents",
  });

  const handleSelectedItems = (selectedItems: string[]) => {
    const newContents = selectedItems.map((content) => ({ content }));

    form.setValue("contents", newContents);
  };

  const router = useRouter();
  const { toast } = useToast();
  const onSubmit = async (values: CreateEvalData) => {
    const { date, subject, period, contents } = values;
    const startDate = format(date.from, "yyyy-MM-dd");
    const endDate = format(date.to, "yyyy-MM-dd");

    const { data: templateData, error: templateError } = await supabase
      .from("templates")
      .insert({
        class_id: selectedClassId,
        start_date: startDate,
        end_date: endDate,
        subject: subject,
        period: period,
      })
      .select()
      .single();

    if (templateError) {
      return toast({
        title: "평가지 만들기 실패",
        description: "평가지를 만들지 못했습니다. 다시 시도해주세요.",
      });
    }

    const insertingData = contents.map((content) => {
      return {
        class_id: selectedClassId,
        content: content.content,
        template_id: templateData.id,
      };
    });

    const { error: itemsError } = await supabase.from("items").insert(insertingData);

    if (itemsError) {
      return toast({
        title: "평가 항목 생성 실패",
        description: "평가 항목을 만들지 못했습니다. 다시 시도해주세요.",
      });
    }

    toast({
      title: "평가지 만들기 성공",
      description: "평가지를 만들었습니다.",
    });

    router.push(`/assessment/${templateData.id}`);
  };

  return (
    <div className="p-4 md:p-8">
      <PageTitle title="평가지 만들기" />
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="mt-5">
          <div className="flex flex-col md:flex-row gap-8">
            <div className="flex flex-col gap-4">
              <p className="text-sm">날짜 및 시간</p>
              <FormField
                control={form.control}
                name="date"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl className="gap-1">
                          <Button
                            variant={"outline"}
                            className={cn(
                              "pl-3 text-left font-normal",
                              !field.value && "text-muted-foreground",
                            )}
                          >
                            {field.value.from ? (
                              field.value.to ? (
                                <>
                                  {format(field.value.from, "y. MM. dd")} -{" "}
                                  {format(field.value.to, "y. MM. dd")}
                                </>
                              ) : (
                                format(field.value.from, "y. MM. dd")
                              )
                            ) : (
                              <span>날짜를 선택하세요.</span>
                            )}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          locale={ko}
                          mode="range"
                          selected={{
                            from: field.value.from,
                            to: field.value.to,
                          }}
                          onSelect={field.onChange}
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* 과목 */}
              {user?.user_metadata.role === "teacher" && (
                <FormField
                  control={form.control}
                  name="subject"
                  render={({ field }) => {
                    return (
                      <FormItem>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="무슨 과목인가요?" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {subjects.map((subject) => (
                              <SelectItem key={subject.value} value={subject.value}>
                                {subject.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    );
                  }}
                />
              )}

              {/* 교시 */}
              {user?.user_metadata.role === "teacher" && (
                <FormField
                  control={form.control}
                  name="period"
                  render={({ field }) => {
                    return (
                      <FormItem>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="몇 교시 인가요?" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {periods.map((period) => (
                              <SelectItem key={period.value} value={period.value}>
                                {period.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    );
                  }}
                />
              )}
            </div>

            <div className="flex-1 flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <p className="text-sm">평가 항목</p>
                <button
                  className="text-sm font-semibold text-[#57BD9E] pr-4"
                  onClick={() => append({ content: "" })}
                >
                  + 항목 추가
                </button>
              </div>
              {fields.map((field, index) => (
                <div key={field.id} className="flex gap-2">
                  <Input
                    {...form.register(`contents.${index}.content` as const)}
                    placeholder="내용을 입력하세요."
                  />
                  <Button variant="ghost" type="button" onClick={() => remove(index)}>
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              ))}
              <div className="flex gap-2">
                <Button type="submit">만들기</Button>
                <Button type="button" variant="outline">
                  취소
                </Button>
              </div>
            </div>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default CreateTemplateForm;
