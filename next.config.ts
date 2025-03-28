import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'drive.google.com',
        pathname: '/uc', // Permite qualquer caminho que comece com /uc
      },
    ],
  },
  /* config options here */
};

export default nextConfig;