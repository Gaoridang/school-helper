"use server";

import { createClient } from "@/app/utils/supabase/server";
import { revalidatePath } from "next/cache";

export const insertComment = async (comment: string, emoji: string, sessionId: string) => {
  const supabase = createClient();
  const { error } = await supabase
    .from("comments")
    .insert({ comment, emoji, session_id: sessionId })
    .select();

  if (error) {
    return [];
  }

  revalidatePath(`/assessment/${sessionId}`);
};
