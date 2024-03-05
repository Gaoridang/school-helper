import { Button } from "@/components/ui/button";
import Link from "next/link";
import useSupabaseServer from "../utils/supabase/server";
import { getSubjectName } from "./getSubjectName";

const EvalListPage = async () => {
  const supabase = useSupabaseServer();

  const { data: summaries } = await supabase.from("evaluation_summary").select("*");
  const { data: templates } = await supabase.from("evaluation_templates").select("*");

  return (
    <div>
      <h2>내가 받은 평가 목록</h2>
      {summaries?.map((template) => (
        <Link
          href={`/reviews/${template.template_id}?date=${template.date}&subject=${getSubjectName(template.subject_name)}&period=${template.period}`}
          key={template.template_id}
        >
          <Button variant="outline">{`${template.date} ${getSubjectName(template.subject_name!)} ${template.period}`}</Button>
        </Link>
      ))}
    </div>
  );
};

export default EvalListPage;
