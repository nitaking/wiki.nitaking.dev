/**
 * Journal Update Script
 * Fetches RSS feed from しずかなインターネット and updates journal.mdx
 */

const fs = require('fs');
const path = require('path');

const RSS_URL = 'https://sizu.me/nitaking/rss';
const JOURNAL_PATH = path.join(__dirname, '../content/docs/journal.mdx');

/**
 * Fetch and parse RSS feed
 */
async function fetchRSS() {
  try {
    console.log('Fetching RSS feed...');
    const response = await fetch(RSS_URL);
    
    if (!response.ok) {
      throw new Error(`RSS fetch failed: ${response.status} ${response.statusText}`);
    }
    
    const rssText = await response.text();
    return parseRSS(rssText);
  } catch (error) {
    console.error('Failed to fetch RSS:', error.message);
    throw error;
  }
}

/**
 * Parse RSS XML to extract posts
 */
function parseRSS(rssText) {
  const posts = [];
  
  // Simple regex-based XML parsing for RSS items
  const itemRegex = /<item>(.*?)<\/item>/gs;
  const titleRegex = /<title><!\[CDATA\[(.*?)\]\]><\/title>/s;
  const linkRegex = /<link>(.*?)<\/link>/s;
  const pubDateRegex = /<pubDate>(.*?)<\/pubDate>/s;
  const descriptionRegex = /<description><!\[CDATA\[(.*?)\]\]><\/description>/s;
  
  let match;
  while ((match = itemRegex.exec(rssText)) !== null) {
    const itemContent = match[1];
    
    const titleMatch = titleRegex.exec(itemContent);
    const linkMatch = linkRegex.exec(itemContent);
    const pubDateMatch = pubDateRegex.exec(itemContent);
    const descriptionMatch = descriptionRegex.exec(itemContent);
    
    if (titleMatch && linkMatch && pubDateMatch) {
      const title = titleMatch[1].trim();
      const link = linkMatch[1].trim();
      const pubDate = new Date(pubDateMatch[1].trim());
      const description = descriptionMatch ? descriptionMatch[1].trim() : '';
      
      posts.push({
        title,
        link,
        pubDate,
        description: description.substring(0, 200) // Limit description length
      });
    }
  }
  
  console.log(`Parsed ${posts.length} posts from RSS feed`);
  return posts.sort((a, b) => b.pubDate - a.pubDate); // Sort newest first
}

/**
 * Read current journal.mdx content
 */
function readJournalFile() {
  try {
    return fs.readFileSync(JOURNAL_PATH, 'utf8');
  } catch (error) {
    console.error('Failed to read journal.mdx:', error.message);
    throw error;
  }
}

/**
 * Extract existing posts from journal content
 */
function extractExistingPosts(content) {
  const existingLinks = new Set();
  const linkRegex = /\*\*\[.*?\]\((https:\/\/sizu\.me\/nitaking\/posts\/[^)]+)\)\*\*/g;
  
  let match;
  while ((match = linkRegex.exec(content)) !== null) {
    existingLinks.add(match[1]);
  }
  
  return existingLinks;
}

/**
 * Format date for display (YYYY/MM/DD)
 */
function formatDate(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}/${month}/${day}`;
}

/**
 * Generate markdown for a post
 */
function generatePostMarkdown(post) {
  const dateStr = formatDate(post.pubDate);
  const description = post.description ? `\n${post.description}` : '';
  return `**[${post.title}](${post.link})** _(${dateStr})_${description}`;
}

/**
 * Update journal.mdx with new posts
 */
function updateJournal(posts) {
  const content = readJournalFile();
  const existingLinks = extractExistingPosts(content);
  
  // Filter out posts that already exist
  const newPosts = posts.filter(post => !existingLinks.has(post.link));
  
  if (newPosts.length === 0) {
    console.log('No new posts to add');
    return false;
  }
  
  console.log(`Adding ${newPosts.length} new posts`);
  
  // Group posts by year and month
  const postsByYearMonth = {};
  newPosts.forEach(post => {
    const year = post.pubDate.getFullYear();
    const month = post.pubDate.getMonth() + 1;
    const key = `${year}-${month.toString().padStart(2, '0')}`;
    
    if (!postsByYearMonth[key]) {
      postsByYearMonth[key] = [];
    }
    postsByYearMonth[key].push(post);
  });
  
  // Find the "## Recent Posts" section and add new posts
  let updatedContent = content;
  
  // Process each year-month group
  Object.keys(postsByYearMonth)
    .sort()
    .reverse()
    .forEach(yearMonth => {
      const [year, month] = yearMonth.split('-');
      const monthNames = [
        '1月', '2月', '3月', '4月', '5月', '6月',
        '7月', '8月', '9月', '10月', '11月', '12月'
      ];
      const monthName = monthNames[parseInt(month) - 1];
      const sectionHeader = `### ${year}年${monthName}`;
      
      // Generate posts markdown for this month
      const postsMarkdown = postsByYearMonth[yearMonth]
        .sort((a, b) => b.pubDate - a.pubDate)
        .map(post => generatePostMarkdown(post))
        .join('\n\n');
      
      // Check if section already exists
      const sectionRegex = new RegExp(`^### ${year}年${monthName}\\s*$`, 'm');
      const sectionMatch = updatedContent.match(sectionRegex);
      
      if (sectionMatch) {
        // Section exists, add posts at the beginning of the section
        const sectionIndex = updatedContent.indexOf(sectionMatch[0]);
        const nextSectionRegex = /^### \d{4}年\d{1,2}月/m;
        const afterSection = updatedContent.substring(sectionIndex + sectionMatch[0].length);
        const nextSectionMatch = afterSection.match(nextSectionRegex);
        
        if (nextSectionMatch) {
          const nextSectionIndex = sectionIndex + sectionMatch[0].length + afterSection.indexOf(nextSectionMatch[0]);
          const beforeNext = updatedContent.substring(0, nextSectionIndex);
          const afterNext = updatedContent.substring(nextSectionIndex);
          updatedContent = beforeNext + '\n\n' + postsMarkdown + '\n' + afterNext;
        } else {
          // This is the last section, add at the end
          const archivesIndex = updatedContent.indexOf('## Archives');
          if (archivesIndex !== -1) {
            const beforeArchives = updatedContent.substring(0, archivesIndex);
            const afterArchives = updatedContent.substring(archivesIndex);
            updatedContent = beforeArchives + '\n' + postsMarkdown + '\n\n' + afterArchives;
          }
        }
      } else {
        // Section doesn't exist, create it
        const recentPostsIndex = updatedContent.indexOf('## Recent Posts');
        if (recentPostsIndex !== -1) {
          const afterRecentPosts = updatedContent.indexOf('\n', recentPostsIndex);
          const before = updatedContent.substring(0, afterRecentPosts);
          const after = updatedContent.substring(afterRecentPosts);
          
          const newSection = `\n\n${sectionHeader}\n\n${postsMarkdown}`;
          updatedContent = before + newSection + after;
        }
      }
    });
  
  // Write updated content
  try {
    fs.writeFileSync(JOURNAL_PATH, updatedContent, 'utf8');
    console.log('Successfully updated journal.mdx');
    return true;
  } catch (error) {
    console.error('Failed to write journal.mdx:', error.message);
    throw error;
  }
}

/**
 * Main execution function
 */
async function main() {
  try {
    console.log('Starting journal update...');
    
    const posts = await fetchRSS();
    const updated = updateJournal(posts);
    
    if (updated) {
      console.log('Journal update completed successfully');
    } else {
      console.log('Journal update completed - no changes needed');
    }
  } catch (error) {
    console.error('Journal update failed:', error.message);
    process.exit(1);
  }
}

// Run the script
if (require.main === module) {
  main();
}

module.exports = { main };