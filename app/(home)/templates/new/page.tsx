import { createClient } from "@/app/utils/supabase/server";
import CreateTemplateForm from "../_components/CreateTemplateForm";

const CreateTemplatePage = async () => {
  const supabase = createClient();
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  return (
    <div>
      <CreateTemplateForm user={user} />
    </div>
  );
};

export default CreateTemplatePage;
