import { NextRequest, NextResponse } from "next/server";
import { checkSchema } from "../checkSchema";

export async function POST(request: NextRequest) {
  const body = await request.json();

  const validation = checkSchema.safeParse(body);
  if (!validation.success)
    return NextResponse.json({ error: "형식에 맞지 않습니다" }, { status: 400 });

  // TODO: DB에 추가

  return NextResponse.json(body, { status: 201 });
}
