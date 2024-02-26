import { Tables } from "../types/schema";
import { createClient } from "./supabase/server";

type Teacher = {
  role: "teacher";
  user: Tables<"profiles">;
};

type Student = {
  role: "student";
  user: Tables<"students">;
};

export type User = Teacher | Student;

export async function getUserInfo() {
  const supabase = createClient();
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (!user || error) {
    console.error("Error fetching user:", error);
    return null;
  }

  // Attempt to fetch from the profiles table
  const { data: teacher, error: teacherError } = await supabase
    .from("profiles")
    .select("*")
    .maybeSingle();

  // If a teacher is found, return the teacher info
  if (teacher && !teacherError) {
    return { user: teacher, role: "teacher" } as Teacher;
  }

  // Attempt to fetch from the students table
  const { data: student, error: studentError } = await supabase
    .from("students")
    .select("*")
    .eq("id", user.id)
    .maybeSingle();

  // If a student is found, return the student info
  if (student && !studentError) {
    return { user: student, role: "student" } as Student;
  }

  // Handle the case where no user is found or there's an error
  if (teacherError) console.error("Error fetching teacher:", teacherError);
  if (studentError) console.error("Error fetching student:", studentError);

  return null;
}
