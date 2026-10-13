// Server-only: writes careers applications into a Notion database.
// Setup: integrations/careers-notion/SETUP.md. Only app/api/careers imports this.

const API = "https://api.notion.com/v1";
// Pinned: this version still addresses databases by database_id.
const NOTION_VERSION = "2022-06-28";

/**
 * Database column names. scripts/notion-careers-setup.mjs creates them; rename
 * a column in Notion and you must rename it here too.
 */
export const COLUMNS = {
  name: "Name",
  role: "Role",
  email: "Email",
  linkedin: "LinkedIn / portfolio",
  note: "Why ViramTech?",
  resume: "Résumé",
  consent: "Consent",
  status: "Status",
} as const;

export type Application = {
  role: string;
  firstName: string;
  lastName: string;
  email: string;
  linkedin: string;
  note: string;
  resume: File;
};

async function notion(path: string, init: RequestInit & { json?: unknown }) {
  const { json, ...rest } = init;
  const res = await fetch(`${API}${path}`, {
    ...rest,
    headers: {
      Authorization: `Bearer ${process.env.NOTION_TOKEN}`,
      "Notion-Version": NOTION_VERSION,
      ...(json ? { "Content-Type": "application/json" } : {}),
      ...rest.headers,
    },
    body: json ? JSON.stringify(json) : rest.body,
  });
  const body = await res.json().catch(() => ({}));
  if (!res.ok) {
    throw new Error(`Notion ${path} → ${res.status}: ${body.code ?? ""} ${body.message ?? ""}`);
  }
  return body;
}

/** Uploads the résumé to Notion (private to the workspace) and returns its upload id. */
async function uploadResume(file: File, fileName: string): Promise<string> {
  const upload = await notion("/file_uploads", {
    method: "POST",
    json: { mode: "single_part", filename: fileName, content_type: file.type },
  });
  const form = new FormData();
  form.append("file", new Blob([await file.arrayBuffer()], { type: file.type }), fileName);
  await notion(`/file_uploads/${upload.id}/send`, { method: "POST", body: form });
  return upload.id;
}

// Notion caps a single rich-text segment at 2,000 characters.
function richText(text: string) {
  const chunks = text.match(/[\s\S]{1,2000}/g) ?? [];
  return chunks.map((content) => ({ type: "text", text: { content } }));
}

/** Saves the application and returns the new row's Notion URL. */
export async function saveApplication(app: Application): Promise<string> {
  const name = `${app.firstName} ${app.lastName}`;
  const ext = app.resume.name.slice(app.resume.name.lastIndexOf(".")).toLowerCase();
  const fileName = `${name} – ${app.role}${ext}`.replace(/[\\/:*?"<>|]+/g, " ");
  const uploadId = await uploadResume(app.resume, fileName);

  const page = await notion("/pages", {
    method: "POST",
    json: {
      parent: { database_id: process.env.NOTION_CAREERS_DATABASE_ID },
      properties: {
        [COLUMNS.name]: { title: richText(name) },
        // Selects create missing options on write, so new roles just appear.
        [COLUMNS.role]: { select: { name: app.role.replace(/,/g, " ") } },
        [COLUMNS.email]: { email: app.email },
        [COLUMNS.linkedin]: { url: app.linkedin },
        [COLUMNS.note]: { rich_text: richText(app.note) },
        [COLUMNS.resume]: {
          files: [{ type: "file_upload", file_upload: { id: uploadId }, name: fileName }],
        },
        [COLUMNS.consent]: { checkbox: true },
        [COLUMNS.status]: { select: { name: "New" } },
      },
    },
  });
  return page.url;
}
