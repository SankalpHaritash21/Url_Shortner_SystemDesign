import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**", // Wildcard to match any domain
      },
      {
        protocol: "http",
        hostname: "**", // For non-secure connections, if necessary
      },
    ],
  },
  env: {
    PUBLIC_VAR: process.env.NEXT_LIVE_URL,
  },
};

export default nextConfig;
