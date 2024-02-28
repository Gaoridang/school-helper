import useSupabaseServer from "@/app/utils/supabase/server";
import { cookies } from "next/headers";
import React from "react";
import EvalItemList from "./_components/EvalItemList";
import PageTitle from "@/app/components/PageTitle";
import { getSubjectName } from "../getSubjectName";

interface Props {
  params: { templateId: string };
}

const EvalPage = async ({ params }: Props) => {
  const cookieStore = cookies();
  const supabase = useSupabaseServer(cookieStore);

  const { data: evalItems, error } = await supabase
    .from("evaluation_items")
    .select("*")
    .eq("template_id", params.templateId);

  console.log(evalItems);

  return (
    <div>
      <PageTitle title="오늘의 😀는 어땠나요?" />
      {evalItems ? (
        <>
          <p>{`${evalItems[0].date} ${getSubjectName(evalItems[0].subject_name)} ${evalItems[0].period}`}</p>
          <EvalItemList evalItems={evalItems} />
        </>
      ) : (
        "항목이 없습니다."
      )}
    </div>
  );
};

export default EvalPage;
