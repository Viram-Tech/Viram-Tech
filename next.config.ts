import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Lets next/image optimise Sanity-hosted blog covers and inline body images.
    remotePatterns: [{ protocol: "https", hostname: "cdn.sanity.io" }],
  },
};

export default nextConfig;
