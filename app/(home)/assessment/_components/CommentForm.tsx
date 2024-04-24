"use client";

import { supabase } from "@/app/utils/supabase/client";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { createComment } from "../../utils/assessment";
import { cn } from "@/lib/utils";

interface FormValues {
  comment: string;
}

const CommentForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>();
  const router = useRouter();
  const searchParams = useSearchParams();
  const sessionId = searchParams.get("to");

  const onSubmit = async (data: FormValues) => {
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError) {
      console.error(authError);
      return;
    }

    toast.promise(() => createComment({ comment: data.comment, session_id: sessionId! }), {
      loading: "한 줄 평 등록 중",
      success: "한 줄 평이 등록되었습니다.",
      error: "한 줄 평 등록에 실패했습니다. 다시 시도해주세요.",
    });

    router.push(`/reviews/${user?.id}/${sessionId}`);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-full flex flex-col items-center justify-center"
    >
      <Textarea
        {...register("comment", {
          required: true,
          maxLength: 100,
        })}
        rows={3}
        className="max-w-lg resize-none"
        placeholder="오늘은 3가지 다 달성해서 좋았다."
      />
      {errors.comment && <p className="text-red-500 text-sm">한 줄 평을 입력해주세요.</p>}
      <Button
        type="submit"
        className={cn(isSubmitting && "disabled:opacity-50", "mt-4")}
        disabled={isSubmitting}
      >
        한 줄 평 등록하기
      </Button>
    </form>
  );
};

export default CommentForm;
