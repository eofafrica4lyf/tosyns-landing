const { Resend } = require('resend');

const resend = new Resend(process.env.RESEND_API_KEY);

exports.handler = async function (event, context) {
  // Only allow POST requests
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method not allowed' }),
    };
  }

  try {
    const data = JSON.parse(event.body);
    const { name, phone, address, message } = data;

    // Basic validation
    if (!name || !phone || !address) {
      return {
        statusCode: 400,
        body: JSON.stringify({
          success: false,
          error: 'Please fill in all required fields',
        }),
      };
    }

    // Send email via Resend
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

    return {
      statusCode: 200,
      body: JSON.stringify({
        success: true,
        message: "Thank you! We'll contact you within 24 hours.",
      }),
    };
  } catch (error) {
    console.error('Email send error:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({
        success: false,
        error: 'Something went wrong. Please try again.',
      }),
    };
  }
};
