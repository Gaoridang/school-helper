import React from "react";
import { CommonInputTypes, SignUpData, SignUpFormItemType } from "./types/formTypes";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { FormControl, FormItem, FormLabel } from "@/components/ui/form";
import { cn } from "@/lib/utils";

const roleData = [
  { label: "선생님", value: "teacher" },
  { label: "학생", value: "student" },
  { label: "학부모", value: "parents" },
];

const detailRoleData = [
  { label: "아버지", value: "부" },
  { label: "어머니", value: "모" },
];

const SelectRole = ({
  field,
  selectDataType,
}: CommonInputTypes<SignUpData, SignUpFormItemType> & {
  selectDataType?: string;
}) => {
  const data = selectDataType === "role" ? roleData : detailRoleData;

  return (
    <FormControl>
      <RadioGroup
        onValueChange={field.onChange}
        defaultValue={field.value}
        className={cn(selectDataType === "role" ? "grid-cols-3" : "grid-cols-2", "grid gap-2")}
      >
        {data.map((item) => (
          <FormItem key={item.value} className="border">
            <FormLabel className="flex items-center justify-center w-full h-full p-4 space-x-2 has-[:checked]:ring-2 cursor-pointer">
              <span>{item.label}</span>
              <FormControl>
                <RadioGroupItem value={item.value}>{item.label}</RadioGroupItem>
              </FormControl>
            </FormLabel>
          </FormItem>
        ))}
      </RadioGroup>
    </FormControl>
  );
};

export default SelectRole;
