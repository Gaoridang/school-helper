"use client";

import { Tables } from "@/app/types/schema";
import { supabase } from "@/app/utils/supabase/client";
import { useEffect, useState } from "react";
import CommentInput from "./CommentInput";
import { getComments } from "@/app/utils/comments";
import { Skeleton } from "@/components/ui/skeleton";
import { emojiList } from "./Emojis";
import Image from "next/image";

interface Props {
  sessionId: string;
}

const Comments = ({ sessionId }: Props) => {
  const [comments, setComments] = useState<Tables<"comments_view">[]>([]);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    const fetchComments = async () => {
      const data = await getComments(sessionId);
      setComments(data);
    };
    fetchComments();
    setLoading(false);
  }, [sessionId]);

  return (
    <div className="relative flex flex-col rounded-lg">
      <CommentInput sessionId={sessionId} />
      {!isLoading ? (
        comments?.map((comment) => (
          <div key={comment.id} className="flex gap-2 items-center mb-4">
            <Image
              src={emojiList[comment.emoji as keyof typeof emojiList] || emojiList["좋음"]}
              alt="emoji"
              width={24}
              height={24}
            />
            <p>{comment.comment}</p>
            <span className="text-sm font-semibold opacity-50">{comment.name}</span>
          </div>
        ))
      ) : (
        <Skeleton className="w-full h-12 mt-2" />
      )}
    </div>
  );
};

export default Comments;
