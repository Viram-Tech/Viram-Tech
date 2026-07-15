import { HeroParallax, type Project } from "@/components/HeroParallax";

export const metadata = {
  title: "Our Work — ViramTech",
  description:
    "Selected ViramTech projects — production AI and websites we have shipped.",
};

// ──────────────────────────────────────────────────────────────────────────
// Projects shown in the Our Work parallax.
//   link    → the live URL (opens in a new tab)
//   image   → optional screenshot. Drop a file in /public/work/ and set e.g.
//             image: "/work/aircalibre.png". If omitted, a branded card shows.
//   subtitle→ short tag shown on hover
// ──────────────────────────────────────────────────────────────────────────
const projects: Project[] = [
  {
    title: "AirCalibre",
    subtitle: "Web platform",
    link: "https://aircalibre.com",
    image: "/work/aircalibre.png",
    gradient: "from-[#33A5DB] to-[#14284E]",
  },
  {
    title: "Cabin Zindagi",
    subtitle: "Web platform",
    link: "https://cabinzindagi.com",
    image: "/work/cabin-zindagi.png",
    gradient: "from-[#597CBD] to-[#2A3E77]",
  },
  {
    title: "Air Matters",
    subtitle: "Web platform",
    link: "https://yairmatters.com",
    image: "/work/yairmatters.png",
    gradient: "from-[#3F56A4] to-[#14284E]",
  },
];

export default function Work() {
  return <HeroParallax projects={projects} />;
}
