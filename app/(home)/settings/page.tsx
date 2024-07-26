import PageTitle from "@/app/components/PageTitle";
import React from "react";
import SettingsForm from "./_components/Form";
import { createClient } from "@/app/utils/supabase/server";
import { fetchClassListByUserId } from "../utils/fetchClassList";
import { fetchLinkedStudent } from "../utils/fetchLinkedStudent";

const SettingsPage = async () => {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data } = await supabase.from("users").select("student_code").eq("id", user?.id!).single();

  const classList = await fetchClassListByUserId(user!.id);
  const selectedClass = classList.find((c) => c.is_primary);
  const selectedStudentList = await fetchLinkedStudent(user?.id!, selectedClass?.class_id!);

  return (
    <div>
      {/* 이름 */}
      {/* 학급 */}
      {/* 학부모: 학생 / 학생: 고유번호 / 선생님: 학급코드 */}
      <SettingsForm
        user={user!}
        classList={classList}
        selectedStudentList={selectedStudentList}
        studentCode={data?.student_code}
      />
    </div>
  );
};

export default SettingsPage;
