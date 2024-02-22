import { createClient } from "@/app/utils/supabase/server";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = await request.json();

  const email = body.email;
  const password = body.password;
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  // createRouteHandlerClient를 사용하면 쿠키가 바로 사라짐
  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    redirect("/error");
  }

  revalidatePath("/", "layout");
  redirect("/");

  return NextResponse.redirect("http://localhost:3000", { status: 301 });
}
