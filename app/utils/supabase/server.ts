import { Database } from "@/app/types/schema";
import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

export default function useSupabaseServer() {
  const cookieStore = cookies();

  return createServerClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value;
        },
      },
    },
  );
}
