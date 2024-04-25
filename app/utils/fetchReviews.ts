import { supabase } from "./supabase/client";

export const fetchReviews = async (
  userId: string,
  classId: string,
  type: "self" | "peer" | "all",
) => {
  let query;
  if (type === "self") {
    query = supabase
      .from("session_results")
      .select("session_date, total_passed, first_comment, session_id")
      .eq("evaluator_id", userId)
      .eq("evaluatee_id", userId)
      .eq("class_id", classId)
      .order("session_date", { ascending: false });
  } else if (type === "peer") {
    query = supabase
      .from("session_results")
      .select("session_date, total_passed, first_comment, session_id")
      .neq("evaluator_id", userId)
      .eq("evaluatee_id", userId)
      .eq("class_id", classId)
      .order("session_date", { ascending: false });
  } else {
    query = supabase
      .from("session_results")
      .select("session_date, total_passed, first_comment, session_id")
      .eq("evaluatee_id", userId)
      .eq("class_id", classId)
      .order("session_date", { ascending: false });
  }

  const { data, error } = await query;

  if (error) {
    return [];
  }

  return data;
};
