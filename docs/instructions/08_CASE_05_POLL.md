# 08. ケース5：世論調査の罠 - 80%支持の真実

## 📊 統計範囲
- **主**：標本調査法（無作為抽出 vs 偏った抽出）、サンプリングバイアス、母比率の区間推定
- **副**：中心極限定理、標本サイズと信頼区間の関係

## 🎬 ストーリー概要

新興政党『**未来党**』党首・**雷童寺源蔵**（57歳）が「Fluttrの投票で支持率80%」を盾に当選を確信。だが対立候補陣営の選挙参謀**深津カオリ**（38歳）が「あの調査は明らかにおかしい」と探偵に依頼。調査の結果、投票は深夜2時〜4時に雷童寺の公式アカウントで実施——熱狂的支持者しか投票していなかった（サンプリングバイアス）。探偵が無作為抽出で全国1000人に調査すると支持率は実は28%。

**二段オチ構造**：
- 表向き：「雷童寺がインチキ調査をやっている」
- 真相：偏った調査を仕掛けたのは雷童寺本人ではなく、彼を当選させて利用しようとする組織だった。雷童寺は使い捨ての駒。彼自身も「自分の支持率は本物だ」と信じ切っていた被害者

**伏線**：雷童寺のバッジ（赤い棒グラフ模様）の3本のバーが、実は「3つの目」を抽象化したデザイン。あかりが気づく

## 👥 登場キャラクター
- 蛇道シェルロック（探偵）
- ヒナタ・アカリ（助手）
- **深津カオリ**（依頼人・38歳・対立候補の選挙参謀）
  - 黒のパンツスーツ、髪を後ろで一本に縛った切れ者
  - 元・大手新聞記者、データに強い
- **雷童寺源蔵**（一見の犯人だが実は被害者・57歳・新興政党党首）
- **影の戦略家「祝祭」**（真の黒幕、ラスト寸前で姿だけ見せる）

---

## 📝 詳細スクリプト

### 第1幕：依頼【選挙3日前】

🎵 **BGM: track_commission_political**（緊迫した政治テーマ）

#### Step c-01
- type: `narrative`, speaker: `narrator`
- 「衆議院選挙3日前。事務所のドアを叩いたのは、黒のパンツスーツに身を包んだ女性」

#### Step c-02
- type: `dialogue`, speaker: `narrator`
- 「彼女は名刺を出した：『**選挙対策事務所 深津カオリ**』」

#### Step c-03
- type: `dialogue`, speaker: `client`, expression: `worried`
- 「私は、無所属で出馬している山本徹候補の選対参謀です。**未来党の雷童寺源蔵**——あいつの世論調査が、明らかにイカサマなんです」

#### Step c-04
- type: `dialogue`, speaker: `client`, expression: `worried`
- 「『Fluttr上で実施した世論調査で支持率80%』って、**毎日テレビで流してる**。うちの山本は5%。このままだと負けます」

#### Step c-05
- type: `dialogue`, speaker: `detective`, expression: `thinking`
- 「Fluttrの世論調査……ふむ。**実施方法を見せてくれ**」

#### Step c-06
- type: `dialogue`, speaker: `client`, expression: `worried`
- 「これです。雷童寺の公式アカウントに投稿された投票機能。『未来党を支持しますか？はい/いいえ』」

#### Step c-07
- type: `dialogue`, speaker: `akari`, expression: `worried`
- 「えっ、これ……雷童寺さんのアカウントで投票してるんですか？じゃあ、**雷童寺さんのフォロワーしか投票しないですよね？**」

#### Step c-08
- type: `dialogue`, speaker: `detective`, expression: `neutral`
- 「アカリ、見事だ。**それが、サンプリングバイアスの典型例だ**」

---

### 第2幕：現場【サンプリングバイアスの解剖】

🎵 **BGM: track_crime_scene_tense**

#### Step s-01
- type: `mini_lesson`, speaker: `detective`
- content: '【データ収集法】サンプリングバイアス\n\n標本（サンプル）の選び方が偏ると、母集団（全体）の真の姿は見えない。\n\n例：「ラジオ番組で電話投票」→ ラジオを聞く人しか投票しない'

#### Step s-02
- type: `dialogue`, speaker: `detective`, expression: `neutral`
- 「雷童寺の調査の問題点は、**3つ**ある。①投票場所、②投票時間、③投票者属性」

#### Step s-03
- type: `interactive`
- content: '雷童寺の調査の偏りはどれ？該当するものを全て選ぼう'
- interaction: `evidence_matcher`（変則・複数正解）
  - 偏りの原因として正しいもの全てに○
  - 候補：'雷童寺アカウントのフォロワー限定', '深夜2〜4時という時間帯', 'ヤフー知恵袋でも実施', 'Fluttrアプリ利用者限定'
  - 正解：1, 2, 4
- hints:
  - level1: 「雷童寺の支持者だけが投票する状況を考えよう」
  - level2: 「『誰のアカウント上か』『何時か』『どのアプリか』、それぞれの偏りに注目」
  - level3: 「4つの選択肢のうち、雷童寺の支持者しか投票できない仕掛けになっているものを探そう。3つあるはず」

#### Step s-04
- type: `dialogue`, speaker: `client`, expression: `eureka`
- 「**深夜2〜4時**……熱狂的支持者か、不眠症の人くらいしか起きてないですよね」

#### Step s-05
- type: `dialogue`, speaker: `detective`, expression: `neutral`
- 「その通りだ。**この調査の母集団は『雷童寺を熱狂的に支持し、深夜にFluttrを開く層』**——日本国民全体ではない」

#### Step s-06
- type: `mini_lesson`, speaker: `detective`
- content: '【データ収集法】無作為抽出（Random Sampling）\n\n母集団の全員に等しい確率で選ばれるチャンスを与える方法。これが世論調査の基本。\n\n他の方法：\n- 層化抽出：年齢・地域などで層に分け、各層から無作為に\n- 系統抽出：番号順に等間隔で選ぶ'

---

### 第3幕：捜査【正しい世論調査の実施】

🎵 **BGM: track_investigation_pulse**

#### Step i-01
- type: `dialogue`, speaker: `detective`, expression: `neutral`
- 「対抗手段はある。**全国の有権者から無作為に1000人を選んで電話調査する**。3日もあれば結果が出る」

#### Step i-02
- type: `dialogue`, speaker: `client`, expression: `worried`
- 「予算が……」

#### Step i-03
- type: `dialogue`, speaker: `detective`, expression: `neutral`
- 「私の知人の世論調査会社に頼める。料金は後払いでいい」

#### Step i-04
- type: `narrative`, speaker: `narrator`
- 「2日後。1000人の無作為抽出による電話調査の結果が出た」

#### Step i-05
- type: `interactive`
- content: '調査結果：1000人中、未来党支持と答えたのは何人？'
- interaction: `slider_estimate`
  - question: 'もし真の支持率が28%なら、1000人中何人？'
  - min: 0, max: 1000, step: 10, correctAnswer: 280, tolerance: 30, unit: '人'
- hints:
  - level1: 「1000 × 0.28」
  - level2: 「比率に総数を掛ける」
  - level3: 「百の位が2、十の位が8。3桁の数」

#### Step i-06
- type: `dialogue`, speaker: `detective`, expression: `neutral`
- 「結果は**280人。標本支持率28%**」

#### Step i-07
- type: `dialogue`, speaker: `client`, expression: `shocked`
- 「**80%と28%！？**そんなに違うんですか！」

#### Step i-08
- type: `mini_lesson`, speaker: `detective`
- content: '【標本分布】中心極限定理\n\nサンプルサイズn（十分大きい）の標本平均は、母集団の分布によらず正規分布に近づく。'

#### Step i-09
- type: `mini_lesson`, speaker: `detective`
- content: '【母比率の区間推定】\n\n標本比率 p̂、サンプル数 n に対して、95%信頼区間は'
- formula: `\\hat{p} \\pm 1.96 \\sqrt{\\frac{\\hat{p}(1-\\hat{p})}{n}}`

#### Step i-10
- type: `interactive`
- content: '🧮 標本支持率28%、サンプル数1000の95%信頼区間の幅（±何%）を計算しよう'
- interaction: `slider_estimate`
  - question: '±何ポイント？（小数第1位）'
  - min: 0, max: 10, step: 0.1, correctAnswer: 2.8, tolerance: 0.3, unit: '%'
- hints:
  - level1: '1.96 × √(0.28×0.72÷1000)'
  - level2: '√(0.2016÷1000) = √0.0002016 ≈ 0.0142'
  - level3: '1.96 × 0.0142 を計算し、パーセント表示に'

#### Step i-11
- type: `dialogue`, speaker: `detective`, expression: `neutral`
- 「未来党の真の支持率は、**95%の確率で 25.2%〜30.8% の範囲**にある。80%という数字は、完全に偽物だ」

#### Step i-12
- type: `interactive`
- content: '統計数値表ビューア：標準正規分布表で「Z = 1.96 のとき α = 0.025」を確認しよう'
- interaction: `formula_builder`（数値表を見ながら式を組む）
  - segments:
    - { kind: 'text', text: '95%信頼区間の係数 = ' }
    - { kind: 'slot', id: 's1' }
  - chips:
    - { id: 'c1', label: '1.96', correctSlot: 's1' }
    - { id: 'c2', label: '2.58' }
    - { id: 'c3', label: '1.65' }
- hints:
  - level1: '95%信頼区間ならα=0.05、両側で0.025ずつ'
  - level2: '標準正規分布表で累積確率0.975に対応するZの値'
  - level3: '表で「.97_0」のあたりを探す。2より少し小さい値'

---

### 第4幕：推理【駒だった政治家】

🎵 **BGM: track_deduction_revelation**

#### Step d-01
- type: `narrative`, speaker: `narrator`
- 「探偵と深津は、雷童寺の選挙事務所に乗り込んだ」

#### Step d-02
- type: `dialogue`, speaker: `boss_poll`, expression: `smug`, showPortrait: true
- 「おお、何用ですかな！未来党党首・雷童寺源蔵だ！**支持率80%、当選確実だ！**」

#### Step d-03
- type: `dialogue`, speaker: `detective`, expression: `neutral`
- 「雷童寺さん。あなたの『支持率80%』は、深夜2〜4時に自分のフォロワーだけに行った投票です。これは、母集団の偏った標本に過ぎない」

#### Step d-04
- type: `dialogue`, speaker: `boss_poll`, expression: `worried`
- 「な、何を言うか！80%は私の正当な支持率だ！」

#### Step d-05
- type: `dialogue`, speaker: `detective`, expression: `neutral`
- 「全国1000人の無作為抽出調査による真の支持率は、**28%（信頼区間 25.2〜30.8%）**だ」

#### Step d-06
- type: `dialogue`, speaker: `boss_poll`, expression: `shocked`, showPortrait: true
- 「**28……%……？**そんなはず……だって、私のSNSは毎日数万件のいいねが……」

#### Step d-07
- type: `dialogue`, speaker: `akari`, expression: `worried`
- 「あの……雷童寺さん。あなたのSNS運営って、**誰が指揮してるんですか？**」

#### Step d-08
- type: `dialogue`, speaker: `boss_poll`, expression: `worried`
- 「うちの選対戦略アドバイザー……『**祝祭**（しゅくさい）』って通り名の女性だ。本名は教えてもらってないが、**腕は確かで**……」

#### Step d-09
- type: `dialogue`, speaker: `detective`, expression: `thinking`
- 「（祝祭……組織の七幹部の一人か。雷童寺は使われていただけだ）」

#### Step d-10
- type: `dialogue`, speaker: `akari`, expression: `eureka`
- 「探偵さん！見て！**雷童寺さんのバッジ！**」

#### Step d-11
- type: `narrative`, speaker: `narrator`
- 「（カメラがバッジをアップにする。赤い棒グラフ模様の3本のバー——よく見ると、3本のバーの上端は丸く、まるで**3つの目が並んでいる**ように見える）」

#### Step d-12
- type: `dialogue`, speaker: `detective`, expression: `neutral`
- 「雷童寺さん、そのバッジ、誰からもらった？」

#### Step d-13
- type: `dialogue`, speaker: `boss_poll`, expression: `worried`
- 「祝祭からだ。『党のシンボル』だと言って……」

#### Step d-14
- type: `dialogue`, speaker: `detective`, expression: `neutral`
- 「**雷童寺さん、あなたは騙されている**。あなたを操っていたのは、より大きな組織だ」

#### Step d-15
- type: `dialogue`, speaker: `boss_poll`, expression: `defeated`, showPortrait: true
- 「……まさか……俺の選挙、全部……」

---

### 第5幕：解決【真実の選挙とボス問題】

🎵 **BGM: track_solution_calm → track_solution_uplift**

#### Step sol-01
- type: `narrative`, speaker: `narrator`
- 「翌日、深津は無作為抽出調査の結果をプレスリリースで公表。各メディアが『未来党の支持率80%は虚偽』と報道。**選挙結果、雷童寺は落選**。山本徹候補が当選した」

#### Step sol-02
- type: `dialogue`, speaker: `client`, expression: `hopeful`, showPortrait: true
- 「探偵さん、ありがとうございました。**民主主義は、数字の正しさで守られているんですね**」

#### Step sol-03
- type: `dialogue`, speaker: `detective`, expression: `neutral`
- 「数字を読める人間が増えれば、世の中はもう少し正直になる」

#### Step sol-04
- type: `mini_lesson`, speaker: `detective`
- content: '【教訓】世論調査の真実を見抜く3原則\n\n① **抽出方法**を確認（無作為か偏ったか）\n② **サンプルサイズ**を確認（n=1000なら誤差±3%程度）\n③ **信頼区間**で幅を表記しているかチェック'

#### Step sol-05 (BOSS QUIZ 1)
- type: `interactive`
- content: '【ボス問題1/3】「ラジオ番組で電話投票」の調査の問題点は？'
- interaction: `choice`
- options:
  - ❌ 投票数が多すぎる
  - ✅ ラジオを聞く層に偏ってサンプリングされている
  - ❌ 電話だと不正ができる
  - ❌ 平日に行ったから

#### Step sol-06 (BOSS QUIZ 2)
- type: `interactive`
- content: '【ボス問題2/3】n=1000で標本支持率p̂=0.40の95%信頼区間は？'
- interaction: `choice`
- options:
  - ❌ [0.35, 0.45]
  - ✅ [0.37, 0.43]
  - ❌ [0.30, 0.50]
  - ❌ [0.39, 0.41]

#### Step sol-07 (BOSS QUIZ 3)
- type: `interactive`
- content: '【ボス問題3/3】サンプルサイズを4倍にすると信頼区間の幅はどう変わる？'
- interaction: `choice`
- options:
  - ❌ 4倍に広がる
  - ❌ 同じ
  - ✅ √4 = 2 倍狭くなる
  - ❌ 半分の半分（4分の1）になる

#### Step sol-08 (FORESHADOW)
- type: `narrative`, speaker: `narrator`
- 「（事務所のホワイトボード。探偵は新しく『**祝祭**』の名前を書き込んだ。組織の七幹部のうち、判明したのは**氷室レイア（女王）**と**祝祭（首魁の影）**。残りはあと5人）」

#### Step sol-09
- type: `dialogue`, speaker: `akari`, expression: `worried`
- 「探偵さん……あの組織、本当に一人ずつ倒していくしかないんでしょうか」

#### Step sol-10
- type: `dialogue`, speaker: `detective`, expression: `neutral`
- 「**全員、暴く**。事件 No.005——解決」

---

## 🎵 BGM・SE指示

| 幕 | BGM ID | 雰囲気 |
|---|---|---|
| 1 | track_commission_political | 政治テーマ、太鼓 |
| 2 | track_crime_scene_tense | サンプリングバイアス解剖 |
| 3 | track_investigation_pulse | 全国調査 |
| 4 | track_deduction_revelation → track_villain_theme | 雷童寺の崩壊 |
| 5 | track_solution_uplift | 民主主義の勝利 |

| イベント | SE |
|---|---|
| バッジ拡大の瞬間 | se_omen_drone |
| 雷童寺崩壊 | se_emotional_strike |
