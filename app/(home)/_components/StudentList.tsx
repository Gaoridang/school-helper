"use client";

import { Tables } from "@/app/types/schema";
import { supabase } from "@/app/utils/supabase/client";
import { useEffect, useState } from "react";
import useClassStore from "../store/classStore";
import { format } from "date-fns";
import MainBox from "./MainBox";
import MainTitle from "./MainTitle";
import Link from "next/link";
import { Skeleton } from "@/components/ui/skeleton";

const StudentList = () => {
  const [isLoading, setLoading] = useState(true);
  const [students, setStudents] = useState<Tables<"class_students_view">[]>([]);
  const [sessions, setSessions] = useState<
    Pick<Tables<"session_results">, "session_id" | "evaluatee_id">[]
  >([]);
  const classId = useClassStore((state) => state.classId);
  const todayKorea = format(new Date().toLocaleDateString("ko-KR"), "yyyy-MM-dd");

  useEffect(() => {
    if (!classId) return;

    const fetchData = async () => {
      const fetchStudents = async () => {
        const { data, error } = await supabase
          .from("class_students_view")
          .select("*")
          .eq("class_id", classId);

        if (error) return [];

        setStudents(data);
        return data;
      };

      const fetchSessions = async () => {
        const { data, error } = await supabase
          .from("session_results")
          .select("session_id, evaluatee_id")
          .eq("subject", "")
          .eq("class_id", classId)
          .eq("session_date", todayKorea);

        if (error) return [];

        setSessions(data);
        return data;
      };

      await Promise.all([fetchStudents(), fetchSessions()]);
      setLoading(false);
    };
    fetchData();
  }, [classId, todayKorea]);

  useEffect(() => {
    const subscription = supabase
      .channel("session_results")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "session_results" },
        async (payload) => {
          const newSessions = payload.new as Pick<
            Tables<"session_results">,
            "session_id" | "evaluatee_id"
          >;
          setSessions((prev) => [...prev, newSessions]);
        },
      )
      .subscribe();

    return () => {
      supabase.removeChannel(subscription);
    };
  }, []);

  if (isLoading)
    return (
      <MainBox>
        <MainTitle title="학생목록" description="학급에 속한 학생과\n평가 결과를 확인하세요." />
        {Array.from({ length: 5 }).map((_, index) => (
          <div
            key={index}
            className="border-b border-[#e9e9e9] py-2 flex justify-between items-center"
          >
            <Skeleton className="w-20 h-5" />
            <Skeleton className="w-12 h-5" />
          </div>
        ))}
      </MainBox>
    );

  return (
    <MainBox>
      <MainTitle title="학생목록" description="학급에 속한 학생과\n평가 결과를 확인하세요." />
      {students.map((student) => {
        const done = sessions.some((session) => session.evaluatee_id === student.user_id);
        const sessionId = sessions.find(
          (session) => session.evaluatee_id === student.user_id,
        )?.session_id;
        return (
          <div
            key={student.user_id}
            className="border-b border-[#e9e9e9] py-2 flex justify-between items-center"
          >
            <span className="text-sm font-light">{student.name}</span>
            {done ? (
              <Link
                href={`/reviews/${student.user_id}/${sessionId}`}
                className="text-sm text-[#57BD9E] underline underline-offset-4"
              >
                완료
              </Link>
            ) : (
              <span className="text-sm text-gray-400">미완료</span>
            )}
          </div>
        );
      })}
    </MainBox>
  );
};

export default StudentList;
