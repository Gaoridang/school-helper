"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { ReactNode } from "react";

interface Props {
  templateId: string;
  children?: ReactNode;
  variant?:
    | "default"
    | "destructive"
    | "outline"
    | "secondary"
    | "ghost"
    | "link"
    | null
    | undefined;
}

const ActionButton = ({ templateId, variant, children }: Props) => {
  const searchParams = useSearchParams();
  const type = searchParams.get("type");

  return (
    <Link href={`/evaluate/${templateId}?type=${type}`}>
      <Button variant={variant}>{children}</Button>
    </Link>
  );
};

export default ActionButton;
