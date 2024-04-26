import { Tables } from "@/app/types/schema";
import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils";

interface Props {
  item: Tables<"review_results_view">;
}

const ReviewItem = ({ item }: Props) => {
  return (
    <div
      className={cn(
        item.is_passed ? "border-green-500 bg-green-50" : "",
        "w-full relative flex items-center justify-between text-base border px-6 py-4 rounded-lg pointer-events-none",
      )}
    >
      <span>{item.content}</span>
      <Checkbox checked={item.is_passed!} className="rounded-full" />
    </div>
  );
};

export default ReviewItem;
