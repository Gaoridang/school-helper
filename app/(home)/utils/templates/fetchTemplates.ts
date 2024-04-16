import { supabase } from "@/app/utils/supabase/client";
import useClassStore from "../../store/classStore";

export const fetchTemplates = async (classId: string | null) => {
  if (!classId) return [];

  const { data, error } = await supabase
    .from("templates")
    .select("id, start_date, end_date, subject, period, class_id")
    .eq("class_id", classId);

  if (error) return [];

  return data;
};
