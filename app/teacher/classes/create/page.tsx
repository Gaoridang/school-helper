"use client";

import useSupabaseBrowser from "@/app/utils/supabase/client";
import { Button } from "@/components/ui/button";
import { Form, FormField, FormItem } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import SearchInput from "@/app/teacher/classes/components/SearchInput";
import PageTitle from "@/app/components/PageTitle";
import SelectClassNumber from "../components/SelectClassNumber";
import SelectGrade from "../components/SelectGrade";
import { CreateClassData, CreateClassFormItemType, createClassSchema } from "../types/classTypes";
import { createRandomCode } from "../utils/getRandomCode";
import { useToast } from "@/components/ui/use-toast";

const formItems: CreateClassFormItemType[] = [
  { label: "학교", name: "school", type: "search", placeholder: "학교를 선택하세요." },
  { label: "학년", name: "grade", type: "select", placeholder: "학년을 선택하세요." },
  { label: "반", name: "class_number", type: "select", placeholder: "반을 선택하세요." },
];

const CreateClassPage = () => {
  const form = useForm<CreateClassData>({
    resolver: zodResolver(createClassSchema),
    defaultValues: {
      school: "",
      grade: "",
      class_number: "",
    },
  });

  const { toast } = useToast();
  const supabase = useSupabaseBrowser();
  const onSubmit = async (values: CreateClassData) => {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    const { error } = await supabase.from("classes").insert({
      school: values.school,
      grade: parseInt(values.grade),
      class_number: parseInt(values.class_number),
      class_code: createRandomCode("class"),
      teacher_id: user?.id,
    });

    if (error) {
      return toast({
        title: "학급 개설에 실패했습니다.",
        description: "권한이 없습니다. 다시 로그인해주세요.",
      });
    }

    toast({
      title: "학급이 개설되었습니다.",
    });
  };

  return (
    <div className="grid gap-4 mt-5 max-w-md m-auto">
      <PageTitle title="학급 개설하기" description="학급을 만들고 관리해보세요 ⭐️" />
      <Form {...form}>
        <form className="mt-5 grid gap-5" onSubmit={form.handleSubmit(onSubmit)}>
          {formItems.map((item) => {
            const Component =
              item.name === "school"
                ? SearchInput
                : item.name === "grade"
                  ? SelectGrade
                  : SelectClassNumber;
            return (
              <FormField
                key={item.name}
                name={item.name}
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <Component field={field} formField={item} />
                  </FormItem>
                )}
              />
            );
          })}
          <Button type="submit">개설하기</Button>
        </form>
      </Form>
    </div>
  );
};

export default CreateClassPage;
