/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverComponentsExternalPackages: ['pdf2json', 'pdf-img-convert'],
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'htb-x-s3.s3.us-east-005.backblazeb2.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
