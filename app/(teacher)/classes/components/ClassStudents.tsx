import useSupabaseServer from "@/app/utils/supabase/server";
import { cookies } from "next/headers";
import React from "react";

interface Props {
  code: string;
}

const ClassStudentsNumber = async ({ code }: Props) => {
  const cookieStore = cookies();
  const supabase = useSupabaseServer(cookieStore);
  const { data: students } = await supabase
    .from("students")
    .select("*")
    .eq("class_code", code)
    .select("*");

  return (
    <div>
      <div className="flex items-center gap-2">
        <span className="font-semibold text-sm">학생 수 </span>
        <span>{students?.length}명</span>
      </div>
    </div>
  );
};

export default ClassStudentsNumber;
