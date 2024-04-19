import React from "react";

interface Props {
  title: string;
  description?: string;
}

const PageTitle = ({ title, description }: Props) => {
  const descriptionLines = description?.split("\\n") || [];

  return (
    <div className="mb-8">
      <h1 className="text-3xl font-semibold mb-2">{title}</h1>
      {descriptionLines.map((line, index) => (
        <p key={index} className="font-light text-sm">
          {line}
        </p>
      ))}
    </div>
  );
};

export default PageTitle;
