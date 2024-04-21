import { supabase } from "@/app/utils/supabase/client";

interface AssessmentData {
  session_id: string;
  item_id: number;
  is_passed: boolean;
}

interface CommentData {
  session_id: string;
  comment: string;
}

export const createAssessment = async (assessmentData: AssessmentData[]) => {
  const { error } = await supabase.from("results").insert(assessmentData);

  if (error) {
    return { error: error.message };
  }
};

export const createComment = async (commentData: CommentData) => {
  const { error } = await supabase.from("comments").insert(commentData);

  if (error) {
    return { error: error.message };
  }
};
