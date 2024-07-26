import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

const SettingsLoadingPage = () => {
  return (
    <div className="space-y-4">
      <Skeleton className="w-8 h-4" />
      <Skeleton className="w-full h-8" />
      <Skeleton className="w-8 h-4" />
      <Skeleton className="w-full h-8" />
    </div>
  );
};

export default SettingsLoadingPage;
