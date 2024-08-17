import { createClient } from "@/app/utils/supabase/server";
import dynamic from "next/dynamic";
const SettingsForm = dynamic(() => import("./_components/SettingsForm"), { ssr: false });

const SettingsPage = async () => {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // 프로필 정보를 가져올 때, 캐시를 사용하지 않도록 합니다.
  const { data: profile, error: PROFILE_ERROR } = await supabase
    .from("profiles")
    .select("id, role, name, image_url, email, updated_at")
    .eq("id", user?.id!)
    .single();

  if (PROFILE_ERROR) {
    console.error(PROFILE_ERROR);
    return;
  }

  return (
    <div>
      <SettingsForm profile={profile} />
    </div>
  );
};

export default SettingsPage;
