import { Tables } from "@/app/types/schema";
import { Checkbox } from "@/components/ui/checkbox";
import React from "react";

interface Props {
  evalItems: Partial<Tables<"evaluation_items">>[];
  disabled?: boolean;
}

const EvalItemList = ({ evalItems, disabled = false }: Props) => {
  return (
    <div className="grid gap-1">
      {evalItems.map((item) => (
        <div key={item.id} className="flex items-center space-x-2">
          <Checkbox id={item.id?.toString()} disabled={disabled} />
          <label htmlFor={item.id?.toString()}>{item.content}</label>
        </div>
      ))}
    </div>
  );
};

export default EvalItemList;
