"use client";

import { Tables } from "@/app/types/schema";
import { supabase } from "@/app/utils/supabase/client";
import { useEffect, useState } from "react";
import CommentInput from "./CommentInput";
import { User } from "@supabase/supabase-js";

interface Props {
  session_id: string;
  user: User | null;
}

const Comments = ({ session_id, user }: Props) => {
  const [replyCommentId, setReplyCommentId] = useState<number>();
  const [updateCommentId, setUpdateCommentId] = useState<number>();
  const [comments, setComments] = useState<Tables<"comments">[]>();

  const deleteComment = async (id: number) => {
    const { error } = await supabase.from("comments").delete().eq("id", id);
    if (error) {
      throw error;
    }
  };

  useEffect(() => {
    const fetchComments = async () => {
      const { data, error } = await supabase
        .from("comments")
        .select("*")
        .eq("session_id", session_id);
      if (error) {
        throw error;
      }
      setComments(data);
    };
    fetchComments();

    const subscription = supabase
      .channel("comments")
      .on("postgres_changes", { event: "*", schema: "public", table: "comments" }, async () => {
        // Refetch results on any change
        const { data, error } = await supabase
          .from("comments")
          .select("*")
          .eq("session_id", session_id);
        if (error) {
          throw error;
        }
        setComments(data);
      })
      .subscribe();

    return () => {
      supabase.removeChannel(subscription);
    };
  }, [session_id]);

  if (!comments || comments.length === 0) return <CommentInput session_id={session_id} />;

  return (
    <div>
      {comments?.map((comment) => {
        return (
          <div key={comment.id} className="flex flex-col gap-2">
            <div className="flex items-center gap-2">
              {updateCommentId === comment.id ? (
                <CommentInput session_id={session_id} comment_id={comment.id} type="update" />
              ) : (
                <p>{comment.comment}</p>
              )}
              {comment.user_id === user?.id && (
                <>
                  <button
                    className="text-xs text-gray-500"
                    onClick={() => setUpdateCommentId(comment.id)}
                  >
                    수정
                  </button>
                  <button
                    className="text-xs text-gray-500"
                    onClick={() => deleteComment(comment.id)}
                  >
                    삭제
                  </button>
                </>
              )}
              {comment.user_id !== user?.id && (
                <button
                  onClick={() => setReplyCommentId(comment.id)}
                  className="text-xs text-gray-500"
                >
                  답글 달기
                </button>
              )}
            </div>
            {replyCommentId === comment.id && (
              <CommentInput parent_comment_id={comment.id} session_id={session_id} />
            )}
          </div>
        );
      })}
    </div>
  );
};

export default Comments;
