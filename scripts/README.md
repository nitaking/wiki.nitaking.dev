# Journal Update Scripts

このディレクトリには、journal.mdxファイルを自動更新するためのスクリプトが含まれています。

## update-journal.js

しずかなインターネットのRSSフィード（https://sizu.me/nitaking/rss）から最新の投稿を取得し、`content/docs/journal.mdx`を自動更新します。

### 機能

- RSSフィードの取得・解析
- 既存投稿との重複チェック
- 年月別セクションへの自動分類
- 投稿日時順での並び替え
- エラーハンドリングと詳細ログ

### 使用方法

#### 手動実行
```bash
# リポジトリルートから実行
npm run update-journal

# または直接実行
node scripts/update-journal.js
```

#### GitHub Actions（自動実行）
`.github/workflows/update-journal.yml`ファイルを作成することで自動実行可能。

### 実行頻度の推奨

#### 週1回実行（推奨）
```yaml
# 毎週月曜日 9:00 AM JST
- cron: '0 0 * * 1'
```

#### 2週間に1回実行
```yaml
# 第1・第3月曜日 9:00 AM JST  
- cron: '0 0 1-7,15-21 * 1'
```

### ファイル構造

更新後のjournal.mdxの構造：
```markdown
## Recent Posts

### 2025年7月
**[投稿タイトル](リンク)** _(2025/07/09)_
投稿の説明文（最大200文字）

### 2025年6月
...
```

### エラー処理

- ネットワークエラー時は処理を中断
- RSS解析エラー時は詳細ログを出力
- ファイル書き込みエラー時は元のファイルを保持
- 重複投稿は自動でスキップ

### ログ出力

実行時の詳細ログ：
- RSS取得状況
- 解析された投稿数
- 新規投稿の検出
- ファイル更新結果