import React from "react";
import CreateEvalForm from "./_components/CreateEvalForm";
import useSupabaseServer from "@/app/utils/supabase/server";
import { redirect } from "next/navigation";

const CreateEvalPage = async () => {
  const supabase = useSupabaseServer();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/signin");
  }

  return <CreateEvalForm user={user} />;
};

export default CreateEvalPage;
