"use server";

import { redirect } from "next/navigation";
import { createClient } from "../utils/supabase/server";
import { SignUpStudentType } from "./SignUpStudent";

export const signUpStudent = async (formData: SignUpStudentType) => {
  const supabase = createClient();

  const name = formData.name as string;
  const password = formData.password as string;
  const studentNumber = formData.student_number as string;
  const classCode = formData.class_code as string;
  const code = formData.code as string;

  // TODO: One student can enter multiple classes
  // How to handle this?
  const getEmailWithName = () => {
    return `${code}@student.com`;
  };

  const { error } = await supabase.auth.signUp({
    email: getEmailWithName(),
    password,
  });

  if (error) {
    console.error(error);
  }

  if (!error) {
    await supabase.from("students").insert([
      {
        name: name,
        student_number: parseInt(studentNumber),
        student_code: code,
        class_code: classCode,
        role: "student",
      },
    ]);
  }

  redirect("/");
};
