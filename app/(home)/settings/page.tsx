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

  const classList = await fetchClassListByUserId(user!.id);
  const selectedClass = classList.find((c) => c.is_primary);
  const selectedStudentList = await fetchLinkedStudent(user?.id!, selectedClass?.class_id!);

  return (
    <div className="pt-14 px-4 md:pt-20 md:pl-12">
      <PageTitle title="프로필 설정" description="학급을 변경, 추가, 삭제할 수 있습니다." />
      {/* 이름 */}
      {/* 학급 */}
      {/* 학부모: 학생 / 학생: 고유번호 / 선생님: 학급코드 */}
      <SettingsForm user={user!} classList={classList} selectedStudentList={selectedStudentList} />
    </div>
  );
};

export default SettingsPage;
