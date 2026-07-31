
import { createMDX } from 'fumadocs-mdx/next';

const withMDX = createMDX();

/** @type {import('next').NextConfig} */
const config = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'raw.githubusercontent.com',
        pathname: '/nitaking/media/main/wiki.nitaking.dev/**',
      },
    ],
  },
  async redirects() {
    return [
      {
        source: '/changelog',
        destination: '/meta/changelog',
        permanent: true,
      },
    ];
  },
};

export default withMDX(config);
