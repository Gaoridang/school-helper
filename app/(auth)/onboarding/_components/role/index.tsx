import SelectRole from "@/app/(auth)/signup/SelectRole";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import React, { useState } from "react";
import { useOnboarding } from "../../provider/OnboardingProvider";
import { Input } from "@/components/ui/input";

const roleData = [
  { label: "선생님", value: "teacher" },
  { label: "학생", value: "student" },
  { label: "학부모", value: "parents" },
];

const detailParentData = [
  { label: "아버지", value: "부" },
  { label: "어머니", value: "모" },
];

const OnboardingRole = () => {
  const { role, updateRole, detail, updateDetail } = useOnboarding();
  const [isInputFocused, setIsInputFocused] = useState(false);
  const [detailValue, setDetailValue] = useState("");

  const handleDetailChange = (value: string) => {
    setDetailValue(value);
    updateDetail(value);
  };

  const handleInputFocus = () => {
    setIsInputFocused(true);
    setDetailValue("");
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateDetail(e.target.value);
    setDetailValue("");
  };

  return (
    <div className="space-y-4">
      <h2 className="text-center text-xl font-bold">역할을 선택해 주세요.</h2>
      <div className="relative">
        <RadioGroup
          defaultValue="선생님"
          onValueChange={(value) => {
            updateRole(value);
          }}
        >
          {roleData.map((item) => (
            <div key={item.value}>
              <RadioGroupItem
                className="hidden peer"
                key={item.value}
                value={item.value}
                id={item.value}
              />
              <Label
                className="flex justify-center items-center border p-4 text-base rounded-md w-full peer-data-[state='checked']:bg-gray-100 peer-data-[state='checked']:ring-2 peer-data-[state='checked']:ring-black transition-all"
                htmlFor={item.value}
              >
                {item.label}
              </Label>
            </div>
          ))}
        </RadioGroup>
        {role === "parents" && (
          <div className="mt-4">
            <h3 className="relative">
              <p className="mb-4 text-center text-sm font-semibold text-slate-500 bg-white z-10">
                세부 역할을 선택해 주세요.
              </p>
            </h3>
            <RadioGroup onValueChange={handleDetailChange} value={detailValue}>
              {detailParentData.map((item) => (
                <div key={item.value}>
                  <RadioGroupItem
                    className="hidden peer"
                    key={item.value}
                    value={item.value}
                    id={item.value}
                  />
                  <Label
                    className="flex justify-center items-center border p-4 text-base rounded-md w-full peer-data-[state='checked']:bg-gray-100 peer-data-[state='checked']:ring-2 peer-data-[state='checked']:ring-black transition-all"
                    htmlFor={item.value}
                  >
                    {item.label}
                  </Label>
                </div>
              ))}
            </RadioGroup>
            <Input
              className="mt-4"
              variant="borderBottom"
              placeholder="직접 입력"
              onChange={handleInputChange}
              onFocus={handleInputFocus}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default OnboardingRole;
