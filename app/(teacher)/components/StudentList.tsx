"use client";

import { Tables } from "@/app/types/schema";
import { useEffect, useState } from "react";
import { fetchResults, fetchStudents } from "../hooks/fetchStudents";
import StudentListTable from "./StudentListTable";
import { columns } from "./columns";
import { Skeleton } from "@/components/ui/skeleton";
import { supabase } from "@/app/utils/supabase/client";
import { useClass } from "../hooks/useClass";

const StudentList = () => {
  const [students, setStudents] = useState<Tables<"users">[]>([]);
  const [results, setResults] = useState<Tables<"evaluation_results">[]>([]);
  const [studentWithDone, setStudentWithDone] = useState<
    { id: string; user: string; done: boolean; sessionId: string | undefined | null }[]
  >([]);
  const [isLoading, setIsLoading] = useState(true);
  const { selectedClassId } = useClass();

  useEffect(() => {
    setIsLoading(true);
    (async () => {
      const studentsData = await fetchStudents(supabase, selectedClassId);
      setStudents(studentsData);

      const resultsData = await fetchResults(supabase);
      setResults(resultsData);

      setIsLoading(false);
    })();

    // Subscribe to changes in the evaluation_results table
    const subscription = supabase
      .channel("evaluation_results")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "evaluation_results" },
        async () => {
          // Refetch results on any change
          const resultsData = await fetchResults(supabase);
          setResults(resultsData);
        },
      )
      .subscribe();

    // Cleanup subscription on component unmount
    return () => {
      supabase.removeChannel(subscription);
    };
  }, [selectedClassId]);

  // Update the studentWithDone state based on the latest results
  useEffect(() => {
    if (students.length === 0) return;

    const updatedStudentWithDone = students.map((student) => {
      const done = results.some((result) => result.evaluatee_id === student.id);
      return {
        id: student.id,
        user: student.name,
        done,
        sessionId: results.find((result) => result.evaluatee_id === student.id)?.session_id,
      };
    });

    setStudentWithDone(updatedStudentWithDone);
    setIsLoading(false);
  }, [results, students]);

  return isLoading && studentWithDone.length === 0 ? (
    <div className="grid gap-4 border rounded-md p-4">
      <Skeleton className="h-8" />
      {Array.from({ length: 6 }).map((_, index) => (
        <div key={index} className="flex gap-4">
          <div className="w-full">
            <Skeleton className="h-6 w-32" />
          </div>
          <div className="w-full">
            <Skeleton className="h-6 w-12 rounded-xl" />
          </div>
        </div>
      ))}
    </div>
  ) : (
    <StudentListTable data={studentWithDone} columns={columns} />
  );
};

export default StudentList;
