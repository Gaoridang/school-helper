import React from "react";

const FormTitle = ({ title }: { title: string }) => {
  return <h2 className="flex space-x-2 items-center text-xl font-base mb-3">{title}</h2>;
};

export default FormTitle;
