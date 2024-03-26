import { useQuery } from "@tanstack/react-query";
import { supabase } from "../utils/supabase/client";

export const useReviewSessions = (classId: string, userId: string) => {
  return useQuery({
    queryKey: ["reviews"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("session_evaluation_summary")
        .select("*")
        .eq("evaluatee_id", userId)
        .eq("class_id", classId);
      if (error) {
        throw error;
      }
      return data;
    },
    enabled: !!classId && !!userId,
  });
};

export const useReviewSessionsByDateRange = (
  startDate: string,
  endDate: string,
  classId: string,
  userId: string,
) => {
  return useQuery({
    queryKey: ["reviews"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("session_evaluation_summary")
        .select("*")
        .eq("evaluatee_id", userId)
        .eq("class_id", classId)
        .gte("date", startDate)
        .lte("date", endDate);
      if (error) {
        throw error;
      }
      return data;
    },
    enabled: !!startDate && !!endDate && !!classId && !!userId,
  });
};
