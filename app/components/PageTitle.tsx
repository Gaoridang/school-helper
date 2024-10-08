import React from "react";

interface Props {
  title: string;
  description?: string;
}

const PageTitle = ({ title, description }: Props) => {
  const descriptionLines = description?.split("\\n") || [];

  return (
    <div>
      <h1 className="text-3xl font-semibold mb-2">{title}</h1>
      {descriptionLines.map((line, index) => (
        <p key={index} className="text-sm">
          {line}
        </p>
      ))}
    </div>
  );
};

export default PageTitle;
