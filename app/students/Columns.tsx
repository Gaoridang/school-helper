import { ColumnDef } from "@tanstack/react-table";

export type Student = {
  id: number;
  number: number;
  name: string;
  phoneNumber: string;
  characters: string;
  moreInfo: string;
};

export const columns: ColumnDef<Student>[] = [
  {
    accessorKey: "number",
    header: "번호",
  },
  {
    accessorKey: "name",
    header: "이름",
  },
  {
    accessorKey: "characters",
    header: "특징",
  },
];
