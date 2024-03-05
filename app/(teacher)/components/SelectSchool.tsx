"use client";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useEffect } from "react";
import { useClass } from "../hooks/useClass";

interface Props {
  data:
    | {
        class_id: string;
        is_primary: boolean | null;
        classes: {
          school: string;
          grade: number;
          class_number: number;
          id: string;
        } | null;
      }[]
    | null;
}

const SelectSchool = ({ data }: Props) => {
  const { setSelectedClassId } = useClass();

  const defaultValue = data?.find((item) => item.is_primary)?.class_id;

  useEffect(() => {
    if (defaultValue) setSelectedClassId(defaultValue);
  }, [defaultValue, setSelectedClassId]);

  return (
    <div className="mb-4">
      <Select onValueChange={setSelectedClassId} defaultValue={defaultValue}>
        <SelectTrigger className="w-auto text-xl px-0 py-4 border-none space-x-2 focus:ring-0">
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
    </div>
  );
};

export default SelectSchool;
