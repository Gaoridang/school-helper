import React, { PropsWithChildren } from "react";
import Sidebar from "./components/Sidebar";

const TeacherPageLayout = ({ children }: PropsWithChildren) => {
  return (
    <div className="flex">
      <Sidebar />
      {children}
    </div>
  );
};

export default TeacherPageLayout;
