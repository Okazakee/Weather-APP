/** @type {import('next').NextConfig} */
const nextConfig = {};

(module.exports = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "images.pexels.com",
      },
      {
        protocol: "https",
        hostname: "www.startpage.com",
      },
      {
        protocol: "https",
        hostname: "cdn.weatherapi.com",
      },
    ],
  },
}),
  nextConfig;
