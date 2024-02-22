import { Tables } from "@/app/types/schema";
import { createClient } from "@/app/utils/supabase/client";
import { useSuspenseQuery } from "@tanstack/react-query";

const useQuestions = (activityId: number) => {
  const supabase = createClient();

  return useSuspenseQuery<Tables<"questions">[]>({
    queryKey: ["questions", activityId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("questions")
        .select("*")
        .eq("activity_id", activityId);
      if (error) {
        throw error;
      }
      return data;
    },
  });
};

export default useQuestions;
