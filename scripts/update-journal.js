#!/usr/bin/env node

const fs = require('fs').promises;
const path = require('path');

const RSS_URL = 'https://sizu.me/nitaking/rss';
const JOURNAL_PATH = path.join(__dirname, '../content/docs/journal.mdx');

async function fetchRSS() {
  try {
    const response = await fetch(RSS_URL);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.text();
  } catch (error) {
    console.error('Error fetching RSS:', error);
    throw error;
  }
}

function parseRSSItem(item) {
  const titleMatch = item.match(/<title><!\[CDATA\[(.*?)\]\]><\/title>/);
  const linkMatch = item.match(/<link>(.*?)<\/link>/);
  const pubDateMatch = item.match(/<pubDate>(.*?)<\/pubDate>/);
  const descriptionMatch = item.match(/<description><!\[CDATA\[(.*?)\]\]><\/description>/);

  if (!titleMatch || !linkMatch || !pubDateMatch) {
    return null;
  }

  const pubDate = new Date(pubDateMatch[1]);
  const year = pubDate.getFullYear();
  const month = pubDate.getMonth() + 1;
  const day = pubDate.getDate();

  return {
    title: titleMatch[1],
    link: linkMatch[1],
    pubDate,
    year,
    month,
    day,
    description: descriptionMatch ? descriptionMatch[1].replace(/<[^>]*>/g, '').slice(0, 100) : '',
    dateString: `${year}/${month.toString().padStart(2, '0')}/${day.toString().padStart(2, '0')}`
  };
}

function parseRSS(rssContent) {
  const items = rssContent.match(/<item>[\s\S]*?<\/item>/g) || [];
  
  return items
    .map(parseRSSItem)
    .filter(item => item !== null)
    .sort((a, b) => b.pubDate - a.pubDate);
}

function groupPostsByYear(posts) {
  const grouped = {};
  
  posts.forEach(post => {
    if (!grouped[post.year]) {
      grouped[post.year] = {};
    }
    if (!grouped[post.year][post.month]) {
      grouped[post.year][post.month] = [];
    }
    grouped[post.year][post.month].push(post);
  });
  
  return grouped;
}

function formatJournalContent(groupedPosts) {
  const monthNames = {
    1: '1月', 2: '2月', 3: '3月', 4: '4月', 5: '5月', 6: '6月',
    7: '7月', 8: '8月', 9: '9月', 10: '10月', 11: '11月', 12: '12月'
  };

  let content = `---
title: Journal
description:
---

import { Callout } from 'fumadocs-ui/components/callout';

<Callout>
このページは[しずかなインターネット](https://sizu.me/nitaking)のRSSフィードから最近の投稿を集約しています。
</Callout>

## About

日々の思考、フリーライティング、気づきなどを記録しています。

**RSSフィード**: [https://sizu.me/nitaking/rss](https://sizu.me/nitaking/rss)

## Recent Posts

`;

  const years = Object.keys(groupedPosts).sort((a, b) => b - a);
  
  years.forEach(year => {
    content += `### ${year}年\n\n`;
    
    const months = Object.keys(groupedPosts[year]).sort((a, b) => b - a);
    months.forEach(month => {
      const posts = groupedPosts[year][month];
      posts.forEach(post => {
        content += `**[${post.title}](${post.link})** _(${post.dateString})_\n`;
        if (post.description) {
          content += `${post.description}\n`;
        }
        content += '\n';
      });
    });
  });

  content += `## Archives

過去の投稿は[しずかなインターネット](https://sizu.me/nitaking)で閲覧できます。

import { AIEditedFooter } from '@/components/ai-edited-footer';

<AIEditedFooter />
`;

  return content;
}

async function updateJournal() {
  try {
    console.log('Fetching RSS feed...');
    const rssContent = await fetchRSS();
    
    console.log('Parsing RSS content...');
    const posts = parseRSS(rssContent);
    
    if (posts.length === 0) {
      console.log('No posts found in RSS feed');
      return;
    }
    
    console.log(`Found ${posts.length} posts`);
    
    const groupedPosts = groupPostsByYear(posts);
    const newContent = formatJournalContent(groupedPosts);
    
    console.log('Writing updated journal...');
    await fs.writeFile(JOURNAL_PATH, newContent, 'utf8');
    
    console.log('Journal updated successfully!');
    console.log(`Latest post: ${posts[0].title} (${posts[0].dateString})`);
    
  } catch (error) {
    console.error('Error updating journal:', error);
    process.exit(1);
  }
}

if (require.main === module) {
  updateJournal();
}

module.exports = { updateJournal };