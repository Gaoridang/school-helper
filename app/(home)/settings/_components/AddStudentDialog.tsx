import CodeInput from "@/app/(home)/classes/register/CodeInput";
import { supabase } from "@/app/utils/supabase/client";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useState } from "react";
import useClassStore from "../../store/classStore";
import { FoundStudentType } from "../../types/settings";
import { Button } from "@/components/ui/button";

const AddStudentDialog = () => {
  const [foundStudent, setFoundStudent] = useState<FoundStudentType>();
  const selectedClassId = useClassStore.getState().classId;

  const onSubmit = async (code: string) => {
    const { data, error } = await supabase
      .from("users")
      .select("id, name, student_code")
      .eq("student_code", code)
      .single();

    if (error) {
      console.error(error);
      setFoundStudent(undefined);
      return;
    }

    setFoundStudent(data as FoundStudentType);
  };

  const handleSelect = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!foundStudent || !user) return;

    const { error } = await supabase.from("students_parents").insert({
      student_id: foundStudent.id,
      parent_id: user.id,
      class_id: selectedClassId,
      student_code: foundStudent.student_code,
    });

    if (error) {
      console.error(error);
      return;
    }

    setFoundStudent(undefined);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <button
          type="button"
          className="whitespace-nowrap underline underline-offset-4 text-emerald-500 text-sm"
        >
          + 학생추가
        </button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>학생추가</DialogTitle>
          <DialogDescription>학생 고유번호를 입력하세요.</DialogDescription>
        </DialogHeader>
        <CodeInput onSubmit={onSubmit} />
        {foundStudent ? (
          <div className="flex justify-between items-center mt-4">
            <p>{foundStudent.name}</p>
            <DialogClose asChild>
              <Button type="button" onClick={handleSelect}>
                선택
              </Button>
            </DialogClose>
          </div>
        ) : (
          <p>일치하는 학생이 없습니다.</p>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default AddStudentDialog;
