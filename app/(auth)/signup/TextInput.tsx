"use client";

import { FormControl, FormDescription, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import React from "react";
import { CommonInputTypes, SignUpData, SignUpFormItemType } from "./types/formTypes";

const SignUpTextInput = ({
  field,
  formField,
  label,
}: CommonInputTypes<SignUpData, SignUpFormItemType>) => {
  return (
    <>
      <FormLabel>{label}</FormLabel>
      <FormControl>
        <Input
          variant="borderBottom"
          {...field}
          type={formField.type}
          placeholder={formField.placeholder}
        />
      </FormControl>
      <FormDescription>{formField.description}</FormDescription>
      <FormMessage className="mt-2" />
    </>
  );
};

export default SignUpTextInput;
