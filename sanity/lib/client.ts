import { createClient } from "next-sanity";

import { apiVersion, dataset, projectId, isSanityConfigured } from "@/sanity/env";

// Null until a Sanity project is connected; callers fall back to static content.
export const client = isSanityConfigured
  ? createClient({
      projectId,
      dataset,
      apiVersion,
      useCdn: true, // published, cacheable content
    })
  : null;
