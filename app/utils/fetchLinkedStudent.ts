import { User } from "@supabase/supabase-js";
import { supabase } from "./supabase/client";

export const fetchLinkedStudent = async (user: User, classId: string) => {
  const { data, error } = await supabase
    .from("students_parents")
    .select("student_id, student_code")
    .eq("parent_id", user.id)
    .eq("class_id", classId)
    .single();

  if (error) {
    console.log(error);
  }

  return data;
};
