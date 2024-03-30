import { supabase } from "./supabase/client";

export type Templates = {
  start_date: string;
  end_date: string;
  id: number;
  subject_name: string;
  type: string;
  period: string;
};

export const fetchTemplates = async (classId: string, type: string) => {
  const { data, error } = await supabase
    .from("evaluation_templates")
    .select("start_date, end_date, id, subject_name, type, period")
    .eq("type", type)
    .eq("class_id", classId)
    .order("start_date", { ascending: false });

  if (error) {
    console.log(error);
    return [];
  }

  return data;
};
