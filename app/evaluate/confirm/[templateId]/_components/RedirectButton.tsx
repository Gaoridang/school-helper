"use client";

import { Button } from "@/components/ui/button";
import { useRouter, useSearchParams } from "next/navigation";
import React from "react";

const RedirectButton = () => {
  const searchParams = useSearchParams();
  const path = searchParams.get("redirect");
  const router = useRouter();

  return (
    <Button variant="secondary" onClick={() => router.push(path!)}>
      목록으로 가기
    </Button>
  );
};

export default RedirectButton;
