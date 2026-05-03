# 10. ケース7：A/Bテストの欺瞞 - p値ハッキングの罪

## 📊 統計範囲
- **主**：仮説検定、帰無仮説/対立仮説、p値、母平均の差の検定、多重比較問題
- **副**：t分布、第1種・第2種の過誤の応用

## 🎬 ストーリー概要

大手ECサイト『**Picgrm Mall**』の新人マーケター・**白瀬ノエル**（24歳）が「上司に命じられて、新デザインの売上UP効果（p<0.05！）を経営会議で発表したら、後でデータが嘘だったと分かって会社をクビになりそう」と泣きついてくる。

**二段オチ構造**：
- 表向き：「白瀬の上司が悪い」
- 真相：上司は組織から派遣された「データコンサルタント」**紫紋ヴィオラ**（七幹部「指南者」）。彼女は数十社の企業に同じ手法を仕込み、企業をハメて買収する利益を組織に貢いでいた

**伏線**：紫紋ブローチ（虫眼鏡型）の中に「3つの目」が彫られている。探偵が「ようやく繋がった」と組織の存在を確信

## 👥 登場キャラクター
- 蛇道シェルロック（探偵）
- ヒナタ・アカリ（助手）
- **白瀬ノエル**（依頼人・24歳・新人マーケター）
  - ショートカット、銀ぶちメガネ、白いシャツに黒のジャケット、ドライで早口
  - 涙より怒りが先に出るタイプ
- **紫紋ヴィオラ**（黒幕「指南者」・40代女性コンサルタント）

---

## 📝 詳細スクリプト

### 第1幕：依頼【経営会議の崩壊】

🎵 **BGM: track_commission_political**

#### Step c-01
- type: `narrative`, speaker: `narrator`
- 「金曜日、夜8時。事務所に駆け込んできたのは、走ってきたのか息を切らした若い女性」

#### Step c-02
- type: `dialogue`, speaker: `client`, expression: `angry`, showPortrait: true
- 「白瀬ノエルです、24歳、Picgrm Mall マーケ部所属。**月曜の経営会議で私、終わるんです。助けてください**」

#### Step c-03
- type: `dialogue`, speaker: `detective`, expression: `neutral`
- 「順を追って話してくれ。何があった」

#### Step c-04
- type: `dialogue`, speaker: `client`, expression: `angry`
- 「先週の経営会議で『新デザイン版で売上が**12%向上**、p値0.03、有意差あり』って発表したんです。**役員全員賞賛、私のキャリアは輝かしいはずだった**」

#### Step c-05
- type: `dialogue`, speaker: `client`, expression: `distraught`
- 「ところが今日、別チームのエンジニアから『**ノエルさん、あれ40通りのテストの中から「たまたま有意になった2つだけ」を選んで報告したよね？**』って指摘されて」

#### Step c-06
- type: `dialogue`, speaker: `client`, expression: `worried`
- 「**40通り？私、3通りしか走らせてないつもりだったんです**……でも、上司の紫紋さんが『他のテストも回しておいたから、結果まとめて報告して』って」

#### Step c-07
- type: `dialogue`, speaker: `client`, expression: `angry`
- 「月曜の続報会議で、別エンジニアが『**ノエルの報告は p値ハッキングです**』って告発するって。**私、何も知らずにやらされた**」

#### Step c-08
- type: `dialogue`, speaker: `detective`, expression: `thinking`
- 「『p値ハッキング』、か——興味深い事件だ。**統計検定の哲学そのものを悪用する手法**」

---

### 第2幕：現場【p値の意味を解剖】

🎵 **BGM: track_crime_scene_tense**

#### Step s-01
- type: `mini_lesson`, speaker: `detective`
- content: '【仮説検定】帰無仮説と対立仮説\n\n- 帰無仮説 H₀：「差がない」「効果がない」\n- 対立仮説 H₁：「差がある」「効果がある」\n\n検定では H₀ を**棄却**できれば「差がある」と結論できる。'

#### Step s-02
- type: `mini_lesson`, speaker: `detective`
- content: '【p値】\n\np値 = 「H₀ が真だと仮定したときに、観測されたデータ以上に極端な結果が起きる確率」\n\n慣例：p < 0.05 なら「有意差あり」と判定（しかしこれは**約束事**であって絶対ではない）'

#### Step s-03
- type: `dialogue`, speaker: `detective`, expression: `neutral`
- 「白瀬さん。**p < 0.05 とは『偶然そう見える確率が5%未満』**だ。逆に言えば、**何度もテストすれば、20回に1回は偶然p<0.05が出る**」

#### Step s-04
- type: `interactive`
- content: '🎲 もしH₀が真（=本当は差がない）でも、20回独立に検定すると少なくとも1回p<0.05になる確率は？'
- interaction: `slider_estimate`
  - question: '少なくとも1回は p<0.05 になる確率（％）'
  - min: 0, max: 100, step: 1, correctAnswer: 64, tolerance: 5, unit: '%'
- hints:
  - level1: '余事象で考える。「20回全てp≥0.05」になる確率は？'
  - level2: '(0.95)^20 を電卓で計算'
  - level3: '(0.95)^20 ≈ 0.358。1からこれを引いた値をパーセントに'

#### Step s-05
- type: `dialogue`, speaker: `detective`, expression: `neutral`
- 「**約64%**だ。20回テストを並行すれば、3人に2人は『偶然の有意差』を1つ以上発見する。これが**多重比較問題**の本質」

#### Step s-06
- type: `dialogue`, speaker: `client`, expression: `eureka`
- 「**40通りもテストすれば、ほぼ必ず偶然の有意差が見つかる**……それを『有意な結果』として報告すれば、嘘の効果が真実っぽくなる」

#### Step s-07
- type: `dialogue`, speaker: `detective`, expression: `neutral`
- 「**それがp値ハッキングだ**。学術界でも問題になっている『再現性危機』の元凶でもある」

---

### 第3幕：捜査【t検定の手計算】

🎵 **BGM: track_investigation_pulse**

#### Step i-01
- type: `mini_lesson`, speaker: `detective`
- content: '【1標本t検定】\n\n母平均μ₀の検定。標本平均 x̄、標本標準偏差 s、サンプルサイズ n から'
- formula: `t = \\frac{\\bar{x} - \\mu_0}{s/\\sqrt{n}}`

#### Step i-02
- type: `dialogue`, speaker: `detective`, expression: `neutral`
- 「白瀬さん、君が報告したテスト1の数値を確認させてくれ」

#### Step i-03
- type: `dialogue`, speaker: `client`, expression: `worried`
- 「えっと……従来デザインの平均購入額μ₀=10000円。新デザインの標本（n=100）の平均は11200円、標準偏差は5500円でした」

#### Step i-04
- type: `interactive`
- content: '🧮 t値を計算しよう'
- interaction: `formula_builder`
  - segments:
    - { kind: 'text', text: 't = (' }
    - { kind: 'slot', id: 's1' }
    - { kind: 'text', text: ' − 10000) / (' }
    - { kind: 'slot', id: 's2' }
    - { kind: 'text', text: ' / √' }
    - { kind: 'slot', id: 's3' }
    - { kind: 'text', text: ') = ' }
    - { kind: 'slot', id: 's4' }
  - chips:
    - { id: 'c1', label: '11200', correctSlot: 's1' }
    - { id: 'c2', label: '5500', correctSlot: 's2' }
    - { id: 'c3', label: '100', correctSlot: 's3' }
    - { id: 'c4', label: '2.18', correctSlot: 's4' }
- hints:
  - level1: '分子 = 1200, 分母 = 5500/10 = 550'
  - level2: '1200 / 550 を電卓で計算'
  - level3: '商はおおむね2と少し。1.98のしきい値を越えるかどうかを意識して'

#### Step i-05
- type: `interactive`
- content: '統計数値表ビューア：t分布表でdf=99のときp<0.05に対応するtの値を確認'
- interaction: `choice`
- options:
  - ❌ 1.66
  - ✅ 約 1.98（df=99, 両側α=0.05）
  - ❌ 2.58
  - ❌ 3.00

#### Step i-06
- type: `dialogue`, speaker: `detective`, expression: `neutral`
- 「**t = 2.18 > 1.98**。p < 0.05、確かに有意差あり。**統計的には正しい計算**だ」

#### Step i-07
- type: `dialogue`, speaker: `client`, expression: `worried`
- 「じゃあ、なんで……」

#### Step i-08
- type: `dialogue`, speaker: `detective`, expression: `neutral`
- 「**問題は、計算ではない。テストの設計だ**」

---

### 第4幕：推理【指南者・紫紋ヴィオラ】

🎵 **BGM: track_deduction_revelation → track_villain_theme**

#### Step d-01
- type: `narrative`, speaker: `narrator`
- 「土曜日。探偵と白瀬は、Picgrm Mall本社に乗り込んだ。会議室で待っていたのは、紫の髪を持つ女性」

#### Step d-02
- type: `dialogue`, speaker: `boss_pvalue`, expression: `smug`, showPortrait: true
- 「あら、データ探偵さん。マーケ部統括コンサルタントの**紫紋ヴィオラ**ですわ。ノエルくんに何か用事？」

#### Step d-03
- type: `dialogue`, speaker: `client`, expression: `angry`
- 「紫紋さん！あなた、**40通りのテストを並行で走らせて、有意差が出た2つだけ私に報告させた**んですよね？」

#### Step d-04
- type: `dialogue`, speaker: `boss_pvalue`, expression: `smug`
- 「あらあら、若いマーケターちゃんは元気でいいわね。**多重比較？私、計算は完璧よ。それぞれ独立に検定したから問題ない**」

#### Step d-05
- type: `dialogue`, speaker: `detective`, expression: `neutral`
- 「紫紋さん。**多重比較を意図的に隠して『有意な2つだけ』を報告するのは、p値ハッキングだ。学術不正と同じ**」

#### Step d-06
- type: `dialogue`, speaker: `boss_pvalue`, expression: `smug`
- 「**学術不正？お笑い草だわ**。これはビジネスよ。経営判断をサポートするためのデータ分析。**学者の話は私たちには関係ない**」

#### Step d-07
- type: `dialogue`, speaker: `detective`, expression: `neutral`
- 「ビジネスでも同じだ。**偽の有意差で経営判断をすれば、企業は損失を被る**」

#### Step d-08
- type: `dialogue`, speaker: `boss_pvalue`, expression: `smug`
- 「ふふ……そうね。**でも、損失を被るのは Picgrm Mall。私の組織にとっては、Picgrm Mall を弱らせて買収するのが目的なの**」

#### Step d-09
- type: `dialogue`, speaker: `client`, expression: `shocked`
- 「**買収……？**会社を弱らせて、買収する……ためだけに、私を……」

#### Step d-10
- type: `narrative`, speaker: `narrator`
- 「（紫紋は不機嫌そうにブローチを触った。**銀の虫眼鏡型ブローチ**——その内側に、レンズの中に**3つの目**が彫られているのが、ちらっと見えた）」

#### Step d-11
- type: `dialogue`, speaker: `detective`, expression: `thinking`
- 「（**3つの目**——ようやく繋がった。氷室、雷童寺の祝祭、鳴神、そしてあなた。**全員、同じ組織だ**）」

#### Step d-12
- type: `dialogue`, speaker: `detective`, expression: `neutral`
- 「紫紋さん。組織の名前を教えてもらおうか」

#### Step d-13
- type: `dialogue`, speaker: `boss_pvalue`, expression: `smug`
- 「ふふ。**もうそろそろ、知っていい時期かしら**——『**データ・カルテル**』。世界中の数字とアルゴリズムを支配する、私たちの組織よ」

#### Step d-14
- type: `dialogue`, speaker: `boss_pvalue`, expression: `smug`
- 「七幹部のうち、あなた、もう3人を片付けたんですってね、データ探偵さん。**残り、私を入れて4人**。**頑張れるかしら？**」

#### Step d-15
- type: `dialogue`, speaker: `detective`, expression: `neutral`
- 「全員、片付ける」

#### Step d-16
- type: `dialogue`, speaker: `client`, expression: `eureka`
- 「**待って、私もその組織を倒すお手伝いがしたい**！私を陥れた組織なんて、絶対に許せない！」

#### Step d-17
- type: `dialogue`, speaker: `detective`, expression: `neutral`
- 「白瀬。データを読める若手は、**今この国で最も貴重な資源だ**。歓迎する」

---

### 第5幕：解決【p値ハッキングの清算とボス問題】

🎵 **BGM: track_solution_calm**

#### Step sol-01
- type: `narrative`, speaker: `narrator`
- 「月曜日の経営会議。白瀬は自ら『先週の発表は40通りのテストから恣意的に選んだ結果でした』と告白。紫紋の指示メールも証拠として提出。紫紋は契約解除、警察に告発される」

#### Step sol-02
- type: `dialogue`, speaker: `client`, expression: `hopeful`, showPortrait: true
- 「探偵さん、**降格は免れませんでしたが、クビは回避できました**。それより、組織を倒す方が大事です。何でも手伝います」

#### Step sol-03
- type: `dialogue`, speaker: `detective`, expression: `neutral`
- 「賢明だ」

#### Step sol-04
- type: `mini_lesson`, speaker: `detective`
- content: '【教訓】p値ハッキングを見抜く3原則\n\n① **何通りのテストを並行で走らせたか**確認\n② 「有意な結果だけ」が報告されていないかチェック\n③ **事前登録**（テスト前に仮説を宣言）の有無を確認'

#### Step sol-05 (BOSS QUIZ 1)
- type: `interactive`
- content: '【ボス問題1/3】帰無仮説 H₀: μ=50 を、n=100, x̄=52, s=10 で両側検定する。t値は？'
- interaction: `choice`
- options:
  - ❌ t = 0.2
  - ✅ t = 2.0
  - ❌ t = 20
  - ❌ t = 0.02

#### Step sol-06 (BOSS QUIZ 2)
- type: `interactive`
- content: '【ボス問題2/3】20回独立に検定して少なくとも1回 p<0.05 になる確率は？'
- interaction: `choice`
- options:
  - ❌ 5%
  - ❌ 100%
  - ✅ 約64%
  - ❌ 約20%

#### Step sol-07 (BOSS QUIZ 3)
- type: `interactive`
- content: '【ボス問題3/3】「第2種の過誤（β）」とは何か？'
- interaction: `choice`
- options:
  - ❌ 帰無仮説が真なのに棄却してしまう過誤
  - ✅ 対立仮説が真なのに帰無仮説を棄却できなかった過誤
  - ❌ サンプルが少ない過誤
  - ❌ 計算ミスの過誤

#### Step sol-08 (FORESHADOW)
- type: `narrative`, speaker: `narrator`
- 「（事務所のホワイトボード。探偵は『**紫紋ヴィオラ（指南者）**』にバツ印を付けた。**残る幹部は4人**。そして、ボードの右上には小さく『**幽鬼丸**』の名前——これは紫紋から尋問で得た情報だ）」

#### Step sol-09
- type: `dialogue`, speaker: `akari`, expression: `worried`
- 「探偵さん……『幽鬼丸』って、組織のトップですか？」

#### Step sol-10
- type: `dialogue`, speaker: `detective`, expression: `thinking`
- 「（その名前を、**俺は20年前から知っている**）」

#### Step sol-11
- type: `dialogue`, speaker: `detective`, expression: `neutral`
- 「事件 No.007——**解決。だが、戦いはここからが本番だ**」

---

## 🎵 BGM・SE指示

| 幕 | BGM ID | 雰囲気 |
|---|---|---|
| 1 | track_commission_political | キャリア危機、緊迫 |
| 2 | track_crime_scene_tense | p値の解剖 |
| 3 | track_investigation_pulse | t検定計算 |
| 4 | track_deduction_revelation → track_villain_theme | 紫紋登場・組織の正体 |
| 5 | track_solution_calm + track_omen_outro | 余韻＋幽鬼丸の名前 |

| イベント | SE |
|---|---|
| ブローチ拡大 | se_omen_drone（強調） |
| 「データ・カルテル」と発言 | se_reveal_strike |
| 「幽鬼丸」の名前 | se_omen_drone（最大級） |
