"use server"

import { Resend } from "resend"

const resend = new Resend(process.env.RESEND_API_KEY)

export async function submitContactForm(formData: FormData) {
  const name = formData.get("name") as string
  const phone = formData.get("phone") as string
  const address = formData.get("address") as string
  const message = formData.get("message") as string

  // Basic validation
  if (!name || !phone || !address) {
    return {
      success: false,
      error: "Please fill in all required fields",
    }
  }

  try {
    await resend.emails.send({
      from: "TOSYNS Contact Form <onboarding@resend.dev>",
      to: [process.env.CONTACT_EMAIL || "your-email@example.com"],
      subject: `New Lead from ${name}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>Property Address:</strong> ${address}</p>
        ${message ? `<p><strong>Message:</strong> ${message}</p>` : ""}
      `,
    })

    return {
      success: true,
      message: "Thank you! We'll contact you within 24 hours.",
    }
  } catch (error) {
    console.error("Email send error:", error)
    return {
      success: false,
      error: "Something went wrong. Please try again.",
    }
  }
}
