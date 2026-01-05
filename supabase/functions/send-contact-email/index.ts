import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "https://esm.sh/resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface ContactFormRequest {
  name: string;
  email: string;
  subject?: string;
  message: string;
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { name, email, subject, message }: ContactFormRequest = await req.json();

    // Validate required fields
    if (!name || !email || !message) {
      console.error("Missing required fields:", { name: !!name, email: !!email, message: !!message });
      return new Response(
        JSON.stringify({ error: "Name, email, and message are required" }),
        { status: 400, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      console.error("Invalid email format:", email);
      return new Response(
        JSON.stringify({ error: "Invalid email format" }),
        { status: 400, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    console.log("Sending contact email from:", name, email);

    const emailSubject = subject ? `Portfolio Contact: ${subject}` : `Portfolio Contact from ${name}`;

    const emailResponse = await resend.emails.send({
      from: "Portfolio Contact <contact@anishportfolio.online>",
      to: ["anishchowdhury9935@gmail.com"],
      reply_to: email,
      subject: emailSubject,
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <style>
              body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background: #0a0a0a; color: #fff; padding: 40px; }
              .container { max-width: 600px; margin: 0 auto; background: #111; border-radius: 16px; padding: 32px; border: 1px solid #222; }
              .header { border-bottom: 1px solid #222; padding-bottom: 20px; margin-bottom: 24px; }
              .logo { color: #ADFF00; font-size: 24px; font-weight: bold; }
              .field { margin-bottom: 16px; }
              .label { color: #888; font-size: 12px; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 4px; }
              .value { color: #fff; font-size: 16px; }
              .message-box { background: #0a0a0a; border-radius: 12px; padding: 20px; margin-top: 20px; border: 1px solid #222; }
              .footer { margin-top: 24px; padding-top: 20px; border-top: 1px solid #222; color: #666; font-size: 12px; }
              a { color: #ADFF00; text-decoration: none; }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <div class="logo">ANISH.DEV</div>
                <p style="color: #888; margin: 8px 0 0 0;">New contact form submission</p>
              </div>
              
              <div class="field">
                <div class="label">From</div>
                <div class="value">${name}</div>
              </div>
              
              <div class="field">
                <div class="label">Email</div>
                <div class="value"><a href="mailto:${email}">${email}</a></div>
              </div>
              
              ${subject ? `
              <div class="field">
                <div class="label">Subject</div>
                <div class="value">${subject}</div>
              </div>
              ` : ''}
              
              <div class="message-box">
                <div class="label">Message</div>
                <div class="value" style="margin-top: 8px; line-height: 1.6; white-space: pre-wrap;">${message}</div>
              </div>
              
              <div class="footer">
                <p>Reply directly to this email to respond to ${name}.</p>
                <p>Sent from your portfolio contact form at anishportfolio.online</p>
              </div>
            </div>
          </body>
        </html>
      `,
    });

    console.log("Email sent successfully:", emailResponse);

    return new Response(
      JSON.stringify({ success: true, message: "Email sent successfully" }),
      { status: 200, headers: { "Content-Type": "application/json", ...corsHeaders } }
    );
  } catch (error: any) {
    console.error("Error in send-contact-email function:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { "Content-Type": "application/json", ...corsHeaders } }
    );
  }
};

serve(handler);
