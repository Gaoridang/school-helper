import { TypedSupabaseClient } from "@/app/utils/types";
import { format, subHours } from "date-fns";

export const fetchStudents = async (supabase: TypedSupabaseClient, classId: string) => {
  if (!classId) return [];

  const { data: students, error: studentsError } = await supabase
    .from("user_classes")
    .select("user_id")
    .eq("class_id", classId)
    .eq("role", "student");

  if (studentsError) {
    console.error(studentsError);
    return [];
  }

  // fetch users from user_id
  const userIds = students.map((student) => student.user_id);
  const { data: users, error: usersError } = await supabase
    .from("users")
    .select("*")
    .in("id", userIds);

  if (usersError) {
    console.error(usersError);
    return [];
  }

  return users;
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
