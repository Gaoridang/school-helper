"use client";

import { useClass } from "@/app/(teacher)/hooks/useClass";
import { getSubjectName } from "@/app/evaluate/getSubjectName";
import { Templates, fetchTemplates } from "@/app/utils/fetchTemplates";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { BarChart2 } from "lucide-react";
import { useEffect, useState } from "react";
import { useTemplateStore } from "./useTemplateStore";
import { useRouter } from "next/navigation";

interface Props {
  type: string;
}

const TemplateList = ({ type }: Props) => {
  const [templates, setTemplates] = useState<Templates[]>([]);
  const { selectedClassId } = useClass();
  const { setTemplateId, setType, templateId } = useTemplateStore();
  const router = useRouter();

  useEffect(() => {
    if (!selectedClassId) return;

    const getReviewTemplates = async () => {
      const templates = await fetchTemplates(selectedClassId, type);
      setTemplates(templates);
    };
    getReviewTemplates();
  }, [selectedClassId, type]);

  return (
    <div className="flex flex-col">
      {templates.map((template) => (
        <button
          key={template.id}
          className={cn(
            template.id === templateId ? "ring-2" : "ring-0",
            "flex items-center gap-2 rounded-md p-2 text-sm mb-2 active:scale-95 transition-all bg-gray-100",
          )}
          onClick={() => {
            setTemplateId(template.id);
            setType(template.type);
            router.push(`/evaluate/${template.id}`);
          }}
        >
          <BarChart2
            className={cn(
              template.date === format(Date.now(), "yyyy-MM-dd") ? "text-primary" : "",
              "opacity-60",
            )}
          />
          <div>
            <span className="font-light text-xs">{format(template.date, "y. MM. dd")}</span>
            <div className="flex gap-1 items-center font-bold">
              <span className="">{template.period}</span>
              <span>{getSubjectName(template.subject_name)}</span>
            </div>
          </div>
        </button>
      ))}
    </div>
  );
};

export default TemplateList;
