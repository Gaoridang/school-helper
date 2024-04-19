import { createClient } from "@/app/utils/supabase/server";
import { List } from "lucide-react";
import Link from "next/link";

interface Props {
  params: { templateId: string };
}

const TemplateDetailPage = async ({ params: { templateId } }: Props) => {
  const supabase = createClient();
  const { data: templates, error } = await supabase
    .from("assessment_view")
    .select("*")
    .eq("template_id", templateId);

  const contents = templates?.map((template) => ({
    id: template.item_id,
    content: template.content,
  }));

  if (error) {
    console.error(error);
    return <div>접근 권한이 없는 평가지 입니다.</div>;
  }

  if (!templates || !templates.length) {
    return <div>접근 권한이 없는 평가지 입니다.</div>;
  }

  return (
    <div className="pt-14 px-4 md:pt-20 md:pl-12">
      <Link href="/templates" className="flex space-x-2 items-center mb-4">
        <List size={24} className="opacity-50 hover:opacity-100 transition-opacity" />
        <span className="text-sm font-normal border rounded-lg px-2 py-1">목록보기</span>
      </Link>
      <div className="flex flex-col md:flex-row gap-2 md:gap-4 text-2xl font-semibold mb-4">
        <p>{templates[0].template_created_at?.split("T")[0]}</p>
        <p>{templates[0].subject}</p>
        <p>{templates[0].period}</p>
      </div>
      {contents?.map((content, index) => (
        <div key={content.id} className="flex space-x-4 mb-2">
          <p>{index + 1}. </p>
          <p>{content.content}</p>
        </div>
      ))}
    </div>
  );
};

export default TemplateDetailPage;
