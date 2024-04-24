import { supabase } from "./supabase/client";

export const insertComment = async (comment: string, sessionId: string) => {
  const { data, error } = await supabase
    .from("comments")
    .insert({ comment, session_id: sessionId })
    .select();

  if (error) {
    return [];
  }

  return data;
};

export const getComments = async (sessionId: string) => {
  const { data, error } = await supabase.from("comments").select("*").eq("session_id", sessionId);

  if (error) {
    return [];
  }

  return data;
};
