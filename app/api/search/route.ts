import { source } from '@/lib/source';
import { NextRequest } from 'next/server';
import FlexSearch from 'flexsearch';

const searchIndex = new FlexSearch.Index({
    tokenize: 'forward',
    resolution: 9
});

let indexBuilt = false;
async function buildSearchIndex() {
    if (indexBuilt) return;
    
    const pages = source.getPages();
    console.log(`Building search index for ${pages.length} pages`);
    for (const page of pages) {
        let textContent = '';
        
        textContent += `${page.data.title || ''} `;
        textContent += `${page.data.description || ''} `;
        
        const contentMap: Record<string, string> = {
            '/': 'フロントエンドを主軸としたFull-Stack Engineerです スタートアップでの経験をベースにプロダクト開発に関わっています Photography やガジェットなどが趣味で ナレッジの蓄積や共有に関心があります ツール好きで いろんなことを試して取り入れることをライフワークにしています',
            '/photography': 'Photography 写真 カメラ フォトウォーク 撮影 GR IIIx X-H2 友達 瞬間 楽しみ アウトプット インプット',
            '/photography/gr-iiix': 'GR IIIx photography camera 写真 撮影 カメラ'
        };
        
        if (contentMap[page.url]) {
            textContent += ' ' + contentMap[page.url];
        }
        
        console.log(`Indexing page ${page.url}: "${textContent.substring(0, 200)}..."`);
        searchIndex.add(page.url, textContent.trim());
    }
    indexBuilt = true;
    console.log(`Search index built with ${pages.length} pages`);
}

export async function GET(request: NextRequest) {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get('query');
    
    if (!query) {
        return Response.json([]);
    }
    
    await buildSearchIndex();
    
    try {
        console.log(`Searching for: "${query}"`);
        const results = searchIndex.search(query, { limit: 10 });
        console.log(`Search results:`, results);
        const pages = source.getPages();
        
        const searchResults = results.map((id) => {
            const page = pages.find(p => p.url === id);
            if (!page) return null;
            
            return {
                id: page.url,
                title: page.data.title,
                content: page.data.description || '',
                url: page.url,
                type: 'page'
            };
        }).filter(Boolean);
        
        return Response.json(searchResults);
    } catch (error) {
        console.error('Search error:', error);
        return Response.json([]);
    }
}
