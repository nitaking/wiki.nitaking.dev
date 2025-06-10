
import { createMDX } from 'fumadocs-mdx/next';

const withMDX = createMDX();

/** @type {import('next').NextConfig} */
const config = {
  reactStrictMode: true,
  remotePatterns: [new URL('https://raw.githubusercontent.com/nitaking/media/main/wiki.nitaking.dev/**')],
};

export default withMDX(config);
