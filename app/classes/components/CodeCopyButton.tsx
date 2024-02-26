"use client";

import { Button } from "@/components/ui/button";
import { copyToClipboard } from "../utils/copyToClipBoard";
import { CopyIcon } from "lucide-react";

const CodeCopyButton = ({ code }: { code: string }) => {
  return (
    <Button
      variant="outline"
      className="flex items-center gap-1"
      onClick={() => copyToClipboard(code)}
    >
      {code} <CopyIcon className="w-3 h-3" />
    </Button>
  );
};

export default CodeCopyButton;
