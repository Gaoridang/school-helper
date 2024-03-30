import { supabase } from "./supabase/client";

export const fetchReviews = async (classId: string, userId: string, type?: "self" | "peer") => {
  let query = supabase
    .from("session_evaluation_summary")
    .select("*")
    .eq("evaluatee_id", userId)
    .eq("class_id", classId)
    .order("start_time", { ascending: false });

  if (type) {
    query = query.eq("type", type);
  }

  const { data, error } = await query;

  if (error) {
    return [];
  }

  return data;
};
