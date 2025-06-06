import { source } from '@/lib/source';
import { NextRequest } from 'next/server';
import FlexSearch from 'flexsearch';
import fs from 'fs';
import path from 'path';

const searchIndex = new FlexSearch.Index({
    tokenize: 'full',
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
        
        try {
            let filePath;
            if (page.url === '/') {
                filePath = path.join(process.cwd(), 'content/docs', 'index.mdx');
            } else {
                filePath = path.join(process.cwd(), 'content/docs', `${page.url}.mdx`);
                if (!fs.existsSync(filePath)) {
                    filePath = path.join(process.cwd(), 'content/docs', page.url, 'index.mdx');
                }
            }
            
            if (fs.existsSync(filePath)) {
                const fileContent = fs.readFileSync(filePath, 'utf-8');
                const cleanContent = fileContent
                    .replace(/---[\s\S]*?---/g, '')
                    .replace(/!\[.*?\]\(.*?\)/g, '')
                    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
                    .replace(/<[^>]*>/g, '')
                    .replace(/\n+/g, ' ')
                    .replace(/\s+/g, ' ')
                    .trim();
                textContent += ' ' + cleanContent;
                console.log(`Extracted content from ${filePath}: "${cleanContent.substring(0, 100)}..."`);
            }
        } catch (error) {
            console.warn(`Could not read file for ${page.url}:`, error);
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
