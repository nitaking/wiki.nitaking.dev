# デジタルガーデンプロジェクト - wiki.nitaking.dev

## 概要
Next.jsとfumadocsで構築されたデジタルガーデンプロジェクトです。nikiv.devにインスパイアされており、Reflect.appと連携した個人的なナレッジベースとして機能します。

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
├── 🌱 Knowledge Garden
│   ├── digital-garden-nolebase.mdx
│   └── mental-models-life.mdx
├── 🛠️ Tech (重要度順)
│   ├── tech-decision-making-framework.mdx
│   ├── tech-api-first-mandate-strategy.mdx
│   ├── tech-twelve-factor-app.mdx
│   ├── tech-kiss-principle.mdx
│   └── ... (その他tech-*.mdx)
├── 📸 Photography
│   ├── photography.mdx
│   └── photography-gr-iiix.mdx
├── 🎮 Gaming
│   ├── gaming-chart-per-deck-theme.mdx
│   └── gaming-tournament-tool.mdx
├── 💭 Thoughts
│   └── thoughts-*.mdx (6ファイル)
├── ⚙️ Workflow
│   └── workflow-dev-workflow.mdx
└── 📋 Templates (付属的情報)
    ├── adr-architecture-decision-records.mdx
    └── postmortem.mdx
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

## Reflect.app連携

### 現在のReflectリンク（index.mdxより）
**🤖 AI & Machine Learning（7項目）**
- AI / Deep Research Best Practice, AI, AI Agent, AI Agent Shorts Video Workflow, AI Tools, LLM Prompt Cache, Prompt Engineering

**🛠️ Development & Tools（9項目）**
- Auth Refresh Token, Data Fetch, Dev Tools, Given – When – Then, ProxySQL Tips, RayCast, React Practice, Scaffolding Tool, Selected Text Event

**📋 Workflow & Productivity（3項目）**
- Cross Post Tool, Game Tournament Tool, Make vs Zapier

**💭 Philosophy & Design（2項目）**
- Design Ideology, Getting Real

**🌱 Life & Interests（3項目）**
- Coffee, Fujifilm, カーボローディング

### Reflectリンクの更新
- タイトルとリンクがある場合は、適切なカテゴリ内にindex.mdxに追加
- 5つのカテゴリに分類：AI & Machine Learning, Development & Tools, Workflow & Productivity, Philosophy & Design, Life & Interests
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
