import React from "react";

interface Props {
  icon: React.ReactNode;
  children: React.ReactNode;
  description: string | null | undefined;
}

const Card = ({ icon, children, description }: Props) => {
  return (
    <div className="flex items-center justify-between bg-white py-4 px-8 rounded-md">
      <div className="flex flex-col items-end">{children}</div>
    </div>
  );
};

export default Card;
