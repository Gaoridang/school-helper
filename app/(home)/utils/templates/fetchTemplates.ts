import { supabase } from "@/app/utils/supabase/client";

export const fetchTemplates = async (classId: string | null) => {
  if (!classId) return [];

  const { data, error } = await supabase
    .from("templates")
    .select("id, creator_id, start_date, end_date, subject, period, class_id")
    .eq("class_id", classId);

  if (error) return [];

  return data;
};
