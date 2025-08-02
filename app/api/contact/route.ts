import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, phone, address, message } = body;

    // Basic validation
    if (!name || !phone || !address) {
      return NextResponse.json(
        { success: false, error: 'Please fill in all required fields' },
        { status: 400 },
      );
    }

    await resend.emails.send({
      from: 'TOSYNS Contact Form <onboarding@resend.dev>',
      to: [process.env.CONTACT_EMAIL || 'your-email@example.com'],
      subject: `New Lead from ${name}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>Property Address:</strong> ${address}</p>
        ${message ? `<p><strong>Message:</strong> ${message}</p>` : ''}
      `,
    });

    return NextResponse.json({
      success: true,
      message: "Thank you! We'll contact you within 24 hours.",
    });
  } catch (error) {
    console.error('Email send error:', error);
    return NextResponse.json(
      { success: false, error: 'Something went wrong. Please try again.' },
      { status: 500 },
    );
  }
}
