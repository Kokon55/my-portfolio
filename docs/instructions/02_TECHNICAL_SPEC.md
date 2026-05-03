# 02. 技術仕様

## 🚨 現状の致命的バグ（Phase 1で必ず修正）

リポジトリを精読した結果、以下の問題が発見されました。

### Bug 1: 正解判定が完全に無視されている
- `components/case/CaseStep.tsx` の `<InteractionRenderer interaction={step.interaction} />` に `onCorrect` が**渡されていない**
- そもそも `InteractionRenderer` が `onCorrect` を渡しているのは13種中 `choice` と `slider_estimate` の**2種のみ**
- `CaseRunner.tsx` の「次へ」ボタンは `disabled` 条件なし＝**全ステップで常時押せる**
- **結果：今は何も答えなくても全幕クリアできる**

### Bug 2: ヒントが極端に少ない
- ケース1：5個、ケース2：2個、ケース3：0個。段階的ヒント機構もなし

### Bug 3: ストーリーが「平坦」
- 各幕は淡々と進行、感情の起伏や対立・ミスリードが少ない
- 章間に伏線がなく、独立した3エピソード

---

## 📋 Phase別実装計画

| Phase | 内容 | 完了基準 |
|---|---|---|
| 1 | 正解ロック実装 + 段階ヒント + ケース1〜3のボス問題追加 | 既存ケース全てで「答えないと進めない」が機能する |
| 2 | 統計数値表ビューア + 公式ノート + ケース4・5実装 | 5ケース完成、統計表が使える |
| 3 | ケース6・7・8実装 + ミニ演習モード + 電卓制約モード | 8ケース完成、本番対策モード稼働 |
| 4 | ケース9・10実装 + 修了証PDF + 全体伏線整合性チェック | 全10ケース完成、最終ボス戦が機能する |
| 5 | Geminiキャラ画像差し替え + 実音源BGM/SE導入 + 最終QA | ビジュアルと音響が完成、本番リリース可能 |

---

## Phase 1：致命的バグ修正と基盤強化（最優先）

### 1-1. 正解ロックシステムの実装

**全13種のインタラクションに `onCorrect?: () => void` を追加**：

| インタラクション | 達成条件 |
|---|---|
| `choice` | 正解選択肢を選んだ時 |
| `slider_estimate` | tolerance内に収めた時 |
| `outlier_spotter` | 全ての真の外れ値を選び終えた時 |
| `formula_builder` | 全スロットが正しいチップで埋まった時 |
| `evidence_matcher` | 全シナリオが正しい確率と結ばれた時 |
| `gacha_simulator` | 最低N回（デフォルト10回）引いた時 |
| `binomial_explorer` | n,p両方を最低3回ずつ動かした時 |
| `math_sandbox` | スライダーを最低5回操作した時 |
| `engagement_calc` | 「確認した」ボタン押下 |
| `distribution_compare` | 「確認した」ボタン押下 |
| `follower_growth` | 「確認した」ボタン押下 |
| `true_score` | 全段階を開示し終えた時 |
| `sns_profile` | 「確認した」ボタン押下 |
| `gacha_screen` | 「確認した」ボタン押下 |
| `timeseries_anomaly` | 全異常週を正しく指摘した時 |

#### 実装方針

```ts
// components/interactions/InteractionRenderer.tsx
type Props = {
  interaction: InteractionConfig;
  onCorrect?: () => void;
};

// 各インタラクションコンポーネントに onCorrect プロパティを追加
// 達成条件を満たした時点で呼び出す
```

```tsx
// components/case/CaseStep.tsx
type Props = {
  step: ActStep;
  client: ClientCharacter;
  onCorrect?: () => void;  // 追加
};

// InteractionRenderer に onCorrect を渡す
<InteractionRenderer interaction={step.interaction} onCorrect={onCorrect} />
```

```tsx
// components/case/CaseRunner.tsx
const [stepCleared, setStepCleared] = useState(false);

// ステップ変更時にリセット
useEffect(() => {
  setStepCleared(false);
}, [actIdx, stepIdx]);

// 「次へ」ボタンの disabled 制御
const canProceed = step.type !== 'interactive' || stepCleared;

<button onClick={goNext} disabled={!canProceed}>
  {!canProceed ? '⚠ 問題を解いてください' : (isLastStep ? '🏆 事件を解決する' : '次へ →')}
</button>

// CaseStep に onCorrect を渡す
<CaseStep
  step={step}
  client={caseDef.client}
  onCorrect={() => setStepCleared(true)}
/>
```

#### UIフィードバック
- 未達成時：「次へ」ボタンを灰色＋「⚠ 問題を解いてください」表示
- 達成時：金色＋「次へ →」+ 効果音（SE_correct）
- 達成時に小さな「✓ 正解！」トーストを2秒表示

### 1-2. 段階的ヒントシステム

#### 型定義拡張

```ts
// content/cases/types.ts
export type ActStep = {
  // ... 既存フィールド
  hint?: string;  // 既存（後方互換のため残す）
  hints?: {
    level1: string;  // 軽いヒント（考え方）
    level2: string;  // 中程度（途中式）
    level3: string;  // 強いヒント（ほぼ答え）
  };
};
```

#### UIコンポーネント

```tsx
// components/ui/HintSystem.tsx を新設
// - 「💡 ヒントを見る」ボタン
// - 押すたびに level1 → level2 → level3 の順に開示
// - 各ヒントは別々のカードで積み上がる
// - 使用回数を CaseRunner に通知（バッジ評価用）
```

#### 自動ヒント
- インタラクション開始から30秒経過してもクリアしない場合、level1を控えめなトーストで自動表示
- ローカルストレージに「自動ヒント表示済み」フラグを保存して同じステップでは1度だけ

#### バッジ連動
- ヒント使用回数を `useDetectiveStore` に記録
- ノーヒントクリア時に「⭐」、3つ以下なら「🌟」、それ以上はバッジ通常獲得

### 1-3. 既存ケース1〜3のボス問題追加

各ケースの第5幕（解決）の最後に「3問連続正解」のボス問題セクションを追加：

```ts
// content/cases/types.ts
export type Act = {
  type: 'commission' | 'crime_scene' | 'investigation' | 'deduction' | 'solution';
  title: string;
  steps: ActStep[];
  bossQuiz?: {  // 新規追加
    title: string;
    questions: ChoiceInteraction[];  // 3問以上
    onSuccessNarrative: string;
  };
};
```

**動作仕様**
- 第5幕の最後にボス問題セクションへ自動遷移
- 1問でも間違えたら段階ヒント開示 → 類題で再挑戦
- 全問正解で事件解決 → 結果画面へ

### 1-4. テスト追加

`__tests__/` に各インタラクションの `onCorrect` 発火条件テストを追加：
- `__tests__/interactions/choice.test.tsx`
- `__tests__/interactions/outlier_spotter.test.tsx`
- ... 全13種

既存21項目のテストは維持。

---

## Phase 2：教育機能と新規ケース実装（前半）

### 2-1. 統計数値表ビューア

`components/ui/StatisticalTable.tsx` を新設：

```tsx
type Props = {
  table: 'normal' | 't' | 'chi-square' | 'f';
};

// 標準正規分布表（Z）：z=0.00〜3.49
// t分布表：自由度1〜30, 60, 120, ∞、α=0.10/0.05/0.025/0.01/0.005
// カイ二乗分布表：自由度1〜30, α=0.05/0.025/0.01
// F分布表：分子の自由度×分母の自由度のマトリクス
```

**UI仕様**
- ケース内の検定・推定の場面で「📊 数値表を開く」ボタンから呼び出す
- モーダルで表示、横スクロール対応
- 検索ボックスで該当行をハイライト
- モバイルでもピンチで拡大可能

### 2-2. 公式ノート（統計検定2級進捗マップ）

トップページに「📒 公式ノート」タブを追加：

```tsx
// app/notebook/page.tsx
// 統計検定2級の12分野をカードで表示
// クリアしたケースで習得した分野を点灯
// 各分野クリックで詳細モーダル：
// - 学んだ公式（KaTeX表示）
// - 概念のひとこと説明
// - このスキルを使った事件（ケースへのリンク）
// - もう一度復習する（ミニ演習へ）
```

### 2-3. ケース4・5の実装

詳細は `07_CASE_04_REVIEW.md`, `08_CASE_05_POLL.md` を参照。

---

## Phase 3：新規ケース実装（中盤）+ ミニ演習

### 3-1. ケース6・7・8の実装

詳細は `09_CASE_06_BAYES.md`, `10_CASE_07_PVALUE.md`, `11_CASE_08_CORRELATION.md` を参照。

### 3-2. ケース外ミニ演習モード

```tsx
// app/practice/page.tsx
// 各ケースクリア後にアンロックされる類題セット
// 統計検定2級の本番形式（4択）で5問
// 数値はランダム生成（パターンは固定、値は乱数）
// 全分野クリアで「統計検定2級・模擬合格」バッジ
```

### 3-3. 電卓制約モード

```tsx
// components/ui/ConstrainedCalculator.tsx
// 統計検定2級は関数電卓禁止
// このモードをONにすると、画面下部の電卓を四則・%・√のみに制限
// 設定画面でON/OFF切替可能、デフォルトOFF
```

---

## Phase 4：新規ケース実装（終盤）+ 修了証

### 4-1. ケース9・10の実装

詳細は `12_CASE_09_CHISQ.md`, `13_CASE_10_FINAL.md` を参照。

### 4-2. 修了証PDF生成

```tsx
// lib/certificate.ts
// jsPDF を使って修了証を生成
// - プレイヤー名（任意入力）
// - 「データ探偵・一級」称号
// - 全10事件のスキル一覧
// - 完走日
// - QRコード（記念）
```

### 4-3. 全体伏線の整合性チェック

全10ケースを通しでプレイして「3つの目」の伏線、データ・カルテルの登場順、最終話の総括が破綻なく回収されることを確認。

---

## Phase 5：キャラクター画像差し替えと音響強化

### 5-1. PixelPortrait の画像対応

```tsx
// components/characters/PixelPortrait.tsx
// 改修方針：
// 1. public/characters/{characterId}/{expression}.png が存在すれば <img> 表示
// 2. 存在しなければ既存SVG描画にフォールバック
// 3. 画像未配置でもビルドが通ること

// 実装例
const imageSrc = `/characters/${characterId}/${expression}.png`;
// 画像存在チェックは onError ハンドラで処理し、
// 失敗時は既存のSVG描画コンポーネントに切り替え
```

### 5-2. CharacterId 型の拡張

```ts
// components/characters/PixelPortrait.tsx
export type CharacterId =
  | 'yamada' | 'sato' | 'akari' | 'detective'
  | 'kito' | 'raidouji' | 'akari_voa'  // 新キャラ
  | 'shirase' | 'wakana' | 'pekosenji'
  | 'boss_review' | 'boss_poll' | 'boss_ai' | 'boss_pvalue'
  | 'boss_correlation' | 'boss_chisq' | 'boss_final'
  | 'boss_final_awakened';

export type Expression =
  | 'neutral' | 'worried' | 'distraught' | 'shocked'
  | 'eureka' | 'hopeful' | 'angry' | 'tired' | 'thinking'
  // ボス用
  | 'smug' | 'defeated' | 'enraged';
```

### 5-3. 音楽の強化

`14_MUSIC_DESIGN.md` を参照（詳細仕様）。

```tsx
// lib/bgm.ts を改修
// public/bgm/{trackId}.mp3 のパス規約を導入
// ファイルがあれば <audio> でループ再生、なければ既存Web Audio合成にフォールバック

// lib/se.ts を新設
// public/se/{seId}.mp3 で効果音再生
// インタラクション正解時／ヒント開示時／「次へ」押下時などに鳴らす
```

### 5-4. portrait-demo ページの更新

`app/portrait-demo/page.tsx` を更新し、新規キャラ・新規表情も全て一覧表示できるように。

---

## 📦 アウトプット物（実装完了時に必ず作成）

1. 全ソースコードの改修
2. `STORY.md`：全10ケースのシナリオ全文（伏線の流れと回収の対応表を明記）
3. `docs/CHARACTER_PROMPTS.md`：Geminiキャラ画像生成プロンプト集（このリポジトリの `14_CHARACTER_PROMPTS.md` を移植）
4. `docs/MUSIC_DESIGN.md`：音楽デザイン仕様（このリポジトリの `15_MUSIC_DESIGN.md` を移植）
5. `docs/STATISTICS_CURRICULUM.md`：統計検定2級出題範囲と全10ケースの対応マトリクス
6. `docs/EXAM_PREP_GUIDE.md`：このゲームを統計検定2級対策に使う場合の推奨学習順序
7. `docs/IMAGE_GENERATION_LOG.md`：画像生成ログのテンプレート
8. `PROJECT_BRIEF.md` の更新（新仕様を反映）
9. `__tests__/` に各インタラクションの正解判定テスト追加（既存21項目は維持）
10. `npm run build` 警告ゼロ通過、`npm test` 全パス
