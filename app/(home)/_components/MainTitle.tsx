import React from "react";

interface Props {
  title: string;
  description?: string;
}

const MainTitle = ({ title, description }: Props) => {
  const descriptionLine = description?.split("\\n");

  return (
    <div>
      <h2 className="text-lg font-semibold mb-2">{title}</h2>
      {descriptionLine?.map((d, index) => (
        <p key={index} className="text-sm font-light">
          {d}
        </p>
      ))}
    </div>
  );
};

export default MainTitle;
