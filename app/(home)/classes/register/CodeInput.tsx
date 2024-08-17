"use client";

import { Input } from "@/components/ui/input";
import React, { ChangeEvent, useEffect, useRef } from "react";

interface Props {
  onSubmit: (code: string) => void;
}

const CodeInput = ({ onSubmit }: Props) => {
  const [code, setCode] = React.useState<string[]>(new Array(6).fill(""));
  const inputRefs = useRef<HTMLInputElement[]>([]);

  useEffect(() => {
    inputRefs.current[0].focus();
  }, []);

  const handleChange = (index: number, e: ChangeEvent<HTMLInputElement>) => {
    const newCode = [...code];
    newCode[index] = e.target.value;
    setCode(newCode);

    if (e.target.value && inputRefs.current[index + 1] && index < 5) {
      inputRefs.current[index + 1].focus();
    }

    const fullCode = newCode.join("");

    if (fullCode.length === 6) {
      onSubmit(fullCode.toUpperCase());
    }
  };

  const handleOnKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && index > 0 && !code[index]) {
      const newCode = [...code];
      newCode[index - 1] = "";
      setCode(newCode);
      inputRefs.current[index - 1].focus();
    }
  };

  return (
    <form className="flex gap-2 justify-center sm:justify-start">
      {code.map((value, index) => (
        <Input
          ref={(ref) => {
            if (ref && !inputRefs.current.includes(ref)) {
              inputRefs.current[index] = ref;
            }
          }}
          key={index}
          value={value}
          onChange={(e) => handleChange(index, e)}
          onKeyDown={(e) => handleOnKeyDown(index, e)}
          maxLength={1}
          type="text"
          className="w-8 h-8 text-sm sm:text-base sm:w-12 sm:h-12 text-center"
        />
      ))}
    </form>
  );
};

export default CodeInput;
