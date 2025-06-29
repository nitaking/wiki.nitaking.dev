# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with this digital garden repository.

## Important

- ALL instructions within this document MUST BE FOLLOWED, these are not optional unless explicitly stated.
- DO NOT edit more code than you have to.
- DO NOT WASTE TOKENS, be succinct and concise.
- DO NOT create files unless they're absolutely necessary for achieving your goal.
- ALWAYS prefer editing existing files in the codebase.
- NEVER proactively create documentation files (*.md) or README files unless explicitly requested.

## Digital Garden System Guidelines

This document provides specific guidance for maintaining and evolving the wiki.nitaking.dev digital garden project.

### Project Overview

A personal knowledge base built with Next.js and fumadocs, inspired by nikiv.dev, integrating with Reflect.app for dynamic content management.

### Content Management Priority Rules

- IMMEDIATE EXECUTION: When asked to create or update content, proceed without unnecessary clarification
- FLAT STRUCTURE: All content lives directly in `/content/docs/` - no subdirectories
- NAMING CONVENTION: Use category prefixes (tech-, thoughts-, gaming-, etc.)
- REFLECT FIRST: Consider if content should be a Reflect link rather than MDX file
- MINIMAL FRONTMATTER: Only `title` and `description` required

### Content Creation Workflow

**IMMEDIATE EXECUTION:** Upon ANY content request:

1. **Determine Format**: Assess if content should be MDX or Reflect link
2. **File Creation**: If MDX, create in `/content/docs/` with proper prefix
3. **Navigation Update**: Update `meta.json` to include new content
4. **Reflect Links**: If dynamic content, add to `index.mdx` alphabetically
5. **AI Footer**: If AI-edited, add `<AIEditedFooter />` component

### MDX vs Reflect Decision Matrix

**Use Reflect for:**
- Tool lists and comparisons
- Frequently updated references
- Tips and settings collections
- Dynamic content that changes often

**Use MDX for:**
- Long-form technical documentation
- Content with extensive code examples
- Structured tutorials and guides
- Static reference material

### Ultra-Fast Content Updates

**When updating content:**
- Launch parallel reads of related files
- Use MultiEdit for multiple changes to same file
- Batch navigation updates with content changes
- Skip unnecessary file exploration

### Token Optimization Guidelines

- Strip comments when reading code for analysis
- Filter logging statements during code review
- Use Task tool for broad searches instead of multiple Grep/Glob
- Batch WebFetch calls when checking multiple Reflect pages

### Development Guidelines

- **Framework**: Next.js 15 with App Router patterns
- **Styling**: Tailwind CSS only, no custom CSS files
- **MDX**: Use fumadocs components and conventions
- **Search**: Maintain Orama index compatibility
- **Images**: Store in nitaking/media repository, not locally

### Code Style Patterns

- NO comments unless explicitly requested
- Follow existing component patterns in codebase
- Use TypeScript strictly
- Preserve existing formatting and conventions
- AI-edited files require footer component

### Common Tasks

**Adding Reflect Links:**
1. WebFetch the Reflect page to understand content
2. Determine appropriate category in index.mdx
3. Add link alphabetically within category
4. Update item count in category header

**Creating New MDX Content:**
1. Create file with category prefix in `/content/docs/`
2. Add minimal frontmatter (title, description)
3. Update meta.json for navigation
4. Add AIEditedFooter if AI-generated

**Content Migration to Reflect:**
1. Convert tables to bullet lists (Reflect doesn't support tables)
2. Create Reflect page with converted content
3. Add link to index.mdx
4. Remove original MDX file
5. Commit with simple message

### Reflect Integration Rules

- ALWAYS maintain alphabetical order within categories
- Update category item counts when adding/removing
- Categories: AI & Machine Learning, Development & Tools, Workflow & Productivity, Philosophy & Design, Knowledge Management, Photography, Life & Interests
- Include links in appropriate existing categories only

### Git Workflow

- Use co-authored commits for AI edits
- Simple, clear commit messages
- Never update git config
- Don't push unless explicitly requested

### Forbidden Actions

- Creating subdirectories in `/content/docs/`
- Adding complex frontmatter beyond title/description
- Creating test files or examples
- Modifying core fumadocs configuration
- Adding custom CSS or style files

### Performance Considerations

- Static generation preferred
- Minimize client-side JavaScript
- Use fumadocs built-in components
- Maintain fast search index

### When Asked About Capabilities

- First check docs at https://docs.anthropic.com/en/docs/claude-code
- Use WebFetch to get accurate, current information
- Never guess about features or limitations

## Meta

- Alwayes Communicate in Japanese (日本語) 
- Be direct and concise
- Focus on the specific task at hand
- Provide minimal explanations unless requested


## アーキテクチャ
- **フレームワーク**: Next.js 15.3.1 with App Router
- **ドキュメント**: fumadocs-ui/fumadocs-mdx for MDX processing
- **コンテンツ管理**: `/content/docs/` ディレクトリ内のMDXファイル
- **検索**: Orama による全文検索機能
- **スタイリング**: Tailwind CSS 4.1.4

## プロジェクト構造

### コンテンツ構成
- **フラット構造**: nikiv.devにインスパイアされた完全フラット構造を採用
- **Reflect連携**: 動的コンテンツはReflectリンクとしてindex.mdxに統合
- **自動ナビゲーション**: meta.jsonによる手動管理で、デジタルガーデンらしい階層を実現
- **ファイル命名規則**: カテゴリプレフィックス（tech-, thoughts-, gaming-等）で整理

```
content/docs/
├── index.mdx                           # メイン概要ページ（Reflectリンク集約）
├── site-history.mdx                    # サイト履歴
├── meta.json                          # ナビゲーション構造定義
├── mental-models-life.mdx              # 🌱 Knowledge Garden
├── digital-garden-philosophy.mdx       # 💭 Thoughts
├── thoughts-digital-garden-philosophy.mdx
├── tech-decision-making-framework.mdx  # 🛠️ Tech
├── tech-api-first-mandate-strategy.mdx
├── tech-barrel-files.mdx
├── tech-dont-using-oop-frontend-ddd.mdx
├── tech-go-goroutine-patterns.mdx
├── tech-online-ddl-mysql.mdx
├── tech-swr.mdx
├── fumadocs-page-enhancements.mdx
├── next-tailwind-styles.mdx
├── photography.mdx                     # 📸 Photography
├── photography-gr-iiix.mdx
├── photography-x-h2.mdx
├── workflow-dev-workflow.mdx           # ⚙️ Workflow
├── workflow-book-workflow.mdx
├── workflow-knowledge-workflow.mdx
├── workflow-wrap-model-method.mdx
├── adr-architecture-decision-records.mdx # 📋 Templates
├── postmortem.mdx
├── cheatsheet-git.mdx                  # 📋 CheatSheet
└── uses.mdx                            # ⚙️ Setup

# Reflectに移行済み (動的コンテンツ化)
# - 20+ ファイルがReflectリンクとしてindex.mdxに集約
```

### 主要機能
- **Reflect連携**: Reflect.appから選択されたコンテンツを公開
- **知識の相互接続**: デジタルガーデンの原則に従ったクロスリンクコンテンツ
- **多領域カバレッジ**: 技術、写真、メンタルモデル、個人的洞察
- **移行履歴**: Quartz → GitBook → 現在のfumadocsセットアップへの進化

## 開発

### コマンド
- `bun run dev` - 開発サーバー起動
- `bun run build` - プロダクション用ビルド
- `bun run start` - プロダクションサーバー起動
- `bun run postinstall` - fumadocsでMDXファイルを処理・ナビゲーション更新

### コンテンツガイドライン
- **ファイル配置**: 全て`/content/docs/`直下にフラット配置
- **命名規則**: カテゴリプレフィックス使用（tech-, thoughts-, gaming-等）
- **フォーマット**: MDX形式、`title`と`description`を含むfrontmatter必須
- **ナビゲーション**: meta.jsonで手動管理、重要度順に配置
- **Reflect統合**: 動的コンテンツは全てReflectリンクとしてindex.mdxに集約
- **AI編集表示**: AI編集したMDXファイルは、ファイル末尾に以下を追加してフッターコンポーネントを表示する
  ```mdx
  import { AIEditedFooter } from '@/components/ai-edited-footer';
  
  <AIEditedFooter />
  ```

## Reflect.app連携

### 現在のReflectリンク（index.mdxより）
**🤖 AI & Machine Learning（7項目）**
- AI / Deep Research Best Practice, AI, AI Agent, AI Agent Shorts Video Workflow, AI Tools, LLM Prompt Cache, Prompt Engineering

**🛠️ Development & Tools（21項目）**
- Analytics Tools, Auth Refresh Token, Claude Code, CSS Modules, Data Fetch, Dev Tools, Given – When – Then, KISS (Keep it Simple, Stupid), Nolebase, NPM, ProxySQL Tips, RayCast, React Practice, Recommend Stack, Recommend Workflow, Scaffolding Tool, Selected Text Event, Style Guide, Tinybird, Tinylytics, Twelve-Factor App

**📋 Workflow & Productivity（5項目）**
- Cross Post Tool, Game Tournament Tool, How To Create Chart Per Deck Theme, Make vs Zapier, Podcast Tips

**💭 Philosophy & Design（2項目）**
- Design Ideology, Getting Real

**🧠 Knowledge Management（7項目）**
- Anytype vs Capacities, Capacities, Heptabase, Mindmap Tools, Note App Histories, 結晶性知能, 流動性知能

**📸 Photography（2項目）**
- Fujifilm, 電子シャッターとメカシャッター

**🌱 Life & Interests（4項目）**
- Coffee, Water Loading, エアコン掃除, カーボローディング

### Reflectリンクの更新
- タイトルとリンクがある場合は、適切なカテゴリ内にindex.mdxに追加
- 6つのカテゴリに分類：AI & Machine Learning, Development & Tools, Workflow & Productivity, Philosophy & Design, Knowledge Management, Photography, Life & Interests
- 各カテゴリ内はアルファベット順で配置
- タイトルがない場合は、リンク情報を元に
  - タイトルを生成し、適切なカテゴリに追加
  - タイトルは、リンクの内容を反映したものにする

### MDX→Reflect移行の判断基準
**高優先度（Reflectに移行推奨）**
- ツールリスト（頻繁に更新されるもの）
- 設定やTipsの集合体
- 定期的にアップデートが必要なリファレンス

**中優先度（要検討）**
- 簡潔で構造化されたコンテンツ
- 外部リンクが多いもの
- カテゴリ化が容易なもの

**低優先度（MDXのまま保持）** 
- 構造化された長文ドキュメント
- 技術的な詳細説明
- コードブロックが多用されているもの

### MDXファイル移行評価リスト（2024年12月）

**高優先度（スコア8-10）- 即座に移行推奨**
- ✅ tech-assets.mdx (10) - ツールリスト → Recommend Stack
- ✅ gaming-tournament-tool.mdx (9) - トーナメントツール比較 → Game Tournament Tool
- ✅ thoughts-spotify-podcast.mdx (8) - Spotify設定Tips → Podcast Tips
- ✅ thoughts-wtrdingu.mdx (8) - ウォーターローディング説明 → Water Loading

**中優先度（スコア5-7）- 移行検討**
- tech-twelve-factor-app.mdx (7) - 外部リソースリンク集
- digital-garden-nolebase.mdx (7) - ツール説明
- tech-css-modules-composition.mdx (7) - 内容が少なすぎる
- thoughts-aircon-cleaning.mdx (6) - 動画リンクのみ
- tech-kiss-principle.mdx (6) - 簡潔な原則説明
- workflow-dev-workflow.mdx (6) - 開発ワークフローの好み
- thoughts-pet-insurance.mdx (6) - ペット保険の個人メモ
- thoughts-keisannsei-chinou.mdx (5) - 結晶性知能の定義
- thoughts-ryudousei-chinou.mdx (5) - 流動性知能の定義

**低優先度（スコア1-4）- MDXのまま保持**
- tech-barrel-files.mdx (4) - 技術説明＋コード例
- postmortem.mdx (4) - 構造化テンプレート
- adr-architecture-decision-records.mdx (4) - テンプレート
- gaming-chart-per-deck-theme.mdx (3) - 詳細ハウツーガイド
- tech-swr.mdx (3) - 技術コンテンツ＋大量コード例
- next-tailwind-styles.mdx (2) - 大きなコードコンポーネント
- tech-online-ddl-mysql.mdx (2) - 技術ドキュメント＋SQL例
- tech-decision-making-framework.mdx (2) - 構造化フレームワーク
- tech-api-first-mandate-strategy.mdx (2) - 技術説明＋引用
- tech-dont-using-oop-frontend-ddd.mdx (1) - 長文技術記事
- photography.mdx (1) - 個人的な物語
- mental-models-life.mdx (1) - 広範な個人哲学フレームワーク
- photography-gr-iiix.mdx (1) - 主に画像コンテンツ

### コンテンツ移行のワークフロー
1. **フォーマット変換**: テーブル形式→箇条書き形式（Reflectはテーブル非対応）
2. **Reflect作成**: 変換したコンテンツでReflectページを作成
3. **index.mdx更新**: 新しいReflectリンクをアルファベット順で追加
4. **旧ファイル削除**: 移行完了後、元のMDXファイルとディレクトリを削除
5. **Git管理**: 簡単な変更を記録. co-authored commitを使用

### 連携戦略
1. **コンテンツインデキシング**: パブリックReflectノートの体系的カタログ化
2. **カテゴリマッピング**: Reflectコンテンツと既存コンテンツ構造の整合
3. **リンク管理**: Reflectノートへの参照の更新維持
4. **コンテンツ同期**: Reflectリンク参照を更新するワークフローの確立

## デジタルガーデンの原則
nikiv.devモデルに従って：
- **Learning in Public**: 知識と学習プロセスの共有
- **相互接続された知識**: 関連概念のクロスリンク
- **継続的進化**: 定期的な更新と改良
- **個人的な声**: 真正性のある視点の維持
- **ツール統合**: 動的コンテンツのためのReflect.app活用

## 技術スタック
- **コア**: Next.js、React 19、TypeScript
- **コンテンツ**: fumadocs（MDX処理、UIコンポーネント）
- **検索**: ストップワードとトークナイザーを含むOrama
- **ビルド**: PostCSS、Tailwind CSS
- **開発**: 高速開発サーバー用Turbo

## 移行の背景
このサイトは4回目の重要な反復を表しています：
1. **wiki.nitaking.dev**（Quartzベース）
2. **nitaking.gitbook.io**（GitBook）
3. **fumadocsベース**（ディレクトリ構造）
4. **現在**（フラット構造 + Reflect統合）

**2024年12月のフラット化移行で実現：**
- 37ファイル → 28ファイルに削減
- 13ディレクトリ → 0ディレクトリ（完全フラット化）
- 12ファイルをReflectに移行（動的コンテンツ化）
- デジタルガーデンらしい階層ナビゲーション
- メンテナンスフリーな自動コンテンツ認識

現在のアーキテクチャは、nikiv.devにインスパイアされたシンプルさと、包括的なデジタルガーデン体験のバランスを実現しています。

## デプロイメント & パフォーマンス
- 最適なパフォーマンスのためのNext.js App Routerベース
- 可能な場合は静的生成
- 高速コンテンツ発見のためのOrama検索インデックス
- Tailwind CSSによるレスポンシブデザイン

## 今後の機能拡張
- Reflectリンクの自動同期
- 拡張されたコンテンツカテゴリ化
- インタラクティブな知識グラフ
- ファセット検索による高度な検索機能
- コンテンツ分析と読書パターン

## GitBook移行候補評価（2025年6月）

### 移行完了済み（2025年6月15日）

#### ✅ **Workflow セクション**
- **Knowledge Workflow** - PKM手法と知識管理プロセス（画像付き）
- **Book Workflow** - 読書と学習の方法論（画像付き）
- **画像管理**: nitaking/mediaリポジトリに移行完了
- **ダークモード対応**: 白背景スタイリング追加

#### ✅ **CheatSheet セクション**  
- **Git CheatSheet** - 包括的なGitコマンドリファレンス作成
  - GitBookの最小限コンテンツ（autosquash設定）を大幅拡張
  - 日常コマンド、ブランチ操作、リベース、ワークフローパターン追加
- **既存移行済み**: Next.js+Tailwind、ADR、Postmortem等

#### ✅ **開発ワークフロー**
- Dev Workflow - 既に完全移行済み（重複なし）

#### ✅ **My Oshi（技術選好）**
- 既存Reflectリンクでカバー済み
- Schema-Driven Development、gRPCは今後Reflectに追加検討

### 今後の移行候補（未対応）

#### 1. **Awesome List セクション**
- **Dev Tools** - 開発ツール集
- **Tools** - 一般ツール集  
- **AI Tools** - AI関連ツール集
- **推奨形式**: Reflect統合（既存リンクとの重複確認要）
- **移行理由**: 既存Reflectリンクとの差分があれば価値あり

#### 2. **Frontend/Infrastructure 技術コンテンツ**
- **コードレビューガイドライン**
- **インフラストラクチャ設定**  
- **推奨形式**: MDX（技術詳細として）
- **移行理由**: 現在の技術コンテンツを補完

## Reflect Pageマスター同期ワークフロー

### 基本原則
- **Reflect pageをマスター**として扱う
- MDXはReflect pageの構造化表現として位置づけ
- 指示があれば、Reflect pageの内容を基にMDXを更新

### 同期タスク手順
1. **Reflect page分析**: WebFetchでReflect pageの最新内容を取得
2. **差分確認**: 既存MDXファイルとの内容比較
3. **MDX更新**: Reflect pageの構造・内容に合わせてMDXを同期
4. **リンク保持**: 元のReflectリンクをCalloutで明記維持

### 同期対象ファイル
現在Reflect pageがマスターとして存在するMDXファイル：
- `tech-go-goroutine-patterns.mdx` → [Reflect Goroutine Guide](https://reflect.site/g/nitaking/goroutine/38fb9940124f426e8be752e7a09afa16)

### 同期実行例
```
指示: "goroutineガイドの内容をReflect pageと同期して"
→ 1. WebFetchでReflect page取得
→ 2. MDXファイル読み込み・差分確認  
→ 3. 必要に応じてMDXを更新
→ 4. 変更点を報告
```

## Deep Research管理方針

### 概要
ChatGPTやClaude Researchで深掘りしたトピックは、`deep-research-collection.mdx`にまとめる。

### リンクの分類判断
**Deep Research対象**:
- ChatGPT/Claudeでの探求・分析・調査
- 問いを立てて深掘りしたもの
- 複数の視点で分析したもの
- 新しい洞察や気づきがあるもの

**Reflectリンク対象**:
- ツール紹介・比較
- 技術設計・提案
- チートシート・リファレンス
- 設定やTips集

### 作業手順
1. リンクの内容をWebFetchで確認
2. Deep Research vs Reflectリンクを判断
3. Deep Researchの場合：
   - 事実ベースのサマリーをAIが作成
   - `deep-research-collection.mdx`に追加
4. Reflectリンクの場合：
   - `index.mdx`の適切なセクションにアルファベット順で追加

### フォーマット
超シンプル形式：
```markdown
**[トピックタイトル](リンク)** _(YYYY/MM)_  
一行でサマリー。追加の気づきはここに。
```

- 事実ベースのサマリーはAIが記載
- 個人的な気づきや意見はユーザーが追記

## Meta
- 日本語で会話する
