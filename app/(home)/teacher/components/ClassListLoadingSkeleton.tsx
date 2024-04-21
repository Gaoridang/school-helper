import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

const ClassListLoadingSkeleton = () => {
  return (
    <div className="grid gap-2">
      <Skeleton className="w-[300px] h-8 mb-4" />
      <Skeleton className="w-full h-6" />
      <Skeleton className="w-full h-6" />
      <Skeleton className="w-full h-6" />
    </div>
  );
};

export default ClassListLoadingSkeleton;
