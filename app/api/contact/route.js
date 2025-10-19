// app/api/contact/route.js

export async function POST(request) {
  try {
    // ✅ Use secure, server-only environment variables
    const required = [
      "EMAILJS_SERVICE_ID",
      "EMAILJS_TEMPLATE_ID",
      "EMAILJS_REPLY_TEMPLATE_ID",
      "EMAILJS_USER_ID",
      "EMAILJS_PRIVATE_KEY",
    ];

    for (const key of required) {
      if (!process.env[key]) {
        console.error(`❌ Missing environment variable: ${key}`);
        return new Response(
          JSON.stringify({ error: "Server configuration error" }),
          { status: 500 }
        );
      }
    }

    // ✅ Parse and validate request data
    const { name, email, message } = await request.json();

    if (!name?.trim() || !email?.includes("@") || !message?.trim()) {
      return new Response(
        JSON.stringify({ error: "All fields are required and must be valid." }),
        { status: 400 }
      );
    }

    // ✅ Generate a unique discount code
    const discountCode = generateDiscountCode();

    // ✅ Base payload for EmailJS requests
    const base = {
      service_id: process.env.EMAILJS_SERVICE_ID,
      user_id: process.env.EMAILJS_USER_ID,
      accessToken: process.env.EMAILJS_PRIVATE_KEY,
    };

    // ✅ Main email to you
    const mainPayload = {
      ...base,
      template_id: process.env.EMAILJS_TEMPLATE_ID,
      template_params: {
        from_name: name,
        from_email: email,
        message,
        discount_code: discountCode,
      },
    };

    const main = await fetch("https://api.emailjs.com/api/v1.0/email/send", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(mainPayload),
    });

    if (!main.ok) {
      console.error("❌ Main email failed:", await main.text());
      throw new Error("Main email failed");
    }

    // ✅ Small delay to avoid rate limits
    await new Promise((r) => setTimeout(r, 500));

    // ✅ Auto-reply to user
    const replyPayload = {
      ...base,
      template_id: process.env.EMAILJS_REPLY_TEMPLATE_ID,
      template_params: {
        to_email: email,
        user_name: name,
        original_message: message,
        original_code: discountCode,
      },
    };

    const reply = await fetch("https://api.emailjs.com/api/v1.0/email/send", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(replyPayload),
    });

    if (!reply.ok) {
      console.warn("⚠️ Auto-reply failed:", await reply.text());
    }

    // ✅ Success response
    return new Response(
      JSON.stringify({
        success: true,
        discountCode,
        message: "Emails sent successfully",
      }),
      { status: 200 }
    );
  } catch (err) {
    console.error("💥 Email API error:", err);
    return new Response(
      JSON.stringify({
        error: "Email sending failed",
        details: err.message,
      }),
      { status: 500 }
    );
  }
}

// ✅ Generate unique discount code
function generateDiscountCode() {
  const prefix = "AMCODE";
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  const random = Array.from({ length: 5 }, () =>
    chars.charAt(Math.floor(Math.random() * chars.length))
  ).join("");
  return `${prefix}-${random}`;
}
