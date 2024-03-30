"use client";

import { FormControl, FormDescription, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import React from "react";
import { CommonInputTypes, SignUpData, SignUpFormItemType } from "./types/formTypes";

const SignUpTextInput = ({
  field,
  formField,
}: CommonInputTypes<SignUpData, SignUpFormItemType>) => {
  return (
    <>
      <FormLabel></FormLabel>
      <FormControl>
        <Input {...field} type={formField.type} placeholder={formField.placeholder} />
      </FormControl>
      <FormDescription>{formField.description}</FormDescription>
      <FormMessage />
    </>
  );
};

export default SignUpTextInput;
