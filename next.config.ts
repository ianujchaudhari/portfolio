/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        hostname: '*',
        port: '',
      },
      
    ],
  },
}

module.exports = nextConfig