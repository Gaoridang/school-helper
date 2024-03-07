import { useQuery } from "@tanstack/react-query";
import useSupabaseBrowser from "../utils/supabase/client";

export const useReviewSessions = (date: string, classId: string, userId: string) => {
  const supabase = useSupabaseBrowser();

  return useQuery({
    queryKey: ["reviews", date],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("session_evaluation_summary")
        .select("*")
        .eq("evaluatee_id", userId)
        .eq("class_id", classId)
        .eq("date", date);
      if (error) {
        throw error;
      }
      return data;
    },
    enabled: !!date && !!classId && !!userId,
  });
};

export const useReviewSessionsByDateRange = (
  startDate: string,
  endDate: string,
  classId: string,
  userId: string,
) => {
  const supabase = useSupabaseBrowser();

  return useQuery({
    queryKey: ["reviews", startDate, endDate],
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
