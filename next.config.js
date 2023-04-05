/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["static.obrazul.com.br"],
  },
  async rewrites() {
    return [
      {
        source: "/product/:ean",
        destination: "/product/[ean]",
      },
    ];
  },
};

module.exports = nextConfig;
