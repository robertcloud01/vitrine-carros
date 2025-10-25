/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['cdn.sanity.io', 'images.unsplash.com'],
  },
  eslint: {
    // Ignora erros/warnings do ESLint durante o build de produção
    ignoreDuringBuilds: true,
  },
};

module.exports = nextConfig;