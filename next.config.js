/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'raw.githubusercontent.com',
      },
      {
        protocol: 'https',
        hostname: 'ui.aceternity.com',
      },
      {
        protocol: 'https',
        hostname: 'magicui.design',
      },
      {
        protocol: 'https',
        hostname: 'gluestack.io',
      },
    ],
  },
}

module.exports = nextConfig 