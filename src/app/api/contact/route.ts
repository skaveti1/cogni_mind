import { NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  const { name, company, email, phone, message } = await req.json();

  if (!name || !company || !email) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
  }

  try {
    await resend.emails.send({
      from: 'Cogni Mind <onboarding@resend.dev>',
      to: 'shail@cognimind.ai',
      replyTo: email,
      subject: `New Inquiry — ${name} at ${company}`,
      html: `
        <div style="font-family:Inter,sans-serif;max-width:600px;margin:0 auto;background:#060609;color:#f8fafc;padding:32px;border-radius:12px;border:1px solid #1a1a22;">
          <div style="margin-bottom:24px;">
            <span style="display:inline-block;background:#34d39920;color:#34d399;font-size:11px;font-weight:700;letter-spacing:0.1em;text-transform:uppercase;padding:4px 12px;border-radius:999px;border:1px solid #34d39940;">
              New System Audit Inquiry
            </span>
          </div>

          <h2 style="font-size:22px;font-weight:900;color:#ffffff;margin:0 0 24px;">
            ${name} from ${company} wants to connect.
          </h2>

          <table style="width:100%;border-collapse:collapse;margin-bottom:24px;">
            <tr>
              <td style="padding:10px 0;border-bottom:1px solid #1a1a22;color:#6b7280;font-size:13px;font-weight:600;width:120px;">Name</td>
              <td style="padding:10px 0;border-bottom:1px solid #1a1a22;color:#f8fafc;font-size:13px;">${name}</td>
            </tr>
            <tr>
              <td style="padding:10px 0;border-bottom:1px solid #1a1a22;color:#6b7280;font-size:13px;font-weight:600;">Company</td>
              <td style="padding:10px 0;border-bottom:1px solid #1a1a22;color:#f8fafc;font-size:13px;">${company}</td>
            </tr>
            <tr>
              <td style="padding:10px 0;border-bottom:1px solid #1a1a22;color:#6b7280;font-size:13px;font-weight:600;">Email</td>
              <td style="padding:10px 0;border-bottom:1px solid #1a1a22;font-size:13px;">
                <a href="mailto:${email}" style="color:#34d399;text-decoration:none;">${email}</a>
              </td>
            </tr>
            <tr>
              <td style="padding:10px 0;color:#6b7280;font-size:13px;font-weight:600;">Phone</td>
              <td style="padding:10px 0;color:#f8fafc;font-size:13px;">${phone || '—'}</td>
            </tr>
          </table>

          ${message ? `
          <div style="background:#0e0e12;border:1px solid #1a1a22;border-radius:8px;padding:16px;margin-bottom:24px;">
            <p style="color:#6b7280;font-size:11px;font-weight:700;letter-spacing:0.08em;text-transform:uppercase;margin:0 0 8px;">Their Message</p>
            <p style="color:#d1d5db;font-size:14px;line-height:1.6;margin:0;white-space:pre-wrap;">${message}</p>
          </div>
          ` : ''}

          <a href="mailto:${email}?subject=Re: Your Cogni Mind inquiry"
            style="display:inline-block;background:#34d399;color:#060609;font-weight:700;font-size:14px;padding:12px 24px;border-radius:8px;text-decoration:none;">
            Reply to ${name}
          </a>
        </div>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Email send error:', error);
    return NextResponse.json({ error: 'Failed to send email' }, { status: 500 });
  }
}
