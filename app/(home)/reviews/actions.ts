"use server";

import { createClient } from "@/app/utils/supabase/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export const insertCommentAction = async (comment: string, emoji: string, sessionId: string) => {
  const supabase = createClient();

  const {
    data: { user },
    error: getUserError,
  } = await supabase.auth.getUser();

  if (getUserError) {
    return [];
  }

  const { error: getCommentsError } = await supabase
    .from("comments")
    .insert({ comment, emoji, session_id: sessionId })
    .select();

  if (getCommentsError) {
    return [];
  }

  revalidatePath(`/reviews/*`, "page");
};
