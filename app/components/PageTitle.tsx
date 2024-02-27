import React from "react";

interface Props {
  title: string;
  description?: string;
}

const PageTitle = ({ title, description }: Props) => {
  return (
    <>
      <h1 className="text-2xl font-semibold">{title}</h1>
      <p className="text-slate-600">{description}</p>
    </>
  );
};

export default PageTitle;
