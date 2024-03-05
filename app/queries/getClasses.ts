import { useQuery } from "@supabase-cache-helpers/postgrest-react-query";
import { TypedSupabaseClient } from "../utils/types";
import useSupabaseBrowser from "../utils/supabase/client";

export function getClasses(client: TypedSupabaseClient, userId: string) {
  return client
    .from("user_classes")
    .select(`class_id, is_primary, classes(school, grade, class_number, id)`)
    .eq("user_id", userId);
}

export const useClasses = (userId: string) => {
  const supabase = useSupabaseBrowser();

  return useQuery(getClasses(supabase, userId || ""), {
    enabled: !!userId,
  });
};
