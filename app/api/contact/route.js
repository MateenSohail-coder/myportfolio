// app/api/contact/route.js
export async function POST(request) {
  try {
    const required = [
      "NEXT_PUBLIC_EMAILJS_SERVICE_ID",
      "NEXT_PUBLIC_EMAILJS_TEMPLATE_ID",
      "NEXT_PUBLIC_EMAILJS_REPLY_TEMPLATE_ID",
      "NEXT_PUBLIC_EMAILJS_USER_ID",
      "EMAILJS_PRIVATE_KEY",
    ];
    for (const key of required) {
      if (!process.env[key]) {
        console.error(`Missing environment variable: ${key}`);
        return new Response(JSON.stringify({ error: "Server config error" }), {
          status: 500,
        });
      }
    }

    const { name, email, message } = await request.json();
    if (!name || !email || !message)
      return new Response(
        JSON.stringify({ error: "All fields are required" }),
        {
          status: 400,
        }
      );

    const discountCode = generateDiscountCode();

    const base = {
      service_id: process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID,
      user_id: process.env.NEXT_PUBLIC_EMAILJS_USER_ID,
      accessToken: process.env.EMAILJS_PRIVATE_KEY,
    };

    // Main email to you
    const mainPayload = {
      ...base,
      template_id: process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID,
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

    if (!main.ok) throw new Error("Main email failed");

    // Small delay to avoid rate limit
    await new Promise((r) => setTimeout(r, 500));

    // Auto reply to user
    const replyPayload = {
      ...base,
      template_id: process.env.NEXT_PUBLIC_EMAILJS_REPLY_TEMPLATE_ID,
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

    if (!reply.ok) console.warn("Auto reply failed", await reply.text());

    return new Response(
      JSON.stringify({
        success: true,
        discountCode,
        message: "Emails sent successfully",
      }),
      { status: 200 }
    );
  } catch (err) {
    console.error("Email API error:", err);
    return new Response(
      JSON.stringify({ error: "Email sending failed", details: err.message }),
      { status: 500 }
    );
  }
}

function generateDiscountCode() {
  const prefix = "AMCODE";
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  return `${prefix}-${Array.from({ length: 5 }, () =>
    chars.charAt(Math.floor(Math.random() * chars.length))
  ).join("")}`;
}
