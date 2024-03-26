import React from "react";
import CreateEvalForm from "../../create/_components/CreateEvalForm";
import { createClient } from "@/app/utils/supabase/server";

const CreateNewEvaluateMePage = async () => {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return <CreateEvalForm user={user} type="self" />;
};

export default CreateNewEvaluateMePage;
