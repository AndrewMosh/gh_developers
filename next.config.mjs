/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  images: {
    loader: "akamai",
    path: "",
    domains: ["avatars.githubusercontent.com"],
  },
  assetPrefix: "./",
};

export default nextConfig;
