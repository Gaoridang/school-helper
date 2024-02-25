import { createClient } from "@/app/utils/supabase/server";
import React from "react";

interface Props {
  code: string;
}

const ClassStudents = async ({ code }: Props) => {
  const supabase = createClient();
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

export default ClassStudents;
