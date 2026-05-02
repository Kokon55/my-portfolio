# データ探偵 SNS編 — 数字の嘘を見抜く統計ゲーム

> 高校数学で読み解くSNS時代のリテラシー。

SNSやインターネットで日常的に出会う「数字の嘘」を、探偵風インタラクティブゲームで解明していく Web アプリ。「教科書 → 演習」ではなく「事件 → 必要に迫られて学ぶ」順序で、高校数学の統計分野を体感する。

## 実装範囲

- **ケース1: バズの真実 — 10万いいねの嘘**
- **ケース2: ガチャの数学 — 100連で出ない理由**
- 残り4ケース(3〜6)は Coming Soon 表示(順次追加予定)

すべてのケースが無料で完走可能。

## 技術スタック

Next.js 14 (App Router) + TypeScript / Tailwind CSS / Recharts / D3 / dnd-kit / Framer Motion / Zustand (localStorage 永続化) / KaTeX / Vercel

## 動作確認手順

```bash
npm install
npm test          # lib/stats.ts のテスト 21項目すべてパスを確認
npm run dev       # http://localhost:3000
npm run build     # 本番ビルド(警告ゼロ)
```

ローカルでの遊び方:

1. http://localhost:3000 を開く
2. 「第1の事件を始める」 → ケース1を5幕すべて完走
3. トップに戻ってケース2へ

## Vercel デプロイ手順

```bash
npx vercel login
npx vercel        # 初回:プロジェクトをリンク&デプロイ
npx vercel --prod # 本番反映
```

環境変数の設定は不要(API キーや決済を使用していない)。

## ディレクトリ

```
app/                Next.js App Router(ランディング、ケース、結果、ポートレート確認)
components/         UI 部品(キャラクター、ダイアログ、インタラクション、SNS風UI)
content/cases/      ケース定義(case-01-buzz.ts、case-02-gacha.ts)
lib/                stats.ts(統計関数)/ store.ts(Zustand)/ progress.ts
__tests__/          stats.test.ts(21項目・確率5パターン以上の検算済み)
```

## 法的配慮

- 実在の SNS サービス名・ロゴは使用していない(架空: Fluttr / Picgrm / ToTok / Vutube)
- 実在企業・実在ゲームの事例も登場しない(全て架空人物・架空案件)
