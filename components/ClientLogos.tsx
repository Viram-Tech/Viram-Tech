"use client";

import {
  SiGooglecloud,
  SiSnowflake,
  SiDatabricks,
  SiPostgresql,
  SiMongodb,
  SiKubernetes,
  SiDocker,
  SiNvidia,
  SiSap,
  SiSalesforce,
} from "react-icons/si";
import { LogoLoop, type LogoItem } from "./LogoLoop";

/*
  Platforms ViramTech builds on / integrates with. Each mark links to the
  vendor's site (opens in a new tab).

  AWS, Oracle, and Microsoft Azure were removed from the SimpleIcons set
  (react-icons/si) for trademark reasons, so they have no vector icon here.
  To add them, drop an SVG in /public/logos and use an image item:
    { src: "/logos/aws.svg", alt: "AWS", href: "https://aws.amazon.com",
      title: "AWS" }
*/
const platformLogos: LogoItem[] = [
  { node: <SiGooglecloud />, title: "Google Cloud", href: "https://cloud.google.com" },
  { node: <SiSnowflake />, title: "Snowflake", href: "https://www.snowflake.com" },
  { node: <SiDatabricks />, title: "Databricks", href: "https://www.databricks.com" },
  { node: <SiSap />, title: "SAP", href: "https://www.sap.com" },
  { node: <SiSalesforce />, title: "Salesforce", href: "https://www.salesforce.com" },
  { node: <SiPostgresql />, title: "PostgreSQL", href: "https://www.postgresql.org" },
  { node: <SiMongodb />, title: "MongoDB", href: "https://www.mongodb.com" },
  { node: <SiKubernetes />, title: "Kubernetes", href: "https://kubernetes.io" },
  { node: <SiDocker />, title: "Docker", href: "https://www.docker.com" },
  { node: <SiNvidia />, title: "NVIDIA", href: "https://www.nvidia.com" },
];

// Soft fade only at the very ends of the loop — reveals the page behind it,
// so it stays clean on any background in either theme.
const END_FADE =
  "linear-gradient(to right, transparent 0, #000 64px, #000 calc(100% - 64px), transparent 100%)";

export function ClientLogos() {
  return (
    <section className="px-gutter pt-16 pb-10">
      <p className="mb-8 text-center font-metadata-label text-metadata-label uppercase tracking-[0.18em] text-on-surface-variant/70">
        Built on enterprise cloud, data &amp; AI platforms
      </p>
      <div
        className="relative flex items-center h-[60px] w-full text-on-surface-variant/70"
        style={{ WebkitMaskImage: END_FADE, maskImage: END_FADE }}
      >
        <LogoLoop
          logos={platformLogos}
          speed={45}
          direction="left"
          logoHeight={48}
          gap={144}
          hoverSpeed={0}
          scaleOnHover
          ariaLabel="Platforms ViramTech builds on"
        />
      </div>
    </section>
  );
}

export default ClientLogos;
