import { CommonInputTypes } from "../../../(auth)/signup/types/formTypes";
import { CreateClassData, CreateClassFormItemType } from "../types/classTypes";
import SelectInput from "./SelectInput";

const data = [
  { label: "1반", value: "1" },
  { label: "2반", value: "2" },
  { label: "3반", value: "3" },
  { label: "4반", value: "4" },
  { label: "5반", value: "5" },
  { label: "6반", value: "6" },
  { label: "7반", value: "7" },
  { label: "8반", value: "8" },
  { label: "9반", value: "9" },
  { label: "10반", value: "10" },
  { label: "11반", value: "11" },
  { label: "12반", value: "12" },
  { label: "13반", value: "13" },
  { label: "14반", value: "14" },
  { label: "15반", value: "15" },
];

const SelectClassNumber = ({
  field,
  formField,
}: CommonInputTypes<CreateClassData, CreateClassFormItemType>) => {
  return (
    <SelectInput<CreateClassData, CreateClassFormItemType>
      field={field}
      formField={formField}
      data={data}
      label="반"
    />
  );
};

export default SelectClassNumber;
