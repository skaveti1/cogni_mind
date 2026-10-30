import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  turbopack: {
    root: process.cwd(),
  },
  async headers() {
    const immutable = [
      { key: "Cache-Control", value: "public, max-age=31536000, immutable" },
    ];

    return [
      { source: "/videos/:path*", headers: immutable },
      { source: "/posters/:path*", headers: immutable },
    ];
  },
};

export default nextConfig;
