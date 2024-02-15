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

export function AddItemSheet() {
  const { register, control, handleSubmit } = useForm();
  const { fields, append, remove } = useFieldArray({
    control,
    name: "item",
  });

  const onSubmit = (data: any) => {
    console.log(data);
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
            </div>
            <Button type="button" variant="ghost" onClick={() => append({ content: "" })}>
              <PlusIcon className="h-4 w-4 mr-1" />
              항목 추가하기
            </Button>
            {fields.map((field, index) => (
              <div key={field.id} className="flex items-center gap-4">
                <Input {...register(`item.${index}.number`)} />
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
