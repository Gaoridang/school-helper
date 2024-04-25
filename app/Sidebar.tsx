import Image from "next/image";
import { ReactNode } from "react";
import { createClient } from "./utils/supabase/server";
import logo from "@/public/logo.webp";
import Link from "next/link";
import UserInfo from "./(home)/_components/UserInfo";
import { fetchClassListByUserId } from "./(home)/utils/fetchClassList";

export interface UserClasses {
  class_id: string;
  is_primary: boolean | null;
  classes: {
    school: string;
    grade: number;
    class_number: number;
    id: string;
  } | null;
}

interface Props {
  children: ReactNode;
}

const Sidebar = async ({ children }: Props) => {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const classList = await fetchClassListByUserId(user!.id);
  const selectedClass = classList.find((c) => c.is_primary);

  // const { data: students, error } = await supabase
  //   .from("student_with_class_parents")
  //   .select("student_id")
  //   .eq("parent_id", user!.id)
  //   .eq("class_id", selectedClass?.class_id!);

  // if (error) return null;

  // const { data: reviewSeen, error: reviewSeenError } = await supabase
  //   .from("review_seen")
  //   .select("session_id")
  //   .eq("parent_id", user!.id)
  //   .eq("student_id", students[0].student_id!)
  //   .eq("seen", false);

  // console.log(reviewSeen);

  if (!selectedClass) return null;

  return (
    <aside className="h-screen">
      <nav className="h-full flex flex-col bg-[#f9f9f9] shadow-sm">
        <div className="w-0 md:w-32 p-4 pb-2 mb-4 md:flex justify-between items-center transition-all">
          <Link href="/">
            <Image src={logo} alt="CheckMate" className="w-32" priority />
          </Link>
        </div>

        <ul className="flex-1">{children}</ul>

        {/* {reviewSeen?.map((seen) => (
          <Link
            key={seen.session_id}
            href={`/reviews/${students[0].student_id}/${seen.session_id}`}
          >
            새로운 리뷰가 있습니다.
          </Link>
        ))} */}

        <UserInfo user={user} selectedClass={selectedClass} />
      </nav>
    </aside>
  );
};

export default Sidebar;
