import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRightCircle, NotebookIcon } from "lucide-react";
import Link from "next/link";
import UserInfo from "./components/UserInfo";
import { redirect } from "next/navigation";
import useSupabaseServer from "./utils/supabase/server";
import { cookies } from "next/headers";
import { QueryClient } from "@tanstack/react-query";

export default async function Home() {
  const queryClient = new QueryClient();
  const cookieStore = cookies();
  const supabase = useSupabaseServer(cookieStore);

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error) {
    redirect("/error");
  }

  if (!user) {
    redirect("/signin");
  }

  if (user?.role === "teacher") {
    return (
      <div className="flex flex-col gap-4">
        <UserInfo />
        <Link href={`/classes/create`}>
          <Card className="group">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                학급 만들기{" "}
                <ArrowRightCircle className="w-5 h-5 group-hover:translate-x-2 transition-transform" />{" "}
              </CardTitle>
              <CardDescription>새로운 학급을 만들어보세요.</CardDescription>
            </CardHeader>
          </Card>
        </Link>
        <Link href="/classes">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                내 학급 보기 <NotebookIcon className="w-5 h-5" />{" "}
              </CardTitle>
              <CardDescription>내가 개설한 학급을 한 번에 관리하세요.</CardDescription>
            </CardHeader>
          </Card>
        </Link>
      </div>
    );
  }

  if (user?.role === "student") {
    return (
      <div className="flex flex-col gap-4">
        <UserInfo />
        <Link href="/classes">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                내 학급 보기 <NotebookIcon className="w-5 h-5" />{" "}
              </CardTitle>
              <CardDescription>내가 속한 학급을 한 번에 관리하세요.</CardDescription>
            </CardHeader>
          </Card>
        </Link>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      <UserInfo />
      <Link href={`/classes/create`}>
        <Card className="group bg-slate-100">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              학급 만들기{" "}
              <ArrowRightCircle className="w-5 h-5 group-hover:translate-x-2 transition-transform" />{" "}
            </CardTitle>
            <CardDescription>새로운 학급을 만들어보세요.</CardDescription>
          </CardHeader>
        </Card>
      </Link>
      <Link href="/classes">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              내 학급 보기 <NotebookIcon className="w-5 h-5" />{" "}
            </CardTitle>
            <CardDescription>내가 개설한 학급을 한 번에 관리하세요.</CardDescription>
          </CardHeader>
        </Card>
      </Link>
    </div>
  );
}
