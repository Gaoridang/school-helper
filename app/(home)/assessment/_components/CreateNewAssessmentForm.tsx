"use client";

import PageTitle from "@/app/components/PageTitle";
import { Tables } from "@/app/types/schema";
import { Checkbox } from "@/components/ui/checkbox";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { CreateAssessmentFormSchema, CreateAssessmentFormType } from "../[templateId]/_types";
import { supabase } from "@/app/utils/supabase/client";
import useClassStore from "@/app/(home)/store/classStore";
import { Button } from "@/components/ui/button";
import SelectStudentPopover from "./SelectStudentPopover";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { createAssessment } from "../../utils/assessment";

interface Props {
  data: Tables<"assessment_view">[];
  templateId: string;
}

const CreateNewAssessmentForm = ({ data, templateId }: Props) => {
  const form = useForm<CreateAssessmentFormType>({
    resolver: zodResolver(CreateAssessmentFormSchema),
    defaultValues: {
      items: data.map((item) => ({
        item_id: item.item_id!,
        is_passed: false,
      })),
      evaluatee: "",
    },
  });
  const subject = data[0].subject ?? "";
  const period = data[0].period ?? "";
  const contents = data.map((item) => ({
    id: item.item_id,
    content: item.content,
  }));

  const router = useRouter();
  const classId = useClassStore((state) => state.classId);
  const onSubmit = async (data: CreateAssessmentFormType) => {
    const { data: session, error: sessionError } = await supabase
      .from("sessions")
      .insert({
        template_id: parseInt(templateId),
        class_id: classId,
        ...(data.evaluatee && { evaluatee_id: data.evaluatee }),
      })
      .select("id")
      .single();

    if (sessionError) {
      return toast("평가 제출 실패", {
        description: "평가를 제출하지 못했습니다. 다시 시도해주세요.",
      });
    }

    const assessmentResults = data.items.map((item) => ({
      session_id: session.id,
      item_id: item.item_id,
      is_passed: item.is_passed,
    }));

    toast.promise(() => createAssessment(assessmentResults), {
      loading: "평가 제출 중",
      success: "평가를 성공적으로 제출했습니다.",
      error: "평가를 제출하지 못했습니다. 다시 시도해주세요.",
    });

    router.push(`/assessment/confirm?to=${session.id}`);
  };

  return (
    <div>
      <PageTitle title={subject ? subject : "자기평가"} description="성취한 목표에 체크하세요!" />
      <p className="font-light text-sm">{period || ""}</p>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          {subject.length > 0 && (
            <FormField
              name="evaluatee"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <SelectStudentPopover field={field} />
                </FormItem>
              )}
            />
          )}
          <FormField
            name="items"
            control={form.control}
            render={() => (
              <FormItem>
                {contents.map((content) => (
                  <FormField
                    key={content.id}
                    name="items"
                    control={form.control}
                    render={({ field }) => {
                      return (
                        <FormItem key={content.id} className="flex items-center gap-2 mb-2">
                          <FormControl>
                            <Checkbox
                              checked={
                                field.value?.find((item) => item.item_id === content.id)
                                  ?.is_passed || false
                              }
                              onCheckedChange={(checked) => {
                                const updatedItems = field.value?.map((item) => {
                                  return item.item_id === content.id
                                    ? { ...item, is_passed: checked }
                                    : item;
                                });
                                field.onChange(updatedItems);
                              }}
                            />
                          </FormControl>
                          <FormLabel className="text-base">{content.content}</FormLabel>
                        </FormItem>
                      );
                    }}
                  />
                ))}
              </FormItem>
            )}
          />
          <Button>제출하기</Button>
        </form>
      </Form>
    </div>
  );
};

export default CreateNewAssessmentForm;
