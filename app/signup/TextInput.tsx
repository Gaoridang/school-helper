"use client";

import { FormControl, FormDescription, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import React from "react";
import { CommonInputTypes } from "./types/formTypes";

const TextInput = ({ field, formField }: CommonInputTypes) => {
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

export default TextInput;
