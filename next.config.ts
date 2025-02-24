import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'standalone',
  experimental: {
    turbo: {
      rules: {
        '*.svg': ['@svgr/webpack'],
      },
    },
  },
  devIndicators: {
    buildActivityPosition: 'bottom-right',
  },
};

export default nextConfig;
