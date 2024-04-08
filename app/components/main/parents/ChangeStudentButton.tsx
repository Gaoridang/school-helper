import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import React from "react";

const ChangeStudentButton = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>학생 추가하기</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>학생 추가하기</DialogTitle>
        </DialogHeader>
        <div className="flex justify-between mt-4">
          <p>학생 추가하기</p>
          <p className="text-xs text-gray-500">로그인 시 최초 선택되는 학��</p>
        </div>
        <div>
          <p className="text-xs text-gray-500">로그인 시 최초 선택되는 학급</p>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ChangeStudentButton;
