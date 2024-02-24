import React, { PropsWithChildren } from "react";
import SubjectAndDate from "./SubjectAndDate";

const layout = ({ children }: PropsWithChildren) => {
  return (
    <div>
      <SubjectAndDate />
      {children}
    </div>
  );
};

export default layout;
