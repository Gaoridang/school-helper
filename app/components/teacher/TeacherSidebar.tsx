"use client";

import { getClasses } from "@/app/queries/getClasses";
import { getStudentsByClassId } from "@/app/queries/getStudentsByClassId";
import useSupabaseBrowser from "@/app/utils/supabase/client";
import { useQuery } from "@supabase-cache-helpers/postgrest-react-query";
import { useState } from "react";
import SelectSchool from "./SelectSchool";

const TeacherSidebar = () => {
  const [classId, setClassId] = useState("");

  const supabase = useSupabaseBrowser();
  const { data: classes, error: classError } = useQuery(getClasses(supabase));
  const { data: students, error: studentError } = useQuery(
    getStudentsByClassId(supabase, classId),
    {
      enabled: !!classId,
    },
  );

  const handleSelectClass = (classId: string) => {
    setClassId(classId);
  };

  console.log(classId);

  return (
    <div>
      <SelectSchool
        classes={classes}
        handleSelectClass={handleSelectClass}
        selectedClassId={classId!}
      />
      {/* <StudentListTable columns={columns} data={} /> */}
    </div>
  );
};

export default TeacherSidebar;
