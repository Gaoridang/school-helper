import React, { PropsWithChildren } from "react";

const MainLayout = ({ children }: PropsWithChildren) => {
  return <div className="pl-4 py-4 w-full">{children}</div>;
};

export default MainLayout;
