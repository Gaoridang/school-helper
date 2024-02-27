import { TypedSupabaseClient } from "../utils/types";

export function getStudentsByClassId(client: TypedSupabaseClient, classId: string) {
  return client
    .from("user_classes")
    .select("users!user_classes_user_id_fkey(*)")
    .eq("class_id", classId);
}
