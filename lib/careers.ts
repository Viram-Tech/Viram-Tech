// Open roles for /careers come from content/careers.json — see content/README.md.
// The page groups roles by team, with all internships in their own group.
import data from "@/content/careers.json";
import { validateCollection } from "@/lib/collections";

const ROLE_TYPES = ["Full-time", "Part-time", "Internship", "Contract"] as const;

export type Role = {
  slug: string;
  title: string;
  team: string;
  location: string;
  type: (typeof ROLE_TYPES)[number];
  summary: string;
  responsibilities: string[];
  requirements: string[];
};

export const roles = validateCollection<Role>(
  "careers.json",
  data,
  {
    slug: { pattern: /^[a-z0-9]+(-[a-z0-9]+)*$/, hint: 'must be lowercase-with-dashes, e.g. "ai-engineer" (it becomes the URL)' },
    title: "string",
    team: "string",
    location: "string",
    type: { oneOf: ROLE_TYPES },
    summary: "string",
    responsibilities: "string[]",
    requirements: "string[]",
  },
  "slug",
);

/** Role groups for /careers, in order: each team's full roles, then internships. */
export const roleGroups: { name: string; roles: Role[] }[] = [
  ...Array.from(new Set(roles.filter((r) => r.type !== "Internship").map((r) => r.team))).map(
    (team) => ({
      name: team,
      roles: roles.filter((r) => r.team === team && r.type !== "Internship"),
    }),
  ),
  { name: "Internships", roles: roles.filter((r) => r.type === "Internship") },
].filter((g) => g.roles.length > 0);
