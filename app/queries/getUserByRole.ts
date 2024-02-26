import { TypedSupabaseClient } from "../utils/types";

export const getUserByRole = (
  client: TypedSupabaseClient,
  role: "teacher" | "student" | "parents",
) => {
  if (role === "teacher") {
    return client.from("teachers").select("*").single();
  }
  if (role === "student") {
    return client.from("students").select("*").single();
  }
};
