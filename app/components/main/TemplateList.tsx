"use client";

import { useClass } from "@/app/(teacher)/hooks/useClass";
import { Templates, fetchTemplates } from "@/app/utils/fetchTemplates";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { NotebookPen } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useTemplateStore } from "./useTemplateStore";

interface Props {
  type: string;
}

const TemplateList = ({ type }: Props) => {
  const [templates, setTemplates] = useState<Templates[]>([]);
  const { selectedClassId } = useClass();
  const { setTemplateId, setType } = useTemplateStore();
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
    <div className="flex flex-col gap-4">
      {templates.map((template, index) => (
        <button
          key={template.id}
          className={cn(
            index === 0 ? "opacity-100" : "opacity-50",
            "flex items-center gap-2 rounded-full p-3 text-sm active:scale-95 transition-all bg-[#D5E7F4] hover:opacity-100",
          )}
          onClick={() => {
            setTemplateId(template.id);
            setType(template.type);
            router.push(`/evaluate/${template.id}?type=${type}`);
          }}
        >
          <div className="p-2 bg-white rounded-full">
            <NotebookPen className="w-4 h-4" />
          </div>
          <div>
            {template.start_date === template.end_date ? (
              <span className="font-bold">{format(template.start_date, "y. MM. dd")}</span>
            ) : (
              <>
                <span className="font-bold">{format(template.start_date, "y. MM. dd")} - </span>
                <span className="font-light text-xs">{format(template.end_date, "y. MM. dd")}</span>
              </>
            )}
          </div>
        </button>
      ))}
    </div>
  );
};

export default TemplateList;
