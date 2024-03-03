/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverComponentsExternalPackages: ['pdf2json', 'pdf-img-convert'],
  }
};

export default nextConfig;
