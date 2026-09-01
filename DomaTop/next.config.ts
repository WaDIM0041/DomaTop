import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  // Required for GitHub Pages base path
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
