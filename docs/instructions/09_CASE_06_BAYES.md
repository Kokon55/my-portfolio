# 09. ケース6：AI画像識別精度99% - ベイズの逆襲

## 📊 統計範囲
- **主**：条件付き確率、ベイズの定理、感度・特異度、第1種・第2種の過誤
- **副**：陽性的中率、事前確率の影響

## 🎬 ストーリー概要

「AIが偽画像を精度99%で検出！」と話題のサービス『**ImageGuard AI**』が、突然多くのアーティストを「偽物作成者」と認定し、SNSアカウント凍結が相次ぐ。被害者の一人、新人イラストレーター・**月詠きらら**（22歳）が探偵事務所に駆け込む。探偵がベイズの定理で計算すると、本物の確率は9%——91%は冤罪。

**二段オチ構造**：
- 表向き：「精度99%のAIが冤罪を生んでいる」
- 真相：このAIを開発したCTO・**鳴神コード**は、最初は本気で偽画像対策をしようとしていた。だが組織から「わざと冤罪を出してSNS世論を操作しろ」と命じられ、苦悩しながら従っていた。月詠きららの活動内容が組織の利権を脅かすため標的にされていた

**伏線**：AIスタートアップ『**Iris Labs**』のロゴそのものが「3つの目」を抽象化したアイリス（虹彩）デザイン。山田が再登場して気づく：「あれ、このロゴ、見たことある気が…」

## 👥 登場キャラクター
- 蛇道シェルロック（探偵）
- ヒナタ・アカリ（助手）
- シズマ・ヤマダ（ケース1から再登場）
- **月詠きらら**（依頼人・22歳・新人イラストレーター）
  - 黒髪のショートボブ、絵の具のついたエプロン、首から色鉛筆セット
  - 内向的だが情熱的、自分の絵が偽物扱いされて精神的に追い詰められている
- **鳴神コード**（黒幕「設計者」・30代CTO）

---

## 📝 詳細スクリプト

### 第1幕：依頼【絶望のイラストレーター】

🎵 **BGM: track_commission_emotion**

#### Step c-01
- type: `narrative`, speaker: `narrator`
- 「水曜日の夕方。ドアを叩く音は、消え入りそうなほど弱かった」

#### Step c-02
- type: `dialogue`, speaker: `client`, expression: `distraught`, showPortrait: true
- 「あの……月詠きらら、と申します……私のSNSアカウント、**昨日突然凍結されたんです**」

#### Step c-03
- type: `dialogue`, speaker: `client`, expression: `distraught`
- 「凍結理由は『**AIによる偽画像生成の疑い**』。でも私、**AIなんて使ってません**。全部手描きです、本当に……」

#### Step c-04
- type: `dialogue`, speaker: `akari`, expression: `worried`
- 「（あかりがティッシュを差し出して）落ち着いて、ゆっくり話してください」

#### Step c-05
- type: `dialogue`, speaker: `client`, expression: `distraught`
- 「**ImageGuard AI**っていうサービスが、私の絵を『AI生成と判定』したんです。精度99%だって。でも……でも、私は本当に手で描いてるんです……」

#### Step c-06
- type: `dialogue`, speaker: `detective`, expression: `thinking`
- 「精度99%、か……月詠さん、**精度99%が必ずしも『真実』ではない、と言ったら信じられるか？**」

#### Step c-07
- type: `dialogue`, speaker: `client`, expression: `worried`
- 「えっ……でも99%って、ほぼ完璧ですよね？」

#### Step c-08
- type: `dialogue`, speaker: `detective`, expression: `neutral`
- 「**それが、ベイズの罠だ**」

---

### 第2幕：現場【条件付き確率の解剖】

🎵 **BGM: track_crime_scene_tense**

#### Step s-01
- type: `mini_lesson`, speaker: `detective`
- content: '【数学A】条件付き確率\n\nP(A|B) = 「Bが起きたという条件のもとで、Aが起きる確率」\n\n例：P(陽性|本当に偽物) = 「偽物の絵がAIに陽性判定される確率」'
- formula: `P(A|B) = \\frac{P(A \\cap B)}{P(B)}`

#### Step s-02
- type: `dialogue`, speaker: `detective`, expression: `neutral`
- 「ImageGuard AIの『精度99%』は、こう書ける：**P(陽性|偽物) = 0.99**。つまり、本当に偽物の絵をAIが正しく『陽性』と判定する確率」

#### Step s-03
- type: `mini_lesson`, speaker: `detective`
- content: '【感度と特異度】\n\n- 感度 = P(陽性|偽物) = 偽物を正しく検出する確率\n- 特異度 = P(陰性|本物) = 本物を正しく見逃さない確率'

#### Step s-04
- type: `dialogue`, speaker: `detective`, expression: `neutral`
- 「ImageGuard AIの公開データ：**感度99%、特異度99%**。つまり P(陽性|本物) = 0.01（誤判定率1%）」

#### Step s-05
- type: `dialogue`, speaker: `client`, expression: `worried`
- 「99%って、それ完璧じゃないですか？……何が問題なんですか？」

#### Step s-06
- type: `dialogue`, speaker: `detective`, expression: `neutral`
- 「**事前確率を見落としている**」

#### Step s-07
- type: `mini_lesson`, speaker: `detective`
- content: '【事前確率（Base Rate）】\n\n母集団の中で「本当に偽物（AI生成）の絵」の割合。\n\nこれが調査結果の解釈を根本から変える。'

#### Step s-08
- type: `dialogue`, speaker: `detective`, expression: `neutral`
- 「世の中のイラスト全体のうち、**AI生成の比率は0.1%程度**だ。1000枚に1枚」

---

### 第3幕：捜査【ベイズの定理で逆算】

🎵 **BGM: track_investigation_pulse**

#### Step i-01
- type: `mini_lesson`, speaker: `detective`
- content: '【ベイズの定理】\n\n「AIが陽性と判定したとき、本当に偽物である確率」'
- formula: `P(\\text{偽物}|\\text{陽性}) = \\frac{P(\\text{陽性}|\\text{偽物}) \\cdot P(\\text{偽物})}{P(\\text{陽性})}`

#### Step i-02
- type: `dialogue`, speaker: `detective`, expression: `neutral`
- 「数字を当てはめる。1万枚の絵があり、そのうち**10枚が偽物**（事前確率0.1%）。AIで判定すると——」

#### Step i-03
- type: `interactive`
- content: '🧮 1万枚中、本物9990枚・偽物10枚をAIで判定。陽性判定の総数は？'
- interaction: `formula_builder`
  - segments:
    - { kind: 'text', text: '陽性数 = 偽物の正検出 + 本物の誤検出 = ' }
    - { kind: 'slot', id: 's1' }
    - { kind: 'op', op: '+' }
    - { kind: 'slot', id: 's2' }
    - { kind: 'text', text: '= ' }
    - { kind: 'slot', id: 's3' }
  - chips:
    - { id: 'c1', label: '10×0.99', correctSlot: 's1' }
    - { id: 'c2', label: '9990×0.01', correctSlot: 's2' }
    - { id: 'c3', label: '109.8', correctSlot: 's3' }
    - { id: 'c4', label: '99.9' }
- hints:
  - level1: '感度0.99 × 偽物10枚 = 9.9枚（正検出）'
  - level2: '誤検出率0.01 × 本物9990枚 = 99.9枚（誤検出）'
  - level3: '正検出と誤検出を足したものが全陽性数。9.9 + 99.9 を計算しよう'

#### Step i-04
- type: `interactive`
- content: '🧮 陽性判定された109.8枚のうち、本当に偽物の確率は？'
- interaction: `slider_estimate`
  - question: '陽性判定の中で本物の偽物の割合（％）は？'
  - min: 0, max: 100, step: 1, correctAnswer: 9, tolerance: 2, unit: '%'
- hints:
  - level1: '正検出9.9 ÷ 全陽性109.8'
  - level2: '9.9 ÷ 109.8 を電卓で計算'
  - level3: '分子9.9に対して分母は10倍以上。1割を切るか切らないか、その辺りの値'

#### Step i-05
- type: `dialogue`, speaker: `detective`, expression: `neutral`
- 「答えは**9%**。**陽性判定された人のうち、本当に偽物だったのはたった9%**。残り91%は冤罪——月詠さんのように」

#### Step i-06
- type: `dialogue`, speaker: `client`, expression: `shocked`, showPortrait: true
- 「**91%が冤罪……？**それって、ImageGuard AIは『役立たず』ってことですか？」

#### Step i-07
- type: `dialogue`, speaker: `detective`, expression: `neutral`
- 「そうではない。**事前確率が低いとき、99%精度でも陽性的中率は驚くほど低くなる**——これがベイズの定理が教える最も重要な教訓だ」

#### Step i-08
- type: `mini_lesson`, speaker: `detective`
- content: '【検査の罠】\n\n「事前確率が低いとき、高精度の検査でも陽性的中率は低い」\n\nこれは病気のスクリーニング検査でも同じ。AIだから特別ではない。'

#### Step i-09
- type: `dialogue`, speaker: `client`, expression: `eureka`
- 「**じゃあ、ImageGuard AIは『見つけたい少数派の中で、99%の精度がある』というのが嘘じゃない**けど、結果として9割が冤罪になってる、ってことですか」

#### Step i-10
- type: `dialogue`, speaker: `detective`, expression: `neutral`
- 「正確だ。**広告の99%は嘘ではないが、誤解を誘う設計だ**」

---

### 第4幕：推理【設計者・鳴神コードの苦悩】

🎵 **BGM: track_deduction_revelation → track_villain_theme**

#### Step d-01
- type: `narrative`, speaker: `narrator`
- 「翌日、探偵・あかり・きららは、ImageGuard AIの開発元『**Iris Labs**』本社へ向かった」

#### Step d-02
- type: `narrative`, speaker: `narrator`
- 「会社のロゴは、**虹彩（アイリス）を3つ重ねたデザイン**。エントランスでバッタリ会ったのは……」

#### Step d-03
- type: `dialogue`, speaker: `yamada`, expression: `eureka`, showPortrait: true
- 「あれっ！？探偵さん！？うちの会社の取引先に来てたんですか？」

#### Step d-04
- type: `dialogue`, speaker: `detective`, expression: `thinking`
- 「山田くん、なぜここに」

#### Step d-05
- type: `dialogue`, speaker: `yamada`, expression: `worried`
- 「Iris Labs、うちの会社の広告クライアントなんです。あ……ところで探偵さん、このロゴ、**どこかで見たような気がして**」

#### Step d-06
- type: `dialogue`, speaker: `akari`, expression: `eureka`
- 「3つの目！3つの目です！3つの虹彩を抽象化してるけど、**あの組織のシンボル**！」

#### Step d-07
- type: `narrative`, speaker: `narrator`
- 「会議室に通された一行。やがて入ってきたのは、銀髪のツーブロック、緑の回路パターンが浮かぶ近未来サングラスをかけた男」

#### Step d-08
- type: `dialogue`, speaker: `boss_ai`, expression: `smug`, showPortrait: true
- 「Iris Labs CTO、**鳴神コード**だ。何の用件かな、データ探偵」

#### Step d-09
- type: `dialogue`, speaker: `detective`, expression: `neutral`
- 「鳴神さん。あなたの ImageGuard AI が、月詠きらら氏のような無実のイラストレーターを冤罪で凍結している。**ベイズの定理を考えれば、陽性的中率は9%**だ」

#### Step d-10
- type: `dialogue`, speaker: `boss_ai`, expression: `smug`
- 「ふふ、計算してきたか。よろしい。**精度99%は嘘じゃない、だが事前確率を考慮すると陽性的中率は低くなる**——その通りだ」

#### Step d-11
- type: `dialogue`, speaker: `detective`, expression: `neutral`
- 「知っていてやっているのか」

#### Step d-12
- type: `dialogue`, speaker: `boss_ai`, expression: `worried`, showPortrait: true
- 「……（しばらく沈黙）」

#### Step d-13
- type: `dialogue`, speaker: `boss_ai`, expression: `worried`
- 「最初は……純粋に偽画像対策がしたかった。AIで世界を良くしたかった。**だが、組織から命じられた**——『**わざと冤罪を出して、特定のクリエイターを排除しろ**』と」

#### Step d-14
- type: `dialogue`, speaker: `client`, expression: `worried`
- 「特定のクリエイター……それって、**私みたいな**？」

#### Step d-15
- type: `dialogue`, speaker: `boss_ai`, expression: `worried`
- 「月詠きらら氏。**あなたの絵は、組織が支配する大手出版社の画風と競合していた**。だから、標的にされた」

#### Step d-16
- type: `dialogue`, speaker: `client`, expression: `shocked`
- 「私の絵が、誰かの邪魔になってたって……？」

#### Step d-17
- type: `dialogue`, speaker: `boss_ai`, expression: `worried`
- 「すまない。私は……**断れなかった**。家族も、研究費も、組織に握られている」

#### Step d-18
- type: `dialogue`, speaker: `detective`, expression: `neutral`
- 「鳴神。**ImageGuard AI の判定アルゴリズムを公開する勇気があるか？**」

#### Step d-19
- type: `dialogue`, speaker: `boss_ai`, expression: `worried`
- 「……公開すれば、組織は私を消す。だが——**月詠氏のような被害者を放置するくらいなら、消されたほうがマシだ**」

#### Step d-20
- type: `narrative`, speaker: `narrator`
- 「鳴神は、判定アルゴリズムのソースコードと、組織からの指示メールを全て探偵に提供した」

---

### 第5幕：解決【冤罪の連鎖を断つ】

🎵 **BGM: track_solution_calm → track_solution_uplift**

#### Step sol-01
- type: `narrative`, speaker: `narrator`
- 「翌週。鳴神は記者会見で全てを公表。Iris Labs は解散、ImageGuard AI は停止。冤罪を受けたクリエイターたちのアカウントは復活し、月詠きららの作品も再評価された」

#### Step sol-02
- type: `dialogue`, speaker: `client`, expression: `hopeful`, showPortrait: true
- 「探偵さん……ありがとうございました。あの、お礼に……これ、私の手描きで」

#### Step sol-03
- type: `narrative`, speaker: `narrator`
- 「（きららが差し出したのは、探偵の似顔絵。フェドーラ帽の影に隠れた目元と、Σペンダントが完璧に再現されていた）」

#### Step sol-04
- type: `dialogue`, speaker: `detective`, expression: `neutral`
- 「（探偵は珍しく口角を少し上げた）……上手いな」

#### Step sol-05
- type: `mini_lesson`, speaker: `detective`
- content: '【教訓】ベイズの罠を見抜く3原則\n\n① 「精度99%」だけでなく**事前確率**を確認\n② **陽性的中率**＝陽性判定中の真陽性の割合\n③ 事前確率が低い検査ほど、誤判定の影響が大きい'

#### Step sol-06 (BOSS QUIZ 1)
- type: `interactive`
- content: '【ボス問題1/3】感度0.99、特異度0.99のAIで、事前確率0.1%の場合、陽性的中率は？'
- interaction: `choice`
- options:
  - ❌ 99%
  - ❌ 50%
  - ✅ 約9%
  - ❌ 約1%

#### Step sol-07 (BOSS QUIZ 2)
- type: `interactive`
- content: '【ボス問題2/3】「第1種の過誤（α）」とは何か？'
- interaction: `choice`
- options:
  - ✅ 帰無仮説が真なのに棄却してしまう過誤（=偽陽性）
  - ❌ 対立仮説が真なのに棄却してしまう過誤
  - ❌ サンプルサイズ不足の過誤
  - ❌ 計算ミスの過誤

#### Step sol-08 (BOSS QUIZ 3)
- type: `interactive`
- content: '【ボス問題3/3】事前確率が低い病気のスクリーニング検査で起きる現象は？'
- interaction: `choice`
- options:
  - ❌ 検査の精度が下がる
  - ✅ 陽性判定でも、本当に病気の確率は低くなる
  - ❌ 偽陰性が増える
  - ❌ 検査時間が長くなる

#### Step sol-09 (FORESHADOW)
- type: `narrative`, speaker: `narrator`
- 「（事務所のホワイトボード。探偵は『**鳴神コード（設計者）**』にバツ印を付けた。倒した幹部：3人。残り：4人）」

#### Step sol-10
- type: `dialogue`, speaker: `akari`, expression: `worried`
- 「探偵さん。**鳴神さんも、ある意味、組織の被害者でしたね**……」

#### Step sol-11
- type: `dialogue`, speaker: `detective`, expression: `neutral`
- 「悪を一色で語ることはできない。だが、**やったことの責任は取らねばならん**。鳴神は服役する。それでいい」

#### Step sol-12
- type: `narrative`, speaker: `detective`
- 「事件 No.006——**解決**」

---

## 🎵 BGM・SE指示

| 幕 | BGM ID | 雰囲気 |
|---|---|---|
| 1 | track_commission_emotion | 涙の依頼、ピアノ |
| 2 | track_crime_scene_tense | ベイズ解剖 |
| 3 | track_investigation_pulse | 計算の妙 |
| 4 | track_deduction_revelation → track_villain_theme | 鳴神の苦悩、悲哀のテーマ |
| 5 | track_solution_calm | 救済 |

| イベント | SE |
|---|---|
| Iris Labsロゴ発覚 | se_omen_drone |
| 鳴神の告白 | se_emotional_strike |
| きららの似顔絵プレゼント | se_warm_chime |
