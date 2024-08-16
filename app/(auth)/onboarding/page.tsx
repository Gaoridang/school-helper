"use client";

import React, { useState } from "react";
import OnboardingName from "./_components/name";
import OnboardingRole from "./_components/role";
import OnboardingImage from "./_components/image";
import { useOnboarding } from "./provider/OnboardingProvider";
import { Button } from "@/components/ui/button";
import { supabase } from "@/app/utils/supabase/client";
import { randomUUID } from "crypto";
import { useRouter } from "next/navigation";

const OnboardingPage = () => {
  const [step, setStep] = useState(0);
  const { role, name, image, detail } = useOnboarding();
  const router = useRouter();

  const submit = async () => {
    const {
      data: { user },
      error: USER_ERROR,
    } = await supabase.auth.getUser();

    if (USER_ERROR) {
      console.error(USER_ERROR);
      return;
    }

    let image_url = null;
    if (image) {
      const { data, error: UPLOAD_IMAGE_ERROR } = await supabase.storage
        .from("avatars")
        .upload(`${user?.id}/avatar.${randomUUID}`, image, {
          cacheControl: "3600",
          upsert: false,
        });

      if (UPLOAD_IMAGE_ERROR) {
        console.error(UPLOAD_IMAGE_ERROR);
        return;
      }

      const { data: url } = supabase.storage.from("avatars").getPublicUrl(data.path);

      image_url = url.publicUrl;
    }

    const { error: INSERT_PROFILE_ERROR } = await supabase.from("profiles").upsert({
      id: user?.id,
      role: detail ? detail : role,
      name,
      image_url,
    });

    if (INSERT_PROFILE_ERROR) {
      console.error(INSERT_PROFILE_ERROR);
      return;
    }

    console.log("Profile created successfully!");
    router.replace("/");
  };

  const renderStep = () => {
    switch (step) {
      case 0:
        return <OnboardingRole />;
      case 1:
        return <OnboardingName />;
      case 2:
        return <OnboardingImage />;
    }
  };

  return (
    <div className="h-screen md:p-6 p-4">
      <div>{renderStep()}</div>
      <div>
        {step !== 0 && (
          <Button
            className="absolute bottom-6 left-6 w-20"
            variant="outline"
            onClick={() => setStep((prev) => prev - 1)}
          >
            이전
          </Button>
        )}
        <Button
          className="absolute bottom-6 right-6 w-20"
          onClick={() => {
            if (step === 2) {
              submit();
            } else {
              setStep((prev) => prev + 1);
            }
          }}
        >
          {step === 2 ? "완료" : "다음"}
        </Button>
      </div>
    </div>
  );
};

export default OnboardingPage;
