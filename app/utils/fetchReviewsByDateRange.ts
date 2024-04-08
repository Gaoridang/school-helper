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
    .from("session_evaluation_summary")
    .select("*")
    .eq("evaluatee_id", userId)
    .eq("class_id", classId)
    .eq("type", "self")
    .gte("start_time", startDate)
    .lte("start_time", endDate)
    .order("start_time", { ascending: true });

  if (error) {
    console.log(error);
  }

  return data as ReviewData[];
};
