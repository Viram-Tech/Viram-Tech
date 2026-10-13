// Sets up the "Careers Applications" database in Notion, plus a "Pipeline"
// board view grouped by Status, and saves NOTION_CAREERS_DATABASE_ID to
// .env.local.
//
// Runs on its own before `npm run dev` (the predev script, with --auto). It
// does nothing once NOTION_CAREERS_DATABASE_ID is set, and never blocks dev:
//   1. If the integration can already see a "Careers Applications" database,
//      it reuses it (e.g. a teammate cloned the repo with the shared token).
//   2. Otherwise it creates one inside the page shared with the integration
//      that is named "Careers".
// By hand, to choose the parent page explicitly:
//   node scripts/notion-careers-setup.mjs "<page URL or ID>"
//
// Needs NOTION_TOKEN in .env.local, and the page shared with the integration
// (page ••• menu → Connections). Column names must match COLUMNS in
// lib/careers-notion.ts. See integrations/careers-notion/SETUP.md.

import { existsSync, readFileSync, writeFileSync } from "node:fs";

const ENV_FILE = ".env.local";
const DB_TITLE = "Careers Applications";
const PAGE_TITLE = "Careers";

const auto = process.argv.includes("--auto");
const arg = process.argv.slice(2).find((a) => !a.startsWith("--")) ?? "";

if (existsSync(ENV_FILE)) process.loadEnvFile(ENV_FILE);
const token = process.env.NOTION_TOKEN;

/** In --auto mode problems are hints, never failures, so `npm run dev` still starts. */
function stop(message) {
  if (auto) {
    console.warn(`[careers] ${message} Applications won't save until this is fixed — see integrations/careers-notion/SETUP.md.`);
    process.exit(0);
  }
  console.error(message);
  process.exit(1);
}

if (auto && process.env.NOTION_CAREERS_DATABASE_ID) process.exit(0);
if (!token) stop("NOTION_TOKEN is not set in .env.local.");

async function notion(path, { version = "2022-06-28", ...init } = {}) {
  const res = await fetch(`https://api.notion.com/v1${path}`, {
    ...init,
    headers: {
      Authorization: `Bearer ${token}`,
      "Notion-Version": version,
      "Content-Type": "application/json",
    },
  });
  const json = await res.json();
  if (!res.ok) throw Object.assign(new Error(`Notion said ${res.status}: ${json.message}`), { status: res.status });
  return json;
}

const plain = (rich = []) => rich.map((t) => t.plain_text).join("").trim();
const search = (query, value) =>
  notion("/search", {
    method: "POST",
    body: JSON.stringify({ query, filter: { property: "object", value } }),
  }).then((r) => r.results.filter((x) => !x.archived && !x.in_trash));

function saveId(id) {
  const line = `NOTION_CAREERS_DATABASE_ID=${id}`;
  const env = existsSync(ENV_FILE) ? readFileSync(ENV_FILE, "utf8") : "";
  const next = /^NOTION_CAREERS_DATABASE_ID=.*$/m.test(env)
    ? env.replace(/^NOTION_CAREERS_DATABASE_ID=.*$/m, line)
    : `${env}${env && !env.endsWith("\n") ? "\n" : ""}${line}\n`;
  writeFileSync(ENV_FILE, next);
  console.log(`Saved ${line} to ${ENV_FILE}.`);
}

async function addBoard(databaseId) {
  // Views need a newer API version, which addresses the table by data source.
  const version = "2026-03-11";
  const database = await notion(`/databases/${databaseId}`, { version });
  const dataSourceId = database.data_sources[0].id;
  const dataSource = await notion(`/data_sources/${dataSourceId}`, { version });
  const view = await notion("/views", {
    version,
    method: "POST",
    body: JSON.stringify({
      database_id: databaseId,
      data_source_id: dataSourceId,
      name: "Pipeline",
      type: "board",
      configuration: {
        type: "board",
        group_by: {
          type: "select",
          property_id: dataSource.properties.Status.id,
          sort: { type: "manual" },
          hide_empty_groups: false,
        },
      },
    }),
  });
  console.log("Added the Pipeline board (grouped by Status):", view.url);
}

try {
  // Notion page IDs are the 32 hex characters at the end of the page URL.
  let pageId = arg.replace(/-/g, "").match(/[0-9a-f]{32}(?=[^0-9a-f]*$)/i)?.[0];
  if (arg && !pageId) stop("Couldn't find a page ID in that argument.");

  if (!pageId) {
    const existing = (await search(DB_TITLE, "database")).find((d) => plain(d.title) === DB_TITLE);
    if (existing) {
      console.log(`Found the existing ${DB_TITLE} database:`, existing.url);
      saveId(existing.id.replace(/-/g, ""));
      process.exit(0);
    }
    const pages = (await search(PAGE_TITLE, "page")).filter(
      (p) => plain(Object.values(p.properties).find((v) => v.type === "title")?.title) === PAGE_TITLE,
    );
    if (pages.length === 0) {
      stop(`No "${PAGE_TITLE}" page is shared with the Notion integration (page ••• → Connections).`);
    }
    if (pages.length > 1) {
      stop(`Several "${PAGE_TITLE}" pages are shared with the integration; run: node scripts/notion-careers-setup.mjs "<page URL>"`);
    }
    pageId = pages[0].id;
  }

  const body = await notion("/databases", {
    method: "POST",
    body: JSON.stringify({
      parent: { type: "page_id", page_id: pageId },
      title: [{ type: "text", text: { content: DB_TITLE } }],
      properties: {
        Name: { title: {} },
        Role: { select: {} },
        Status: {
          select: {
            options: [
              { name: "New", color: "blue" },
              { name: "Screening", color: "yellow" },
              { name: "Interview", color: "orange" },
              { name: "Offer", color: "green" },
              { name: "Rejected", color: "gray" },
            ],
          },
        },
        Email: { email: {} },
        "LinkedIn / portfolio": { url: {} },
        "Résumé": { files: {} },
        "Why ViramTech?": { rich_text: {} },
        Consent: { checkbox: {} },
        Submitted: { created_time: {} },
      },
    }),
  });
  console.log(`Created the ${DB_TITLE} database:`, body.url);

  try {
    await addBoard(body.id);
  } catch (err) {
    // The database works without it; the board can be added by hand.
    console.warn(`Couldn't add the Pipeline board (${err.message}).`);
    console.warn("Add it in Notion instead: + Add view → Board → Group by Status.");
  }
  saveId(body.id.replace(/-/g, ""));
} catch (err) {
  stop(
    err.status === 404
      ? "Notion can't see that page. Share it with your integration first: open the page → ••• → Connections → add it."
      : err.message,
  );
}
