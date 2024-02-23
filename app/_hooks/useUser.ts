import { useQuery } from "@tanstack/react-query";
import { createClient } from "../utils/supabase/client";
import { useUser as supaUseUser } from "@supabase/auth-helpers-react";

const useUser = () => {
  const supabase = createClient();
  const session = supaUseUser();

  return useQuery({
    queryKey: ["user", session?.id],
    queryFn: async () => {
      if (!session?.id) throw new Error("User ID is undefined");
      const { data: user, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", session.id)
        .single();
      if (error) throw error;
      return user;
    },
    enabled: !!session,
  });
};

export default useUser;
