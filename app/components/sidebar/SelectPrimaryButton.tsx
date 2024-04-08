"use client";

import { useClass } from "@/app/(teacher)/hooks/useClass";
import { supabase } from "@/app/utils/supabase/client";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { User } from "@supabase/supabase-js";
import React from "react";

interface Props {
  user: User | null;
}

const SelectPrimaryButton = ({ user }: Props) => {
  const { selectedClassId } = useClass();
  const { toast } = useToast();
  const changeMainClass = async () => {
    if (!user) return;

    const { data: userClasses, error: userClassesError } = await supabase
      .from("user_classes")
      .select("class_id")
      .eq("user_id", user.id)
      .eq("is_primary", true)
      .single();

    if (userClasses?.class_id === selectedClassId) {
      toast({
        title: "메인 학급 변경에 실패했습니다.",
        description: "이미 선택된 학급입니다.",
      });
      return;
    }

    const { error } = await supabase
      .from("user_classes")
      .update({ is_primary: false })
      .eq("user_id", user.id)
      .eq("is_primary", true);

    if (error) {
      throw new Error("메인 학급 변경에 실패했습니다.");
    }

    const { error: updateError } = await supabase
      .from("user_classes")
      .update({ is_primary: true })
      .eq("user_id", user.id)
      .eq("class_id", selectedClassId);

    if (updateError) {
      throw updateError;
    }
  };

  return <Button onClick={changeMainClass}>메인 학급 선택</Button>;
};

export default SelectPrimaryButton;
