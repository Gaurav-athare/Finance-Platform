"use server";

import { Resend } from "resend";

export async function sendEmail({ to, subject, react }) {
  const apiKey = process.env.RESEND_API_KEY;

  // ✅ Safe fallback check
  if (!apiKey) {
    console.error("❌ Missing RESEND_API_KEY");
    return { success: false, error: "Missing RESEND_API_KEY" };
  }

  const resend = new Resend(apiKey);

  try {
    const data = await resend.emails.send({
      from: "Finance App <onboarding@resend.dev>",
      to,
      subject,
      react,
    });

    return { success: true, data };
  } catch (error) {
    console.error("❌ Failed to send email:", error);

    // ✅ Make error serializable
    return {
      success: false,
      error: {
        message: error?.message ?? "Unknown error",
        stack: error?.stack ?? "",
      },
    };
  }
}
