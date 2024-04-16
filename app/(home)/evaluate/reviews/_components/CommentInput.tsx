"use client";

import { supabase } from "@/app/utils/supabase/client";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { CommentSchema, CommentType } from "../_types/schema";

interface Props {
  parent_comment_id?: number;
  comment_id?: number;
  session_id: string;
  type?: "reply" | "update";
  comment?: string | null;
}

const CommentInput = ({ parent_comment_id, comment_id, session_id, type, comment }: Props) => {
  const form = useForm<CommentType>({
    resolver: zodResolver(CommentSchema),
    defaultValues: {
      comment: comment ? comment : "",
    },
  });

  const onSubmit = async (data: CommentType) => {
    if (type === "update" && comment_id) {
      const { error } = await supabase
        .from("comments")
        .update({ comment: data.comment })
        .eq("id", comment_id)
        .select();
    } else {
      const { error } = await supabase.from("comments").insert({
        comment: data.comment,
        parent_comment_id: parent_comment_id,
        session_id: session_id,
        user_id: JSON.parse(localStorage.getItem("user")!).id,
      });
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full flex items-end gap-2">
        <FormField
          name="comment"
          control={form.control}
          render={({ field }) => (
            <FormItem className="w-full">
              <FormControl>
                <Textarea placeholder="오늘의 한 줄 평..." className="resize-none" {...field} />
              </FormControl>
              <FormDescription></FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="py-2">
          <Button type="submit" className="mt-4" disabled={form.formState.isSubmitting}>
            {type === "update" ? "수정하기" : "등록하기"}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default CommentInput;
