# データ探偵 SNS編 — 数字の嘘を見抜く統計ゲーム

> 高校数学で読み解くSNS時代のリテラシー。

SNSやインターネットで日常的に出会う「数字の嘘」を、探偵風インタラクティブゲームで解明していく Web アプリ。「教科書 → 演習」ではなく「事件 → 必要に迫られて学ぶ」順序で、高校数学の統計分野を体感する。

## 第1段階(MVP)実装範囲

- **ケース1: バズの真実 — 10万いいねの嘘**(無料体験範囲・第3幕まで)
- **ケース2: ガチャの数学 — 100連で出ない理由**
- 残り4ケース(3〜6)は Coming Soon 表示

## 技術スタック

Next.js 14 (App Router) + TypeScript / Tailwind CSS / Recharts / D3 / dnd-kit / Framer Motion / Zustand (localStorage 永続化) / KaTeX / Stripe / Vercel

## 動作確認手順

```bash
npm install
npm test          # lib/stats.ts のテスト 21項目すべてパスを確認
npm run dev       # http://localhost:3000
npm run build     # 本番ビルド(警告ゼロ)
```

ローカルでの動作確認:

1. トップページ http://localhost:3000 を開く
2. 「無料で第1の事件を体験」をクリック → ケース1の第1〜3幕までプレイ可能
3. 第3幕以降は Paywall に到達。「全6ケースを解放する」→ 購入ページ
4. 購入ページの最下部「マジックリンクで購入状態を有効化」を展開し、メールアドレスを入力 → 「マジックリンクを発行」 → 出力された URL をクリックして認証
5. 全ケースが解放され、ケース1・2 を完走できる

## Stripe 決済(本番化手順)

`.env.local` に下記を設定:

```env
STRIPE_SECRET_KEY=sk_test_...        # テストキー
STRIPE_WEBHOOK_SECRET=whsec_...      # Webhook シークレット
MAGIC_LINK_SECRET=<長いランダム文字列>
```

開発時の Webhook 確認は `stripe listen --forward-to localhost:3000/api/webhook` を使用する。本番化時は `STRIPE_SECRET_KEY` を本番キーに差し替えるだけで切り替わる。

## Vercel デプロイ手順

```bash
# 1. Vercel CLI ログイン
npx vercel login

# 2. プロジェクトをリンクしてデプロイ
npx vercel

# 3. 環境変数を Vercel 側に設定
#    Vercel Dashboard → Settings → Environment Variables
#    - STRIPE_SECRET_KEY
#    - STRIPE_WEBHOOK_SECRET
#    - MAGIC_LINK_SECRET

# 4. 本番反映
npx vercel --prod
```

## ディレクトリ

```
app/                Next.js App Router(ランディング、ケース、購入、API)
components/         UI 部品(キャラクター、ダイアログ、インタラクション、SNS風UI)
content/cases/      ケース定義(case-01-buzz.ts、case-02-gacha.ts)
lib/                stats.ts / store.ts / progress.ts / stripe.ts
__tests__/          stats.test.ts(21項目・確率3パターン以上の検算済み)
```

## 法的配慮

- 実在の SNS サービス名・ロゴは使用していない(架空: Fluttr / Picgrm / ToTok / Vutube)
- 実在企業・実在ゲームの事例も登場しない(全て架空人物・架空案件)
