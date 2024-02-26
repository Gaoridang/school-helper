import ScheduleCard from "@/app/assessment/ScheduleCard";
import React from "react";
import StudentList from "./StudentList";

interface Props {
  params: { id: string };
}

const ClassDetailPage = ({ params }: Props) => {
  return (
    <>
      <StudentList classId={params.id} />
      <ScheduleCard />
    </>
  );
};

export default ClassDetailPage;
