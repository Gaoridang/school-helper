import { supabase } from "@/app/utils/supabase/client";

interface TemplateData {
  class_id: string;
  start_date: string;
  end_date: string;
  subject?: string;
  period?: string;
}

interface ItemData {
  class_id: string;
  content: string;
  template_id: number;
}

export const createTemplate = async (templateData: TemplateData) => {
  const { data, error } = await supabase
    .from("templates")
    .insert(templateData)
    .select("id")
    .single();

  if (error) {
    return { error: error.message };
  }

  return data;
};

export const createItems = async (itemData: ItemData[]) => {
  const { error } = await supabase.from("items").insert(itemData);

  if (error) {
    return { error: error.message };
  }

  return { success: true };
};
