import { Input } from "@/components/ui/input";
import React from "react";
import Emojis from "./Emojis";
import { CornerDownLeft } from "lucide-react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { insertComment } from "@/app/utils/comments";

interface Props {
  sessionId: string;
}

interface FormValues {
  comment: string;
}

const CommentInput = ({ sessionId }: Props) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = useForm<FormValues>();

  const onSubmit = async (data: FormValues) => {
    toast.promise(() => insertComment(data.comment, sessionId), {
      loading: "댓글 등록 중",
      success: "댓글이 등록되었습니다.",
      error: "댓글 등록에 실패했습니다. 다시 시도해주세요.",
    });

    reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} action="" className="relative flex flex-col w-full">
      <Input
        {...register("comment", {
          required: "한 줄 평을 입력해주세요.",
          maxLength: { value: 100, message: "100자 이내로 작성해주세요." },
        })}
        placeholder="한마디를 쓰고 우측 하단의 이모지를 눌러보세요."
        className="w-full"
      />
      <div className="right-2 flex gap-2 mt-2 self-end">
        <button
          type="submit"
          disabled={isSubmitting}
          className="flex items-end gap-1 h-10 bg-gray-200 p-1 rounded-lg text-sm opacity-70 hover:opacity-100"
        >
          등록하기
          <CornerDownLeft className="w-5 h-5" strokeWidth={2.5} />
        </button>
        <Emojis />
      </div>
    </form>
  );
};

export default CommentInput;
