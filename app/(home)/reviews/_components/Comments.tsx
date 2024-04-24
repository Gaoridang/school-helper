"use client";

import { Tables } from "@/app/types/schema";
import { supabase } from "@/app/utils/supabase/client";
import { useEffect, useState } from "react";
import CommentInput from "./CommentInput";
import { getComments } from "@/app/utils/comments";
import { Skeleton } from "@/components/ui/skeleton";

interface Props {
  sessionId: string;
}

const Comments = ({ sessionId }: Props) => {
  const [comments, setComments] = useState<Tables<"comments">[]>([]);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    const fetchComments = async () => {
      const data = await getComments(sessionId);
      setComments(data);
    };
    fetchComments();
    setLoading(false);
  }, [sessionId]);

  useEffect(() => {
    const subscription = supabase
      .channel("comments")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "comments" },
        (payload) => {
          setComments((prev) => [...prev, payload.new as Tables<"comments">]);
        },
      )
      .subscribe();

    return () => {
      supabase.removeChannel(subscription);
    };
  }, []);

  return (
    <div className="relative flex flex-col rounded-lg">
      <CommentInput sessionId={sessionId} />
      {!isLoading ? (
        comments?.map((comment) => (
          <p key={comment.id} className="pl-4 px-12 py-2 rounded-lg">
            {comment.comment}
          </p>
        ))
      ) : (
        <Skeleton className="w-full h-12 mt-2" />
      )}
    </div>
  );
};

export default Comments;
