import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus, Camera } from "lucide-react";
import Image from "next/image";
import React, { useState, useRef } from "react";
import { useOnboarding } from "../../provider/OnboardingProvider";

const OnboardingImage = () => {
  const { updateImage } = useOnboarding();
  const [url, setUrl] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    updateImage(file);

    if (file) {
      const newUrl = URL.createObjectURL(file);
      setUrl(newUrl);
    }
  };

  const handleChangeImage = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="flex flex-col items-center">
      <h2 className="mb-4 text-center text-xl font-bold">
        프로필 사진을 <br /> 선택해 주세요!
      </h2>
      <div className="relative w-52 h-52 mb-4">
        {url ? (
          <Image className="rounded-full object-cover" alt="profile" src={url} fill />
        ) : (
          <div className="flex justify-center items-center w-full h-full rounded-full border-2 border-dashed border-gray-300">
            <Plus size={24} className="opacity-50" />
          </div>
        )}
        <Label
          htmlFor="image"
          className="absolute bottom-0 right-0 p-2 bg-white rounded-full shadow-md cursor-pointer"
        >
          <Camera size={20} />
        </Label>
      </div>
      <Input
        className="hidden"
        type="file"
        accept="image/*"
        id="image"
        ref={fileInputRef}
        onChange={handleImageChange}
      />
      <Button variant="ghost" onClick={handleChangeImage} className="mt-4">
        {url ? "이미지 변경" : "이미지 선택"}
      </Button>
    </div>
  );
};

export default OnboardingImage;
