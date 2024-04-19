import { createClient } from "@/app/utils/supabase/server";
import Emojis from "./Emojis";

interface Props {
  sessionId: string;
}

const Comments = async ({ sessionId }: Props) => {
  const supabase = createClient();
  const { data: comments, error } = await supabase
    .from("comments")
    .select("*")
    .eq("session_id", sessionId);

  return (
    <div className="relative flex flex-col gap-2">
      {comments?.map((comment) => (
        <p key={comment.id} className="pl-4 px-12 py-2 rounded-lg">
          {comment.comment}
        </p>
      ))}
      <Emojis />
    </div>
  );
};

export default Comments;
