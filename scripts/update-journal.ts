#!/usr/bin/env bun
/**
 * Journal Update Script
 *
 * Fetches RSS feed from しずかなインターネット and updates journal.mdx
 * with new posts organized by year and month.
 */

import RSSParser from 'rss-parser';
import { readFileSync, writeFileSync } from 'fs';
import { join } from 'path';

const RSS_URL = 'https://sizu.me/nitaking/rss';
const JOURNAL_PATH = join(process.cwd(), 'content/docs/journal.mdx');

interface JournalPost {
  title: string;
  url: string;
  date: Date;
  description?: string;
}

interface PostsByMonth {
  [year: string]: {
    [month: string]: JournalPost[];
  };
}

const parser = new RSSParser();

function formatDate(date: Date): string {
  return `${date.getFullYear()}/${String(date.getMonth() + 1).padStart(2, '0')}/${String(date.getDate()).padStart(2, '0')}`;
}

function getMonthName(monthNum: number): string {
  return `${monthNum}月`;
}

function getYearName(year: number): string {
  return `${year}年`;
}

async function fetchRSSFeed(): Promise<JournalPost[]> {
  console.log('Fetching RSS feed from:', RSS_URL);

  try {
    const feed = await parser.parseURL(RSS_URL);
    console.log(`Found ${feed.items.length} items in RSS feed`);

    return feed.items.map(item => ({
      title: item.title || 'Untitled',
      url: item.link || '',
      date: new Date(item.pubDate || item.isoDate || new Date()),
      description: item.contentSnippet || item.content || undefined
    })).filter(post => post.url); // Only include posts with valid URLs

  } catch (error) {
    console.error('Error fetching RSS feed:', error);
    throw error;
  }
}

function parseExistingJournal(): { content: string; existingPosts: Set<string> } {
  console.log('Reading existing journal.mdx...');

  try {
    const content = readFileSync(JOURNAL_PATH, 'utf-8');

    // Extract existing post URLs to avoid duplicates
    const urlPattern = /\*\*\[.*?\]\((https:\/\/sizu\.me\/nitaking\/posts\/[^)]+)\)\*\*/g;
    const existingPosts = new Set<string>();
    let match;

    while ((match = urlPattern.exec(content)) !== null) {
      existingPosts.add(match[1]);
    }

    console.log(`Found ${existingPosts.size} existing posts in journal`);
    return { content, existingPosts };

  } catch (error) {
    console.error('Error reading journal.mdx:', error);
    throw error;
  }
}

function organizePostsByMonth(posts: JournalPost[]): PostsByMonth {
  const organized: PostsByMonth = {};

  posts.forEach(post => {
    const year = post.date.getFullYear().toString();
    const month = (post.date.getMonth() + 1).toString();

    if (!organized[year]) {
      organized[year] = {};
    }
    if (!organized[year][month]) {
      organized[year][month] = [];
    }

    organized[year][month].push(post);
  });

  // Sort posts within each month by date (newest first)
  Object.keys(organized).forEach(year => {
    Object.keys(organized[year]).forEach(month => {
      organized[year][month].sort((a, b) => b.date.getTime() - a.date.getTime());
    });
  });

  return organized;
}

function generatePostsSection(postsByMonth: PostsByMonth): string {
  const years = Object.keys(postsByMonth).sort((a, b) => parseInt(b) - parseInt(a));
  let content = '';

  years.forEach(year => {
    content += `\n### ${getYearName(parseInt(year))}\n\n`;

    const months = Object.keys(postsByMonth[year]).sort((a, b) => parseInt(b) - parseInt(a));
    months.forEach(month => {
      const posts = postsByMonth[year][month];

      posts.forEach(post => {
        const formattedDate = formatDate(post.date);
        content += `**[${post.title}](${post.url})** _(${formattedDate})_\n`;

        content += '\n';
      });
    });
  });

  return content;
}

function updateJournalContent(originalContent: string, newPostsSection: string): string {
  // Find the start and end of the Recent Posts section
  const startMarker = '## Recent Posts';
  const endMarker = '## Archives';

  const startIndex = originalContent.indexOf(startMarker);
  const endIndex = originalContent.indexOf(endMarker);

  if (startIndex === -1 || endIndex === -1) {
    throw new Error('Could not find Recent Posts section markers in journal.mdx');
  }

  const beforePosts = originalContent.substring(0, startIndex + startMarker.length);
  const afterPosts = originalContent.substring(endIndex);

  return beforePosts + newPostsSection + afterPosts;
}

async function main() {
  try {
    console.log('Starting journal update process...');

    // Fetch RSS feed
    const rssPosts = await fetchRSSFeed();

    // Read existing journal
    const { content: originalContent, existingPosts } = parseExistingJournal();

    // Filter out existing posts
    const newPosts = rssPosts.filter(post => !existingPosts.has(post.url));
    console.log(`Found ${newPosts.length} new posts to add`);

    // Combine all posts (existing URLs are already in the content, so we work with all RSS posts)
    const allPosts = rssPosts;

    // Organize posts by month
    const postsByMonth = organizePostsByMonth(allPosts);

    // Generate new posts section
    const newPostsSection = generatePostsSection(postsByMonth);

    // Update journal content
    const updatedContent = updateJournalContent(originalContent, newPostsSection);

    // Write back to file
    writeFileSync(JOURNAL_PATH, updatedContent, 'utf-8');

    console.log('Journal updated successfully!');

    if (newPosts.length > 0) {
      console.log('\nNew posts added:');
      newPosts.forEach(post => {
        console.log(`- ${post.title} (${formatDate(post.date)})`);
      });
    } else {
      console.log('No new posts to add.');
    }

  } catch (error) {
    console.error('Failed to update journal:', error);
    process.exit(1);
  }
}

// Run the script
main();
