import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

const HomeLoadingPage = () => {
  return (
    <div className="p-8 grid md:grid-cols-2 grid-cols-1 gap-4">
      <div className="space-y-4">
        <Skeleton className="w-12 h-6" />
        <Skeleton className="w-full h-48" />
      </div>
      <div className="space-y-4">
        <Skeleton className="w-12 h-6" />
        <Skeleton className="w-full h-48" />
      </div>
    </div>
  );
};

export default HomeLoadingPage;
