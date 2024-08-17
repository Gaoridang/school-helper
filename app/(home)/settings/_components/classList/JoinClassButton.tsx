"use client";

import CodeInput from "@/app/(home)/classes/register/CodeInput";
import { ClassType } from "@/app/types/classType";
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
import { useState } from "react";

interface Props {
  userId: string;
}

const JoinClassButton = ({ userId }: Props) => {
  const [joinError, setJoinError] = useState("");
  const [matchedClass, setMatchedClass] = useState<Pick<
    ClassType,
    "school" | "grade" | "class_number" | "id"
  > | null>(null);

  const onSubmit = async (code: string) => {
    const { data, error } = await supabase
      .from("classes")
      .select("*")
      .eq("class_code", code)
      .single();

    if (error || !data) {
      setMatchedClass(null);
    }

    setMatchedClass(data);
  };

  const handleJoin = async () => {
    if (!matchedClass) return;

    const { error } = await supabase.from("user_classes_duplicate").insert({
      user_id: userId,
      class_id: matchedClass.id,
      is_primary: false,
    });

    if (error) {
      setJoinError("학급 가입에 실패했습니다. 다시 시도해주세요.");
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="py-2 px-3 text-sm">학급 가입하기</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>학급 가입하기</DialogTitle>
          <DialogDescription>여섯 자리 학급 코드를 입력하세요.</DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <CodeInput onSubmit={onSubmit} />
          {matchedClass ? (
            <div className="flex items-center gap-2">
              <p>
                {matchedClass.school} {matchedClass.grade}학년 {matchedClass.class_number}반
              </p>
              <Button onClick={handleJoin} variant="link" className="p-1 text-emerald-400">
                가입하기
              </Button>
            </div>
          ) : (
            <p>학급을 찾을 수 없습니다. 다시 검색해 주세요.</p>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default JoinClassButton;
