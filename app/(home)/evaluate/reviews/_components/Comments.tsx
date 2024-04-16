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
  const [comments, setComments] = useState<Tables<"comments_with_user">[]>();

  const deleteComment = async (id: number) => {
    const { error } = await supabase.from("comments").delete().eq("id", id);
    if (error) {
      throw error;
    }
  };

  useEffect(() => {
    const fetchComments = async () => {
      const { data, error } = await supabase
        .from("comments_with_user")
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
          .from("comments_with_user")
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
            <div className="flex flex-col items-start gap-1 mb-4">
              {updateCommentId === comment.id ? (
                <CommentInput
                  session_id={session_id}
                  comment_id={comment.id}
                  type="update"
                  comment={comment.comment}
                />
              ) : (
                <div className="flex items-center gap-2 text-sm">
                  <p className="font-semibold">{comment.user_name}</p>
                  <p>{comment.comment}</p>
                </div>
              )}
              {updateCommentId === comment.id || replyCommentId === comment.id ? (
                <button
                  className="text-xs opacity-70 hover:opacity-100 transition-all"
                  onClick={() => {
                    setUpdateCommentId(undefined);
                    setReplyCommentId(undefined);
                  }}
                >
                  취소
                </button>
              ) : (
                comment.user_id === user?.id && (
                  <div className="flex items-center gap-2">
                    <button
                      className="text-xs opacity-70 hover:opacity-100 transition-all"
                      onClick={() => setUpdateCommentId(comment.id!)}
                    >
                      수정
                    </button>
                    <button
                      className="text-xs opacity-70 hover:opacity-100 transition-all"
                      onClick={() => deleteComment(comment.id!)}
                    >
                      삭제
                    </button>
                  </div>
                )
              )}
              {comment.user_id !== user?.id && (
                <button
                  onClick={() => setReplyCommentId(comment.id!)}
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
