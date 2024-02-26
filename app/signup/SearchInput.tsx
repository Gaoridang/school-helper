"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import React, { ChangeEvent, useState } from "react";
import { CommonInputTypes } from "./types/formTypes";
import { useSelectSchool } from "../classes/hooks/useSelectSchool";
import useSchools from "../queries/getSchools";
import useDebounce from "../hooks/useDebounce";

type SearchInputProps = CommonInputTypes & {
  searchSchool: (school: string) => void;
  schools: { SCHUL_NM: string }[];
};

const SearchInput = ({ field, formField }: SearchInputProps) => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const { selectedSchool, setSelectedSchool } = useSelectSchool();
  const debouncedValue = useDebounce(selectedSchool);
  const { data: schools } = useSchools(debouncedValue);

  return (
    <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
      <DialogTrigger asChild>
        <Button type="button" variant="outline" onClick={() => setDialogOpen(true)}>
          {selectedSchool ? selectedSchool : `${formField.label} 검색`}
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{formField.label} 검색</DialogTitle>
          <DialogDescription>본인이 속한 {formField.label}명을 검색하세요.</DialogDescription>
        </DialogHeader>
        <div className="flex items-center space-x-2">
          <div>
            <label htmlFor={formField.name} className="sr-only">
              {formField.label}
            </label>
            <input
              id={formField.name}
              value={selectedSchool}
              onChange={(e: ChangeEvent<HTMLInputElement>) => setSelectedSchool(e.target.value)}
            />
          </div>
        </div>
        <ScrollArea className="max-h-72">
          {schools?.map((school) => (
            <Button
              key={school.SCHUL_NM}
              variant="link"
              onClick={() => {
                field.onChange(school.SCHUL_NM);
                setSelectedSchool(school.SCHUL_NM);
                setDialogOpen(false);
              }}
            >
              {school.SCHUL_NM}
            </Button>
          ))}
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};

export default SearchInput;
