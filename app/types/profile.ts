import { Tables } from "@/database.types";

export type Profile = Tables<"profiles">;
export type PickProfile<K extends keyof Profile> = Pick<Profile, K>;
