import PageTitle from "@/app/components/PageTitle";
import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

const NewTemplateLoading = () => {
  return (
    <div className="p-4 md:p-8">
      <PageTitle title="평가지 만들기" />
      <div className="flex flex-col md:flex-row gap-8">
        <div className="flex flex-col gap-4">
          <p className="text-sm">날짜 및 시간</p>
          <Skeleton className="w-full md:w-[200px] h-10" />
          <Skeleton className="w-full md:w-[200px] h-10" />
          <Skeleton className="w-full md:w-[200px] h-10" />
        </div>
        <div className="flex-1 flex flex-col gap-4">
          <p className="text-sm">평가 항목</p>
          <Skeleton className="w-full h-10" />
          <Skeleton className="w-full h-10" />
          <Skeleton className="w-full h-10" />
        </div>
      </div>
    </div>
  );
};

export default NewTemplateLoading;
