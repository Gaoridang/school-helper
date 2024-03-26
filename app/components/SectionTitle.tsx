import React from "react";

interface Props {
  children: React.ReactNode;
}

const SectionTitle = ({ children }: Props) => {
  return <div className="mb-4 text-slate-800">{children}</div>;
};

export default SectionTitle;
