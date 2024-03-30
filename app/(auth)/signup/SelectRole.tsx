import React from "react";
import { CommonInputTypes, SignUpData, SignUpFormItemType } from "./types/formTypes";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { FormControl, FormItem, FormLabel } from "@/components/ui/form";

const data = [
  { label: "선생님", value: "teacher" },
  { label: "학생", value: "student" },
  { label: "학부모", value: "parents" },
];

// group-data-[state=open]:rotate-180

const SelectRole = ({ field }: CommonInputTypes<SignUpData, SignUpFormItemType>) => {
  return (
    <FormControl>
      <RadioGroup
        onValueChange={field.onChange}
        defaultValue={field.value}
        className="grid grid-cols-3"
      >
        {data.map((item) => (
          <FormItem key={item.value} className="border col-span-1">
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
