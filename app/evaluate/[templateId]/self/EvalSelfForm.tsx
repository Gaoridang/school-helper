"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Tables } from "@/app/types/schema";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Checkbox } from "@/components/ui/checkbox";
import { SubmitEvalData, submitEvalSchema } from "../../types/types";
import { zodResolver } from "@hookform/resolvers/zod";
import useSupabaseBrowser from "@/app/utils/supabase/client";
import { useToast } from "@/components/ui/use-toast";
import { getSubjectName } from "../../getSubjectName";
import Link from "next/link";

interface Props {
  evalItems: Tables<"evaluation_items">[];
}

// TODO: 자가, 동료 선택 가능하도록 수정
const EvalSelfForm = ({ evalItems }: Props) => {
  const form = useForm<SubmitEvalData>({
    resolver: zodResolver(submitEvalSchema),
    defaultValues: {
      items: [],
    },
  });

  const { toast } = useToast();
  const supabase = useSupabaseBrowser();
  const onSubmit = async (values: SubmitEvalData) => {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    const results = evalItems.map((item) => ({
      evaluator_id: user!.id,
      evaluatee_id: user!.id,
      template_id: item.template_id!,
      item_id: item.id,
      score: values.items.includes(item.id),
    }));

    const { error: submitError } = await supabase.from("evaluation_results").insert(results);

    if (submitError) {
      toast({
        title: "평가 제출 실패",
        description: "평가를 제출하지 못했습니다. 다시 시도해주세요.",
      });
      return;
    }

    toast({
      title: "평가 제출 성공",
      description: "평가를 제출했습니다.",
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full">
        <FormField
          control={form.control}
          name="items"
          render={() => (
            <FormItem className="border-2 border-indigo-500 p-4 rounded-md my-4 min-w-[300px]">
              <div className="mb-4">
                <FormLabel className="text-base">{`${getSubjectName(evalItems[0].subject_name)} ${evalItems[0].period}`}</FormLabel>
                <FormDescription>{evalItems[0].date}</FormDescription>
              </div>
              {evalItems.map((item) => (
                <FormField
                  key={item.id}
                  control={form.control}
                  name="items"
                  render={({ field }) => {
                    return (
                      <FormItem
                        key={item.id}
                        className="flex flex-row items-center space-x-3 space-y-0"
                      >
                        <FormControl>
                          <Checkbox
                            checked={field.value?.includes(item.id)}
                            onCheckedChange={(checked) => {
                              console.log(field.value);

                              return checked
                                ? field.onChange([...field.value, item.id])
                                : field.onChange(field.value?.filter((value) => value !== item.id));
                            }}
                          />
                        </FormControl>
                        <FormLabel className="font-normal">{item.content}</FormLabel>
                      </FormItem>
                    );
                  }}
                />
              ))}
              <FormMessage />
            </FormItem>
          )}
        />
        <Link href="/evaluate" className="mr-2">
          <Button type="button" variant="secondary">
            돌아가기
          </Button>
        </Link>
        <Button type="submit" disabled={form.formState.isSubmitting}>
          제출하기
        </Button>
      </form>
    </Form>
  );
};

export default EvalSelfForm;
