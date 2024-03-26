import { supabase } from "./supabase/client";

export const fetchReviews = async (classId: string, userId: string, type: "self" | "peer") => {
  const { data, error } = await supabase
    .from("session_evaluation_summary")
    .select("*")
    .eq("evaluatee_id", userId)
    .eq("class_id", classId)
    .eq("type", type)
    .order("start_time", { ascending: false });

  if (error) {
    return [];
  }

  return data;
};
