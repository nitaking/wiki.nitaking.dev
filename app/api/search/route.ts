import { source } from '@/lib/source';
import { createFromSource } from 'fumadocs-core/search/server';

import { createTokenizer } from '@orama/tokenizers/japanese'
import { stopwords as japaneseStopwords } from "@orama/stopwords/japanese";

export const { GET } = createFromSource(source, undefined, {
    localeMap: {
        ja: {
            components: {
                tokenizer: createTokenizer({
                    language: 'japanese',
                    stopWords: japaneseStopwords,
                }),
            },
        },
    },
});
