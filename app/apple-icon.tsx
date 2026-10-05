import { readFileSync } from "node:fs";
import { join } from "node:path";
import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

/**
 * iOS home-screen icon. iOS ignores SVG icons and fills any transparency with
 * black, so the gradient logo is rendered onto an opaque white tile here.
 */
export default function AppleIcon() {
  const svg = readFileSync(join(process.cwd(), "app/icon.svg"));
  const src = `data:image/svg+xml;base64,${svg.toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#ffffff",
        }}
      >
        <img src={src} width={124} height={104} alt="" />
      </div>
    ),
    size,
  );
}
