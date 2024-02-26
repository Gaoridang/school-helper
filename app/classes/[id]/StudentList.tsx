import useSupabaseServer from "@/app/utils/supabase/server";
import { QueryData } from "@supabase/supabase-js";
import React from "react";
import StudentTable from "./StudentTable";
import { columns } from "./columns";
import { cookies } from "next/headers";

interface Props {
  classId: string;
}

const StudentList = async ({ classId }: Props) => {
  const cookieStore = cookies();
  const supabase = useSupabaseServer(cookieStore);
  const classesWithStudentsQuery = supabase
    .from("classes")
    .select(
      `
    id,
    code,
    students (
      id,
      name,
      student_number,
      student_code
    )
  `,
    )
    .eq("id", classId)
    .single();

  type ClassWithStudents = QueryData<typeof classesWithStudentsQuery>;

  const { data, error } = await classesWithStudentsQuery;
  if (error) throw error;

  const classesWithStudents: ClassWithStudents = data;

  console.log(classesWithStudents);

  return (
    <div>
      <StudentTable columns={columns} data={classesWithStudents.students} />
    </div>
  );
};

export default StudentList;
