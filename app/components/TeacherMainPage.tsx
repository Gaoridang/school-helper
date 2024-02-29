"use client";

import { useEffect, useState } from "react";
import { getClasses } from "../queries/getClasses";
import { getStudentsByClassId } from "../queries/getStudentsByClassId";
import useSupabaseBrowser from "../utils/supabase/client";
import { useQuery } from "@supabase-cache-helpers/postgrest-react-query";
import SelectSchool from "../(teacher)/components/SelectSchool";
import StudentListTable from "../(teacher)/components/StudentListTable";
import { columns } from "../(teacher)/components/columns";
import { Student } from "../(teacher)/types";
import PageTitle from "./PageTitle";
import ClassListLoadingSkeleton from "../(teacher)/components/ClassListLoadingSkeleton";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

const TeacherMainPage = () => {
  const [classId, setClassId] = useState("");
  const router = useRouter();

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
      <Button onClick={() => router.push(`/evaluate/create/${classId}`)}>평가지 만들기</Button>
    </div>
  );
};

export default TeacherMainPage;