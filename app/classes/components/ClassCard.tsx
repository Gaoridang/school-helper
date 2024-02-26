import { createClient } from "@/app/utils/supabase/server";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import React from "react";
import ClassStudents from "./ClassStudents";
import Link from "next/link";

const ClassCard = async () => {
  const supabase = createClient();
  const { data: classes } = await supabase.from("classes").select("*");

  if (!classes || classes.length === 0) {
    return <div>나의 학급이 없습니다.</div>;
  }

  return (
    <div className="grid gap-4">
      {classes?.map((c) => (
        <Link href={`/classes/${c.id}`} key={c.id}>
          <Card key={c.id}>
            <CardHeader>
              <CardTitle>{c.school}</CardTitle>
              <CardDescription>
                {c.grade} {c.class_number}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ClassStudents code={c.code} />
            </CardContent>
          </Card>
        </Link>
      ))}
    </div>
  );
};

export default ClassCard;
