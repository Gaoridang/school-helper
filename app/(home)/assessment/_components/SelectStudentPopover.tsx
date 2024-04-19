import useClassStore from "@/app/(home)/store/classStore";
import { Tables } from "@/app/types/schema";
import { supabase } from "@/app/utils/supabase/client";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import { FormControl } from "@/components/ui/form";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CheckIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { ControllerRenderProps } from "react-hook-form";
import { CreateAssessmentFormType } from "../[templateId]/_types";
import { cn } from "@/lib/utils";

interface Props {
  field: ControllerRenderProps<CreateAssessmentFormType, "evaluatee">;
}

const SelectStudentPopover = ({ field }: Props) => {
  const classId = useClassStore((state) => state.classId);
  const [students, setStudents] = useState<Tables<"class_students_view">[]>([]);
  useEffect(() => {
    const fetchStudents = async () => {
      if (!classId) return;

      const { data, error } = await supabase
        .from("class_students_view")
        .select("*")
        .eq("class_id", classId);

      if (error) {
        console.error(error);
        return;
      }

      setStudents(data);
    };
    fetchStudents();
  }, [classId]);

  return (
    <Popover>
      <PopoverTrigger asChild>
        <FormControl>
          <Button variant="outline" role="combobox">
            {field.value
              ? students.find((student) => student.user_id === field.value)?.name
              : "학생을 선택하세요."}
          </Button>
        </FormControl>
      </PopoverTrigger>
      <PopoverContent align="start">
        <Command>
          <CommandInput placeholder="친구를 선택하세요." />
          <CommandEmpty>찾는 친구가 없습니다.</CommandEmpty>
          <CommandGroup>
            {students.map((student) => (
              <CommandItem
                key={student.user_id}
                value={student.user_id!}
                onSelect={() => {
                  field.onChange(student.user_id);
                }}
              >
                {student.name}
                <CheckIcon
                  className={cn(
                    "ml-auto h-4 w-4",
                    student.user_id === field.value ? "opacity-100" : "opacity-0",
                  )}
                />
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

export default SelectStudentPopover;
