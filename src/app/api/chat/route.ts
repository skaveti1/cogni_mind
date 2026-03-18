import { NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  const { message } = await req.json();

  if (!message) {
    return NextResponse.json({ error: 'Missing message' }, { status: 400 });
  }

  try {
    await resend.emails.send({
      from: 'Cogni Mind Chatbot <onboarding@resend.dev>',
      to: 'shail@cognimind.ai',
      subject: 'New Chat Lead — Visitor wants to connect',
      html: `
        <div style="font-family:Inter,sans-serif;max-width:600px;margin:0 auto;background:#060609;color:#f8fafc;padding:32px;border-radius:12px;border:1px solid #1a1a22;">
          <div style="margin-bottom:20px;">
            <span style="display:inline-block;background:#34d39920;color:#34d399;font-size:11px;font-weight:700;letter-spacing:0.1em;text-transform:uppercase;padding:4px 12px;border-radius:999px;border:1px solid #34d39940;">
              Chat Lead
            </span>
          </div>
          <h2 style="font-size:20px;font-weight:900;color:#ffffff;margin:0 0 16px;">
            A visitor wants to get in touch
          </h2>
          <div style="background:#0e0e12;border:1px solid #1a1a22;border-radius:8px;padding:16px;margin-bottom:24px;">
            <p style="color:#6b7280;font-size:11px;font-weight:700;letter-spacing:0.08em;text-transform:uppercase;margin:0 0 8px;">Their message</p>
            <p style="color:#d1d5db;font-size:14px;line-height:1.6;margin:0;white-space:pre-wrap;">${message}</p>
          </div>
          <p style="color:#6b7280;font-size:13px;">They reached out via the website chatbot. Follow up within 24 hours.</p>
        </div>
      `,
    });

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error('Chat notification error:', error);
    return NextResponse.json({ error: 'Failed to send' }, { status: 500 });
  }
}
