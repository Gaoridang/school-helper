"use client";

import { Smile } from "lucide-react";
import { useSelectedUser } from "../[templateId]/_hooks/useSelectedUser";
import Link from "next/link";

const EvalEndPage = () => {
  const { selectedUser } = useSelectedUser();

  return (
    <div className="h-full md:h-auto flex justify-center items-center">
      <div className="flex flex-col items-center gap-2">
        <Smile className="w-10 h-10 text-indigo-500" />
        <p className="text-xl">
          <span className="font-semibold">{selectedUser.name || "나"}</span> 에게
        </p>
        <p className="text-xl">
          하루를 {selectedUser ? <span>전달</span> : <span>기록</span>}했어요!
        </p>

        <Link
          href="/"
          className="border rounded-lg p-4 bg-indigo-500 mt-2 active:scale-95 active:translate-y-2 transition"
        >
          <p className="text-center text-white">
            달력에서 나의 <br /> 하루를 되돌아보아요.
          </p>
        </Link>
      </div>
    </div>
  );
};

export default EvalEndPage;
