"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { ReactNode } from "react";

interface Props {
  templateId: string;
  children?: ReactNode;
}

const ActionButton = ({ templateId, children }: Props) => {
  const searchParams = useSearchParams();
  const type = searchParams.get("type");
  const role = searchParams.get("role");

  if (role === "teacher") return;

  return (
    <Link href={`/evaluate/${templateId}?type=${type}`}>
      <Button>{children}</Button>
    </Link>
  );
};

export default ActionButton;
