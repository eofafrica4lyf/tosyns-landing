exports.handler = async function (event, context) {
  // Handle CORS preflight requests
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
      },
      body: '',
    };
  }

  // Only allow POST requests
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
      body: JSON.stringify({ error: 'Method not allowed' }),
    };
  }

  try {
    const data = JSON.parse(event.body);
    const { name, phone, address, message } = data;

    // Debug logging
    console.log('Received form data:', { name, phone, address, message });
    console.log('RESEND_API_KEY exists:', !!process.env.RESEND_API_KEY);
    console.log('CONTACT_EMAIL:', process.env.CONTACT_EMAIL);

    // Basic validation
    if (!name || !phone || !address) {
      return {
        statusCode: 400,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
        body: JSON.stringify({
          success: false,
          error: 'Please fill in all required fields',
        }),
      };
    }

    // Send email via Resend API (direct HTTP request)
    const emailData = {
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
    };

    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(emailData),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Resend API error:', response.status, errorText);
      throw new Error(`Resend API error: ${response.status} - ${errorText}`);
    }

    const result = await response.json();
    console.log('Resend API success:', result);

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
      },
      body: JSON.stringify({
        success: true,
        message: "Thank you! We'll contact you within 24 hours.",
      }),
    };
  } catch (error) {
    console.error('Email send error:', error);
    return {
      statusCode: 500,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
      body: JSON.stringify({
        success: false,
        error: 'Something went wrong. Please try again.',
      }),
    };
  }
};
