import { Tables } from "@/app/types/schema";
import { FormControl } from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useEffect, useState } from "react";
import useClassStore from "../../store/classStore";
import { fetchLinkedStudent } from "../../utils/fetchLinkedStudent";
import { fetchUserId } from "../../utils/fetchUserId";
import { ControllerRenderProps } from "react-hook-form";
import { SettingsFormType } from "../../types/settings";

interface Props {
  field: ControllerRenderProps<SettingsFormType, "student">;
}

const StudentSelect = ({ field }: Props) => {
  const classId = useClassStore((state) => state.classId);
  const [student, setStudent] = useState<Tables<"student_with_class_parents">[]>();

  useEffect(() => {
    const fetchStudent = async () => {
      const userId = await fetchUserId();
      const data = await fetchLinkedStudent(userId, classId);

      setStudent(data);
    };
    fetchStudent();
  }, [classId]);

  return (
    <Select defaultValue={field.value}>
      <FormControl>
        <SelectTrigger>
          <SelectValue placeholder="학생을 선택하세요." />
        </SelectTrigger>
      </FormControl>
      <SelectContent>
        {student?.map((s) => (
          <SelectItem key={s.student_id} value={s.student_id!}>
            {s.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default StudentSelect;
