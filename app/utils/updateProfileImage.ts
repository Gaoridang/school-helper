import { supabase } from "./supabase/client";

export async function updateProfileImage(file: File, userId: string) {
  const fileExt = file.name.split(".").pop();
  const fileName = `avatar.${fileExt}`;
  const filePath = `${userId}/${fileName}`;

  const { data, error } = await supabase.storage
    .from("avatars")
    .upload(filePath, file, { cacheControl: "no-cache", upsert: true });

  if (error) {
    console.error("Error uploading image:", error);
    return null;
  }

  // 공개 URL 가져오기
  const {
    data: { publicUrl },
  } = supabase.storage.from("avatars").getPublicUrl(filePath);

  // 프로필 업데이트
  const { data: profile, error: profileError } = await supabase
    .from("profiles")
    .update({ image_url: publicUrl })
    .eq("id", userId);

  if (profileError) {
    console.error("Error updating profile:", profileError);
    return null;
  }

  return publicUrl;
}
