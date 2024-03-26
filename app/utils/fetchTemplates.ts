import { supabase } from "./supabase/client";

export type Templates = {
  date: string;
  id: number;
  subject_name: string;
  type: string;
  period: string;
};

export const fetchTemplates = async (classId: string, type: string) => {
  const { data, error } = await supabase
    .from("evaluation_templates")
    .select("date, id, subject_name, type, period")
    .eq("type", type)
    .eq("class_id", classId)
    .order("date", { ascending: false });

  if (error) {
    console.log(error);
    return [];
  }

  return data;
};
