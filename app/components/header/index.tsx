import React from "react";
import Logo from "./Logo";
import Link from "next/link";
import { createClient } from "@/app/utils/supabase/server";
import dynamic from "next/dynamic";
const ActionButtons = dynamic(() => import("./actions"), { ssr: false });

const Header = async () => {
  const supabase = createClient();
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error || !user) {
    console.error(error);
    return;
  }

  return (
    <div className="flex justify-between items-center border-b px-4">
      <Link href="/">
        <Logo />
      </Link>
      <ActionButtons userId={user.id} />
    </div>
  );
};

export default Header;
