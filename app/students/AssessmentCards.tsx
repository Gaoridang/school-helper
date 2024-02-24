import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRightCircle } from "lucide-react";
import Link from "next/link";
import React from "react";

const AssessmentCards = () => {
  return (
    <div className="grid gap-4">
      <Link href="/assessment/me" className="group">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              자기 평가{" "}
              <ArrowRightCircle className="w-5 h-5 font-bold group-hover:translate-x-2 transition-transform" />
            </CardTitle>
            <CardDescription>오늘의 나는 어땠나요?</CardDescription>
          </CardHeader>
        </Card>
      </Link>
      <Link href="/assessment/friend" className="group">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              친구 평가{" "}
              <ArrowRightCircle className="w-5 h-5 font-bold group-hover:translate-x-2 transition-transform" />
            </CardTitle>
            <CardDescription>가자가자</CardDescription>
          </CardHeader>
        </Card>
      </Link>
    </div>
  );
};

export default AssessmentCards;
