"use client";

import { UserClasses } from "@/app/Sidebar";
import { supabase } from "@/app/utils/supabase/client";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { User } from "@supabase/supabase-js";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useClass } from "../hooks/useClass";

interface Props {
  user: User | null;
}

const SelectClass = ({ user }: Props) => {
  const { selectedClassId, setSelectedClassId } = useClass();
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState<UserClasses[]>([]);
  const router = useRouter();

  useEffect(() => {
    if (!user) return;

    const fetchStudents = async () => {
      const { data, error } = await supabase
        .from("user_classes")
        .select("class_id, is_primary, classes(school, grade, class_number, id)")
        .eq("user_id", user.id);

      if (error) {
        throw error;
      } else {
        setData(data);
        setSelectedClassId(data.find((item) => item.is_primary)?.class_id || "");
      }

      setIsLoading(false);
    };
    fetchStudents();
  }, [user, setSelectedClassId, router]);

  if (isLoading) return <Skeleton className="w-20 h-6 mt-2" />;

  return (
    <Select onValueChange={setSelectedClassId} value={selectedClassId}>
      <SelectTrigger className="border-none bg-transparent">
        <SelectValue placeholder="학급을 선택하세요" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {data?.map((item) => (
            <SelectItem key={item.class_id} value={item.class_id}>
              {item.classes?.school} {item.classes?.grade}학년 {item.classes?.class_number}반
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

export default SelectClass;
