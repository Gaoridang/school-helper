import { useQuery } from "@tanstack/react-query";
import useSupabaseBrowser from "../utils/supabase/client";

export const useTemplates = (date: string, classId: string) => {
  const supabase = useSupabaseBrowser();

  return useQuery({
    queryKey: ["templates", date],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("evaluation_templates")
        .select("*")
        .eq("class_id", classId)
        .eq("date", date);
      if (error) {
        throw error;
      }
      return data;
    },
    enabled: !!date && !!classId,
  });
};
