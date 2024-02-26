"use client";

import { Badge } from "@/components/ui/badge";
import { ColumnDef } from "@tanstack/react-table";

export type Student = {
  id: string;
  name: string;
  student_code: string;
  student_number: number;
};

export const columns: ColumnDef<Student>[] = [
  {
    header: "이름",
    accessorKey: "name",
  },
  {
    header: "번호",
    accessorKey: "student_number",
  },
  {
    header: () => <div className="text-right">학번</div>,
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
