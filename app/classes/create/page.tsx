"use client";

import useDebounce from "@/app/hooks/useDebounce";
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
import { ArrowUpCircle, Check, ChevronsUpDown, CircleSlash, CopyIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { BANs, GRADEs } from "../constants";
import useSchools from "../hooks/useSchools";
import { copyToClipboard } from "../utils/copyToClipBoard";
import { createRandomCode } from "../utils/getRandomCode";
import useSupabaseBrowser from "@/app/utils/supabase/client";

const CreateClassSchema = z.object({
  school: z.string().min(1, "학교를 선택하세요."),
  grade: z.string().min(1, "학년을 선택하세요."),
  classNumber: z.string().min(1, "반을 선택하세요."),
});

type CreateClass = z.infer<typeof CreateClassSchema>;

const CreateClassPage = () => {
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
  const supabase = useSupabaseBrowser();
  const router = useRouter();

  // FIXME: 새로고침 시 클래스 코드 서버, 클라이언트 다르게 생성되는 문제 해결 필요
  const [classCode, _setClassCode] = useState(() => createRandomCode("class"));

  const onSubmit = async (data: CreateClass) => {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    const { data: createdClass, error } = await supabase
      .from("classes")
      .insert({
        code: classCode,
        school: data.school,
        grade: data.grade,
        class_number: data.classNumber,
        teacher_id: user!.id,
      })
      .select()
      .single();

    if (error) {
      console.error(error);
    }

    form.reset();
    router.push(`/classes/${createdClass?.id}`);
  };

  return (
    <div className="grid gap-4 mt-5">
      <h1 className="text-3xl font-semibold underline underline-offset-[10px]">학급 개설하기</h1>
      <div>
        <Button variant="outline" onClick={() => copyToClipboard(classCode)}>
          {classCode}{" "}
          <span className="text-sm align-middle ml-2 text-gray-500">
            <CopyIcon className="w-4 h-4" />
          </span>
        </Button>
        <p className="flex items-center space-x-1 text-sm font-semibold mt-2">
          <ArrowUpCircle className="w-4 h-4" /> <span>학생 회원가입 시 필요한 학급코드</span>
        </p>
      </div>
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
    </div>
  );
};

export default CreateClassPage;
