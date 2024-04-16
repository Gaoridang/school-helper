import { supabase } from "./supabase/client";

export interface ReviewData {
  class_id: string;
  contents: any[];
  evaluatee_id: string;
  evaluator_id: string;
  period: string;
  session_id: string;
  subject_name: string;
  template_id: number;
  start_time: string;
}

export const fetchReviewsByDateRange = async (
  classId: string,
  userId: string,
  startDate: string,
  endDate: string,
) => {
  const { data, error } = await supabase
    .from("session_results")
    .select("*")
    .eq("evaluatee_id", userId)
    .eq("class_id", classId)
    .gte("session_date", startDate)
    .lte("session_date", endDate)
    .order("session_date");

  if (error) {
    return [];
  }

  return data;
};
