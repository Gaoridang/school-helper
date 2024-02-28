"use client";

import { useFieldArray, useForm } from "react-hook-form";
import { CreateEvalData, createEvalSchema } from "../../types/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { periods, subjects } from "../../constants";
import PageTitle from "@/app/components/PageTitle";
import useSupabaseBrowser from "@/app/utils/supabase/client";
import { User } from "@supabase/supabase-js";

interface Props {
  classId: string;
  user: User;
}

const CreateEvalForm = ({ classId, user }: Props) => {
  const form = useForm<CreateEvalData>({
    resolver: zodResolver(createEvalSchema),
    defaultValues: {
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

  const supabase = useSupabaseBrowser();
  const onSubmit = async (values: CreateEvalData) => {
    const { subject, period, contents, evaluation_type } = values;

    const insertingData = contents.map((content) => {
      return {
        class_id: classId,
        subject_name: subject,
        period,
        content: content.content,
        evaluation_type,
        creator_id: user.id,
      };
    });

    await supabase.from("evaluation_items").insert(insertingData);
  };

  return (
    <div className="max-w-2xl m-auto">
      <PageTitle title="평가지 만들기" description="평가지를 만들어보세요!" />
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="mt-5">
          <div className="grid md:flex gap-4">
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

          {fields.map((field, index) => (
            <div key={field.id}>
              <div className="flex gap-2 my-4">
                <Input
                  {...form.register(`contents.${index}.content` as const)}
                  placeholder="내용을 입력하세요."
                />
                <Button variant="ghost" type="button" onClick={() => remove(index)}>
                  <X className="w-4 h-4" />
                </Button>
              </div>
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
