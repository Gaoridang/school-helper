"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

const GoBackButton = () => {
  const router = useRouter();

  return (
    <Button className="mt-4" onClick={() => router.back()}>
      목록으로
    </Button>
  );
};

export default GoBackButton;
