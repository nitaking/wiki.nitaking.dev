# Journal Update Script

このスクリプトは[しずかなインターネット](https://sizu.me/nitaking)のRSSフィードから最新の投稿を取得し、`content/docs/journal.mdx`を自動更新します。

## 使用方法

### 手動実行
```bash
# npmスクリプトとして実行
npm run update-journal

# 直接実行
node scripts/update-journal.js
```

### 自動実行
GitHub Actionsワークフロー（`.github/workflows/update-journal.yml`）により、毎日午前9時（JST）に自動実行されます。

## 機能

1. **RSSフィード取得**: https://sizu.me/nitaking/rss から最新の投稿を取得
2. **データ解析**: RSS XMLを解析し、タイトル、リンク、公開日、説明を抽出
3. **年月別グループ化**: 投稿を年・月別に整理
4. **MDXファイル更新**: 既存の`journal.mdx`構造を維持しながら内容を更新

## 出力形式

```markdown
### 2025年

**[投稿タイトル](https://sizu.me/nitaking/posts/xxx)** _(2025/07/13)_
投稿の説明文（最初の100文字）

**[別の投稿](https://sizu.me/nitaking/posts/yyy)** _(2025/07/12)_
別の投稿の説明文
```

## エラーハンドリング

- RSSフィードの取得に失敗した場合は適切なエラーメッセージを出力
- 無効なRSSアイテムはスキップ
- スクリプトの実行に失敗した場合はプロセスを終了（exit code 1）

## 設定

- **RSS URL**: `https://sizu.me/nitaking/rss`
- **出力ファイル**: `content/docs/journal.mdx`
- **実行スケジュール**: 毎日 00:00 UTC（JST 09:00）
- **説明文の長さ**: 最大100文字