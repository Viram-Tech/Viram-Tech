# Careers applications → Notion

The careers form posts to `/api/careers` (`app/api/careers/route.ts`), which
saves each application as a row in a Notion database (`lib/careers-notion.ts`):

| Column | What's in it |
|---|---|
| Name | Applicant's first and last name |
| Role | The role they applied for (or "General application") |
| Status | New → Screening → Interview → Offer / Rejected (starts at New) |
| Email | Their email |
| LinkedIn / portfolio | Their link (required) |
| Résumé | The uploaded PDF / DOC / DOCX, private to your workspace |
| Why ViramTech? | Their note |
| Consent | Ticked: they agreed to storage for recruitment |
| Submitted | When it arrived (filled in by Notion) |

The Notion token never reaches the browser. Spam protection: a hidden honeypot
field, a too-fast-to-be-human check, file type and size checks (4 MB max), one
application per email every 10 minutes and five per IP per hour.

## Setup (about 5 minutes)

1. **Create the connection.** In Notion go to **Settings → Connections →
   Add connection → Developer connection**. Name it `ViramTech Website`, keep
   **API token** as the authentication method, and create it. Make sure it
   can read, update and insert content, then copy its token (`ntn_…`).
2. **Make a page for it.** In Notion, create a plain page called `Careers`.
   Open its **•••** menu → **Connections** → add `ViramTech Website`.
3. **Add the token.** In `.env.local`:

   ```
   NOTION_TOKEN=<the token>
   ```

4. **Run `npm run dev`.** Before the dev server starts,
   `scripts/notion-careers-setup.mjs` runs on its own (the `predev` script).
   If the connection can already see a **Careers Applications** database it
   reuses it; otherwise it creates one inside the `Careers` page with a
   **Pipeline** board view grouped by Status. Either way it saves
   `NOTION_CAREERS_DATABASE_ID` to `.env.local`, and from then on it does
   nothing. If something is missing it prints a `[careers]` hint and dev
   starts anyway.

   To pick the parent page yourself (e.g. several pages are named
   `Careers`), run it by hand with the page's link (**Share → Copy link**):

   ```
   node scripts/notion-careers-setup.mjs "<page URL>"
   ```

5. **Test it.** Open `/careers/apply` and submit a test
   application with a small PDF. A row with the résumé attached should appear.
6. **Production:** add `NOTION_TOKEN` and `NOTION_CAREERS_DATABASE_ID` to the
   hosting provider's environment variables and redeploy.

## Changing things

- **Columns:** you can add columns, reorder them or make more views. If you **rename** one of the columns above, rename it in
  `COLUMNS` in `lib/careers-notion.ts` too, or saving will fail.
- **Limits:** résumé size and rate limits are constants at the top of
  `app/api/careers/route.ts` (keep `MAX_RESUME_MB` in
  `components/ApplicationForm.tsx` in sync). Hosts like Vercel cap uploads at
  4.5 MB and Notion's free plan caps files at 5 MB, so stay at or below 4 MB.

## Privacy

Applications and résumés live in your Notion workspace; share the page only
with people involved in hiring. Applicants consent to storage "for recruitment
purposes". Decide how long you keep applications (e.g. 12 months) and delete
older rows on that schedule; India's DPDP Act expects personal data not to be
kept longer than needed.

## New-application alerts

Notion's own automations (⚡ → Page added → notify/email) need a paid plan,
so the site sends the alert itself through EmailJS, the same account as the
contact form (free tier: 200 emails a month). Optional; skipped until both
variables below are set.

1. **Allow server sending.** EmailJS → **Account → Security** → turn on
   **Allow EmailJS API for non-browser applications**. On the same page,
   copy the **Private Key**.
2. **Make a template.** **Email Templates → Create New Template**. Set
   **To Email** to whoever should be alerted (comma-separate several), the
   subject to `New application: {{role}} – {{name}}`. For the content, open
   **Edit Content → Code editor** and paste all of `email-template.html`
   (in this folder): a branded card with the applicant's details and an
   **Open résumé in Notion** button.

   Save it and copy its **Template ID**.
3. **Add both to `.env.local`** (and to the host's environment variables):

   ```
   EMAILJS_CAREERS_TEMPLATE_ID=<template id>
   EMAILJS_PRIVATE_KEY=<private key>
   ```

The email has no résumé attached and is sent after the applicant sees
"application is in"; if it fails, the application is still saved and the
error is logged as `[careers] new-application email failed`.
