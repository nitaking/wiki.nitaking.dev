import type { source } from '@/lib/source';

type Page = ReturnType<typeof source.getPages>[number];

export async function getLLMText(page: Page) {
  if (!('getText' in page.data)) return '';

  let processed: string;
  try {
    processed = await page.data.getText('processed');
  } catch {
    return '';
  }

  return `# ${page.data.title}
URL: ${page.url}

${page.data.description ?? ''}

${processed}`;
}
