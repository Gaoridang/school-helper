"use client";

import useDebounce from "@/app/_hooks/useDebounce";
import { Button } from "@/components/ui/button";
import { Command, CommandGroup, CommandInput, CommandItem } from "@/components/ui/command";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { Check, ChevronsUpDown, CircleSlash } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { BANs, GRADEs } from "../../constants";
import useSchools from "../../hooks/useSchools";
import { createClient } from "@/app/utils/supabase/client";

interface Props {
  params: { code: string };
}

const CreateClassSchema = z.object({
  school: z.string().min(1, "학교를 선택하세요."),
  grade: z.string().min(1, "학년을 선택하세요."),
  classNumber: z.string().min(1, "반을 선택하세요."),
});

type CreateClass = z.infer<typeof CreateClassSchema>;

const CreateClassPage = ({ params }: Props) => {
  const form = useForm<CreateClass>({
    resolver: zodResolver(CreateClassSchema),
    defaultValues: {
      school: "",
      grade: "",
      classNumber: "",
    },
  });
  const [value, setValue] = useState("");
  const debouncedValue = useDebounce(value);
  const { data: schools } = useSchools(debouncedValue);
  const supabase = createClient();

  const onSubmit = async (data: CreateClass) => {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    const { error } = await supabase.from("classes").insert({
      code: params.code,
      school: data.school,
      grade: data.grade,
      class_number: data.classNumber,
      teacher_id: user!.id,
    });

    if (error) {
      console.error(error);
    }
  };

  return (
    <Form {...form}>
      <form className="mt-5 grid gap-5" onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          name="school"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <h2 className="flex space-x-2 items-center text-2xl font-base mb-3">
                <CircleSlash /> <span>소속 학교</span>
              </h2>
              <div className="grid gap-2 relative">
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button variant="outline" role="combobox" className="justify-between">
                        {field.value || "학교를 검색하세요."}
                        <ChevronsUpDown className="w-4 h-4" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent align="start">
                    <Command>
                      <CommandInput onValueChange={(search) => setValue(search)} />
                      <CommandGroup>
                        {schools?.map((school) => (
                          <CommandItem
                            key={school.SD_SCHUL_CODE}
                            value={school.SCHUL_NM}
                            onSelect={() => {
                              form.setValue("school", school.SCHUL_NM);
                            }}
                          >
                            <div className="flex items-center gap-2">
                              <Check
                                className={cn(
                                  "w-4 h-4",
                                  school.SCHUL_NM === field.value ? "opacity-100" : "opacity-0",
                                )}
                              />
                              <div className="grid gap-2">
                                <span>{school.SCHUL_NM}</span>
                                <p className="text-xs text-slate-400">{school.ORG_RDNMA}</p>
                              </div>
                            </div>
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </Command>
                  </PopoverContent>
                </Popover>
              </div>
            </FormItem>
          )}
        />
        <FormField
          name="grade"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <h2 className="flex space-x-2 items-center text-2xl font-base mb-5">
                <CircleSlash /> <span>학년</span>
              </h2>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="학년을 선택하세요." />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {GRADEs.map((grade) => (
                    <SelectItem key={grade} value={grade}>
                      {grade}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          name="classNumber"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <h2 className="flex space-x-2 items-center text-2xl font-base mb-5">
                <CircleSlash /> <span>반</span>
              </h2>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="반을 선택하세요." />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {BANs.map((ban) => (
                    <SelectItem key={ban} value={ban}>
                      {ban}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">개설하기</Button>
      </form>
    </Form>
  );
};

export default CreateClassPage;
