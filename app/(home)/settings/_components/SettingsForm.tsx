"use client";

import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { SettingsFormSchema, SettingsFormType } from "../../types/settings";
import FormFields from "./FormFields";
import { ChangeEvent, useState } from "react";
import { updateProfileImage } from "@/app/utils/updateProfileImage";
import { supabase } from "@/app/utils/supabase/client";
import { PickProfile } from "@/app/types/profile";
import { getImageUrlWithUpdateTime } from "@/app/utils/getImageUrlWithUpdateTime";
import { useQueryClient } from "@tanstack/react-query";
import { useGetProfile } from "@/app/queries/getProfile";

interface Props {
  profile: PickProfile<"id" | "image_url" | "updated_at" | "name" | "email" | "role">;
}

const defaultValues = [
  { name: "name", label: "이름" },
  { name: "role", label: "역할" },
  { name: "email", label: "이메일" },
];

const SettingsForm = ({ profile }: Props) => {
  const { data, isLoading, error } = useGetProfile(profile.id);
  const queryClient = useQueryClient();
  const [imageUrl, setImageUrl] = useState(profile.image_url);

  const form = useForm<SettingsFormType>({
    resolver: zodResolver(SettingsFormSchema),
    defaultValues: {
      name: profile.name || "",
      role: profile.role || "",
      email: profile.email || "",
    },
  });

  const onSubmit = async (values: SettingsFormType) => {
    const { data, error } = await supabase
      .from("profiles")
      .update({
        name: values.name,
        role: values.role,
        email: values.email,
      })
      .eq("id", profile.id);

    if (error) {
      console.error(error);
      return;
    }

    console.log(data);
  };

  const handleImageChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const result = await updateProfileImage(file, profile.id);

      if (result) {
        setImageUrl(result);
        queryClient.invalidateQueries({ queryKey: ["profile", profile.id] });
      }
    }
  };

  return (
    <div>
      <div className="flex flex-col justify-center items-center">
        {data && (
          <img
            src={getImageUrlWithUpdateTime(data?.image_url, profile.updated_at)}
            alt="profile"
            className="w-20 h-20 rounded-full"
          />
        )}
        <label
          htmlFor="image"
          className="cursor-pointer border rounded-md p-2 mt-4 text-sm hover:bg-slate-100 transition-colors"
        >
          이미지 변경
        </label>
        <input
          onChange={handleImageChange}
          id="image"
          type="file"
          accept="image/*"
          className="hidden"
        />
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          {defaultValues.map((item) => (
            <FormFields key={item.name} name={item.name} label={item.label} />
          ))}

          <div>
            <Button className="w-full" type="submit">
              저장
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default SettingsForm;
