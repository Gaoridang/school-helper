import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { sendEmailSchema } from "../authSchema";

const resend = new Resend(process.env.NEXT_PUBLIC_RESEND_API_KEY);

export async function POST(request: NextRequest) {
  const body = await request.json();
  const validation = sendEmailSchema.safeParse(body);
  if (!validation.success) return NextResponse.json({ error: "Invalid type" }, { status: 400 });

  try {
    const data = await resend.emails.send({
      from: "gachiga@togethers.info",
      to: [validation.data.email],
      subject: "Hello world",
      html: "<string>It works</strong>",
    });

    return Response.json(data);
  } catch (error) {
    return Response.json({ error });
  }
}
