import { supabase } from "./supabase/client";

export const insertComment = async (comment: string, emoji: string, sessionId: string) => {
  const { data, error } = await supabase
    .from("comments")
    .insert({ comment, emoji, session_id: sessionId })
    .select();

  if (error) {
    return [];
  }

  return data;
};

export const getComments = async (sessionId: string) => {
  const { data, error } = await supabase
    .from("comments_view")
    .select("*")
    .eq("session_id", sessionId)
    .order("created_at", { ascending: false });

  if (error) {
    return [];
  }

  return data;
};
