"use client";

import { Badge } from "@/components/ui/badge";
import { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";

export const columns: ColumnDef<{
  id: string;
  user: string;
  done: boolean;
  sessionId: string | undefined | null;
}>[] = [
  {
    accessorKey: "name",
    header: "이름",
    cell: ({ row }) => {
      return <Link href={`/evaluate/reviews/${row.original.id}`}>{row.original.user}</Link>;
    },
  },
  {
    accessorKey: "done",
    header: "자가 평가",
    cell: ({ row }) => {
      if (row.original.done) {
        return (
          <Link href={`/evaluate/reviews/me/${row.original.sessionId}`}>
            <Badge>완료</Badge>
          </Link>
        );
      }

      return <Badge variant="secondary">미완료</Badge>;
    },
  },
];
