import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const schema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").max(100),
  email: z.string().email("Please enter a valid email address").max(200),
  subject: z.string().min(3, "Subject must be at least 3 characters").max(200),
  message: z.string().min(10, "Message must be at least 10 characters").max(5000),
});

/** Escape user input before it goes into the HTML email body. */
function escapeHtml(input: string) {
  return input
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

/**
 * Fixed-window rate limit, in-memory and therefore per-process. Enough to stop
 * casual spam on a single-instance pm2 deploy; swap for a shared store if this
 * ever runs on more than one node.
 */
const RATE_LIMIT = { max: 5, windowMs: 60 * 60 * 1000 };
const hits = new Map<string, { count: number; resetAt: number }>();

function rateLimit(ip: string) {
  const now = Date.now();
  const entry = hits.get(ip);

  if (!entry || now > entry.resetAt) {
    hits.set(ip, { count: 1, resetAt: now + RATE_LIMIT.windowMs });
    return { ok: true, retryAfter: 0 };
  }

  entry.count += 1;
  if (entry.count > RATE_LIMIT.max) {
    return { ok: false, retryAfter: Math.ceil((entry.resetAt - now) / 1000) };
  }
  return { ok: true, retryAfter: 0 };
}

// Keep the map from growing without bound behind a long-lived process.
function sweep() {
  const now = Date.now();
  for (const [ip, entry] of hits) if (now > entry.resetAt) hits.delete(ip);
}

export async function POST(req: NextRequest) {
  sweep();

  // nginx sits in front of this app, so the real client IP is the first
  // x-forwarded-for hop rather than the socket address.
  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    req.headers.get("x-real-ip") ||
    "unknown";

  const limit = rateLimit(ip);
  if (!limit.ok) {
    return NextResponse.json(
      { error: "Too many messages sent. Please try again later." },
      { status: 429, headers: { "Retry-After": String(limit.retryAfter) } }
    );
  }

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

  if (!resendKey) {
    // Without a key nothing can actually be delivered. Locally that is fine and we
    // just log it, but in production we must not tell the sender it worked — a
    // silently dropped message from a recruiter is worse than a visible failure.
    if (process.env.NODE_ENV !== "production") {
      console.log("[Contact form — dev, not sent]", { name, email, subject, message });
      return NextResponse.json({ success: true, delivered: false });
    }

    console.error("[Contact form] RESEND_API_KEY is not set — message NOT delivered:", {
      name,
      email,
      subject,
    });
    return NextResponse.json(
      {
        error:
          "The contact form is temporarily unavailable. Please reach me on LinkedIn or by email instead.",
      },
      { status: 503 }
    );
  }

  try {
    const { Resend } = await import("resend");
    const resend = new Resend(resendKey);

    const { error } = await resend.emails.send({
      // Override with a verified sending domain; the resend.dev sandbox address
      // has poor deliverability and can only send to your own account address.
      from: process.env.CONTACT_FROM ?? "RTM-HD Contact <onboarding@resend.dev>",
      to: process.env.CONTACT_TO ?? "rodgers.momanyi@outlook.com",
      replyTo: email,
      subject: `[RTM-HD] ${subject}`,
      text: `Name: ${name}\nEmail: ${email}\n\n${message}`,
      html: `
          <div style="font-family:sans-serif;max-width:600px;margin:0 auto">
            <h2 style="color:#0A4DFF">New message from RTM-HD.tech</h2>
            <p><strong>From:</strong> ${escapeHtml(name)} &lt;${escapeHtml(email)}&gt;</p>
            <p><strong>Subject:</strong> ${escapeHtml(subject)}</p>
            <hr style="border:1px solid #eee;margin:20px 0"/>
            <p style="white-space:pre-wrap">${escapeHtml(message)}</p>
          </div>
        `,
    });

    // The SDK reports delivery failures in `error` rather than by throwing.
    if (error) {
      console.error("[Contact form] Resend rejected the message:", error);
      return NextResponse.json(
        { error: "Could not send your message right now. Please try again shortly." },
        { status: 502 }
      );
    }
  } catch (err) {
    console.error("[Contact form] Resend threw:", err);
    return NextResponse.json(
      { error: "Could not send your message right now. Please try again shortly." },
      { status: 502 }
    );
  }

  return NextResponse.json({ success: true, delivered: true });
}
