import { createClient } from "@/app/utils/supabase/server";
import React from "react";
import ClassItem from "./ClassItem";
import { Button } from "@/components/ui/button";
import JoinClassButton from "./JoinClassButton";

interface Props {
  userId: string;
}

const ClassList = async ({ userId }: Props) => {
  const supabase = createClient();
  const { data, error } = await supabase.from("user_class_info").select("*").eq("user_id", userId);

  if (error) {
    return <p>학급을 불러오는 중에 문제가 발생했습니다. 잠시 후 다시 시도해주세요.</p>;
  }

  return (
    <div>
      {data.length === 0 ? (
        <div className="space-y-2">
          <p>가입한 학급이 없습니다.</p>
          <p>
            <code className="text-sm bg-slate-200 p-1 rounded-md">학급 코드</code> 를 입력하여
            가입하세요.
          </p>
          {/* TODO: 클라이언트용 커스텀 훅 만들기 */}
          <JoinClassButton userId={userId} />
        </div>
      ) : (
        <ul>
          {data.map((classInfo) => (
            <ClassItem key={classInfo.class_id} classInfo={classInfo} />
          ))}
        </ul>
      )}
    </div>
  );
};

export default ClassList;
