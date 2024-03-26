import React from "react";
import CreateEvalForm from "../../create/_components/CreateEvalForm";
import { createClient } from "@/app/utils/supabase/server";

const CreateNewEvaluateFriendPage = async () => {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return <CreateEvalForm user={user} type="peer" />;
};

export default CreateNewEvaluateFriendPage;
