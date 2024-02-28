"use client";

import { FormControl, FormDescription, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { CommonInputTypes } from "@/app/signup/types/formTypes";
import { CreateEvalData, CreateEvalFormItemType } from "../../types/types";

const ContentInput = ({
  field,
  formField,
}: CommonInputTypes<CreateEvalData, CreateEvalFormItemType>) => {
  let inputValue = "";

  // Check if field.value is an object and has a 'content' property
  if (typeof field.value === "object" && field.value !== null && !Array.isArray(field.value)) {
    inputValue = field.value.content;
  }
  // If field.value is an array, join its 'content' properties or handle it accordingly
  else if (Array.isArray(field.value)) {
    // Example: joining contents with a comma, adjust according to your needs
    inputValue = field.value.map((item) => item.content).join(", ");
  }
  // Handle the case where field.value is already a string or number
  else {
    inputValue = field.value;
  }

  return (
    <div>
      <FormControl>
        <Input
          {...field}
          type={formField.type}
          placeholder={formField.placeholder}
          value={inputValue}
        />
      </FormControl>
      <FormMessage />
    </div>
  );
};

export default ContentInput;
