import React from "react";
import { getUserInfo } from "../utils/getUserInfo";
import { getUserByRole } from "../utils/getUserByRole";

const UserInfo = async () => {
  const user = await getUserInfo();

  if (!user) return null;

  return (
    <div className="grid gap-2 md:flex md:items-center my-5">
      <span className="text-2xl">😆</span>
      <span className="text-xl font-semibold">{getUserByRole(user)}</span>
      <span className="text-xl">님 안녕하세요!</span>
    </div>
  );
};

export default UserInfo;
