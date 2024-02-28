import { TypedSupabaseClient } from "../utils/types";

export function getStudentsByClassId(client: TypedSupabaseClient, classId: string) {
  return client
    .from("user_classes")
    .select("users!user_classes_user_id_fkey(id, email, name, student_number, student_code)")
    .eq("class_id", classId);
}
