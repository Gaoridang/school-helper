import SelfReviews from "@/app/components/main/SelfReviews";
import PageTitle from "@/app/components/PageTitle";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";

const EvaluateMePage = () => {
  return (
    <div className="p-4 md:p-8">
      <PageTitle title="✨ 스스로 점검하기" description="클릭해서 점검을 시작해요!" />
      <Button className="mb-2">
        <Link href="/evaluate/me/new">새로 만들기</Link>
      </Button>
      <SelfReviews />
    </div>
  );
};

export default EvaluateMePage;
