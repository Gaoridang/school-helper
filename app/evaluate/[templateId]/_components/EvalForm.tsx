"use client";

import { useTemplateStore } from "@/app/components/main/useTemplateStore";
import { Tables } from "@/app/types/schema";
import { fetchEvaluationItems } from "@/app/utils/fetchEvaluationItems";
import { supabase } from "@/app/utils/supabase/client";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useToast } from "@/components/ui/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { ko } from "date-fns/locale";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { getSubjectName } from "../../getSubjectName";
import { SubmitEvalData, submitEvalSchema } from "../../types/types";
import { useSelectedUser } from "../_hooks/useSelectedUser";

// TODO: 자가, 동료 선택 가능하도록 수정
const EvalForm = () => {
  const [evalItems, setEvalItems] = useState<Tables<"evaluation_items">[]>([]);
  const form = useForm<SubmitEvalData>({
    resolver: zodResolver(submitEvalSchema),
    defaultValues: {
      items: [],
    },
  });
  const { templateId, type } = useTemplateStore();
  const { selectedUser } = useSelectedUser();
  const router = useRouter();
  const { toast } = useToast();

  useEffect(() => {
    if (!templateId) return;

    const getEvalItems = async () => {
      const items = await fetchEvaluationItems(templateId);
      setEvalItems(items);
    };
    getEvalItems();
  }, [templateId]);

  const onSubmit = async (values: SubmitEvalData) => {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    const { data: session } = await supabase
      .from("sessions")
      .insert({
        template_id: templateId,
        evaluator_id: user!.id,
        evaluatee_id: type === "peer" ? selectedUser : user!.id,
        start_time: format(new Date(), "yyyy-MM-dd", { locale: ko }),
      })
      .select()
      .single();

    const results = evalItems.map((item) => ({
      evaluator_id: user!.id,
      evaluatee_id: type === "peer" ? selectedUser : user!.id,
      template_id: templateId,
      item_id: item.id,
      is_passed: values.items.includes(item.id),
      session_id: session?.id,
    }));

    const { error: resultsError } = await supabase.from("evaluation_results").insert(results);

    if (resultsError) {
      return toast({
        title: "평가 제출 실패",
        description: "평가를 제출하지 못했습니다.",
      });
    }

    toast({
      title: "평가 제출 성공",
      description: "평가를 제출했습니다.",
    });

    // FIXME: go to evaluation confirmation page
    router.push("/evaluate/confirm");
    router.refresh();
  };

  if (!evalItems.length) return "평가지를 선택하세요";

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="grid grid-rows-[1fr_auto]">
        <FormField
          control={form.control}
          name="items"
          render={() => (
            <FormItem>
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
        <div className="flex justify-end">
          <Button type="submit" className="mr-2" disabled={form.formState.isSubmitting}>
            제출하기
          </Button>
          <Link href="/">
            <Button type="button" variant="outline">
              돌아가기
            </Button>
          </Link>
        </div>
      </form>
    </Form>
  );
};

export default EvalForm;
