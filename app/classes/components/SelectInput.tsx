"use client";

import { FormControl, FormMessage } from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { FieldValues } from "react-hook-form";
import { CommonInputTypes } from "../../signup/types/formTypes";

type SelectInputProps<T extends FieldValues, VItem extends { label: string }> = CommonInputTypes<
  T,
  VItem
> & {
  data: { label: string; value: string }[];
};

const SelectInput = <T extends FieldValues, VItem extends { label: string }>({
  field,
  formField,
  data,
}: SelectInputProps<T, VItem>) => {
  return (
    <Select onValueChange={field.onChange} defaultValue={field.value}>
      <FormControl>
        <SelectTrigger>
          <SelectValue placeholder={`${formField.label}을 선택하세요`} />
        </SelectTrigger>
      </FormControl>
      <SelectContent>
        {data.map((item) => (
          <SelectItem key={item.value} value={item.value}>
            {item.label}
          </SelectItem>
        ))}
      </SelectContent>
      <FormMessage />
    </Select>
  );
};

export default SelectInput;
