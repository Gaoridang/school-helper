import { useQuery } from "@tanstack/react-query";
import { supabase } from "../utils/supabase/client";

const fetchProfile = async (userId: string | null) => {
  if (!userId) return null;
  const { data, error } = await supabase.from("profiles").select("*").eq("id", userId).single();

  if (error) {
    console.error(error);
    return null;
  }

  return data;
};

export const useGetProfile = (userId: string | null) => {
  return useQuery({
    queryKey: ["profile", userId],
    queryFn: () => fetchProfile(userId),
    enabled: !!userId,
  });
};
