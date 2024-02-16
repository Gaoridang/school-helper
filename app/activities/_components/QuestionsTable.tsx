import { supabase } from "@/app/utils/supabase/client";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ToastAction } from "@/components/ui/toast";
import { toast } from "@/components/ui/use-toast";
import { useQuery } from "@tanstack/react-query";
import { Link } from "lucide-react";
import React from "react";

interface Props {
  activityId?: number;
}

const QuestionsTable = ({ activityId }: Props) => {
  const { data: questions, error } = useQuery({
    queryKey: ["questions", activityId],
    queryFn: async () => {
      if (!activityId) {
        return [];
      }
      const { data, error } = await supabase
        .from("questions")
        .select("*")
        .eq("activity_id", activityId);
      if (error) {
        toast({
          title: "네트워크 에러",
          description: "계속될 경우 고객센터로 문의 해주세요.",
          action: (
            <ToastAction altText="문의하기">
              <Link href="/contact">문의하기</Link>
            </ToastAction>
          ),
        });
      } else {
        return data;
      }
    },
  });

  return (
    <Table>
      <TableCaption>해당 활동에 대한 질문을 선택하세요.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>
            <Checkbox id="select-all" />
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {questions?.map((question) => (
          <TableRow key={question.id}>
            <TableCell>
              <Checkbox id={question.id.toString()} />
            </TableCell>
            <TableCell>
              <p>{question.content}</p>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default QuestionsTable;
