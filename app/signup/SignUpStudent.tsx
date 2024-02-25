import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import React from "react";
import { useForm } from "react-hook-form";

const formValues = [
  { label: "이름", value: "name", placeholder: "홍길동" },
  { label: "번호", value: "student_number", placeholder: "12" },
  { label: "코드번호", value: "code", placeholder: "123456" },
];

const SignUpStudent = () => {
  const form = useForm();

  return (
    <Form {...form}>
      <form className="flex flex-col gap-2">
        {formValues.map((value) => (
          <FormField
            key={value.value}
            name={value.value}
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>{value.label}</FormLabel>
                <FormControl>
                  <Input {...field} placeholder={value.placeholder} />
                </FormControl>
              </FormItem>
            )}
          />
        ))}
        <Button>회원가입</Button>
      </form>
    </Form>
  );
};

export default SignUpStudent;
