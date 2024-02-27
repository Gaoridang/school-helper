"use client";

import { FormControl, FormDescription, FormMessage } from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import React from "react";
import { CommonInputTypes } from "../../signup/types/formTypes";
import { CreateClassData, CreateClassFormItemType } from "../types/classTypes";

type SelectInputProps = CommonInputTypes<CreateClassData, CreateClassFormItemType> & {
  data: { label: string; value: string }[];
};

const SelectInput = ({ field, formField, data }: SelectInputProps) => {
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
