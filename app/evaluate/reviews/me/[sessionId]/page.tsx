"use client";

import { Tables } from "@/app/types/schema";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { CheckCircle2 } from "lucide-react";
import { useEffect, useState } from "react";

import { supabase } from "@/app/utils/supabase/client";
import Comments from "../../_components/Comments";
import Review from "../../_components/Review";

interface Props {
  params: {
    sessionId: string;
  };
}

const ResultDetailPage = ({ params }: Props) => {
  const [result, setResult] = useState<Tables<"session_evaluation_summary">>();

  useEffect(() => {
    const fetchResults = async () => {
      const { data, error } = await supabase
        .from("session_evaluation_summary")
        .select("*")
        .eq("session_id", params.sessionId)
        .single();
      if (error) {
        throw error;
      }
      setResult(data);
    };
    fetchResults();
  }, [params]);

  if (!result) return null;

  return (
    <div className="p-8 bg-white rounded-md">
      <Review sessionId={params.sessionId} />
      {/* <Comments session_id={params.sessionId} /> */}
    </div>
  );
};

export default ResultDetailPage;
