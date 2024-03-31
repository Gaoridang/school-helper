import React from "react";
import SelectInput from "./SelectInput";
import { CommonInputTypes } from "../../../(auth)/signup/types/formTypes";
import { CreateClassData, CreateClassFormItemType } from "../types/classTypes";

const data = [
  { label: "1학년", value: "1" },
  { label: "2학년", value: "2" },
  { label: "3학년", value: "3" },
  { label: "4학년", value: "4" },
  { label: "5학년", value: "5" },
  { label: "6학년", value: "6" },
];

const SelectGrade = ({
  field,
  formField,
}: CommonInputTypes<CreateClassData, CreateClassFormItemType>) => {
  return <SelectInput field={field} formField={formField} data={data} />;
};

export default SelectGrade;
