"use client";

import { useFieldArray, useForm } from "react-hook-form";
import { CreateEvalData, createEvalSchema } from "../../../types/types";
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
import { periods, subjects } from "../../../constants";
import PageTitle from "@/app/components/PageTitle";
import useSupabaseBrowser from "@/app/utils/supabase/client";
import { User } from "@supabase/supabase-js";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { ko } from "date-fns/locale";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";
import dynamic from "next/dynamic";
const PrevEvalItems = dynamic(() => import("./PrevEvalItems"), { ssr: false });

interface Props {
  classId: string;
  user: User;
}

const CreateEvalForm = ({ classId, user }: Props) => {
  const form = useForm<CreateEvalData>({
    resolver: zodResolver(createEvalSchema),
    defaultValues: {
      date: new Date(),
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
      evaluation_type: "self",
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
  const supabase = useSupabaseBrowser();
  const onSubmit = async (values: CreateEvalData) => {
    const { date, subject, period, contents, evaluation_type } = values;
    const dateToString = format(date, "yyyy-MM-dd");

    const { data: templateData, error: templateError } = await supabase
      .from("evaluation_templates")
      .insert({
        class_id: classId,
        date: dateToString,
        subject_name: subject,
        period: period,
        creator_id: user.id,
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
        date: dateToString,
        class_id: classId,
        subject_name: subject,
        period,
        content: content.content,
        evaluation_type,
        creator_id: user.id,
        template_id: templateData.id,
      };
    });

    const { error: itemsError } = await supabase.from("evaluation_items").insert(insertingData);

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

    router.push(
      `/evaluate/${templateData.id}?class_id=${classId}&subject=${subject}&period=${period}&type=${evaluation_type}`,
    );
  };

  return (
    <div>
      <PageTitle title="평가지 만들기" description="평가지를 만들어보세요!" />
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="mt-5">
          <div className="grid md:flex gap-2">
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
                          {field.value ? (
                            format(field.value, "y. M. d(E)", { locale: ko })
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
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex space-x-2">
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
              <FormField
                control={form.control}
                name="evaluation_type"
                render={({ field }) => {
                  return (
                    <FormItem>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="누구에게 보내나요?" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="self">나에게</SelectItem>
                          <SelectItem value="peer">친구에게</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  );
                }}
              />
            </div>
          </div>
          <PrevEvalItems user={user} handleSelectedItems={handleSelectedItems} />
          {fields.map((field, index) => (
            <div key={field.id} className="flex gap-2 mb-2">
              <Input
                {...form.register(`contents.${index}.content` as const)}
                placeholder="내용을 입력하세요."
              />
              <Button variant="ghost" type="button" onClick={() => remove(index)}>
                <X className="w-4 h-4" />
              </Button>
            </div>
          ))}
          <div className="flex gap-4">
            <Button variant="outline" type="button" onClick={() => append({ content: "" })}>
              항목 추가하기
            </Button>
            <Button type="submit">만들기</Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default CreateEvalForm;
