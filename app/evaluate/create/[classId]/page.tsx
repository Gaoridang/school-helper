import React from "react";
import CreateEvalForm from "./_components/CreateEvalForm";
import { cookies } from "next/headers";
import useSupabaseServer from "@/app/utils/supabase/server";
import { redirect } from "next/navigation";

interface Props {
  params: { classId: string };
}

const CreateEvalPage = async ({ params }: Props) => {
  const cookieStore = cookies();
  const supabase = useSupabaseServer(cookieStore);

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("signin");
  }

  return <CreateEvalForm classId={params.classId} user={user} />;
};

export default CreateEvalPage;
