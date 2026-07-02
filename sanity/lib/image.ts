import imageUrlBuilder from "@sanity/image-url";

import { dataset, projectId, isSanityConfigured } from "@/sanity/env";

const builder = isSanityConfigured
  ? imageUrlBuilder({ projectId, dataset })
  : null;

/** Build a CDN URL for a Sanity image, or null if unavailable. */
export function urlForImage(
  source: { asset?: { _ref?: string } } | undefined | null,
): string | null {
  if (!builder || !source?.asset?._ref) return null;
  return builder.image(source).width(1200).height(675).fit("crop").auto("format").url();
}
