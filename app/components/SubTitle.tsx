import React, { ReactNode } from "react";

interface Props {
  children: ReactNode;
  description?: string;
}

const SubTitle = ({ children, description }: Props) => {
  return (
    <>
      <h2 className="mt-4 mb-2 text-lg">{children}</h2>
      {description && <p>{description}</p>}
    </>
  );
};

export default SubTitle;
