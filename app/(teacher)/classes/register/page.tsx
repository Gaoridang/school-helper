"use client";

import PageTitle from "@/app/components/PageTitle";
import { supabase } from "@/app/utils/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { cn } from "@/lib/utils";
import { School } from "lucide-react";
import { useState } from "react";
import CodeInput from "./CodeInput";
import { useUser } from "@/app/hooks/useUser";
import { useRouter } from "next/navigation";

interface ClassData {
  id: string;
  class_number: number;
  grade: number;
  school: string;
}

const ClassRegisterPage = () => {
  const user = useUser();
  const router = useRouter();
  const [foundClass, setFoundClass] = useState<ClassData>();
  const { toast } = useToast();
  const onSubmit = async (code: string) => {
    const { data, error } = await supabase
      .from("classes")
      .select("id, class_number, grade, school")
      .eq("class_code", code)
      .single();

    if (error || !data) {
      return toast({
        title: "학급을 찾을 수 없습니다.",
        description: "학급 코드를 다시 확인해주세요.",
        variant: "destructive",
      });
    }

    setFoundClass(data);
  };

  const handleRegister = async () => {
    if (!foundClass || !user) return;

    const { error } = await supabase.from("user_classes").insert({
      user_id: user.id,
      class_id: foundClass.id,
      role: user.user_metadata.role,
      is_primary: true,
    });

    if (error) {
      return toast({
        title: "학급 가입에 실패했습니다.",
        description: "다시 시도해주세요.",
        variant: "destructive",
      });
    }

    router.push("/");
    router.refresh();
  };

  return (
    <div className="w-full h-full flex flex-col items-center">
      <PageTitle title="학급 참여하기 🎉" description="선생님이 주신 학급 코드를 입력하세요!" />
      {!foundClass ? (
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
            </div>
          </Label>
          <Button className="mr-2" onClick={handleRegister}>
            가입하기
          </Button>
          <Button variant="outline" onClick={() => setFoundClass(undefined)}>
            다른 학급 찾기
          </Button>
        </div>
      )}
    </div>
  );
};

export default ClassRegisterPage;
