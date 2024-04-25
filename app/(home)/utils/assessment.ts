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

export const createReviewSeen = async (sessionId: string) => {
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error) {
    return { error: error.message };
  }

  const { data: parents, error: parentsError } = await supabase
    .from("students_parents")
    .select("parent_id")
    .eq("student_id", user?.id!);

  if (parentsError) {
    return { error: parentsError.message };
  }

  const insertingData = parents.map((parent) => ({
    session_id: sessionId,
    parent_id: parent.parent_id,
  }));

  const { error: seenError } = await supabase.from("review_seen").insert(insertingData);

  if (seenError) {
    return { error: seenError.message };
  }

  return { error: null };
};
