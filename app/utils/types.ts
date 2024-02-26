import { SupabaseClient } from "@supabase/supabase-js";
import { Database } from "../types/schema";

export type TypedSupabaseClient = SupabaseClient<Database>;
