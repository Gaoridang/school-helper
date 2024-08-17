import PageTitle from "@/app/components/PageTitle";
import React, { PropsWithChildren } from "react";

const SettingsLayout = ({ children }: PropsWithChildren) => {
  return (
    <div className="max-w-lg mx-auto space-y-4">
      <PageTitle title="내 정보 수정" />
      {children}
    </div>
  );
};

export default SettingsLayout;
