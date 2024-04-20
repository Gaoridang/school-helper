import { Skeleton } from "@/components/ui/skeleton";

const ScoreChartLoadingSkeleton = () => {
  return (
    <div className="relative border rounded-lg bg-card">
      <Skeleton className="hidden md:block md:m-6 md:w-60 md:h-10" />
      <Skeleton className="m-6 md:mt-0 h-[200px]" />
    </div>
  );
};

export default ScoreChartLoadingSkeleton;
