import { defineDocs, defineConfig } from 'fumadocs-mdx/config';
import lastModified from 'fumadocs-mdx/plugins/last-modified';
import { rehypeCodeDefaultOptions } from 'fumadocs-core/mdx-plugins';
// https://github.com/mevdschee/dbml-tools-vscode (MIT)
import dbmlGrammar from './lib/shiki/dbml.tmLanguage.json';

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
    rehypeCodeOptions: {
      ...rehypeCodeDefaultOptions,
      // Shiki does not bundle DBML
      langs: [{ ...dbmlGrammar, name: 'dbml' }],
    },
  },
  plugins: [lastModified()],
});
