import React, { PropsWithChildren } from "react";

const SideBarLayout = ({ children }: PropsWithChildren) => {
  return <div className="py-4 pr-4 border-r min-w-[250px]">{children}</div>;
};

export default SideBarLayout;
