import { createFromSource } from 'fumadocs-core/search/server';
import { structure } from 'fumadocs-core/mdx-plugins/remark-structure';
import { source } from '@/lib/source';

export const { GET } = createFromSource(source, {
  async buildIndex(page) {
    return {
      id: page.url,
      title: page.data.title,
      description: page.data.description,
      url: page.url,
      structuredData: structure(await page.data.getText('processed')),
    };
  },
});
