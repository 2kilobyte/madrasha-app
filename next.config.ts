import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  output: "standalone",
  images: {
    domains: ['firebasestorage.googleapis.com'], // Add Firebase Storage domain
  },
};

export default nextConfig;
