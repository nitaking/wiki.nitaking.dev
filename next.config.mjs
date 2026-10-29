
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
      {
        source: '/tech-no-react-fc',
        destination: '/philosophy-how-i-write-typescript#no-reactfc',
        permanent: true,
      },
      {
        source: '/philosophy-barrel-files',
        destination: '/philosophy-how-i-write-typescript#barrel-filesの問題点',
        permanent: true,
      },
    ];
  },
};

export default withMDX(config);
