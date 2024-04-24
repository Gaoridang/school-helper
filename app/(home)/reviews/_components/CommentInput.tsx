import { Input } from "@/components/ui/input";
import React from "react";
import Emojis, { emojiList } from "./Emojis";
import { CornerDownLeft } from "lucide-react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { insertComment } from "@/app/utils/comments";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";

interface Props {
  sessionId: string;
}

export interface FormValues {
  comment: string;
  emoji: string;
}

const CommentInput = ({ sessionId }: Props) => {
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { isSubmitting, errors },
  } = useForm<FormValues>({
    mode: "onChange",
  });

  const selectedEmoji = watch("emoji");

  const onSubmit = async (data: FormValues) => {
    // toast.promise(() => insertComment(data.comment, data.emoji, sessionId), {
    //   loading: "댓글 등록 중",
    //   success: "댓글이 등록되었습니다.",
    //   error: "댓글 등록에 실패했습니다. 다시 시도해주세요.",
    // });
    // reset();
    await insertComment(data.comment, data.emoji, sessionId);
  };

  return (
    <AnimatePresence>
      <form onSubmit={handleSubmit(onSubmit)} action="" className="relative flex flex-col w-full">
        <div className="relative">
          <Input
            {...register("comment", {
              required: "한 줄 평을 입력해주세요.",
              maxLength: { value: 100, message: "100자 이내로 작성해주세요." },
            })}
            placeholder="한마디를 쓰고 우측 하단의 이모지를 눌러보세요."
            className="w-full"
          />
          {selectedEmoji && (
            <motion.div
              key={selectedEmoji}
              initial={{ opacity: 0, scale: 0, translateY: "-50%" }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0 }}
              transition={{ duration: 0.2 }}
              className="absolute right-2 top-1/2"
            >
              <Image
                src={emojiList[selectedEmoji as keyof typeof emojiList]}
                alt={selectedEmoji}
                width={24}
                height={24}
              />
            </motion.div>
          )}
        </div>
        {errors.comment && <p className="text-red-500 text-sm">{errors.comment.message}</p>}
        {errors.emoji && <p className="text-red-500 text-sm">{errors.emoji.message}</p>}
        <div className="right-2 flex items-center gap-2 mt-2 self-end">
          <Emojis register={register} />
          <button
            type="submit"
            disabled={isSubmitting}
            className="flex items-end gap-1 bg-gray-200 px-2 py-1 rounded-lg text-sm opacity-70 hover:opacity-100"
          >
            등록하기
            <CornerDownLeft className="w-5 h-5" strokeWidth={2.5} />
          </button>
        </div>
      </form>
    </AnimatePresence>
  );
};

export default CommentInput;
