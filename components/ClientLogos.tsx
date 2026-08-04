"use client";

import { useEffect, useState } from "react";
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

// Soft fade only at the very ends of the loop. Narrower on mobile so the
// fade doesn't eat the small viewport.
const endFade = (edge: number) =>
  `linear-gradient(to right, transparent 0, #000 ${edge}px, #000 calc(100% - ${edge}px), transparent 100%)`;

// Tighten spacing / size on small screens; roomier on desktop.
function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 640px)");
    const update = () => setIsMobile(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);
  return isMobile;
}

export function ClientLogos() {
  const isMobile = useIsMobile();
  const gap = isMobile ? 72 : 144;
  const logoHeight = isMobile ? 36 : 48;
  // The band carries a mask-image, which clips content to its box. Give it
  // enough vertical room for the 1.2x hover scale so logos aren't clipped
  // at the top/bottom on hover (scaled height = logoHeight * 1.2, plus margin).
  const containerHeight = isMobile ? 54 : 72;
  const fadeEdge = isMobile ? 28 : 64;

  return (
    <section className="px-gutter pt-16 pb-10">
      <p className="mb-8 text-center font-metadata-label text-metadata-label uppercase tracking-[0.18em] text-on-surface-variant/70">
        Built on enterprise cloud, data &amp; AI platforms
      </p>
      <div
        className="relative flex items-center w-full text-on-surface-variant/70"
        style={{
          height: containerHeight,
          WebkitMaskImage: endFade(fadeEdge),
          maskImage: endFade(fadeEdge),
        }}
      >
        <LogoLoop
          logos={platformLogos}
          speed={45}
          direction="left"
          logoHeight={logoHeight}
          gap={gap}
          hoverSpeed={0}
          scaleOnHover
          ariaLabel="Platforms ViramTech builds on"
        />
      </div>
    </section>
  );
}

export default ClientLogos;
