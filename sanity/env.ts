// Sanity connection config, read from env. Safe to import anywhere — never
// throws, so the site keeps working (with fallback content) until a project
// is connected.
export const apiVersion =
  process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2024-10-01";

export const dataset =
  process.env.NEXT_PUBLIC_SANITY_DATASET ||
  process.env.SANITY_STUDIO_DATASET ||
  "production";

// projectId is public (not a secret). Hardcoded as a fallback so the hosted
// Studio build (which only inlines SANITY_STUDIO_* vars, not NEXT_PUBLIC_*)
// still gets it. NEXT_PUBLIC_/SANITY_STUDIO_ env vars override it.
export const projectId =
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ||
  process.env.SANITY_STUDIO_PROJECT_ID ||
  "2yv8x2be";

/** True once NEXT_PUBLIC_SANITY_PROJECT_ID is set. */
export const isSanityConfigured = projectId.length > 0;
