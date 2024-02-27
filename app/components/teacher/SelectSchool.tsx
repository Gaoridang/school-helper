import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Props {
  classes:
    | {
        id: string;
        school: string;
        grade: number;
        class_number: number;
      }[]
    | undefined
    | null;
  handleSelectClass: (classId: string) => void;
  selectedClassId: string;
}

const SelectSchool = ({ classes, handleSelectClass, selectedClassId }: Props) => {
  return (
    <Select onValueChange={handleSelectClass} value={selectedClassId}>
      <SelectTrigger>
        <SelectValue placeholder="학급을 선택하세요." />
      </SelectTrigger>
      <SelectContent>
        {classes?.map((c) => (
          <SelectItem
            key={c.id}
            value={c.id}
          >{`${c.school} ${c.grade}학년 ${c.class_number}반`}</SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default SelectSchool;
