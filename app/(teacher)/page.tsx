"use client";

import { useEffect, useState } from "react";
import { getClasses } from "../queries/getClasses";
import { getStudentsByClassId } from "../queries/getStudentsByClassId";
import useSupabaseBrowser from "../utils/supabase/client";
import { useQuery } from "@supabase-cache-helpers/postgrest-react-query";
import SelectSchool from "./components/SelectSchool";
import StudentListTable from "./components/StudentListTable";
import { columns } from "./components/columns";
import { Student } from "./types";
import PageTitle from "../components/PageTitle";
import ClassListLoadingSkeleton from "./components/ClassListLoadingSkeleton";

const TeacherMainPage = () => {
  const [classId, setClassId] = useState("");

  const supabase = useSupabaseBrowser();
  const { data: classes, isLoading } = useQuery(getClasses(supabase));
  const { data } = useQuery(getStudentsByClassId(supabase, classId), {
    enabled: !!classId,
  });

  useEffect(() => {
    if (classes && classes.length > 0) {
      setClassId(classes[0].id);
    }
  }, [classes, classId]);

  const handleSelectClass = (classId: string) => {
    setClassId(classId);
  };

  const students = data?.map((student) => student.users as Student);

  return (
    <div className="mt-5 max-w-2xl m-auto flex flex-col items-start gap-4">
      <PageTitle title="체크메이트 ✅" description="학급을 선택하고 학생을 조회하세요!" />
      {isLoading ? (
        <ClassListLoadingSkeleton />
      ) : (
        <SelectSchool
          classes={classes}
          handleSelectClass={handleSelectClass}
          selectedClassId={classId!}
        />
      )}
      {students && <StudentListTable columns={columns} data={students} />}
    </div>
  );
};

export default TeacherMainPage;
