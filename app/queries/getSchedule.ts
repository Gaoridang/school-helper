import { TypedSupabaseClient } from "@/app/utils/types";

export const getSchedules = (client: TypedSupabaseClient) => {
  return client.from("schedules").select("*").single();
};
