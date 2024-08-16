import { createClient } from "@/app/utils/supabase/server";
import { jwtDecode, type JwtPayload } from "jwt-decode";
import { NextRequest, NextResponse } from "next/server";

interface CustomJwtPayload extends JwtPayload {
  user_metadata: {
    role: string;
  };
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const token = searchParams.get("token");

  const supabase = createClient();

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser(token as string);

  if (userError || !user) {
    return NextResponse.json({ redirect: "/unauthorized" }, { status: 401 });
  }

  return NextResponse.json({ redirect: "/" }, { status: 200 });
}
