import SelfReviews from "@/app/components/main/SelfReviews";
import PageTitle from "@/app/components/PageTitle";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";

const EvaluateMePage = () => {
  return (
    <div className="p-4 md:p-8">
      <PageTitle title="✨ 스스로 점검하기" description="클릭해서 점검을 시작해요!" />
      <div className="flex gap-2 mb-2">
        <Link href="/evaluate/me/new">
          <Button>새로 만들기</Button>
        </Link>
        <Link href="/">
          <Button variant="outline">돌아가기</Button>
        </Link>
      </div>
      <SelfReviews />
    </div>
  );
};

export default EvaluateMePage;
