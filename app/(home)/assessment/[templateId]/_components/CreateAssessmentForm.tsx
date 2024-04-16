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
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useToast } from "@/components/ui/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { ko } from "date-fns/locale";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { SubmitEvalData, submitEvalSchema } from "../../../evaluate/types/types";
import { useSelectedUser } from "../../../evaluate/[templateId]/_hooks/useSelectedUser";
import { User } from "@supabase/supabase-js";

interface Props {
  user?: User | null;
}

const CreateAssessmentForm = ({ user }: Props) => {
  const [evalItems, setEvalItems] = useState<Tables<"items">[]>([]);
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
        evaluatee_id: type === "peer" ? selectedUser.id : user!.id,
        start_time: format(new Date(), "yyyy-MM-dd", { locale: ko }),
      })
      .select()
      .single();

    const results = evalItems.map((item) => ({
      evaluator_id: user!.id,
      evaluatee_id: type === "peer" ? selectedUser.id : user!.id,
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
          {user?.user_metadata.role === "student" && (
            <Button type="submit" className="mr-2" disabled={form.formState.isSubmitting}>
              제출하기
            </Button>
          )}
          <Button type="button" variant="outline" onClick={() => router.back()}>
            돌아가기
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default CreateAssessmentForm;
