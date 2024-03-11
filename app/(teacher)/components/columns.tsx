"use client";

import { Badge } from "@/components/ui/badge";
import { ColumnDef } from "@tanstack/react-table";

export const columns: ColumnDef<{ user: string; done: boolean }>[] = [
  {
    accessorKey: "name",
    header: "이름",
    cell: ({ row }) => {
      return <p> {row.original.user}</p>;
    },
  },
  {
    accessorKey: "done",
    header: "자가 평가",
    cell: ({ row }) => {
      return (
        <Badge variant={row.original.done ? "default" : "secondary"}>
          {row.original.done ? "완료" : "미완료"}
        </Badge>
      );
    },
  },
];
