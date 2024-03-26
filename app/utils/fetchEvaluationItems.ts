import { supabase } from "./supabase/client";

export const fetchEvaluationItems = async (templateId: number) => {
  const { data, error } = await supabase
    .from("evaluation_items")
    .select("*")
    .eq("template_id", templateId);

  if (error) {
    console.log(error);
    return [];
  }

  return data;
};
