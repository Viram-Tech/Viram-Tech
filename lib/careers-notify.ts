// Server-only: emails the hiring team when a new application is saved, through
// EmailJS's REST API (the same account as the contact form). Optional: without
// EMAILJS_CAREERS_TEMPLATE_ID and EMAILJS_PRIVATE_KEY it does nothing.
// Setup: integrations/careers-notion/SETUP.md → "New-application alerts".

import type { Application } from "@/lib/careers-notion";

/**
 * Best effort: a failed alert is logged, never surfaced to the applicant —
 * the application is already safe in Notion.
 */
export async function notifyNewApplication(app: Omit<Application, "resume">, notionUrl: string) {
  const templateId = process.env.EMAILJS_CAREERS_TEMPLATE_ID;
  const privateKey = process.env.EMAILJS_PRIVATE_KEY;
  if (!templateId || !privateKey) return;

  try {
    const res = await fetch("https://api.emailjs.com/api/v1.0/email/send", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        service_id: process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID,
        template_id: templateId,
        user_id: process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY,
        accessToken: privateKey,
        // Template variables: {{role}} {{name}} {{email}} {{linkedin}} {{note}} {{notion_url}}
        template_params: {
          role: app.role,
          name: `${app.firstName} ${app.lastName}`,
          email: app.email,
          linkedin: app.linkedin,
          note: app.note || "—",
          notion_url: notionUrl,
        },
      }),
    });
    if (!res.ok) throw new Error(`${res.status} ${await res.text()}`);
  } catch (err) {
    console.error("[careers] new-application email failed:", err);
  }
}
