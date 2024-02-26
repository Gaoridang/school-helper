import { TypedSupabaseClient } from "../utils/types";

export const getCurrentUser = (client: TypedSupabaseClient) => {
  return client.auth.getUser();
};
