# PROJECT BRIEF — データ探偵 SNS編

> Claude に見せて続きを開発してもらうための、プロジェクト要約書。

## このゲームは何か

**「SNS の数字の嘘を、高校数学で解き明かす探偵ゲーム」**

- ターゲット: SNS を日常的に使う社会人 / 学び直し層 / 統計検定受験者
- 形態: Web アプリ(Next.js)、無料公開予定
- 1ケース 5〜10分で完走、5幕構造(依頼 → 現場 → 捜査 → 推理 → 解決)
- 「教科書 → 演習」ではなく「事件 → 必要に迫られて学ぶ」

## 現在の状態(実装済み)

### ケース(全6ケースのうち3つ実装済み)
1. ✅ **ケース1: バズの真実 - 10万いいねの嘘**(数学I・データの分析)
2. ✅ **ケース2: ガチャの数学 - 100連で出ない理由**(数学A・確率 / 数学B・二項分布)
3. ✅ **ケース3: フォロワー買いました - 偽アカウントの統計学**(数学I + 移動平均・Z-score)
4. ⏳ ケース4: ★4.8のアプリ - レビュー操作を見抜け(中央値・分布・二極化)
5. ⏳ ケース5: Twitter世論調査の罠 - 80%支持の真実(サンプリング・信頼区間)
6. ⏳ ケース6: AI画像識別精度99%? - ベイズの逆襲(条件付き確率・ベイズ)

### 機能
- ✅ 5幕構造(commission / crime_scene / investigation / deduction / solution)
- ✅ ピクセルアート風キャラクターポートレート(120×150 / 4キャラ × 9表情)
- ✅ BGM システム(Web Audio API で5幕別の雰囲気を合成、ミュート可)
- ✅ 進捗・バッジ・スキルを Zustand + localStorage で永続化
- ✅ KaTeX による数式表示
- ✅ Recharts による可視化(ヒストグラム・時系列・棒グラフ)

### インタラクション(8種類)
1. **ChoiceQuestion** — 選択肢タップ
2. **SliderEstimate** — スライダーで値を推測
3. **EngagementCalc** — エンゲージ率の比較計算
4. **DistributionCompare** — 分布の比較表示
5. **FollowerGrowth** — フォロワー成長グラフ + R² で線形性検出
6. **GachaSimulator** — 疑似乱数でガチャ体験
7. **BinomialExplorer** — n, p を動かして二項分布の形を観察
8. **TrueScoreReveal** — bot 比率を考慮した真エンゲージ率の段階開示
9. **OutlierSpotter** — SNS投稿カードをタップで外れ値告発(Z-score 判定)
10. **FormulaBuilder** — 数式の穴にチップをタップで配置
11. **EvidenceMatcher** — シナリオと確率を線で結ぶ
12. **MathSandbox** — スライダーで操作して数学を発見(3シナリオ)
13. **TimeSeriesAnomaly** — 時系列に対し移動平均+Z-scoreで異常週特定

## 技術スタック

- **Next.js 14** (App Router) + **TypeScript**
- **Tailwind CSS** + ダークテーマ
- **Recharts** + **D3** で可視化
- **Framer Motion** でアニメ
- **Zustand** + localStorage で永続化
- **KaTeX** + `react-katex` で数式
- **dnd-kit** ※(現状未使用、将来D&D実装に備え)

## ディレクトリ構成

```
app/
├── page.tsx                      ランディング(ヒーロー・ケース一覧・価値提案)
├── layout.tsx                    ルート(フォント・SEO メタ)
├── globals.css                   Tailwind + 探偵風カスタムCSS
├── case/[caseId]/
│   ├── page.tsx                  ケース動的ルート
│   └── result/page.tsx           解決後のバッジ獲得画面
└── portrait-demo/page.tsx        全キャラ × 全表情マトリクス確認用

components/
├── case/
│   ├── CaseRunner.tsx            5幕進行エンジン(BGM 制御含む)
│   └── CaseStep.tsx              幕内の1ステップ描画
├── characters/
│   ├── PixelPortrait.tsx         キャラID + 表情 → ピクセル絵を生成
│   ├── DialogueBox.tsx           タイプライター効果付き吹き出し
│   └── ClientAvatar.tsx          (旧 SVG・後方互換用)
├── interactions/
│   ├── InteractionRenderer.tsx   InteractionConfig.kind で 13種に振り分け
│   ├── OutlierSpotter.tsx
│   ├── FormulaBuilder.tsx
│   ├── EvidenceMatcher.tsx
│   ├── MathSandbox.tsx           bot/binomial/LLN の3サンドボックス
│   ├── TimeSeriesAnomaly.tsx
│   ├── ChoiceQuestion.tsx
│   ├── SliderEstimate.tsx
│   ├── EngagementCalc.tsx
│   ├── DistributionCompare.tsx
│   ├── FollowerGrowth.tsx
│   ├── GachaSimulator.tsx
│   ├── BinomialExplorer.tsx
│   └── TrueScoreReveal.tsx
├── sns/
│   ├── SnsProfile.tsx            架空SNS Fluttr/Picgrm/ToTok/Vutube
│   └── GachaScreen.tsx
└── ui/
    ├── CaseList.tsx              トップのカード一覧
    ├── DetectiveBadge.tsx
    └── ProgressBar.tsx

content/cases/
├── types.ts                      Case / Act / ActStep / InteractionConfig 型
├── index.ts                      全ケース集約
├── case-01-buzz.ts               ケース1(完成・5幕)
├── case-02-gacha.ts              ケース2(完成・5幕)
└── case-03-followers.ts          ケース3(完成・5幕)

lib/
├── stats.ts                      平均/分散/二項分布/Z-score/シード乱数
├── store.ts                      Zustand(進捗・バッジ・サウンド設定)
├── progress.ts                   進捗ヘルパー
└── bgm.ts                        Web Audio API で5幕の BGM を合成

__tests__/
└── stats.test.ts                 21項目すべてパス(確率5パターン以上検算)
```

## 設計上の重要原則(Claude が引き継ぐとき必読)

1. **無料公開モード**(価格・購入関連の UI は完全削除済み)
2. **実在SNS・企業・ゲームは出さない**(架空 Fluttr / Picgrm / ToTok / Vutube を使用)
3. **5幕構造は厳守**(commission/crime_scene/investigation/deduction/solution)
4. **キャラの表情はパラメータ駆動**(後日 Gemini 画像で差し替え予定)
5. **モバイル最優先**(タッチヒットエリア 44px 以上)
6. **数式アレルギー対策**:最初は日本語、後で σ などの記号を補足
7. **完走 5〜10分**を意識した分量

## 次にやりたいこと(優先順)

1. ケース4(レビュー操作)実装 — 中央値・二極化検出
2. ケース5(世論調査)実装 — サンプリングバイアス・信頼区間
3. ケース6(AI 99%)実装 — 条件付き確率・ベイズの定理
4. キャラクター画像を Gemini で生成して差し替え
5. Vercel 公開
6. ケース内に「分岐するセリフ選択肢」を追加
7. 修了証(全6ケース完走時の PDF)

## 現在の確認方法

```bash
git clone https://github.com/Kokon55/my-portfolio.git
cd my-portfolio
git checkout claude/data-detective-game-bYqyC
npm install
npm run dev      # http://localhost:3000
npm test         # 21項目パス確認
npm run build    # 警告ゼロ確認
```

URL:
- トップ: `http://localhost:3000`
- ケース1〜3: `http://localhost:3000/case/case-01-buzz` 等
- 表情マトリクス: `http://localhost:3000/portrait-demo`

## 法的配慮(絶対遵守)

- 実在の SNS サービス名・ロゴは使わない(Twitter/X、Instagram、TikTok、YouTube 等不可)
- 架空名:**Fluttr** / **Picgrm** / **ToTok** / **Vutube**
- 実在企業・実在ゲームの事例は出さない(全て架空人物・架空案件)
