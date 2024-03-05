import React from "react";

interface Props {
  title: string;
  description?: string;
}

const PageTitle = ({ title, description }: Props) => {
  return (
    <div className="mb-5">
      <h1 className="text-2xl font-semibold pt-5 mb-2">{title}</h1>
      <p className="text-slate-600">{description}</p>
    </div>
  );
};

export default PageTitle;
