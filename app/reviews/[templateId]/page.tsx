import useSupabaseServer from "@/app/utils/supabase/server";

type EvalItem = {
  template_id: number;
  date: string;
  subject_name: string;
  period: string;
  evaluatee_id: string;
  contents: { content: string; score: boolean }[];
};

interface Props {
  params: { templateId: string };
}

const ReviewPages = async ({ params }: Props) => {
  const supabase = useSupabaseServer();

  const { data } = await supabase
    .from("evaluation_summary_view")
    .select("*")
    .eq("template_id", params.templateId)
    .single();
  // .eq("evaluatee_id", user!.id);

  const evalItems = data as EvalItem;

  return (
    <div>
      {evalItems.contents.map((item, index) => (
        <div key={index} className="flex items-center gap-3">
          <p>{item.content}</p>
          <p>{item.score === true ? "👍" : "👎"}</p>
        </div>
      ))}
    </div>
  );
};

export default ReviewPages;
