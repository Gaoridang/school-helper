import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

const MainPageLoading = () => {
  return (
    <div className="grid gap-4">
      <Skeleton className="w-[240px] h-8" />
      <Skeleton className="w-full h-16" />
      <Skeleton className="w-full h-16" />
    </div>
  );
};

export default MainPageLoading;
