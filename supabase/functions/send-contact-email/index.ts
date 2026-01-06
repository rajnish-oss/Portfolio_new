import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "https://esm.sh/resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

interface ContactFormRequest {
  name: string;
  email: string;
  subject?: string;
  message: string;
}

const handler = async (req: Request): Promise<Response> => {
  console.log("Request method:", req.method);
  console.log("Request origin:", req.headers.get("origin"));

  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  // Only allow POST
  if (req.method !== "POST") {
    return new Response(
      JSON.stringify({ error: "Method not allowed" }),
      { status: 405, headers: { "Content-Type": "application/json", ...corsHeaders } }
    );
  }

  // Check for API key
  const apiKey = Deno.env.get("RESEND_API_KEY");
  if (!apiKey) {
    console.error("RESEND_API_KEY is not configured");
    return new Response(
      JSON.stringify({ error: "Email service not configured" }),
      { status: 500, headers: { "Content-Type": "application/json", ...corsHeaders } }
    );
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
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
          </head>
          <body style="margin: 0; padding: 0; background-color: #0a0a0a; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;">
            <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background-color: #0a0a0a; padding: 40px 20px;">
              <tr>
                <td align="center">
                  <table role="presentation" width="600" cellspacing="0" cellpadding="0" style="max-width: 600px; width: 100%;">
                    
                    <!-- Header with gradient border -->
                    <tr>
                      <td style="background: linear-gradient(135deg, #ADFF00 0%, #7ACC00 100%); padding: 2px; border-radius: 20px 20px 0 0;">
                        <div style="background-color: #111111; padding: 32px; border-radius: 18px 18px 0 0;">
                          <table width="100%">
                            <tr>
                              <td>
                                <h1 style="margin: 0; font-size: 28px; font-weight: 800; letter-spacing: -0.5px;">
                                  <span style="color: #ADFF00;">ANISH</span><span style="color: #ffffff;">.DEV</span>
                                </h1>
                              </td>
                              <td align="right">
                                <span style="background: linear-gradient(135deg, #ADFF00 0%, #7ACC00 100%); color: #0a0a0a; padding: 6px 14px; border-radius: 20px; font-size: 12px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px;">New Message</span>
                              </td>
                            </tr>
                          </table>
                        </div>
                      </td>
                    </tr>
                    
                    <!-- Main content -->
                    <tr>
                      <td style="background-color: #111111; padding: 0 32px;">
                        
                        <!-- Sender info card -->
                        <table width="100%" style="background: linear-gradient(145deg, #1a1a1a 0%, #151515 100%); border-radius: 16px; margin-bottom: 24px; border: 1px solid #252525;">
                          <tr>
                            <td style="padding: 24px;">
                              <table width="100%">
                                <tr>
                                  <td width="56" valign="top">
                                    <div style="width: 48px; height: 48px; background: linear-gradient(135deg, #ADFF00 0%, #7ACC00 100%); border-radius: 12px; display: flex; align-items: center; justify-content: center;">
                                      <span style="color: #0a0a0a; font-size: 20px; font-weight: 700; line-height: 48px; text-align: center; display: block; width: 48px;">${name.charAt(0).toUpperCase()}</span>
                                    </div>
                                  </td>
                                  <td style="padding-left: 16px;">
                                    <p style="margin: 0 0 4px 0; color: #ffffff; font-size: 18px; font-weight: 600;">${name}</p>
                                    <a href="mailto:${email}" style="color: #ADFF00; font-size: 14px; text-decoration: none;">${email}</a>
                                  </td>
                                </tr>
                              </table>
                            </td>
                          </tr>
                        </table>
                        
                        ${subject ? `
                        <!-- Subject -->
                        <table width="100%" style="margin-bottom: 20px;">
                          <tr>
                            <td>
                              <p style="margin: 0 0 8px 0; color: #666666; font-size: 11px; text-transform: uppercase; letter-spacing: 1.5px; font-weight: 600;">Subject</p>
                              <p style="margin: 0; color: #ffffff; font-size: 16px; font-weight: 500;">${subject}</p>
                            </td>
                          </tr>
                        </table>
                        ` : ''}
                        
                        <!-- Message box -->
                        <table width="100%" style="background-color: #0a0a0a; border-radius: 16px; border: 1px solid #252525; margin-bottom: 24px;">
                          <tr>
                            <td style="padding: 24px;">
                              <p style="margin: 0 0 12px 0; color: #666666; font-size: 11px; text-transform: uppercase; letter-spacing: 1.5px; font-weight: 600;">Message</p>
                              <p style="margin: 0; color: #e0e0e0; font-size: 15px; line-height: 1.7; white-space: pre-wrap;">${message}</p>
                            </td>
                          </tr>
                        </table>
                        
                        <!-- Reply CTA -->
                        <table width="100%" style="margin-bottom: 32px;">
                          <tr>
                            <td align="center">
                              <a href="mailto:${email}" style="display: inline-block; background: linear-gradient(135deg, #ADFF00 0%, #7ACC00 100%); color: #0a0a0a; padding: 14px 32px; border-radius: 12px; font-size: 14px; font-weight: 700; text-decoration: none; text-transform: uppercase; letter-spacing: 0.5px;">Reply to ${name.split(' ')[0]}</a>
                            </td>
                          </tr>
                        </table>
                        
                      </td>
                    </tr>
                    
                    <!-- Footer -->
                    <tr>
                      <td style="background: linear-gradient(135deg, #ADFF00 0%, #7ACC00 100%); padding: 2px; border-radius: 0 0 20px 20px;">
                        <div style="background-color: #111111; padding: 24px 32px; border-radius: 0 0 18px 18px;">
                          <table width="100%">
                            <tr>
                              <td>
                                <p style="margin: 0; color: #666666; font-size: 12px;">Sent from your portfolio contact form</p>
                                <p style="margin: 4px 0 0 0;">
                                  <a href="https://anishportfolio.online" style="color: #ADFF00; font-size: 12px; text-decoration: none;">anishportfolio.online</a>
                                </p>
                              </td>
                              <td align="right">
                                <p style="margin: 0; color: #444444; font-size: 11px;">© ${new Date().getFullYear()} Anish Chowdhury</p>
                              </td>
                            </tr>
                          </table>
                        </div>
                      </td>
                    </tr>
                    
                  </table>
                </td>
              </tr>
            </table>
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
