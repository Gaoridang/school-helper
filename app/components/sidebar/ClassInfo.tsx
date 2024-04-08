"use client";

import { useClass } from "@/app/(teacher)/hooks/useClass";
import { Tables } from "@/app/types/schema";
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
import { useEffect, useState } from "react";
import SelectPrimaryButton from "./SelectPrimaryButton";
import { User } from "@supabase/supabase-js";

interface Props {
  user: User | null;
}

const ClassInfo = ({ user }: Props) => {
  const { selectedClassId } = useClass();

  const [classData, setClassData] =
    useState<Pick<Tables<"classes">, "school" | "class_number" | "grade" | "class_code">>();
  useEffect(() => {
    if (!selectedClassId) return;

    const fetchClassData = async () => {
      const { data, error } = await supabase
        .from("classes")
        .select("school, grade, class_number, class_code")
        .eq("id", selectedClassId)
        .single();
      if (error) {
        throw error;
      }
      setClassData(data);
    };
    fetchClassData();
  }, [selectedClassId]);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>학급 정보 보기</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{classData?.school}</DialogTitle>
          <DialogDescription>
            {classData?.grade}학년 {classData?.class_number}반
          </DialogDescription>
        </DialogHeader>
        <div className="flex justify-between mt-4">
          <p>학급 코드</p>
          <p>{classData?.class_code}</p>
        </div>
        <div>
          <SelectPrimaryButton user={user} />
          <p className="text-xs text-gray-500">로그인 시 최초 선택되는 학급</p>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ClassInfo;
