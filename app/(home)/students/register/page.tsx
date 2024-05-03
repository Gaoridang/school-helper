"use client";

import RegisterButton from "@/app/(home)/classes/register/_components/RegisterButton";
import CodeInput from "@/app/(home)/classes/register/CodeInput";
import PageTitle from "@/app/components/PageTitle";
import { supabase } from "@/app/utils/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { cn } from "@/lib/utils";
import { School } from "lucide-react";
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

const StudentRegisterPage = () => {
  const [isLoading, setIsloading] = useState(false);
  const [foundClass, setFoundClass] = useState<ClassData>();
  const [foundStudent, setFoundStudent] = useState<StudentData>();
  const router = useRouter();
  const { toast } = useToast();

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
    const {
      data: { user },
    } = await supabase.auth.getUser();

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
    router.refresh();
  };

  return (
    <div className="w-full h-full flex flex-col items-center">
      <PageTitle title="학생 등록하기 🎉" description="학생 고유 코드를 입력하세요!" />
      <p className="border p-4 rounded-lg text-sm text-slate-700 mb-4">
        학생 로그인 시 <br /> 고유 코드를 볼 수 있습니다.
      </p>
      {!foundStudent || !foundClass ? (
        <CodeInput onSubmit={onSubmit} />
      ) : (
        <div>
          <Label
            className={cn(
              "mb-5 max-w-[300px] rounded-lg flex flex-row-reverse justify-between items-center p-4 ring-2 has-[:checked]:bg-indigo-100 has-[:checked]:ring-2 has-[:checked]:ring-indigo-500 hover:bg-indigo-50 transition cursor-pointer",
            )}
          >
            <Input type="radio" className="w-4 h-4" />
            <div className="text-lg flex items-center gap-2 font-light">
              <School className="w-5 h-5 opacity-50" />
              <p>{foundClass.school}</p>
              <p>
                {foundClass.grade}학년 {foundClass.class_number}반
              </p>
              <p className="text-xl">{foundStudent.name} 학생</p>
            </div>
          </Label>
          <div className="flex gap-2">
            <Button onClick={handleLink}>연결하기</Button>
            <RegisterButton onClick={() => setFoundClass(undefined)} title="다시 입력하기" />
          </div>
        </div>
      )}
    </div>
  );
};

export default StudentRegisterPage;
