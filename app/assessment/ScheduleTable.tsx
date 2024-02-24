import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Link from "next/link";

interface Props {
  schedule: string[][];
}

const ScheduleTable = ({ schedule }: Props) => {
  if (!schedule) return null;

  return (
    <Table>
      <TableHeader className="bg-gray-50">
        <TableRow>
          <TableHead className="min-w-[90px]"></TableHead>
          {schedule.map((_day, dayIndex) => (
            <TableHead className="min-w-[80px]" key={dayIndex}>
              {["월", "화", "수", "목", "금"][dayIndex]}
            </TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {schedule[0].map((_period, periodIndex) => (
          <TableRow key={periodIndex}>
            <TableCell>{periodIndex + 1}교시</TableCell>
            {schedule.map((day, dayIndex) => (
              <TableCell key={dayIndex} className="py-0">
                <Link href={`/assessment?subject=${day[periodIndex]}&period=${periodIndex + 1}`}>
                  <Button
                    className="p-0 flex justify-center items-center underline hover:font-semibold md:text-base"
                    variant="link"
                  >
                    {day[periodIndex]}
                  </Button>
                </Link>
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default ScheduleTable;
