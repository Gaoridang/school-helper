"use client";

import { Tables } from "@/app/types/schema";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { User } from "@supabase/supabase-js";
import { useForm } from "react-hook-form";
import useClassStore from "../../store/classStore";
import { SettingsFormSchema, SettingsFormType } from "../../types/settings";
import AddSchoolDialog from "./AddSchoolDialog";
import AddStudentDialog from "./AddStudentDialog";
import ClassListSelect from "./ClassListSelect";
import StudentSelect from "./StudentSelect";
import { useEffect } from "react";
import { supabase } from "@/app/utils/supabase/client";

interface Props {
  user: User;
  classList: Tables<"user_class_details">[];
  selectedStudentList: Tables<"student_with_class_parents">[];
}

const SettingsForm = ({ user, classList, selectedStudentList }: Props) => {
  const form = useForm<SettingsFormType>({
    resolver: zodResolver(SettingsFormSchema),
    defaultValues: {
      name: user.user_metadata.name,
      school: classList.find((c) => c.is_primary)?.class_id || "",
      student: selectedStudentList[0]?.student_id || "",
    },
  });

  const schoolValue = form.watch("school");

  useEffect(() => {
    useClassStore.setState({ classId: schoolValue });
  }, [schoolValue]);

  const classCode =
    classList.find((c) => c.class_id === useClassStore.getState().classId.toString())?.class_code ||
    classList.find((c) => c.is_primary)?.class_code ||
    "";

  const onSubmit = async (values: SettingsFormType) => {
    const { error: updateNameError } = await supabase
      .from("users")
      .update({
        name: values.name,
      })
      .eq("id", user.id);

    if (updateNameError) return console.error(updateNameError);

    const { error: updateToFalseError } = await supabase
      .from("user_classes")
      .update({
        is_primary: false,
      })
      .eq("user_id", user.id)
      .eq("is_primary", true);

    if (updateToFalseError) return console.error(updateToFalseError);

    const { error: updateToTrueError } = await supabase
      .from("user_classes")
      .update({
        is_primary: true,
      })
      .eq("user_id", user.id)
      .eq("class_id", values.school);

    if (updateToTrueError) return console.error(updateToTrueError);

    alert("저장되었습니다.");
  };

  return (
    <Form {...form}>
      <form className="max-w-xl mt-4 md:mt-16 space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="font-normal">이름</FormLabel>
              <FormControl>
                <Input defaultValue={field.value} />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="school"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="font-normal">학급</FormLabel>
              <div className="flex gap-4 items-center">
                <ClassListSelect field={field} classList={classList} />
                <div>
                  <AddSchoolDialog />
                </div>
              </div>
              <FormDescription>
                학급코드:{" "}
                <span className="rounded-full text-black underline underline-offset-2">
                  {classCode}
                </span>
              </FormDescription>
            </FormItem>
          )}
        />
        {user?.user_metadata.role === "parents" && (
          <FormField
            control={form.control}
            name="student"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-normal">학생</FormLabel>
                <div className="flex gap-4 items-center">
                  <StudentSelect field={field} />
                  <div>
                    <AddStudentDialog />
                  </div>
                </div>
              </FormItem>
            )}
          />
        )}
        <div className="flex justify-end">
          <Button type="submit">저장</Button>
        </div>
      </form>
    </Form>
  );
};

export default SettingsForm;
