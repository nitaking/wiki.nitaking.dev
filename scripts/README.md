# Journal Update Scripts

This directory contains automation scripts for updating the journal from RSS feeds.

## Files

### `update-journal.ts`

TypeScript script that fetches RSS feed from [しずかなインターネット](https://sizu.me/nitaking/rss) and updates `content/docs/journal.mdx` with new posts.

**Features:**
- Fetches RSS feed and parses posts
- Organizes posts by year and month in reverse chronological order
- Avoids duplicate posts by checking existing URLs
- Preserves existing journal.mdx structure and formatting
- Includes error handling and detailed logging

**Usage:**
```bash
# Install dependencies first
bun install

# Run the script manually
bun run update-journal

# Or run directly
bun run scripts/update-journal.ts
```

**Dependencies:**
- `rss-parser`: For RSS feed parsing
- `@types/rss-parser`: TypeScript types

## Automation Setup

For automated execution, create a GitHub Actions workflow file:

**`.github/workflows/update-journal.yml`:**
```yaml
name: Update Journal

on:
  schedule:
    # Run weekly on Sundays at 9:00 AM JST (00:00 UTC)
    - cron: '0 0 * * 0'
    # Alternative: Biweekly (every 2 weeks)
    # - cron: '0 0 1,15 * *'
  workflow_dispatch:
    # Allow manual triggering

jobs:
  update-journal:
    runs-on: ubuntu-latest
    permissions:
      contents: write
    
    steps:
      - name: Checkout repository
        uses: actions/checkout@v4
        with:
          fetch-depth: 1
          token: ${{ secrets.GITHUB_TOKEN }}

      - name: Setup Bun
        uses: oven-sh/setup-bun@v1
        with:
          bun-version: latest

      - name: Install dependencies
        run: bun install

      - name: Update journal
        run: bun run update-journal

      - name: Check for changes
        id: verify-changed-files
        run: |
          if [ -n "$(git status --porcelain)" ]; then
            echo "changed=true" >> $GITHUB_OUTPUT
            echo "Changes detected in journal.mdx"
          else
            echo "changed=false" >> $GITHUB_OUTPUT
            echo "No changes detected"
          fi

      - name: Commit changes
        if: steps.verify-changed-files.outputs.changed == 'true'
        run: |
          git config --local user.email "action@github.com"
          git config --local user.name "GitHub Action"
          git add content/docs/journal.mdx
          git commit -m "chore: update journal from RSS feed

          🤖 Automated journal update from しずかなインターネット RSS feed
          
          Generated with [Claude Code](https://claude.ai/code)"

      - name: Push changes
        if: steps.verify-changed-files.outputs.changed == 'true'
        run: git push
```

### Schedule Options

**Weekly (Recommended):**
```yaml
- cron: '0 0 * * 0'  # Every Sunday at 9:00 AM JST
```

**Biweekly:**
```yaml
- cron: '0 0 1,15 * *'  # 1st and 15th of each month
```

**Other Weekly Options:**
```yaml
- cron: '0 0 * * 1'  # Every Monday
- cron: '0 0 * * 6'  # Every Saturday
```

## Notes

- The script preserves all existing journal.mdx formatting and structure
- Only posts with valid URLs are processed
- Duplicate detection prevents the same post from being added multiple times
- Posts are organized in reverse chronological order (newest first)
- Error handling ensures the script fails gracefully if RSS feed is unavailable