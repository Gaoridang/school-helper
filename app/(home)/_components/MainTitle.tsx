import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { HelpCircle } from "lucide-react";
import React from "react";

interface Props {
  title: string;
  description?: string;
  tooltip?: string;
}

const MainTitle = ({ title, description, tooltip }: Props) => {
  const descriptionLine = description?.split("\\n");

  return (
    <div>
      <div className="flex items-center gap-1  mb-2">
        <h2 className="text-lg font-semibold pt-1">{title}</h2>
        {tooltip && (
          <TooltipProvider>
            <Tooltip delayDuration={0}>
              <TooltipTrigger>
                <HelpCircle className="w-4 h-4 text-gray-500" />
              </TooltipTrigger>
              <TooltipContent className="bg-gray-900 text-white text-sm">{tooltip}</TooltipContent>
            </Tooltip>
          </TooltipProvider>
        )}
      </div>
      {descriptionLine?.map((d, index) => (
        <p key={index} className="text-sm font-light">
          {d}
        </p>
      ))}
    </div>
  );
};

export default MainTitle;
