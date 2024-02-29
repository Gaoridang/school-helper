import { TypedSupabaseClient } from "../utils/types";

export const getEvalItemsByCreatorId = async (client: TypedSupabaseClient, creatorId: string) => {
  return client.from("evaluation_items").select("*").eq("creator_id", creatorId);
};
