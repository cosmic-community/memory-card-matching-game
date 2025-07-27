/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['images.unsplash.com', 'cdn.cosmicjs.com'],
  },
  experimental: {
    typedRoutes: false,
  },
}

module.exports = nextConfig