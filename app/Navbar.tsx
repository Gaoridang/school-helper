import React from "react";
import Link from "next/link";

const Navbar = () => {
  return (
    <div className="border-b h-12 flex items-center justify-between px-5">
      <div>가치가 로고</div>
      <div>
        <Link href="/auth" className="flex space-x-2 text-sm">
          <div>로그인</div>
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
