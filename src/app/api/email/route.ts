import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, topic, message } = body || {};

    if (!name || !email || !topic || !message) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const accessKey = process.env.EMAILJS_PRIVATE_KEY;
    if (!accessKey) {
      return NextResponse.json({ error: 'EmailJS private key is not configured' }, { status: 500 });
    }

    const templateParams = {
      name,
      email,
      topic,
      time: new Date().toLocaleString(),
      message,
    };

    const payload = {
      service_id: 'service_fpu5tab',
      template_id: 'template_s8wic18',
      access_key: accessKey,
      template_params: templateParams,
    };

    const res = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      const text = await res.text();
      return NextResponse.json({ error: 'EmailJS send failed', details: text }, { status: 502 });
    }

    return NextResponse.json({ ok: true });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err);
    return NextResponse.json({ error: 'Unexpected server error', details: message }, { status: 500 });
  }
}
