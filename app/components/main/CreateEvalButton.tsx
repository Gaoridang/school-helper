"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

const CreateEvalButton = () => {
  const router = useRouter();

  return (
    <Button variant="link" className="p-0 h-auto" onClick={() => router.push(`/evaluate/create`)}>
      새로운 템플릿 제작
    </Button>
  );
};

export default CreateEvalButton;
