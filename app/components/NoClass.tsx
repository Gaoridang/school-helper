import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";
import PageTitle from "./PageTitle";

interface Props {
  href: string;
  description: string;
}

const NoClass = ({ href, description }: Props) => {
  return (
    <div className="flex flex-col">
      <PageTitle title="등록된 학급이 없습니다." description={description} />
      <Link href={href}>
        <Button>학급 추가하기</Button>
      </Link>
    </div>
  );
};

export default NoClass;
