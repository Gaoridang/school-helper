import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { PlusIcon, Trash2Icon } from "lucide-react";
import { useFieldArray, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CheckSchemaType, checkSchema } from "../../api/checkSchema";
import axios from "axios";
import { useToast } from "@/components/ui/use-toast";
import { ToastAction } from "@/components/ui/toast";
import Link from "next/link";
import { supabase } from "@/app/utils/supabase/client";
import { useState } from "react";

export function AddSheet() {
  const [duplicateError, setDuplicateError] = useState("");
  const { register, control, handleSubmit, reset, getValues } = useForm<CheckSchemaType>({
    resolver: zodResolver(checkSchema),
    defaultValues: {
      title: "",
      items: [
        {
          content: "",
        },
      ],
    },
    mode: "onChange",
  });
  const { fields, append, remove } = useFieldArray({
    control,
    name: "items",
  });
  const { toast } = useToast();

  const onSubmit = async (data: CheckSchemaType) => {
    console.log(data);
    // TODO: 인스턴스 만들기
    try {
      const response = await axios.post("/api/activities", data);
      if (response.status === 201) {
        toast({
          title: "성공",
          description: "등록한 주제로 템플릿을 만들어 보세요.",
        });
      }
    } catch (error) {
      toast({
        title: "네트워크 에러",
        description: "잠시후 다시 시도해 주세요.",
        action: (
          <ToastAction altText="문의하기">
            {/* TODO: contact 페이지 추가하기 */}
            <Link href="/contact">문의하기</Link>
          </ToastAction>
        ),
      });
    }
    reset();
  };

  const addActivity = async () => {
    // TODO: DB 권한 다시 지정하기
    await checkDuplicateActivity();
    await supabase
      .from("activity")
      .insert([{ name: getValues("title") }])
      .select();
  };

  const checkDuplicateActivity = async () => {
    try {
      const { data, error } = await supabase
        .from("activity")
        .select()
        .eq("name", getValues("title"));

      if (error) throw error;
      if (data.length > 0) {
        setDuplicateError("이미 존재하는 활동입니다.");
        return true;
      } else {
        setDuplicateError("");
        return false;
      }
    } catch (error) {
      console.error("Error checking duplicate activity:", error);
      return true;
    }
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline">
          <PlusIcon className="h-4 w-4 mr-1 opacity-70" /> 직접 추가하기
        </Button>
      </SheetTrigger>
      <SheetContent>
        <form onSubmit={handleSubmit(onSubmit)}>
          <SheetHeader>
            <SheetTitle>나만의 주제 만들기</SheetTitle>
            <SheetDescription>추가하고 싶은 주제를 만들어 보세요.</SheetDescription>
          </SheetHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="title">이름</Label>
              <Input id="title" placeholder="역할극" {...register("title")} />
              {duplicateError && <p className="text-xs text-red-500">{duplicateError}</p>}
              <Button variant="secondary" onClick={addActivity}>
                중복 검사
              </Button>
            </div>
            <Button type="button" variant="ghost" onClick={() => append({ content: "" })}>
              <PlusIcon className="h-4 w-4 mr-1" />
              항목 추가하기
            </Button>
            {fields.map((field, index) => (
              <div key={field.id} className="flex items-center gap-4">
                <Input {...register(`items.${index}.content`)} />
                <Trash2Icon
                  className="w-6 h-6 cursor-pointer opacity-30 hover:opacity-100 transition-opacity"
                  onClick={() => remove(index)}
                />
              </div>
            ))}
          </div>
          <SheetFooter>
            <SheetClose asChild>
              <Button type="submit">저장하기</Button>
            </SheetClose>
          </SheetFooter>
        </form>
      </SheetContent>
    </Sheet>
  );
}
