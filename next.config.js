/** @type {import('next').NextConfig} */
const nextConfig = {
  basePath: "/gh_developers",
  reactStrictMode: true,
  images: {
    domains: ["avatars.githubusercontent.com"],
  },
};

module.exports = nextConfig;
