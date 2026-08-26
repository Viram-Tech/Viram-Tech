import { ImageResponse } from "next/og";
import { SITE_NAME } from "@/lib/seo";

export const alt = `${SITE_NAME} — Enterprise AI, built to ship`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/** Default social card, in the brand navy → royal gradient. */
export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "linear-gradient(135deg, #14284e 0%, #2a3e77 55%, #3f56a4 100%)",
          padding: "80px",
          color: "#ffffff",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          <div
            style={{
              width: "18px",
              height: "18px",
              borderRadius: "50%",
              background: "#33a5db",
            }}
          />
          <div style={{ fontSize: "30px", letterSpacing: "0.32em", fontWeight: 600 }}>
            {SITE_NAME.toUpperCase()}
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
          <div style={{ fontSize: "76px", fontWeight: 700, lineHeight: 1.05 }}>
            Enterprise AI, built to ship
          </div>
          <div style={{ fontSize: "32px", color: "#b9cbe8", lineHeight: 1.35 }}>
            Built, deployed and scaled to production — owned end to end.
          </div>
        </div>

        <div style={{ display: "flex", fontSize: "26px", color: "#8fb6dd" }}>
          viramtech.com
        </div>
      </div>
    ),
    size,
  );
}
