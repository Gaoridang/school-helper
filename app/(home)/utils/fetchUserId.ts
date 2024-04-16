import { supabase } from "@/app/utils/supabase/client";

export const fetchUserId = async () => {
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error) return error.message;

  if (!user) return "";

  return user.id;
};
