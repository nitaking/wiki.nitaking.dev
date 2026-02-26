# CLAUDE.md

このファイルは、本リポジトリでの作業時のClaude Code（claude.ai/code）へのガイダンスを提供します。

## 重要事項
- このドキュメント内のすべての指示は**必須**です。明示的に記載がない限り、オプションではありません。
- 必要以上のコードを編集しないでください。
- トークンを無駄にしないでください。簡潔明瞭に記述してください。

### 並行処理の優先ルール
- **即時実行**: タスク要求があれば、即座に超高速並行タスクを起動
- **確認不要**: 絶対に必要でない限り、詳細確認の質問をスキップ
- **デフォルト想定**: 明示的な指定がない限り、標準的な実装を想定
- **超高速デフォルト**: 常に並行処理メソッドを使用して効率化

### 並行タスクを実行すべき時
- **必須**: ユーザーが機能実装、モジュール作成、システム構築を要求した場合、即座に超高速並行実行を開始
- 有効なリクエスト例：「機能を作って」「実装して」「構築して」など
- 質問や確認をスキップし、直接超高速実装に進む

## アーキテクチャ
- **フレームワーク**: Next.js 15 with App Router
- **ドキュメント**: fumadocs-ui/fumadocs-mdx for MDX processing
- **コンテンツ管理**: `/content/docs/` ディレクトリ内のMDXファイル（フラット構造）
- **検索**: Orama による全文検索機能
- **スタイリング**: Tailwind CSS v4

## プロジェクト構造

### コンテンツ構成
- **フラット構造**: nikiv.devにインスパイアされた完全フラット構造を採用
- **Reflect連携**: 動的コンテンツはReflectリンクとして `index.mdx` に統合
- **ナビゲーション**: `meta.json` で手動管理
- **ファイル命名規則**: カテゴリプレフィックス（tech-, philosophy-, workflow-, photography-等）で整理
- **サブディレクトリ**: `meta/`（changelog, site-history）と `claude/` のみ

### サイドバー構成（2026年2月時点）
```
index / uses → Personal → Tech → Workflow → References → Meta(collapsible)
```

### 主要ファイル
- `content/docs/index.mdx` — Map of Contents（Reflectリンク集約）
- `content/docs/meta.json` — サイドバーナビゲーション定義
- `app/(docs)/layout.tsx` — DocsLayoutとサイドバーカスタマイズ
- `components/sidebar-item.tsx` — truncate対応のカスタムサイドバーItem
- `components/sidebar-separator.tsx` — カスタムセパレーター

## 開発

### コマンド
- `bun run dev` - 開発サーバー起動
- `bun run build` - プロダクション用ビルド
- `bun run start` - プロダクションサーバー起動

### コミットメッセージ
Conventional Commits形式を使用（changelogページが自動生成されるため必須）：
```
type(scope): subject
```
- **type**: `feat`, `fix`, `docs`, `style`, `refactor`, `perf`, `test`, `chore`, `ci`, `build`
- **scope**: 変更対象（`content`, `nav`, `changelog` 等）

例：
- `feat(content): add OpenCode link to Development Environment`
- `refactor(nav): move Go Goroutines from sidebar to Map of Contents`

### コンテンツガイドライン
- **ファイル配置**: 全て `/content/docs/` 直下にフラット配置
- **命名規則**: カテゴリプレフィックス使用（tech-, philosophy-, workflow-等）
- **フォーマット**: MDX形式、`title` と `description` を含むfrontmatter必須
- **ページアイコン**: frontmatterの `icon:` は使わない（サイドバーがうるさくなるため）
- **AI編集表示**: AI編集したMDXファイルは、ファイル末尾に以下を追加
  ```mdx
  import { AIEditedFooter } from '@/components/ai-edited-footer';

  <AIEditedFooter />
  ```

## サイドバーのページ配置判断基準

### サイドバーに置くべきページ
**個人の思想・判断基準を示すもの**（「なぜそう判断するか」が書かれているもの）
- 技術哲学（API First、OOP/DDDを避ける理由など）
- ワークフロー・方法論（自分のやり方を説明するもの）
- メンタルモデル・ライフスタイル

### Map of Contents（index.mdx）に置くべきページ
**特定技術・ツールのリファレンス・How To**
- 特定技術のBest Practice（Go Goroutines、SWRなど）
- ツール比較・Tips集
- Reflectで代替可能なもの

### 判断の問い
「このページは『なぜこうするか』を語っているか？」
- Yes → サイドバー
- No（How Toやリファレンス） → Map of Contents

## サイドバーカスタマイズのノウハウ

### 設計方針
- **セクション順序**: 個人サイトなのでPersonalを最上位に。Tech/Workflowは後ろ
- **セクション名**: 絵文字なし、シンプルなテキストのみ（`---Tech---` 形式）
- **タイトル**: サイドバーで1行に収まる長さに短縮する（frontmatterの `title` を直接変更）

### fumadocsのサイドバーカスタマイズ制約
- `meta.json` の `pages` 配列はページごとのカスタムラベル設定不可（文字列パスのみ）
- サイドバーのラベルはfrontmatterの `title` から直接取得される
- タイトルを短縮するとページのh1も変わる（許容範囲）

### サイドバーItemのtruncate実装
長いタイトルが折り返されないよう `components/sidebar-item.tsx` でカスタムItemを実装済み：
```tsx
export function SidebarPageItem({ item }: { item: PageTree.Item }) {
  return (
    <SidebarItem href={item.url} external={item.external} icon={item.icon}>
      <span className="truncate">{item.name}</span>
    </SidebarItem>
  );
}
```
`app/(docs)/layout.tsx` の `sidebar.components.Item` に登録済み。

### Metaフォルダ（collapsible）
`content/docs/meta/` ディレクトリに `changelog.mdx` と `site-history.mdx` を配置し、`meta/meta.json` で `collapsible: true` を設定。サイドバーでデフォルト折りたたみ表示。

### タイトル短縮の実績
| 変更前 | 変更後 |
|---|---|
| 技術選定の意思決定フレームワーク | 技術選定フレームワーク |
| APIファースト戦略の採用 | API First |
| フロントエンドでのOOP的DDDを避ける理由 | No OOP/DDD in Frontend |
| Go Goroutine Best Practices | Go Goroutines |
| ADR - Architecture Decision Records | ADR |
| Philosophy of Digital Gardens | Digital Garden |

## Reflect.app連携

### Reflectリンクの更新ルール
- 適切なカテゴリ内に `index.mdx` へ追加（アルファベット順）
- カテゴリ: AI & Machine Learning / Development & Tools / Workflow & Productivity / Philosophy & Design / Knowledge Management / Photography / Life & Interests
- タイトルがない場合はリンク内容からタイトルを生成して追加

### MDX→Reflect移行の判断基準
**Reflectに移行推奨**
- ツールリスト・比較（頻繁に更新されるもの）
- 設定やTips集
- 外部リンクが多いもの

**MDXのまま保持**
- 構造化された長文ドキュメント
- コードブロックが多用されているもの
- 自分の思想・判断基準を語るもの

### コンテンツ移行のワークフロー
1. **フォーマット変換**: テーブル形式→箇条書き形式（Reflectはテーブル非対応）
2. **Reflect作成**: 変換したコンテンツでReflectページを作成
3. **index.mdx更新**: 新しいReflectリンクをアルファベット順で追加
4. **旧ファイル削除**: 移行完了後、元のMDXファイルを削除

## Reflect Pageマスター同期ワークフロー

### 基本原則
- **Reflect pageをマスター**として扱う
- 指示があれば、Reflect pageの内容を基にMDXを更新

### 同期タスク手順
1. WebFetchでReflect pageの最新内容を取得
2. 既存MDXファイルとの差分確認
3. MDXをReflect pageの構造・内容に合わせて更新
4. 元のReflectリンクをCalloutで明記維持

## Deep Research管理方針

### 概要
ChatGPTやClaude Researchで深掘りしたトピックは `deep-research-collection.mdx` にまとめる。

### 分類判断
**Deep Research対象**: 問いを立てて探求・分析・調査したもの、新しい洞察があるもの

**Reflectリンク対象**: ツール紹介・比較、チートシート・リファレンス、設定やTips集

### フォーマット
```markdown
**[トピックタイトル](リンク)** _(YYYY/MM)_
一行でサマリー。追加の気づきはここに。
```

### Deep Researchページの作成ルール
- 冒頭に `Callout` で「Claude Deep Researchによるアウトプット（YYYY/MM）」と明記
- h3見出し内にリンクを入れない（hydration error発生）
- リンクは説明末尾に「**Links:** [URL]」形式で配置

## デジタルガーデンの原則
nikiv.devモデルに従って：
- **Learning in Public**: 知識と学習プロセスの共有
- **相互接続された知識**: 関連概念のクロスリンク
- **継続的進化**: 定期的な更新と改良
- **個人的な声**: 真正性のある視点の維持

## Meta
- 日本語で会話する
