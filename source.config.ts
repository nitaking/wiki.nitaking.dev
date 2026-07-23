import { defineDocs, defineConfig } from 'fumadocs-mdx/config';
import lastModified from 'fumadocs-mdx/plugins/last-modified';

// Options: https://fumadocs.vercel.app/docs/mdx/collections#define-docs
export const docs = defineDocs({
  dir: 'content/docs',
  docs: {
    postprocess: {
      includeProcessedMarkdown: true,
    },
  },
});

export default defineConfig({
  mdxOptions: {
    // MDX options
  },
  plugins: [lastModified()],
});
