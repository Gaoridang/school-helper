"use client";

import { Tables } from "@/app/types/schema";
import useSupabaseBrowser from "@/app/utils/supabase/client";
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
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { getSubjectName } from "../../getSubjectName";
import { SubmitEvalData, submitEvalSchema } from "../../types/types";
import { useSelectedUser } from "../_hooks/useSelectedUser";

interface Props {
  evalItems: Tables<"evaluation_items">[];
  templateId: string;
}

// TODO: 자가, 동료 선택 가능하도록 수정
const EvalForm = ({ evalItems, templateId }: Props) => {
  const form = useForm<SubmitEvalData>({
    resolver: zodResolver(submitEvalSchema),
    defaultValues: {
      items: [],
    },
  });

  const searchParams = useSearchParams();
  const { selectedUser } = useSelectedUser();
  const isPeer = searchParams.get("type") === "peer";
  const router = useRouter();
  const { toast } = useToast();
  const supabase = useSupabaseBrowser();

  console.log("selectedUser", selectedUser);

  const onSubmit = async (values: SubmitEvalData) => {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    const { data: session } = await supabase
      .from("sessions")
      .insert({
        template_id: parseInt(templateId),
        creator_id: user!.id,
        start_time: new Date().toISOString(),
      })
      .select()
      .single();

    const results = evalItems.map((item) => ({
      evaluator_id: user!.id,
      evaluatee_id: isPeer ? selectedUser : user!.id,
      template_id: parseInt(templateId),
      item_id: item.id,
      is_passed: values.items.includes(item.id),
      session_id: session?.id,
    }));

    console.log(results);

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
    router.push(`/reviews/${session?.id}`);
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
        <Button type="submit" className="mr-2" disabled={form.formState.isSubmitting}>
          제출하기
        </Button>
        <Link href="/evaluate">
          <Button type="button" variant="outline">
            돌아가기
          </Button>
        </Link>
      </form>
    </Form>
  );
};

export default EvalForm;
