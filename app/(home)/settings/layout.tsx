import PageTitle from "@/app/components/PageTitle";
import React, { PropsWithChildren } from "react";

const SettingsLayout = ({ children }: PropsWithChildren) => {
  return (
    <div className="pt-14 px-4 md:pt-20 md:pl-12">
      <PageTitle title="프로필 설정" description="학급을 변경, 추가, 삭제할 수 있습니다." />
      {children}
    </div>
  );
};

export default SettingsLayout;
