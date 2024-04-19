"use client";

import { useEffect, useState } from "react";
import { fetchTemplates } from "../../utils/templates/fetchTemplates";
import useClassStore from "../../store/classStore";
import { Template } from "../../types/templates";
import PageTitle from "@/app/components/PageTitle";
import Link from "next/link";

const TemplateList = () => {
  const [templates, setTemplates] = useState<Template[]>([]);
  const classId = useClassStore((state) => state.classId);

  useEffect(() => {
    const getTemplates = async () => {
      const data = await fetchTemplates(classId);
      const peerReviewTemplates = data.filter((template) => template.subject);
      setTemplates(peerReviewTemplates);
    };
    getTemplates();
  }, [classId]);

  return (
    <div>
      <PageTitle title="평가 템플릿 목록" description="만들어 둔 템플릿을 확인해보세요!" />
      {templates.map((template) => (
        <div
          key={template.id}
          className="flex flex-col md:flex-row md:items-center md:justify-between max-w-xl"
        >
          <div className="flex space-x-4 font-light">
            <p>{template.start_date}</p>
            <p className="hidden md:block">{template.end_date}</p>
          </div>
          <div className="flex space-x-4">
            <p>{template.subject}</p>
            <p>{template.period}</p>
          </div>
          <Link
            href={`/templates/${template.id}`}
            className="text-[#57BD9E] underline underline-offset-4"
          >
            세부내용 보기
          </Link>
        </div>
      ))}
    </div>
  );
};

export default TemplateList;
