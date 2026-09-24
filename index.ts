import { createClient } from "npm:@supabase/supabase-js@2";

const supabase = createClient(
  Deno.env.get("https://dlarqdsxsswdnpnloaks.supabase.co/rest/v1/")!,
  Deno.env.get("sb_publishable_ck_D0aIzi2dUg7YrJbNZxQ_6yEszCjq")!
);

Deno.serve(async (req) => {
  try {
    const body = await req.json();

    const {
      full_name,
      email,
      address,
      arrival_at,
      departure_at,
      visit_reason,
      visit_reason_details,
      signature_base64
    } = body;

    if (
      !full_name ||
      !email ||
      !address ||
      !arrival_at ||
      !departure_at ||
      !visit_reason ||
      !signature_base64
    ) {
      return new Response(
        JSON.stringify({
          success: false,
          message: "Missing required fields."
        }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" }
        }
      );
    }

    const match = signature_base64.match(/^data:(image\/png|image\/jpeg);base64,(.*)$/);

    if (!match) {
      return new Response(
        JSON.stringify({
          success: false,
          message: "Invalid signature format."
        }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" }
        }
      );
    }

    const binary = Uint8Array.from(atob(match[2]), (c) => c.charCodeAt(0));
    const fileName = `visitor-signatures/${crypto.randomUUID()}.png`;

    const { error: uploadError } = await supabase.storage
      .from("visitor-signatures")
      .upload(fileName, binary, {
        contentType: "image/png",
        upsert: false
      });

    if (uploadError) {
      throw uploadError;
    }

    const { data: publicUrlData } = supabase.storage
      .from("visitor-signatures")
      .getPublicUrl(fileName);

    const { data: visitor, error: insertError } = await supabase
      .from("visitors")
      .insert({
        full_name,
        email,
        address,
        arrival_at,
        departure_at,
        visit_reason,
        visit_reason_details: visit_reason_details || "",
        signature_url: publicUrlData.publicUrl,
        status: "pending",
        source: "site"
      })
      .select()
      .single();

    if (insertError) {
      throw insertError;
    }

    const subject = `New visitor registration - ${full_name}`;

    const html = `
      <h2>New visitor</h2>
      <p><strong>Name:</strong> ${full_name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Address:</strong> ${address}</p>
      <p><strong>Arrival:</strong> ${arrival_at}</p>
      <p><strong>Departure:</strong> ${departure_at}</p>
      <p><strong>Reason:</strong> ${visit_reason}</p>
      <p><strong>Details:</strong> ${visit_reason_details || "-"}</p>
      <p><strong>Signature:</strong> <a href="${publicUrlData.publicUrl}">Open signature</a></p>
    `;

    const emailResponse = await fetch(`${Deno.env.get("SUPABASE_URL")}/functions/v1/send-email`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "apikey": Deno.env.get("SUPABASE_ANON_KEY") || "",
        "Authorization": `Bearer ${Deno.env.get("SUPABASE_ANON_KEY") || ""}`
      },
      body: JSON.stringify({
        to: "safety@votre-domaine.com",
        replyTo: email,
        subject,
        html,
        text: `${full_name} registered as a visitor.`
      })
    });

    const emailResult = await emailResponse.json().catch(() => null);

    await supabase.from("email_logs").insert({
      request_type: "visitor",
      related_id: visitor.id,
      to_email: "safety@votre-domaine.com",
      subject,
      status: emailResult?.success ? "sent" : "failed",
      provider: "resend",
      payload: emailResult || {}
    });

    return new Response(
      JSON.stringify({
        success: true,
        message: "Visitor saved successfully.",
        data: visitor
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" }
      }
    );
  } catch (error: any) {
    return new Response(
      JSON.stringify({
        success: false,
        message: error?.message || "Error creating visitor record."
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" }
      }
    );
  }
});
