import { supabase } from "@/app/utils/supabase/client";

export const fetchLinkedStudent = async (parentId?: string, classId?: string) => {
  if (!parentId || !classId) return [];

  const { data, error } = await supabase
    .from("student_with_class_parents")
    .select("*")
    .eq("parent_id", parentId)
    .eq("class_id", classId);

  if (error) return [];

  return data;
};
