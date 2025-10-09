// NOTE: This code is for your Next.js API route (e.g., /app/api/contact/route.js)

export async function POST(request) {
  try {
    // 1. Environment Variable Check (Include the Public Key variable)
    if (
      !process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID ||
      !process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID ||
      !process.env.NEXT_PUBLIC_EMAILJS_USER_ID || // 👈 Public Key variable is now required
      !process.env.EMAILJS_PRIVATE_KEY
    ) {
      console.error(
        "Server configuration error: EmailJS environment variables not fully set. Check SERVICE_ID, TEMPLATE_ID, USER_ID, and PRIVATE_KEY."
      );
      return new Response(
        JSON.stringify({
          error: "Server configuration error. Contact developer.",
        }),
        {
          status: 500,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    const { name, email, message } = await request.json(); // 2. Validate Input (no change)
    if (!name || !email || !message) {
      return new Response(
        JSON.stringify({ error: "All fields are required" }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        }
      );
    } // 3. Prepare EmailJS Request Payload (CRITICALLY CORRECTED)

    const payload = {
      service_id: process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID,
      template_id: process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID, // 👈 RE-ADDED: The API specifically requested this, even with accessToken present.
      user_id: process.env.NEXT_PUBLIC_EMAILJS_USER_ID, // 👈 Private Key for secure server-side authentication.
      accessToken: process.env.EMAILJS_PRIVATE_KEY,

      template_params: {
        from_name: name,
        from_email: email,
        message,
      },
    }; // 4. Call EmailJS REST API (no change)

    const response = await fetch(
      "https://api.emailjs.com/api/v1.0/email/send",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      console.error("EmailJS error response:", errorText);

      if (
        errorText.includes("412") ||
        errorText.includes("insufficient authentication scopes")
      ) {
        return new Response(
          JSON.stringify({
            error:
              "Authentication failed. Reconnect your Gmail service in EmailJS.",
          }),
          { status: 500, headers: { "Content-Type": "application/json" } }
        );
      } // Throw an error for other failures (e.g., Template not found, etc.)
      throw new Error(
        `EmailJS API request failed: ${response.status} ${response.statusText}`
      );
    } // 5. Success

    return new Response(
      JSON.stringify({ message: "Message sent successfully via EmailJS!" }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.error("Contact Form API Error:", error.message);
    return new Response(
      JSON.stringify({
        error: "Failed to send message. Please check server logs.",
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
