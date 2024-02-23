"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import PageTitle from "./components/PageTitle";
import { useQuery } from "@tanstack/react-query";

import { cookies } from "next/headers";
import { createClient } from "./utils/supabase/client";

export default function Home() {
  const supabase = createClient();

  const { data: schedule, error } = useQuery({
    queryKey: ["schedule"],
    queryFn: async () => {
      const { data, error } = await supabase.from("schedules").select("*");
      if (error) throw error;
      return data;
    },
  });

  console.log(schedule);

  return <h1>Hi</h1>;
}
