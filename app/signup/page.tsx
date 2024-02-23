"use client";

import React, { ChangeEvent, useState } from "react";
import { useForm } from "react-hook-form";
import { SignUpType, SignUpSchema } from "../api/authSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import axios from "axios";
import { ScrollArea } from "@/components/ui/scroll-area";
import { createClient } from "../utils/supabase/client";
import { useRouter } from "next/navigation";

const formFields = [
  { value: "email", label: "이메일", type: "input" },
  { value: "password", label: "비밀번호", type: "input" },
  { value: "passwordConfirm", label: "비밀번호 확인", type: "input" },
  { value: "school", label: "학교", type: "search" },
  { value: "grade", label: "학년", type: "select" },
  { value: "classNumber", label: "반", type: "select" },
] as const;

const grade = Array.from({ length: 6 }, (_, index) => `${index + 1}학년`);
const classNumber = Array.from({ length: 15 }, (_, index) => `${index + 1}반`);

interface School {
  SCHUL_NM: string;
}

const SignUpPage = () => {
  const [schools, setSchools] = useState<School[]>([]);
  const [selectedSchool, setSelectedSchool] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);
  const router = useRouter();
  const form = useForm<SignUpType>({
    resolver: zodResolver(SignUpSchema),
    defaultValues: {
      email: "",
      password: "",
      passwordConfirm: "",
      school: "",
      grade: "",
      classNumber: "",
    },
    mode: "onBlur",
  });

  const searchSchool = async (name: string) => {
    const { data } = await axios.get("https://open.neis.go.kr/hub/schoolInfo", {
      params: {
        Type: "json",
        pIndex: 1,
        pSize: 100,
        KEY: process.env.NEXT_PUBLIC_SCHOOL_API_KEY,
        SCHUL_NM: name.trim().replaceAll(" ", ""),
      },
    });
    const schoolInfo = data.schoolInfo[1].row as School[];
    setSchools(schoolInfo);
  };

  const supabase = createClient();

  const onSubmit = async (values: SignUpType) => {
    const validation = SignUpSchema.safeParse(values);
    if (!validation.success) {
      console.log(validation.error.errors);
    }

    const { error } = await supabase.auth.signUp({
      email: values.email,
      password: values.password,
      options: {
        emailRedirectTo: "https://www.togethers.info",
      },
    });

    if (!error) {
      await supabase
        .from("profiles")
        .update({
          school: values.school,
          grade: values.grade,
          class_number: values.classNumber,
        })
        .match({ email: values.email });
    }

    router.push("/signup/confirm-email");
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div>
          {formFields.map((formField) => (
            <FormField
              key={formField.value}
              name={formField.value}
              control={form.control}
              render={({ field, fieldState }) => (
                <FormItem>
                  {
                    {
                      input: (
                        <>
                          <FormLabel htmlFor={formField.value}>{formField.label}</FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              id={formField.value}
                              type={formField.value.includes("password") ? "password" : "text"}
                            />
                          </FormControl>
                        </>
                      ),
                      select: (
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder={`${formField.label}을 선택하세요`} />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {formField.value === "grade"
                              ? grade.map((grade) => (
                                  <SelectItem key={grade} value={grade}>
                                    {grade}
                                  </SelectItem>
                                ))
                              : classNumber.map((classNumber) => (
                                  <SelectItem key={classNumber} value={classNumber}>
                                    {classNumber}
                                  </SelectItem>
                                ))}
                          </SelectContent>
                        </Select>
                      ),
                      search: (
                        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                          <DialogTrigger asChild>
                            <Button
                              type="button"
                              variant="outline"
                              onClick={() => setDialogOpen(true)}
                            >
                              {selectedSchool ? selectedSchool : `${formField.label} 검색`}
                            </Button>
                          </DialogTrigger>
                          <DialogContent>
                            <DialogHeader>
                              <DialogTitle>{formField.label} 검색</DialogTitle>
                              <DialogDescription>
                                본인이 속한 {formField.label}명을 검색하세요.
                              </DialogDescription>
                            </DialogHeader>
                            <div className="flex items-center space-x-2">
                              <div>
                                <Label htmlFor={formField.value} className="sr-only">
                                  {formField.label}
                                </Label>
                                <Input
                                  id={formField.value}
                                  value={selectedSchool}
                                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                                    setSelectedSchool(e.target.value)
                                  }
                                />
                              </div>
                              <Button
                                type="button"
                                variant="outline"
                                onClick={() => searchSchool(selectedSchool)}
                              >
                                검색하기
                              </Button>
                            </div>
                            <ScrollArea className="max-h-72">
                              {schools.map((school) => (
                                <Button
                                  key={school.SCHUL_NM}
                                  variant="link"
                                  onClick={() => {
                                    field.onChange(school.SCHUL_NM);
                                    setSelectedSchool(school.SCHUL_NM);
                                    setDialogOpen(false);
                                  }}
                                >
                                  {school.SCHUL_NM}
                                </Button>
                              ))}
                            </ScrollArea>
                          </DialogContent>
                        </Dialog>
                      ),
                    }[formField.type]
                  }
                  <FormDescription className="text-red-500">
                    {fieldState.error?.message && fieldState.error.message}
                  </FormDescription>
                </FormItem>
              )}
            />
          ))}
        </div>
        <Button type="submit" disabled={form.formState.isSubmitting}>
          회원가입
        </Button>
      </form>
    </Form>
  );
};

export default SignUpPage;
