# 05. ケース2：ガチャの数学 - 100連で出ない理由

## 📊 統計範囲
- **主**：確率の基礎、二項分布、独立試行、期待値と分散、大数の法則
- **副**：1−p の累乗計算、確率の体感

## 🎬 ストーリー概要

スマホゲームの確率に裏切られた依頼人・**雷神タケシ**（28歳・ガチャ廃人）が、100連回しても☆5が出ない件で詐欺だと訴える。探偵は確率1%で100連時の「1個も出ない確率」を計算し、36.6%——3人に1人は本当に出ない、と諭す。

**二段オチ構造**：
- 表向き：「確率1%は数学的に妥当」と諭す
- 真相：情報提供者**クロウ・サトウ**が現れ、「確率1%」と表記しながら☆5が複数種類あって、目当てキャラに絞ると0.1%になる「**確率の表記詐欺**」を暴く。タケシの怒りは別の意味で正しかった

**伏線**：佐藤の名刺の右下隅に「3つの目」のロゴ（探偵が一瞬目を止めるが流す）

## 👥 登場キャラクター
- 蛇道シェルロック（探偵）
- **雷神タケシ**（依頼人・28歳・ガチャ廃人・フリーター）
  - 髪を金に染めた長身、龍の刺繍ジャケット、首に金のチェーン
  - 短気だが純粋、ゲーム愛は本物
- クロウ・サトウ（情報提供者・35歳・配信運営）
- 配信ゲーム会社のCEO（黒幕、画面越しのみ・最終話の伏線）

---

## 📝 詳細スクリプト

### 第1幕：依頼【ドアを蹴破る勢い】

🎵 **BGM: track_commission_noir → 中盤で track_explosive_intro（爆発的な依頼の登場）**

#### Step c-01
- type: `narrative`, speaker: `narrator`
- 「火曜日の昼下がり。ドアが乱暴に開かれ、金髪の男が事務所に飛び込んできた」

#### Step c-02
- type: `dialogue`, speaker: `client`, expression: `angry`, showPortrait: true
- 「探偵さんっ！あんた数学に強いって聞いた！俺、詐欺に遭ったんだ！」

#### Step c-03
- type: `dialogue`, speaker: `detective`, expression: `neutral`
- 「……まずは、息を整えてくれないか。話はそれからだ」

#### Step c-04
- type: `dialogue`, speaker: `client`, expression: `angry`
- 「『**爆裂デスティニー**』ってゲーム知ってますか！？☆5排出率1%って書いてあるのに、俺、**100連やって1体も出なかったんですよ！**」

#### Step c-05
- type: `dialogue`, speaker: `client`, expression: `distraught`
- 「3万円ですよ、3万円！家賃滞納してまで……これ詐欺じゃないですか！？」

#### Step c-06
- type: `dialogue`, speaker: `detective`, expression: `thinking`
- 「ふむ。確率1%で100連、1体も出ない確率……君は、その確率を**自分で計算したことはあるか？**」

#### Step c-07
- type: `dialogue`, speaker: `client`, expression: `worried`
- 「えっ、……無いです。だって、1%×100=100%でしょ？絶対出るはずじゃ……」

#### Step c-08
- type: `dialogue`, speaker: `detective`, expression: `neutral`
- 「**そこが、君の最初の罠だ**」

---

### 第2幕：現場【独立試行と1−pの累乗】

🎵 **BGM: track_crime_scene_tense**

#### Step s-01
- type: `mini_lesson`, speaker: `detective`
- content: '【数学A・確率】独立試行：何度繰り返しても、毎回の確率は変わらない。\n\nガチャを1回引いて☆5が出ない確率は (1 − 0.01) = 0.99。これを100回連続で引いて1度も出ない確率は……'
- formula: `P(0\\text{個出ない}) = (1-p)^n = (0.99)^{100}`

#### Step s-02
- type: `interactive`
- content: '🎲 計算してみよう：100連で1度も出ない確率は？'
- interaction: `slider_estimate`
  - question: '100連で☆5が1度も出ない確率は何%？'
  - min: 0, max: 100, step: 1, correctAnswer: 37, tolerance: 5, unit: '%'
- hints:
  - level1: 「(0.99)^100 を計算してみよう」
  - level2: 「電卓で 0.99 を100回掛ける、または 0.99^100」
  - level3: 「半分以下にはなるが、0には程遠い。30%台のどこかだ」

#### Step s-03
- type: `dialogue`, speaker: `detective`, expression: `neutral`
- 「答えは**約36.6%**。つまり、100連で1度も出ない人が**3人に1人いる**。これはガチャの仕様として、数学的にあり得る」

#### Step s-04
- type: `dialogue`, speaker: `client`, expression: `shocked`
- 「3人に1人……俺、その『出ない方の3人』に入っちゃったって事ですか……」

#### Step s-05
- type: `interactive`
- content: '🎰 実際にガチャを回してみよう。100連を10回シミュレートする'
- interaction: `gacha_simulator`（rate: 0.01, defaultPulls: 100）
- hints:
  - level1: 「何度か回してみて、出る回と出ない回の差を体感しよう」
  - level2: 「結果は毎回違う。これが『確率の揺らぎ』だ」
  - level3: 「10回試行のうち3〜4回は『0個』になることがある」

#### Step s-06
- type: `dialogue`, speaker: `detective`, expression: `thinking`
- 「**何度か試したな。出る回もあれば、まったく出ない回もある**。これが確率の揺らぎだ。ガチャは『運が悪ければ何回でも出ない』」

---

### 第3幕：捜査【二項分布と期待値】

🎵 **BGM: track_investigation_pulse**

#### Step i-01
- type: `mini_lesson`, speaker: `detective`
- content: '【数学B・統計】二項分布：n回独立試行で成功確率がpの場合、k回成功する確率\n\n平均（期待値）= np、分散 = np(1-p)'
- formula: `P(X=k) = \\binom{n}{k} p^k (1-p)^{n-k}`

#### Step i-02
- type: `dialogue`, speaker: `detective`, expression: `neutral`
- 「100連、確率1%なら、平均的に出る数は np = 100×0.01 = 1個。**たった1個が期待値**だ」

#### Step i-03
- type: `interactive`
- content: 'n と p を動かして、二項分布の形を観察しよう'
- interaction: `binomial_explorer`（defaultN: 100, defaultP: 0.01）
- hints:
  - level1: 「nを100、pを0.01のままで分布を見よう。0個と1個の確率が高い」
  - level2: 「pを変えるとどう変わる？2倍にすると分布の形は？」
  - level3: 「pが小さく、nが大きいとポアソン分布に近づく」

#### Step i-04
- type: `dialogue`, speaker: `client`, expression: `worried`
- 「……つまり、3万円で運が悪かっただけで、ゲームは詐欺じゃないってことですか？」

#### Step i-05
- type: `dialogue`, speaker: `detective`, expression: `neutral`
- 「数学的にはな。**だが**——」

#### Step i-06
- type: `narrative`, speaker: `narrator`
- 「探偵が言葉を続けようとしたとき、事務所のドアが**もう一度**開いた。今度は、ゆっくりと」

#### Step i-07
- type: `dialogue`, speaker: `detective`, expression: `thinking`
- 「（来客？）」

---

### 第4幕：推理【クロウ・サトウの登場と表記詐欺】

🎵 **BGM: track_deduction_revelation**

#### Step d-01
- type: `narrative`, speaker: `narrator`
- 「黒いロングコートに、左目のモノクル。長身の男が、無言で名刺を差し出した」

#### Step d-02
- type: `dialogue`, speaker: `narrator`
- 「名刺には『**配信プラットフォーム Vutube 運営部 課長代理 佐藤**』。右下隅に——**三角形に並んだ3つの目**のロゴが、印刷されているのが見えた」

#### Step d-03
- type: `dialogue`, speaker: `detective`, expression: `thinking`
- 「（このロゴ……どこかで見覚えが）……サトウさん、と。ご用件は？」

#### Step d-04
- type: `dialogue`, speaker: `sato`, expression: `neutral`, showPortrait: true
- 「噂は聞いている。雷神タケシ氏の件——ガチャの『1%』、本当に1%だと思いますか？」

#### Step d-05
- type: `dialogue`, speaker: `client`, expression: `shocked`
- 「えっ、どういう……」

#### Step d-06
- type: `dialogue`, speaker: `sato`, expression: `neutral`
- 「『爆裂デスティニー』の☆5排出率1%——**これは『☆5全体の合計』だ**。☆5キャラは10種類いる。タケシくんが目当てにしていたのは、確か」

#### Step d-07
- type: `dialogue`, speaker: `client`, expression: `angry`
- 「**雷光のリン**……あの限定キャラ……」

#### Step d-08
- type: `dialogue`, speaker: `sato`, expression: `neutral`
- 「**そう。リンの個別排出率は、0.1%**。1%の中の10分の1だ」

#### Step d-09
- type: `dialogue`, speaker: `client`, expression: `shocked`, showPortrait: true
- 「えっ……えっ……ちょ、ちょっと待って！じゃあ100連で出ない確率って……」

#### Step d-10
- type: `interactive`
- content: '🚨 リン個別の確率0.1%で100連、1体も出ない確率は？'
- interaction: `slider_estimate`
  - question: 'リンが100連で1度も出ない確率は何%？'
  - min: 0, max: 100, step: 1, correctAnswer: 90, tolerance: 5, unit: '%'
- hints:
  - level1: 「(0.999)^100 を計算」
  - level2: 「pが小さくなるほど、出ない確率は1に近づく」
  - level3: 「(0.999)^100 はほぼ 1 に近い。10人中9人以上は出ない」

#### Step d-11
- type: `dialogue`, speaker: `detective`, expression: `neutral`
- 「**90.5%**。10人に9人は出ない。これは『確率1%表記』からは想像できない数字だ」

#### Step d-12
- type: `dialogue`, speaker: `client`, expression: `angry`, showPortrait: true
- 「やっぱり詐欺じゃないですか！『☆5確率1%』だけ書いて、目当てキャラの確率は隠してる！」

#### Step d-13
- type: `dialogue`, speaker: `sato`, expression: `neutral`
- 「『**確率の表記詐欺**』——業界用語だ。総合確率だけ表記して、個別確率は隠す。法律的にはギリギリ合法だが、誤認を誘う設計だ」

#### Step d-14
- type: `dialogue`, speaker: `detective`, expression: `thinking`
- 「（なるほど。タケシの怒りは、**数学的には妥当ではないが、別の意味で正当だった**）」

---

### 第5幕：解決【教訓とボス問題】

🎵 **BGM: track_solution_calm**

#### Step sol-01
- type: `dialogue`, speaker: `detective`, expression: `neutral`
- 「タケシ、君は3つの教訓を持ち帰ってくれ」

#### Step sol-02
- type: `mini_lesson`, speaker: `detective`
- content: '【教訓】ガチャの数学を生き抜くために\n\n① 表記された確率より「目当ての個別確率」を確認する\n② 1−pの累乗で「出ない確率」を計算する\n③ 期待値（np）が小さい場合、運が悪いと何度でも出ない'

#### Step sol-03 (BOSS QUIZ 1)
- type: `interactive`
- content: '【ボス問題1/3】確率0.005のガチャを200連で1個も出ない確率は？'
- interaction: `slider_estimate`
  - question: '確率は何%？'
  - min: 0, max: 100, step: 1, correctAnswer: 37, tolerance: 5, unit: '%'
- hints:
  - level1: 「(1−0.005)^200 = (0.995)^200」
  - level2: 「電卓で 0.995 を200回掛ける」
  - level3: 「期待値 np = 200×0.005 = 1。1個も出ない確率は 1/e に近い、約37%」

#### Step sol-04 (BOSS QUIZ 2)
- type: `interactive`
- content: '【ボス問題2/3】二項分布 B(100, 0.01) の平均と分散の組み合わせは？'
- interaction: `choice`
- options:
  - ✅ 平均=1, 分散=0.99
  - ❌ 平均=10, 分散=0.99
  - ❌ 平均=1, 分散=1
  - ❌ 平均=100, 分散=99

#### Step sol-05 (BOSS QUIZ 3)
- type: `interactive`
- content: '【ボス問題3/3】「確率1%」と表記されているが、目当てキャラ個別では「0.1%」のガチャ。これを正しく説明する文は？'
- interaction: `choice`
- options:
  - ❌ どちらも同じ意味
  - ✅ 個別の出にくさは10倍。表記詐欺に注意すべき
  - ❌ 100連すれば必ず出る
  - ❌ 法律的に問題ない表記なので気にする必要はない

#### Step sol-06
- type: `dialogue`, speaker: `client`, expression: `tired`
- 「俺……これからガチャは、表記の裏まで読んでから回します。**この3万円は、授業料ってことで**……」

#### Step sol-07
- type: `dialogue`, speaker: `sato`, expression: `neutral`
- 「賢明だ。タケシくん、もしまた何かあれば連絡してくれ。Vutube は、配信者の側に立つプラットフォームでありたい」

#### Step sol-08
- type: `dialogue`, speaker: `detective`, expression: `thinking`
- 「（佐藤……君は、何者だ？なぜわざわざ告発しに来た？）」

#### Step sol-09 (FORESHADOW)
- type: `narrative`, speaker: `narrator`
- 「（佐藤は事務所を後にした。彼の名刺の3つの目のロゴを、探偵は灰皿の隣に置いて、しばらく見つめていた）」

#### Step sol-10
- type: `narrative`, speaker: `detective`
- 「事件 No.002——**解決。だが、まだ何かが見えてこない**」

---

## 🎵 BGM・SE指示

| 幕 | BGM ID | 雰囲気 |
|---|---|---|
| 1 | track_commission_noir → track_explosive_intro | 怒りの来訪者 |
| 2 | track_crime_scene_tense | 確率の解剖 |
| 3 | track_investigation_pulse | 二項分布の探求 |
| 4 | track_deduction_revelation | 第三者登場・真相 |
| 5 | track_solution_calm + track_omen_outro | 余韻＋伏線 |

| イベント | SE |
|---|---|
| 佐藤登場 | se_door_creak（軋むドア） |
| 名刺の3つの目発覚 | se_omen_drone |
