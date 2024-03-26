"use client";

import { useClass } from "@/app/(teacher)/hooks/useClass";
import { Button } from "@/components/ui/button";
import { Dialog, DialogClose, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import React, { FormEvent, useState } from "react";
import { useSelectedUser } from "../_hooks/useSelectedUser";
import { useSearchParams } from "next/navigation";
import { supabase } from "@/app/utils/supabase/client";

interface StudentData {
  users: {
    id: string;
    name: string;
    email: string;
    student_number: number | null;
  } | null;
}

const SelectStudent = () => {
  const searchParams = useSearchParams();
  const { selectedClassId } = useClass();
  const { setSelectedUser } = useSelectedUser();
  const [value, setValue] = useState("");
  const [students, setStudents] = useState<StudentData[] | null>([]);
  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const { data, error } = await supabase
      .from("user_classes") // Start from the user_classes table
      .select(
        `
        users (
          id,
          name,
          email,
          student_number
        )
      `,
      )
      .eq("class_id", selectedClassId)
      .eq("role", "student")
      .ilike("users.name", `%${value}%`);

    if (error) {
      console.error(error);
    }

    setStudents(data?.filter((data) => data.users) || []);
  };

  if (searchParams.get("type") === "self") return null;

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="flex items-center gap-2 bg-white">
          <Search className="w-4 h-4 opacity-50" />
          <span>친구 찾기</span>
        </Button>
      </DialogTrigger>
      <DialogContent>
        <form className="flex flex-col gap-2" onSubmit={handleSubmit}>
          <p>이름을 검색 후 엔터를 누르세요.</p>
          <div className="flex items-center gap-2">
            <Input placeholder="학생 이름" value={value} onChange={handleChange} />
            <Button type="submit">검색</Button>
          </div>
          <div className="flex flex-col items-start">
            {students?.map((student) => (
              <DialogClose asChild key={student.users?.id}>
                <Button
                  variant="link"
                  className="flex items-center gap-1 mt-2 text-slate-900 py-0"
                  onClick={() => setSelectedUser(student.users!.id)}
                >
                  <p>
                    {student.users?.student_number}번 {student.users?.name}
                  </p>
                </Button>
              </DialogClose>
            ))}
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default SelectStudent;
