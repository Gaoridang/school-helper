import React, { ReactNode } from "react";
import ActivitySelector from "./_components/ActivitySelector";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { Database } from "../types/schema";
import { cookies } from "next/headers";

const DashboardLayout = async ({ children }: { children: ReactNode }) => {
  const supabase = createServerComponentClient<Database>({ cookies });
  const { data: activities, error } = await supabase.from("activities").select("*");

  if (error) return error;

  console.log(activities);

  return (
    <div className="grid gap-4">
      <ActivitySelector />
      {children}
    </div>
  );
};

export default DashboardLayout;
