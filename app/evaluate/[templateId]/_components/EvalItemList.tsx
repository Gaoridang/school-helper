"use client";

import { Tables } from "@/app/types/schema";
import { Checkbox } from "@/components/ui/checkbox";
import { useSearchParams } from "next/navigation";
import React from "react";

interface Props {
  evalItems: Partial<Tables<"evaluation_items">>[];
}

const EvalItemList = ({ evalItems }: Props) => {
  const searchParams = useSearchParams();

  return (
    <div>
      {evalItems.map((item) => (
        <div key={item.id} className="flex items-center space-x-2">
          <Checkbox id={item.id?.toString()} />
          <label htmlFor={item.id?.toString()}>{item.content}</label>
        </div>
      ))}
    </div>
  );
};

export default EvalItemList;
