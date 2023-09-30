/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'swivelt.mintsplash.net',
      },
    ],
  },
};

module.exports = nextConfig;
