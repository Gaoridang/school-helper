import React from "react";
import CreateTemplateForm from "../../../templates/_components/CreateTemplateForm";
import { createClient } from "@/app/utils/supabase/server";

const CreateNewEvaluateMePage = async () => {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return <CreateTemplateForm user={user} />;
};

export default CreateNewEvaluateMePage;
