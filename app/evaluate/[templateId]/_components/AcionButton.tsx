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
  const classId = searchParams.get("class_id");

  const hrefByType =
    type === "self"
      ? `/evaluate/${templateId}/self?class_id=${classId}`
      : `/evaluate/${templateId}/peer?class_id=${classId}`;

  return (
    <Link href={hrefByType}>
      <Button variant={variant}>{children}</Button>
    </Link>
  );
};

export default ActionButton;
