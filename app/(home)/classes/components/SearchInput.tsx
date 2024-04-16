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
import { CommonInputTypes } from "../../../(auth)/signup/types/formTypes";
import { useSelectSchool } from "../hooks/useSelectSchool";
import useSchools from "../../../queries/getSchools";
import useDebounce from "../../../hooks/useDebounce";
import FormTitle from "./FormTitle";
import { CreateClassData, CreateClassFormItemType } from "../types/classTypes";
import { SearchIcon } from "lucide-react";
import { FormMessage } from "@/components/ui/form";

const SearchInput = ({
  field,
  formField,
}: CommonInputTypes<CreateClassData, CreateClassFormItemType>) => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const { selectedSchool, setSelectedSchool } = useSelectSchool();
  const debouncedValue = useDebounce(selectedSchool);
  const { data: schools } = useSchools(debouncedValue);

  return (
    <>
      <FormTitle title="✅ 소속 학교를 선택하세요." />
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
          <div className="flex items-center space-x-2 w-full p-2 border rounded-md">
            <div>
              <label htmlFor={formField.name} className="flex items-center space-x-1">
                <SearchIcon className="w-4 h-4" />
                <input
                  id={formField.name}
                  value={selectedSchool}
                  onChange={(e: ChangeEvent<HTMLInputElement>) => setSelectedSchool(e.target.value)}
                  className="w-full p-1 focus:outline-none border-none bg-transparent"
                />
              </label>
            </div>
          </div>
          <ScrollArea className="max-h-72">
            {schools?.map((school) => (
              <Button
                key={school.SD_SCHUL_CODE}
                variant="link"
                onClick={() => {
                  field.onChange(school.SCHUL_NM);
                  setSelectedSchool(school.SCHUL_NM);
                  setDialogOpen(false);
                }}
                className="w-full h-auto justify-start gap-2"
              >
                <SearchIcon className="w-4 h-4 opacity-30" />
                <div className="grid text-start">
                  <p>{school.SCHUL_NM}</p>
                  <p>{school.ORG_RDNMA}</p>
                </div>
              </Button>
            ))}
          </ScrollArea>
        </DialogContent>
      </Dialog>
      <FormMessage />
    </>
  );
};

export default SearchInput;
