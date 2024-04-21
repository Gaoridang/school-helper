import { type CookieOptions, createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const { searchParams, origin } = new URL(request.url);
  const role = searchParams.get("role");

  if (role) {
    const cookieStore = cookies();
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          get(name: string) {
            return cookieStore.get(name)?.value;
          },
          set(name: string, value: string, options: CookieOptions) {
            cookieStore.set({ name, value, ...options });
          },
          remove(name: string, options: CookieOptions) {
            cookieStore.delete({ name, ...options });
          },
        },
        auth: {
          autoRefreshToken: false,
          detectSessionInUrl: false,
          persistSession: false,
        },
      },
    );

    const {
      data: { session },
      error: sessionError,
    } = await supabase.auth.getSession();

    if (sessionError) {
      return NextResponse.json({ error: "not authenticated" }, { status: 401 });
    } else {
      return NextResponse.json({ session: session }, { status: 200 });
    }

    const {
      data: { user },
      error,
    } = await supabase.auth.getUser();

    if (error) {
      console.error("error", error);
      return NextResponse.json({ error: "error" }, { status: 500 });
    }

    if (!user) {
      return NextResponse.json({ error: "not authenticated" }, { status: 401 });
    }

    if (role === "student") {
      return NextResponse.redirect(`${origin}/student`);
    } else if (role === "parent") {
      return NextResponse.redirect(`${origin}/parent`);
    }

    return NextResponse.json({ error: "invalid role" }, { status: 400 });
  }
}
