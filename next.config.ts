import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
   images: {
    domains: ["orzino.com"],
     remotePatterns: [
      {
        protocol: 'https',
        hostname: 'themoonstore.in',
      },
      {
        protocol: 'https',
        hostname: 'orzino.com',
      },
    ],
  },
};

export default nextConfig;
