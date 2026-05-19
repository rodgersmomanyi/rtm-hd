import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const schema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  subject: z.string().min(3, "Subject must be at least 3 characters"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

export async function POST(req: NextRequest) {
  let body: unknown;

  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const result = schema.safeParse(body);

  if (!result.success) {
    const errors: Record<string, string> = {};
    for (const issue of result.error.issues) {
      const key = issue.path[0] as string;
      errors[key] = issue.message;
    }
    return NextResponse.json({ errors }, { status: 422 });
  }

  const { name, email, subject, message } = result.data;

  const resendKey = process.env.RESEND_API_KEY;

  if (resendKey) {
    try {
      const { Resend } = await import("resend");
      const resend = new Resend(resendKey);

      await resend.emails.send({
        from: "RTM-HD Contact <onboarding@resend.dev>",
        to: "rodgers.momanyi@outlook.com",
        replyTo: email,
        subject: `[RTM-HD] ${subject}`,
        text: `Name: ${name}\nEmail: ${email}\n\n${message}`,
        html: `
          <div style="font-family:sans-serif;max-width:600px;margin:0 auto">
            <h2 style="color:#0A4DFF">New message from RTM-HD.tech</h2>
            <p><strong>From:</strong> ${name} &lt;${email}&gt;</p>
            <p><strong>Subject:</strong> ${subject}</p>
            <hr style="border:1px solid #eee;margin:20px 0"/>
            <p style="white-space:pre-wrap">${message}</p>
          </div>
        `,
      });
    } catch (err) {
      console.error("Resend error:", err);
      // Still return success to user; log for server-side investigation
    }
  } else {
    // Dev mode: log to console
    console.log("[Contact form]", { name, email, subject, message });
  }

  return NextResponse.json({ success: true });
}
