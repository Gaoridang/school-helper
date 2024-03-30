import { cn } from "@/lib/utils";
import { ArrowBigRight, ChevronsRight } from "lucide-react";
import Link from "next/link";
import React from "react";

interface Props {
  href: string;
  title: string;
  description: string;
  slice?: number;
  classNames?: string;
  icon?: React.ReactNode;
}

const MainLink = ({ href, title, description, slice, icon, classNames }: Props) => {
  return (
    <Link
      href={href}
      className={cn(
        "group col-span-12 md:col-span-4 flex flex-col py-5 px-6 rounded-xl bg-white text-[#0C0C0C] transition-colors",
        classNames,
      )}
    >
      <div className="flex justify-between items-center">
        <div className="pt-5">
          <p className="font-semibold mb-2">{title}</p>
          {slice ? (
            <>
              <p className="text-sm text-slate-800">{description.slice(0, slice)}</p>
              <p className="text-sm text-slate-800">{description.slice(slice)}</p>
            </>
          ) : (
            <p className="text-sm text-slate-800">{description}</p>
          )}
        </div>
        <ChevronsRight className="w-6 h-6 opacity-50 group-hover:translate-x-2 group-hover:opacity-100 transition-all" />
      </div>
    </Link>
  );
};

export default MainLink;
