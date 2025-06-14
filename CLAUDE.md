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
├── mental-models-life.mdx              # 🌱 Knowledge Garden
├── tech-decision-making-framework.mdx  # 🛠️ Tech
├── tech-api-first-mandate-strategy.mdx
├── tech-barrel-files.mdx
├── tech-dont-using-oop-frontend-ddd.mdx
├── tech-online-ddl-mysql.mdx
├── tech-swr.mdx
├── next-tailwind-styles.mdx
├── photography.mdx                     # 📸 Photography
├── photography-gr-iiix.mdx
├── workflow-dev-workflow.mdx           # ⚙️ Workflow
├── adr-architecture-decision-records.mdx # 📋 Templates
└── postmortem.mdx

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

### 高価値移行候補（高優先度）

#### 1. **Workflow セクション**
- **Dev Workflow** - 開発プロセスとベストプラクティス
- **Knowledge Workflow** - PKM手法と知識管理プロセス
- **Book Workflow** - 読書と学習の方法論
- **推奨形式**: MDX（構造化されたプロセス文書として）
- **移行理由**: 現在のworkflow-*ファイルを補完、体系的な手法論

#### 2. **CheatSheet セクション**
- **Git CheatSheet** - Git コマンドとワークフロー
- **Next.js関連ガイド** - Tailwindとの共存等
- **推奨形式**: MDX（参照性重視）
- **移行理由**: 実用的な技術リファレンス、現在のサイトに不足

#### 3. **My Oshi (Tech Preferences)**
- **技術スタック推奨** - 個人的な技術選択理由
- **推奨形式**: Reflect統合（既存Recommend Stackと統合）
- **移行理由**: 現在のReflectリンクを拡充

### 中価値移行候補（要検討）

#### 4. **Awesome List セクション**
- **Dev Tools** - 開発ツール集
- **Tools** - 一般ツール集  
- **AI Tools** - AI関連ツール集
- **推奨形式**: Reflect統合（既存リンクとの重複確認要）
- **移行理由**: 既存Reflectリンクとの差分があれば価値あり

#### 5. **Frontend/Infrastructure 技術コンテンツ**
- **コードレビューガイドライン**
- **インフラストラクチャ設定**
- **推奨形式**: MDX（技術詳細として）
- **移行理由**: 現在の技術コンテンツを補完

### 低価値（移行対象外）

#### 6. **既存重複コンテンツ**
- **PKM関連** - 既にReflectリンクで十分
- **Photography** - 既にMDXファイル存在
- **Mental Models** - 既存mental-models-life.mdxでカバー

### 移行戦略

1. **手動確認必要**: GitBookの動的コンテンツのため手動での内容確認
2. **優先順位**: Workflow → CheatSheet → My Oshi → Awesome Lists
3. **重複回避**: 既存Reflectリンクとの差分を事前確認
4. **形式判断**: 構造化プロセス=MDX、動的リスト=Reflect

## Meta
- 日本語で会話する
