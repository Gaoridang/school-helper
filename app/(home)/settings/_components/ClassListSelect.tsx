import { Tables } from "@/app/types/schema";
import { FormControl } from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ControllerRenderProps } from "react-hook-form";
import useClassStore from "../../store/classStore";
import { SettingsFormType } from "../../types/settings";

interface Props {
  field: ControllerRenderProps<SettingsFormType, "school">;
  classList: Tables<"user_class_details">[];
}

const ClassListSelect = ({ field, classList }: Props) => {
  const setClassId = useClassStore((state) => state.setClassId);

  const handleValueChange = (id: string) => {
    field.onChange(id);
    setClassId(id);
  };

  return (
    <Select onValueChange={handleValueChange} defaultValue={field.value}>
      <FormControl>
        <SelectTrigger>
          <SelectValue placeholder="학급을 선택하세요." />
        </SelectTrigger>
      </FormControl>
      <SelectContent>
        {classList?.map((c) => (
          <SelectItem key={c.class_id} value={c.class_id!}>
            {c.school} {c.grade}학년 {c.class_number}반
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default ClassListSelect;
