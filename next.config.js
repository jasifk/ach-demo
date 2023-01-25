const withTypescript = require("@zeit/next-typescript");
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
};

module.exports = withTypescript(nextConfig);
