import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

const AuthLoadingSkeleton = () => {
  return (
    <div className="grid gap-4 max-w-md m-auto mt-5">
      <Skeleton className="w-[240px] h-8" />
      <Skeleton className="w-full h-16" />
      <Skeleton className="w-full h-16" />
    </div>
  );
};

export default AuthLoadingSkeleton;
