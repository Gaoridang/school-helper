import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { AlertCircle, PlusIcon, Trash2Icon } from "lucide-react";
import { useFieldArray, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ActivityType, activitySchema } from "../../api/checkSchema";
import { useToast } from "@/components/ui/use-toast";
import { ToastAction } from "@/components/ui/toast";
import Link from "next/link";
import { useState } from "react";
import { useSession } from "@supabase/auth-helpers-react";
import { supabase } from "@/app/utils/supabase/client";
import { useQueryClient } from "@tanstack/react-query";
import { Alert, AlertDescription } from "@/components/ui/alert";
import Spinner from "@/app/components/Spinner";

export function AddSheet() {
  const [duplicateError, setDuplicateError] = useState("");
  const [open, setOpen] = useState(false);
  const {
    register,
    control,
    handleSubmit,
    reset,
    getValues,
    formState: { errors, isSubmitting },
  } = useForm<ActivityType>({
    resolver: zodResolver(activitySchema),
    defaultValues: {
      name: "",
      description: "",
      questions: [
        {
          content: "",
        },
      ],
    },
    mode: "onBlur",
  });
  const { fields, append, remove } = useFieldArray({
    control,
    name: "questions",
  });
  const session = useSession();
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const onSubmit = async (data: ActivityType) => {
    console.log(data);

    const { data: activitiesData, error: activitiesError } = await supabase
      .from("activities")
      .insert([{ name: getValues("name"), description: getValues("description") }])
      .select()
      .single();

    if (activitiesError) {
      toast({
        title: "활동 등록에 실패했습니다.",
        description: "계속될 경우 고객센터로 문의 해주세요.",
        action: (
          <ToastAction altText="문의하기">
            {/* TODO: contact 페이지 추가하기 */}
            <Link href="/contact">문의하기</Link>
          </ToastAction>
        ),
      });
      return;
    }

    const questions = getValues("questions").map((question) => ({
      ...question,
      activity_id: activitiesData?.id,
    }));

    const { error: QuestionsError } = await supabase.from("questions").insert(questions);

    if (QuestionsError) {
      toast({
        title: "질문 등록에 실패했습니다.",
        description: "계속될 경우 고객센터로 문의 해주세요.",
        action: (
          <ToastAction altText="문의하기">
            <Link href="/contact">문의하기</Link>
          </ToastAction>
        ),
      });
      return;
    }

    toast({
      title: "성공",
      description: "등록한 활동으로 템플릿을 만들어 보세요.",
    });

    queryClient.invalidateQueries({ queryKey: ["activities"] });
    reset();
    setOpen(false);
  };

  const checkDuplicateActivity = async () => {
    try {
      const { data, error } = await supabase
        .from("activities")
        .select()
        .eq("name", getValues("name"));

      if (error) throw error;
      if (data.length > 0) {
        setDuplicateError("이미 존재하는 활동입니다.");
        return true;
      } else {
        setDuplicateError("");
        return false;
      }
    } catch (error) {
      console.error("Error checking duplicate activity:", error);
      return true;
    }
  };

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      {session && (
        <SheetTrigger asChild>
          <Button variant="outline">
            <PlusIcon className="h-4 w-4 mr-1 opacity-70" /> 직접 추가하기
          </Button>
        </SheetTrigger>
      )}
      <SheetContent>
        <form onSubmit={handleSubmit(onSubmit)}>
          <SheetHeader>
            <SheetTitle>나만의 주제 만들기</SheetTitle>
            <SheetDescription>추가하고 싶은 주제를 만들어 보세요.</SheetDescription>
          </SheetHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="title">이름</Label>
              <Input id="title" placeholder="역할극" {...register("name")} />
              {duplicateError && <p className="text-xs text-red-500">{duplicateError}</p>}
              {errors.name && (
                <Alert variant="destructive" className="text-sm">
                  <AlertCircle className="w-4 h-4" />
                  <AlertDescription>{errors.name.message}</AlertDescription>
                </Alert>
              )}
              <Button variant="secondary" onClick={checkDuplicateActivity}>
                중복 검사
              </Button>
            </div>
            <Button type="button" variant="ghost" onClick={() => append({ content: "" })}>
              <PlusIcon className="h-4 w-4 mr-1" />
              질문 추가하기
            </Button>
            {fields.map((field, index) => (
              <div key={field.id} className="flex items-center gap-4">
                <Input placeholder="새로운 질문" {...register(`questions.${index}.content`)} />
                <Trash2Icon
                  className="w-6 h-6 cursor-pointer opacity-30 hover:opacity-100 transition-opacity"
                  onClick={() => remove(index)}
                />
              </div>
            ))}
          </div>
          <SheetFooter>
            <Button type="submit" disabled={isSubmitting} className="flex gap-2">
              {isSubmitting && <Spinner />}
              저장하기
            </Button>
          </SheetFooter>
        </form>
      </SheetContent>
    </Sheet>
  );
}
