import useSupabaseServer from "@/app/utils/supabase/server";
import { cookies } from "next/headers";
import React from "react";

interface Props {
  params: { id: string };
}

const StudentDetailPage = async ({ params }: Props) => {
  const cookieStore = cookies();
  const supabase = useSupabaseServer(cookieStore);

  const { data: student, error } = await supabase
    .from("users")
    .select("*")
    .eq("id", params.id)
    .single();

  return (
    <div>
      <pre>{JSON.stringify(student, null, 2)}</pre>
    </div>
  );
};

export default StudentDetailPage;
