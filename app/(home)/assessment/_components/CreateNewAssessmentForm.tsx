"use client";

import PageTitle from "@/app/components/PageTitle";
import { Tables } from "@/app/types/schema";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
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
import CheckAnimation from "@/public/checkAnimation.json";
import Lottie from "react-lottie-player";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

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
        <form onSubmit={form.handleSubmit(onSubmit)} className="max-w-xl">
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
                      const isChecked =
                        field.value?.find((item) => item.item_id === content.id)?.is_passed ||
                        false;

                      return (
                        <FormItem key={content.id} className="flex items-center gap-2 mb-2">
                          <FormLabel className="w-full relative flex items-center justify-between text-base border px-6 py-4 cursor-pointer rounded-lg has-[:checked]:bg-green-50 has-[:checked]:border-green-500 transition-all hover:translate-x-1">
                            <span>{content.content}</span>
                            <FormControl>
                              <Checkbox
                                className="hidden"
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
                            <div className="relative h-5 w-5 border border-gray-900 rounded-full">
                              <div className="absolute h-16 w-16 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none">
                                {isChecked ? (
                                  <Lottie
                                    loop={false}
                                    animationData={CheckAnimation}
                                    play={isChecked}
                                    speed={1.5}
                                  />
                                ) : (
                                  <Lottie
                                    loop={false}
                                    animationData={CheckAnimation}
                                    play={!isChecked}
                                    direction={-1}
                                    speed={2}
                                  />
                                )}
                              </div>
                            </div>
                          </FormLabel>
                        </FormItem>
                      );
                    }}
                  />
                ))}
                <TooltipProvider>
                  <Tooltip delayDuration={0}>
                    <TooltipTrigger type="button">
                      <FormDescription
                        className="text-end underline underline-offset-4 cursor-pointer my-4 text-sm text-gray-500 hover:text-gray-700"
                        onClick={() => router.push("/")}
                      >
                        지금 제출하지 않는다면?
                      </FormDescription>
                    </TooltipTrigger>
                    <TooltipContent sideOffset={-2}>
                      <p className="text-sm text-gray-500">
                        지금 제출하지 않아도 나중에 언제든지 평가를 제출할 수 있어요. <br /> 클릭 시
                        홈으로 돌아가고 <span className="font-semibold">템플릿은 저장돼요.</span>
                      </p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </FormItem>
            )}
          />
          <div>
            <Button disabled={form.formState.isSubmitting}>제출하기</Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default CreateNewAssessmentForm;
