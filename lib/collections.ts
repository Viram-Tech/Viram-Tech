// Tiny validator for the JSON collections in /content. Each loader describes
// its fields once; a bad entry throws a readable error that names the file,
// the entry and the field — in `next dev` and, more importantly, at build time,
// so a typo can never ship as a silently broken page.

type FieldRule =
  | "string"
  | "string?"
  | "string[]"
  | { oneOf: readonly string[] }
  | { pattern: RegExp; hint: string; optional?: boolean };

export type Schema = Record<string, FieldRule>;

export function validateCollection<T>(file: string, data: unknown, schema: Schema, key: string): T[] {
  const fail = (where: string, msg: string): never => {
    throw new Error(`[content/${file}] ${where}: ${msg}`);
  };

  if (!Array.isArray(data)) fail("root", "must be a JSON array [ … ]");
  const items = data as Record<string, unknown>[];
  const seen = new Set<string>();

  items.forEach((item, i) => {
    const where = `entry #${i + 1}${typeof item?.[key] === "string" ? ` ("${item[key]}")` : ""}`;
    if (typeof item !== "object" || item === null || Array.isArray(item)) fail(where, "must be an object { … }");

    for (const field of Object.keys(item)) {
      if (!(field in schema)) fail(where, `unknown field "${field}" — allowed: ${Object.keys(schema).join(", ")}`);
    }

    for (const [field, rule] of Object.entries(schema)) {
      const v = item[field];
      if (rule === "string" && (typeof v !== "string" || !v.trim())) fail(where, `"${field}" is required text`);
      if (rule === "string?" && v !== undefined && typeof v !== "string") fail(where, `"${field}" must be text`);
      if (rule === "string[]" && (!Array.isArray(v) || v.length === 0 || v.some((x) => typeof x !== "string")))
        fail(where, `"${field}" must be a non-empty list of text items`);
      if (typeof rule === "object" && "oneOf" in rule && !rule.oneOf.includes(v as string))
        fail(where, `"${field}" must be one of: ${rule.oneOf.join(", ")} (got ${JSON.stringify(v)})`);
      if (typeof rule === "object" && "pattern" in rule) {
        if (v === undefined && rule.optional) continue;
        if (typeof v !== "string" || !rule.pattern.test(v)) fail(where, `"${field}" ${rule.hint} (got ${JSON.stringify(v)})`);
      }
    }

    const id = item[key] as string;
    if (seen.has(id)) fail(where, `duplicate ${key} "${id}" — each entry needs a unique ${key}`);
    seen.add(id);
  });

  return items as T[];
}

export const URL_RULE = { pattern: /^https?:\/\/\S+$/, hint: "must be a full URL starting with https://" };
