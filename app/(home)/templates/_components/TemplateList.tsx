"use client";

import { useEffect, useState } from "react";
import { fetchTemplates } from "../../utils/templates/fetchTemplates";
import useClassStore from "../../store/classStore";
import { Template } from "../../types/templates";

const TemplateList = () => {
  const [templates, setTemplates] = useState<Template[]>([]);
  const classId = useClassStore((state) => state.classId);

  useEffect(() => {
    const getTemplates = async () => {
      const data = await fetchTemplates(classId);
      setTemplates(data);
    };
    getTemplates();
  }, [classId]);

  return (
    <div>
      {templates.map((template) => (
        <div key={template.id}>
          <p>{template.subject}</p>
          <p>{template.period}</p>
          <p>{template.start_date}</p>
          <p>{template.end_date}</p>
        </div>
      ))}
    </div>
  );
};

export default TemplateList;
