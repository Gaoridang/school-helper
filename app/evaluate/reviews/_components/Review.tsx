"use client";

import { Tables } from "@/app/types/schema";
import { supabase } from "@/app/utils/supabase/client";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { CheckCircle2 } from "lucide-react";
import { useEffect, useState } from "react";

interface Props {
  sessionId: string;
}

const Review = ({ sessionId }: Props) => {
  const [result, setResult] = useState<Tables<"session_evaluation_summary">>();

  useEffect(() => {
    const fetchResults = async () => {
      const { data, error } = await supabase
        .from("session_evaluation_summary")
        .select("*")
        .eq("session_id", sessionId)
        .single();
      if (error) {
        throw error;
      }
      setResult(data);
    };
    fetchResults();
  }, [sessionId]);

  if (!result) return null;

  return (
    <>
      <div className="flex items-center gap-2 mb-8">
        <p className="font-semibold text-xl">{format(result.start_time!, "y년 M월 d일")}</p>
      </div>
      <div className="grid gap-4 max-w-md mb-4">
        {(result?.contents as any[]).map((content) => (
          <div key={content.content} className="flex items-center justify-between pb-2 border-b">
            <p className={cn(content.is_passed ? "opacity-100" : "opacity-30")}>
              {content.content}
            </p>
            <div>
              {content.is_passed ? (
                <CheckCircle2 className="text-green-500" />
              ) : (
                <CheckCircle2 className="text-gray-300" />
              )}
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default Review;
