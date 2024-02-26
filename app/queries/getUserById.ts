import { TypedSupabaseClient } from "../utils/types";

// FIXME: 새로운 테이블에 맞게 수정 필요
export const getUserById = async (client: TypedSupabaseClient, id: string) => {
  const teacherQuery = client.from("profiles").select("*").eq("id", id).maybeSingle();
  const studentQuery = await client.from("students").select("*").eq("id", id).maybeSingle();

  const [teacherData, studentData] = await Promise.all([teacherQuery, studentQuery]);

  return teacherData.data || studentData.data;
};
