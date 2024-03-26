"use client";

import { supabase } from "@/app/utils/supabase/client";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { CommentSchema, CommentType } from "../_types/schema";

interface Props {
  parentCommentId?: number;
  session_id: string;
}

const CommentInput = ({ parentCommentId, session_id }: Props) => {
  const form = useForm<CommentType>({
    resolver: zodResolver(CommentSchema),
    defaultValues: {
      comment: "",
    },
  });

  const onSubmit = async (data: CommentType) => {
    const { error } = await supabase.from("comments").insert({
      comment: data.comment,
      parent_comment_id: parentCommentId,
      session_id: session_id,
      user_id: JSON.parse(localStorage.getItem("user")!).id,
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          name="comment"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>한 줄 평</FormLabel>
              <FormControl>
                <Textarea placeholder="오늘의 한 줄 평..." className="resize-none" {...field} />
              </FormControl>
              <FormDescription></FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          type="submit"
          variant="outline"
          className="mt-4"
          disabled={form.formState.isSubmitting}
        >
          등록하기
        </Button>
      </form>
    </Form>
  );
};

export default CommentInput;
