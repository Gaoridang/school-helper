import {
  Tooltip as ShadTooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { PlusCircle } from "lucide-react";
import Link from "next/link";
import React, { ReactNode } from "react";

interface Props {
  href: string;
  children: ReactNode;
}

const CustomTooltip = ({ href, children }: Props) => {
  return (
    <TooltipProvider delayDuration={0}>
      <ShadTooltip>
        <TooltipTrigger>
          <Link href={href}>
            <PlusCircle className="w-6 h-6 hover:rotate-90 transition text-indigo-500" />
          </Link>
        </TooltipTrigger>
        <TooltipContent side="right">{children}</TooltipContent>
      </ShadTooltip>
    </TooltipProvider>
  );
};

export default CustomTooltip;
