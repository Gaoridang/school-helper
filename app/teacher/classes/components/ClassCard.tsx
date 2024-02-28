import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import React from "react";
import ClassStudentsNumber from "./ClassStudents";
import Link from "next/link";
import CodeCopyButton from "./CodeCopyButton";
import useSupabaseBrowser from "@/app/utils/supabase/client";

const ClassCard = async () => {
  const supabase = useSupabaseBrowser();
  const { data: classes } = await supabase.from("classes").select("*");

  if (!classes || classes.length === 0) {
    return <div>나의 학급이 없습니다.</div>;
  }

  return (
    <div className="grid gap-4">
      {classes?.map((c) => (
        <Card key={c.id}>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Link href={`/classes/${c.id}`} className="underline underline-offset-8">
                {c.school}
              </Link>
              <CodeCopyButton code={c.class_code} />
            </CardTitle>
            <CardDescription className="">
              <span>
                {c.grade} {c.class_number}
              </span>
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ClassStudentsNumber code={c.class_code} />
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default ClassCard;
