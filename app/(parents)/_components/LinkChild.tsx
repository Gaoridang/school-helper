"use client";

import CodeInput from "@/app/(home)/classes/register/CodeInput";
import { supabase } from "@/app/utils/supabase/client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useToast } from "@/components/ui/use-toast";
import { User } from "@supabase/supabase-js";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface ClassData {
  id: string;
  class_number: number;
  grade: number;
  school: string;
}

interface StudentData {
  id: string;
  name: string;
  student_code: string | null;
}

const LinkChild = ({ user }: { user: User | null }) => {
  const [isLoading, setIsloading] = useState(false);
  const [foundClass, setFoundClass] = useState<ClassData>();
  const [foundStudent, setFoundStudent] = useState<StudentData>();
  const { toast } = useToast();
  const router = useRouter();
  // 자녀 코드 입력 시 해당 코드에 맞는 자녀를 찿고
  // 자녀가 있으면 해당 자녀를 연결
  const onSubmit = async (code: string) => {
    setIsloading(true);
    const { data: studentData, error: studentError } = await supabase
      .from("users")
      .select("id, name, student_code")
      .eq("student_code", code)
      .single();

    if (studentError || !studentData) {
      return toast({
        title: "자녀를 찾을 수 없습니다.",
        description: "자녀 코드를 다시 확인해주세요.",
        variant: "destructive",
      });
    } else {
      setFoundStudent(studentData);
    }

    const { data: classIds, error: classIdsError } = await supabase
      .from("user_classes")
      .select("class_id")
      .eq("user_id", studentData?.id!)
      .eq("is_primary", true)
      .single();

    if (classIdsError || !classIds) {
      return toast({
        title: "자녀의 학급을 찾을 수 없습니다.",
        description: "학급을 다시 확인해주세요.",
        variant: "destructive",
      });
    }

    const { data: classData, error: classError } = await supabase
      .from("classes")
      .select("id, class_number, grade, school")
      .eq("id", classIds?.class_id!)
      .single();

    if (classError || !classData) {
      return toast({
        title: "학급을 찾을 수 없습니다.",
        description: "학급을 다시 확인해주세요.",
        variant: "destructive",
      });
    } else {
      setFoundClass(classData);
    }

    setIsloading(false);
  };

  const handleLink = async () => {
    if (!foundClass || !foundStudent || !user) return;

    const { error } = await supabase.from("students_parents").insert({
      parent_id: user.id,
      student_code: foundStudent.student_code!,
      student_id: foundStudent.id,
      class_id: foundClass.id,
    });

    if (error) {
      return toast({
        title: "자녀 연결에 실패했습니다.",
        description: "다시 시도해주세요.",
        variant: "destructive",
      });
    }

    toast({
      title: "자녀 연결에 성공했습니다.",
      description: "자녀와 함께 CheckMate를 이용해보세요!",
    });

    router.push("/");
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">자녀 연결하기</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>자녀 코드를 입력하세요.</DialogTitle>
          <DialogDescription>자녀 아이디 로그인 후 코드 확인</DialogDescription>
        </DialogHeader>
        <CodeInput onSubmit={onSubmit} />
        {isLoading ? (
          <p>로딩중...</p>
        ) : (
          <div className="border-t-4 border-b-4 py-3 flex items-center justify-center">
            {foundStudent && foundClass && (
              <div className="flex items-center gap-4">
                <div>
                  <p className="font-semibold text-sm text-slate-500">
                    {foundClass.school} {foundClass.grade}학년 {foundClass.class_number}반
                  </p>
                  <p className="text-xl">{foundStudent.name} 학생</p>
                </div>
                <Button onClick={handleLink}>연결하기</Button>
              </div>
            )}
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default LinkChild;
