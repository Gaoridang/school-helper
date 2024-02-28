"use client";

import { Badge } from "@/components/ui/badge";
import { ColumnDef } from "@tanstack/react-table";
import { Student } from "../types";
import Link from "next/link";
import { DataTableColumnHeader } from "./DataTableColumnHeader";

export const columns: ColumnDef<Student>[] = [
  {
    accessorKey: "name",
    header: "이름",
    cell: ({ row }) => {
      return (
        <Link
          href={`/students/${row.original.id}`}
          className="underline underline-offset-4 hover:font-semibold whitespace-nowrap"
        >
          {row.original.name}
        </Link>
      );
    },
  },
  {
    accessorKey: "student_number",
    header: ({ column }) => <DataTableColumnHeader column={column} title="번호" />,
    cell: ({ row }) => <div>{row.original.student_number}</div>,
  },
  {
    header: "아이디",
    accessorKey: "email",
    cell: ({ row }) => {
      return <div>{row.original.email.split("@")[0]}</div>;
    },
  },
  {
    header: () => <div className="text-right">고유번호</div>,
    accessorKey: "student_code",
    cell: ({ row }) => {
      return (
        <div className="w-full flex justify-end">
          <Badge variant="outline">{row.original.student_code}</Badge>
        </div>
      );
    },
  },
];
