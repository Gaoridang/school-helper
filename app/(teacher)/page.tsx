"use client";

import { useState } from "react";
import { getClasses } from "../queries/getClasses";
import { getStudentsByClassId } from "../queries/getStudentsByClassId";
import useSupabaseBrowser from "../utils/supabase/client";
import { useQuery } from "@supabase-cache-helpers/postgrest-react-query";
import SelectSchool from "./components/SelectSchool";
import StudentListTable from "./components/StudentListTable";
import { columns } from "./components/columns";
import { Student } from "./types";

const TeacherMainPage = () => {
  const [classId, setClassId] = useState("");

  const supabase = useSupabaseBrowser();
  const { data: classes } = useQuery(getClasses(supabase));
  const { data } = useQuery(getStudentsByClassId(supabase, classId), {
    enabled: !!classId,
  });

  const handleSelectClass = (classId: string) => {
    setClassId(classId);
  };

  const students = data?.map((student) => student.users as Student);

  return (
    <div>
      <SelectSchool
        classes={classes}
        handleSelectClass={handleSelectClass}
        selectedClassId={classId!}
      />
      {students && <StudentListTable columns={columns} data={students} />}
    </div>
  );
};

export default TeacherMainPage;
