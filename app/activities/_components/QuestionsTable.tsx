"use client";

import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { CheckedState } from "@radix-ui/react-checkbox";
import React, { useState } from "react";
import { Tables } from "@/app/types/schema";

interface Props {
  questions: Tables<"questions">[];
}

const QuestionsTable = ({ questions }: Props) => {
  const [checkedIds, setCheckedIds] = useState<number[]>([]);

  const handleCheck = (checked: CheckedState, id: number) => {
    if (checked) {
      setCheckedIds((prev) => [...prev, id]);
    } else {
      setCheckedIds((prev) => prev.filter((checkedId) => checkedId !== id));
    }
  };

  const checkAll = (checked: CheckedState) => {
    if (checked) {
      const allIds = questions.map((question) => question.id) ?? [];
      setCheckedIds(allIds);
    } else {
      setCheckedIds([]);
    }
  };

  const isAllChecked = questions.length === checkedIds.length;
  const isSomeChecked = questions.length > checkedIds.length && checkedIds;
  const allCheckState: CheckedState = isAllChecked ? true : isSomeChecked ? "indeterminate" : false;

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>
            <Checkbox
              checked={allCheckState}
              name="select-all"
              onCheckedChange={(checked) => checkAll(checked)}
            />
          </TableHead>
          <TableHead>
            <span>질문</span>
          </TableHead>
          <TableHead className="text-right pl-0">
            <span className="whitespace-nowrap">태그</span>
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {questions?.map((question) => (
          <TableRow key={question.id}>
            <TableCell>
              <Checkbox
                name="question"
                aria-checked={checkedIds.includes(question.id) ? "true" : "false"}
                checked={checkedIds.includes(question.id)}
                onCheckedChange={(checked) => handleCheck(checked, question.id)}
              />
            </TableCell>
            <TableCell>
              <span className="max-w-12 truncate">{question.content}</span>
            </TableCell>
            <TableCell className="text-right pl-0">
              <Badge>인</Badge>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default QuestionsTable;
