import { TypedSupabaseClient } from "@/app/utils/types";
import { format, subHours } from "date-fns";

export const fetchStudents = async (supabase: TypedSupabaseClient) => {
  const { data, error } = await supabase
    .from("users")
    .select("*")
    .eq("role", "student")
    .order("student_number");

  if (error) {
    console.error(error);
    return [];
  }

  return data;
};

export const fetchResults = async (supabase: TypedSupabaseClient) => {
  const todayStart = format(subHours(new Date(), 9), "yyyy-MM-dd");

  const { data, error } = await supabase
    .from("evaluation_results")
    .select("*")
    .gte("created_at", todayStart);

  if (error) {
    console.error(error);
    return [];
  }

  return data;
};
