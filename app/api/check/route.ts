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

  const decodedToken = jwtDecode<CustomJwtPayload>(token!); // Decode the token to get the role
  const role = decodedToken.user_metadata.role;

  const supabase = createClient();

  if (role) {
    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser(token as string);

    if (userError || !user) {
      return NextResponse.json({ error: "not authenticated user" }, { status: 401 });
    }

    if (role === "student") {
      return NextResponse.json({ redirect: `/student` }, { status: 200 });
    } else if (role === "parents") {
      return NextResponse.json({ redirect: `/parents` }, { status: 200 });
    } else if (role === "teacher") {
      return NextResponse.json({ redirec: "/teacher" }, { status: 200 });
    } else {
      return NextResponse.json({ error: "invalid role" }, { status: 400 });
    }
  }

  return NextResponse.json({ error: "role not provided" }, { status: 400 });
}
