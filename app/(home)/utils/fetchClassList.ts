import { supabase } from "@/app/utils/supabase/client";

export const fetchClassListByUserId = async (userId?: string) => {
  if (!userId) return [];

  const { data, error } = await supabase
    .from("user_class_details")
    .select("*")
    .eq("user_id", userId);

  if (error) return [];

  return data;
};
