import QuestionsTable from "../_components/QuestionsTable";
import { cookies } from "next/headers";
import { createClient } from "@/app/utils/supabase/server";

interface Props {
  params: { id: string };
}

const CreateTemplatePage = async ({ params }: Props) => {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const { data: questions, error } = await supabase
    .from("questions")
    .select("*")
    .eq("activity_id", params.id);

  if (error) throw error;

  return <QuestionsTable questions={questions} />;
};

export default CreateTemplatePage;
