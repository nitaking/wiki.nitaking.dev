import { execSync } from 'child_process';
import {
  DocsPage,
  DocsBody,
  DocsDescription,
  DocsTitle,
} from 'fumadocs-ui/page';

interface Commit {
  hash: string;
  date: string;
  message: string;
  type?: string;
  scope?: string;
  subject?: string;
  pages?: string[];
}

function getGitCommits(): Commit[] {
  try {
    const log = execSync(
      'git log --pretty=format:"%H|%aI|%s" --name-only -n 50',
      { encoding: 'utf-8' }
    );

    const commits: Commit[] = [];
    const lines = log.split('\n');
    let i = 0;

    while (i < lines.length) {
      const line = lines[i];
      if (!line) {
        i++;
        continue;
      }

      const [hash, date, message] = line.split('|');

      // Collect file paths until next commit or end
      const files: string[] = [];
      i++;
      while (i < lines.length && lines[i] && !lines[i].includes('|')) {
        files.push(lines[i]);
        i++;
      }

      // Extract pages from content/docs/*.mdx
      const pages = files
        .filter(f => f.startsWith('content/docs/') && f.endsWith('.mdx'))
        .map(f => {
          const path = f.replace('content/docs/', '').replace('.mdx', '');
          return path === 'index' ? 'top' : path;
        });

      // Parse conventional commit format
      const conventionalRegex = /^(\w+)(?:\(([^)]+)\))?:\s*(.+)$/;
      const match = message.match(conventionalRegex);

      if (match) {
        commits.push({
          hash: hash.substring(0, 7),
          date,
          message,
          type: match[1],
          scope: match[2],
          subject: match[3],
          pages: pages.length > 0 ? pages : undefined,
        });
      } else {
        commits.push({
          hash: hash.substring(0, 7),
          date,
          message,
          subject: message,
          pages: pages.length > 0 ? pages : undefined,
        });
      }
    }

    return commits;
  } catch {
    return [];
  }
}

function getTypeEmoji(type?: string): string {
  const emojiMap: Record<string, string> = {
    feat: '✨',
    fix: '🐛',
    docs: '📝',
    style: '💄',
    refactor: '♻️',
    perf: '⚡',
    test: '✅',
    chore: '🔧',
    ci: '👷',
    build: '📦',
  };
  return type ? emojiMap[type] || '📌' : '📌';
}

function formatDate(isoDate: string): string {
  return new Date(isoDate).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}

export default function ChangelogPage() {
  const commits = getGitCommits();

  // Group by date
  const grouped = commits.reduce((acc, commit) => {
    const date = formatDate(commit.date);
    if (!acc[date]) acc[date] = [];
    acc[date].push(commit);
    return acc;
  }, {} as Record<string, Commit[]>);

  return (
    <DocsPage>
      <DocsTitle>Changelogs</DocsTitle>
      <DocsDescription>
        Recent changes to this site (auto-generated from Git history)
      </DocsDescription>
      <DocsBody>
        <div className="space-y-8">
          {Object.entries(grouped).map(([date, commits]) => (
            <div key={date}>
              <h2 className="text-xl font-semibold mb-4 border-b pb-2">
                {date}
              </h2>
              <ul className="space-y-2 list-none pl-0">
                {commits.map((commit) => (
                  <li key={commit.hash} className="flex gap-3 items-start">
                    <span className="text-xl mt-0.5">
                      {getTypeEmoji(commit.type)}
                    </span>
                    <div className="flex-1">
                      <div className="flex items-baseline gap-2 flex-wrap">
                        {commit.scope && (
                          <span className="text-xs bg-muted px-2 py-0.5 rounded font-mono">
                            {commit.scope}
                          </span>
                        )}
                        <span className="text-sm text-muted-foreground font-mono">
                          {commit.hash}
                        </span>
                        {commit.pages && commit.pages.length > 0 && (
                          <span className="flex gap-1">
                            {commit.pages.map((page) => {
                              // index.mdxの場合、scopeがあればそのセクションへアンカーリンク
                              const isTop = page === 'top';
                              const anchor = isTop && commit.scope ? `#-${commit.scope}` : '';
                              const href = isTop ? `/${anchor}` : `/${page}`;
                              const label = isTop && commit.scope ? commit.scope : page;

                              return (
                                <a
                                  key={page}
                                  href={href}
                                  className="text-xs px-2 py-0.5 rounded bg-blue-500/10 text-blue-600 dark:text-blue-400 hover:bg-blue-500/20 no-underline"
                                >
                                  {label}
                                </a>
                              );
                            })}
                          </span>
                        )}
                      </div>
                      <p className="mt-1 mb-0">{commit.subject}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </DocsBody>
    </DocsPage>
  );
}

export function generateMetadata() {
  return {
    title: 'Changelogs',
    description: 'Recent changes to this site (auto-generated from Git history)',
  };
}
