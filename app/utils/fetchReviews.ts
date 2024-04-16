import { supabase } from "./supabase/client";

export const fetchReviews = async (userId: string, type: "self" | "peer") => {
  let query;
  if (type === "self") {
    query = supabase
      .from("session_results")
      .select("*")
      .eq("evaluator_id", userId)
      .eq("evaluatee_id", userId)
      .order("session_date", { ascending: false });
  } else {
    query = supabase
      .from("session_results")
      .select("*")
      .neq("evaluator_id", userId)
      .eq("evaluatee_id", userId)
      .order("session_date", { ascending: false });
  }

  const { data, error } = await query;

  if (error) {
    return [];
  }

  return data;
};
