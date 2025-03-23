import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  domains: ['coin-images.coingecko.com'],
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "coin-images.coingecko.com",
        // port: '',
        // pathname: '/coins',
        // search: '',
      },
    ],
  },
};

export default nextConfig;