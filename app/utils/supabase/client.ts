import { Database } from "@/app/schema";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "http://127.0.0.1:54321";
const supabasekey = process.env.NEXT_SUPABASE_ANON_KEY!;
export const supabase = createClient<Database>(supabaseUrl, supabasekey);
