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
  body?: string;
  pages?: string[];
}

function getGitCommits(): Commit[] {
  try {
    const log = execSync(
      'git log --pretty=format:"%H|%aI|%s|%b" --name-only -n 50',
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

      const parts = line.split('|');
      if (parts.length < 3) {
        i++;
        continue;
      }

      const hash = parts[0];
      const date = parts[1];
      const message = parts[2];
      const body = parts.slice(3).join('|').trim(); // 本文に | が含まれる可能性を考慮

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
          body: body || undefined,
          pages: pages.length > 0 ? pages : undefined,
        });
      } else {
        commits.push({
          hash: hash.substring(0, 7),
          date,
          message,
          subject: message,
          body: body || undefined,
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

function inferSectionFromMessage(message: string): string | null {
  const keywords = {
    'development--tools': ['terraform', 'markdown', 'dev', 'tool', 'npm', 'react', 'css', 'frontend', 'ui', 'javascript', 'typescript', 'node'],
    'ai--machine-learning': ['ai', 'machine learning', 'prompt', 'llm', 'openai', 'claude', 'chatgpt'],
    'photography': ['photo', 'camera', 'image', 'culling', 'fujifilm', 'gr', 'x-h2'],
    'philosophy--design': ['design', 'ideology', 'ddd', 'philosophy', 'decision', 'strategy'],
    'knowledge-management': ['note', 'knowledge', 'pkm', 'anytype', 'capacities', 'heptabase'],
    'life--interests': ['coffee', 'life', 'water', 'loading'],
    'creating': ['video', 'voicevox', 'aquastalk', 'davinci', 'fcp'],
    'workflow--productivity': ['workflow', 'productivity', 'tool', 'tournament', 'podcast']
  };

  const lowerMessage = message.toLowerCase();

  for (const [section, words] of Object.entries(keywords)) {
    if (words.some(word => lowerMessage.includes(word))) {
      return section;
    }
  }

  return null; // マッチしない場合はリンク非表示
}

function parseLinksInText(text: string): React.ReactNode[] {
  const urlRegex = /(https?:\/\/[^\s)]+)/g;
  const parts: React.ReactNode[] = [];
  let lastIndex = 0;
  let match;

  while ((match = urlRegex.exec(text)) !== null) {
    // テキスト部分を追加
    if (match.index > lastIndex) {
      parts.push(text.substring(lastIndex, match.index));
    }
    // リンク部分を追加
    parts.push(
      <a
        key={match.index}
        href={match[0]}
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-600 dark:text-blue-400 hover:underline"
      >
        {match[0]}
      </a>
    );
    lastIndex = match.index + match[0].length;
  }

  // 残りのテキストを追加
  if (lastIndex < text.length) {
    parts.push(text.substring(lastIndex));
  }

  return parts.length > 0 ? parts : [text];
}

export default function ChangelogPage() {
  const commits = getGitCommits();

  // Group by date
  const grouped = commits.reduce((acc, commit) => {
    const date = formatDate(commit.date);
    if (!acc[date]) acc[date] = { commits: [], isoDate: commit.date };
    acc[date].commits.push(commit);
    return acc;
  }, {} as Record<string, { commits: Commit[], isoDate: string }>);

  return (
    <DocsPage>
      <DocsTitle>Changelogs</DocsTitle>
      <DocsDescription>
        Recent changes to this site (auto-generated from Git history)
      </DocsDescription>
      <DocsBody>
        <div className="space-y-8">
          {Object.entries(grouped)
            .sort(([, a], [, b]) => new Date(b.isoDate).getTime() - new Date(a.isoDate).getTime())
            .map(([date, { commits }]) => (
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
                          <span className="flex gap-1 flex-wrap">
                            {commit.pages.slice(0, 3).map((page) => {
                              // index.mdxの場合、scopeがあればそのセクションへアンカーリンク
                              const isTop = page === 'top';

                              let anchor = '';
                              let label = page;

                              if (isTop && commit.scope) {
                                // セクション名からラベルを生成するマッピング
                                const sectionLabels: Record<string, string> = {
                                  'development--tools': 'Development & Tools',
                                  'ai--machine-learning': 'AI & Machine Learning',
                                  'photography': 'Photography',
                                  'philosophy--design': 'Philosophy & Design',
                                  'knowledge-management': 'Knowledge Management',
                                  'life--interests': 'Life & Interests',
                                  'creating': 'Creating',
                                  'workflow--productivity': 'Workflow & Productivity',
                                  'documentation--diagrams': 'Documentation & Diagrams'
                                };

                                let inferredSection: string | null = null;

                                // contentスコープの場合はメッセージから推測
                                if (commit.scope === 'content') {
                                  inferredSection = inferSectionFromMessage(commit.message);
                                } else {
                                  // それ以外のスコープの場合、sectionLabelsに存在するか確認
                                  if (commit.scope in sectionLabels) {
                                    inferredSection = commit.scope;
                                  }
                                }

                                if (inferredSection) {
                                  anchor = `#${inferredSection}`;
                                  label = sectionLabels[inferredSection] || 'Content';
                                } else {
                                  // ヒットしない場合はリンクを表示しない
                                  return null;
                                }
                              }

                              const href = isTop ? `/${anchor}` : `/${page}`;

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
                            {commit.pages.length > 3 && (
                              <span className="text-xs px-2 py-0.5 rounded bg-muted text-muted-foreground">
                                +{commit.pages.length - 3} more
                              </span>
                            )}
                          </span>
                        )}
                      </div>
                      <p className="mt-1 mb-0">{parseLinksInText(commit.subject || '')}</p>
                      {commit.body && (
                        <p className="mt-2 mb-0 text-sm text-muted-foreground whitespace-pre-line">
                          {parseLinksInText(
                            commit.body
                              .split('\n')
                              .filter(line => !line.startsWith('Co-Authored-By:'))
                              .join('\n')
                              .trim()
                          )}
                        </p>
                      )}
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
