import { useQuery } from "@tanstack/react-query";
import { createClient } from "../utils/supabase/client";

const useUser = () => {
  const supabase = createClient();

  return useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      const { data: user, error } = await supabase.from("profiles").select("*").single();
      if (error) throw error;
      return user;
    },
  });
};

export default useUser;
