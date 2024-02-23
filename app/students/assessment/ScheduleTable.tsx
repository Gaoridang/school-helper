import React from "react";
import { ScheduleDataType } from "./CheckListForm";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface Props {
  schedule?: ScheduleDataType;
}

const ScheduleTable = ({ schedule }: Props) => {
  if (!schedule) return null;

  return (
    <Table>
      <TableHeader className="bg-gray-50">
        <TableRow>
          <TableHead className="min-w-[90px]"></TableHead>
          {schedule.schedule.map((day, dayIndex) => (
            <TableHead className="min-w-[80px]" key={dayIndex}>
              {["월", "화", "수", "목", "금"][dayIndex]}
            </TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {schedule.schedule[0].map((_period, periodIndex) => (
          <TableRow key={periodIndex}>
            <TableCell>{periodIndex + 1}교시</TableCell>
            {schedule.schedule.map((day, dayIndex) => (
              <TableCell key={dayIndex}>{day[periodIndex]}</TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default ScheduleTable;
