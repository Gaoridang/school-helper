"use client";

import { Tables } from "@/app/types/schema";
import { supabase } from "@/app/utils/supabase/client";
import { useToast } from "@/components/ui/use-toast";
import React, { useEffect, useState } from "react";
import Card from "./Card";
import { CircleUserRound } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { User } from "@supabase/supabase-js";
import { useClass } from "@/app/(teacher)/hooks/useClass";
import LinkChild from "./LinkChild";
import { useRouter } from "next/navigation";

interface Props {
  user: User | null;
}

const ChildInfo = ({ user }: Props) => {
  const [student, setStudent] = useState<Pick<Tables<"users">, "id" | "name" | "student_code">>();
  const [studentCode, setStudentCode] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { selectedClassId } = useClass();
  const { toast } = useToast();
  const router = useRouter();
  useEffect(() => {
    if (!user || !selectedClassId) return;

    const fetchChildren = async () => {
      const { data: child, error } = await supabase
        .from("students_parents")
        .select("student_code")
        .eq("parent_id", user?.id!)
        .eq("class_id", selectedClassId)
        .single();

      if (error) {
        toast({
          title: "자녀를 찾을 수 없습니다.",
          description: "자녀 코드를 다시 확인해주세요.",
          variant: "destructive",
        });
        setIsLoading(false);
        // router.push('')
      } else {
        setStudentCode(child.student_code);
      }
    };

    const fetchChildInfo = async () => {
      if (!studentCode) return;

      const { data, error } = await supabase
        .from("users")
        .select("id, name, student_code")
        .eq("student_code", studentCode)
        .single();

      if (error) {
        toast({
          title: "자녀를 찾을 수 없습니다.",
          description: "자녀 코드를 다시 확인해주세요.",
          variant: "destructive",
        });
        setError(error.message);
        return;
      } else {
        setStudent(data);
        setIsLoading(false);
      }
    };

    fetchChildren();
    fetchChildInfo();
  }, [user, selectedClassId, toast, studentCode]);

  if (isLoading)
    return (
      <div className="flex items-center justify-between bg-white py-4 px-8">
        <Skeleton className="w-12 h-12 rounded-full" />
        <div className="flex flex-col items-end">
          <Skeleton className="w-28 h-4 mb-2" />
          <Skeleton className="w-20 h-4" />
        </div>
      </div>
    );

  if (!student) {
    return <LinkChild user={user} />;
  }

  return (
    <Card
      icon={<CircleUserRound className="text-indigo-500" />}
      description={student?.student_code}
    >
      <h2 className="font-bold text-lg">{student?.name}</h2>
    </Card>
  );
};

export default ChildInfo;
