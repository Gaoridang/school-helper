import { createClient } from "@/app/utils/supabase/server";
import CreateTemplateForm from "../_components/CreateTemplateForm";
import PageTitle from "@/app/components/PageTitle";

const CreateTemplatePage = async () => {
  const supabase = createClient();
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  return (
    <div className="p-4 md:p-8">
      <PageTitle title="평가지 만들기" />
      <CreateTemplateForm user={user} />
    </div>
  );
};

export default CreateTemplatePage;
