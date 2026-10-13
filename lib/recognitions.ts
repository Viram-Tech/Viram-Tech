// "Featured & recognized on" footer badges come from content/recognitions.json —
// see content/README.md. Client-safe (no filesystem access).
import data from "@/content/recognitions.json";
import { validateCollection, URL_RULE } from "@/lib/collections";

export type Recognition = {
  name: string;
  href: string;
  /** Small caps line above the name, e.g. "Featured on" / "Published on". */
  kicker: string;
  /** Optional official badge art (SVG/PNG URL from the platform's embed code). */
  image?: string;
  /** Badge art's natural size, used to reserve space. Defaults to 200×54. */
  width?: string;
  height?: string;
};

export const recognitions = validateCollection<Recognition>(
  "recognitions.json",
  data,
  {
    name: "string",
    href: URL_RULE,
    kicker: "string",
    image: { ...URL_RULE, optional: true },
    width: { pattern: /^\d+$/, hint: "must be a number of pixels as text, e.g. \"250\"", optional: true },
    height: { pattern: /^\d+$/, hint: "must be a number of pixels as text, e.g. \"54\"", optional: true },
  },
  "name",
);
