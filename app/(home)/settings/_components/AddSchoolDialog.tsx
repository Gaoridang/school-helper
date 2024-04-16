import CodeInput from "@/app/(home)/classes/register/CodeInput";
import { supabase } from "@/app/utils/supabase/client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useState } from "react";
import { FoundClassType } from "../../types/settings";

const AddSchoolDialog = () => {
  const [foundClass, setFoundClass] = useState<FoundClassType>();
  const [errorMessage, setErrorMessage] = useState("");
  const onSubmit = async (code: string) => {
    const { data, error } = await supabase
      .from("classes")
      .select("school, grade, class_number, id")
      .eq("class_code", code)
      .single();

    if (error) {
      setErrorMessage("학급을 찾을 수 없습니다.");
      return;
    }

    setFoundClass(data);
  };

  const handleSelect = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!foundClass || !user) return;

    const { error } = await supabase.from("user_classes").insert({
      user_id: user.id,
      class_id: foundClass.id,
      role: user.user_metadata.role,
      is_primary: true,
    });

    if (error) {
      setErrorMessage("학급 가입에 실패했습니다.");
      return;
    }
  };

  const foundClassName =
    foundClass?.school + " " + foundClass?.grade + "학년 " + foundClass?.class_number + "반";

  return (
    <Dialog>
      <DialogTrigger asChild>
        <button
          type="button"
          className="whitespace-nowrap underline underline-offset-4 text-emerald-500 text-sm"
        >
          + 학급추가
        </button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>학급추가</DialogTitle>
          <DialogDescription>학급코드를 입력하세요.</DialogDescription>
        </DialogHeader>
        <CodeInput onSubmit={onSubmit} />
        {foundClass ? (
          <div className="mt-4">
            <p className="font-semibold">일치하는 학급을 선택하세요.</p>
            <DialogClose asChild>
              <Button className="mt-2" onClick={handleSelect}>
                <p>{foundClassName}</p>
              </Button>
            </DialogClose>
          </div>
        ) : (
          <span className="font-bold">{errorMessage}</span>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default AddSchoolDialog;
