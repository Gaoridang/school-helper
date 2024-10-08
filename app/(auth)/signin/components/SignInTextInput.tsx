"use client";

import { FormControl, FormDescription, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { SignInDataType, SignInFormItemType } from "../types/signInFormTypes";
import { CommonInputTypes } from "@/app/(auth)/signup/types/formTypes";

const SignInTextInput = ({
  field,
  formField,
  label,
}: CommonInputTypes<SignInDataType, SignInFormItemType>) => {
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
      <FormMessage />
    </>
  );
};

export default SignInTextInput;
