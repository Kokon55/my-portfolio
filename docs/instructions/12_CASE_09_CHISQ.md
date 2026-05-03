# 12. ケース9：消えた異常値 - カイ二乗検定で暴く偏り

## 📊 統計範囲
- **主**：適合度検定、独立性の検定、カイ二乗分布、自由度、観測度数と期待度数
- **副**：クロス集計表、カテゴリカルデータ

## 💡 ヒント設計指針（このケース全般）
- Level 1：何を計算するかの方向性のみ
- Level 2：式の一部や着眼点を提示
- Level 3：手順を分解するが、最終計算はプレイヤーに残す

## 🎬 ストーリー概要

人気VTuber事務所『**ペガサスプロ**』所属の配信者・**閃光寺ペコ**（28歳、登録者100万人）が探偵事務所に駆け込む。「事務所が運営するガチャゲーで、**配信中は明らかに出やすく、視聴者が回すと出にくい**って炎上してます。私の配信、本当はイカサマ？」

探偵が1000回のガチャ結果から適合度検定でカイ二乗統計量を計算すると、p値は0.001未満。さらに**配信者ID×排出率**のクロス集計で独立性検定を行うと、特定の人気配信者だけ確率が10倍に設定されていた。閃光寺ペコもその一人。

**二段オチ構造**：
- 表向き：「事務所がイカサマしている」
- 真相：イカサマシステムを設計したのは事務所の若き天才アルゴリズムエンジニア・**絶対零度ユキ**（七幹部「算法の魔女」）。彼女は「配信者は再生数を稼ぐ家畜」と公言する冷酷なキャラだが、最終的にペコの「配信を愛する気持ち」に揺さぶられる

**伏線**：絶対零度ユキの両耳に3つずつLEDピアス、合計6個（3+3）で「3つの目」を二重に表現。クロウ・サトウが情報提供者として再登場、決定的証拠を持ち込む

## 👥 登場キャラクター
- 蛇道シェルロック（探偵）
- ヒナタ・アカリ（助手）
- 白瀬ノエル（再登場、データ解析担当）
- クロウ・サトウ（情報提供者として再登場）
- **閃光寺ペコ**（依頼人・28歳・人気VTuber）
  - 中身は素朴な田舎出身、配信ではハイテンションだが私生活は地味
  - 配信用衣装は派手だが、私服はジャージ
- **絶対零度ユキ**（黒幕「算法の魔女」・28歳・天才エンジニア）

---

## 📝 詳細スクリプト

### 第1幕：依頼【人気VTuberの素顔】

🎵 **BGM: track_commission_emotion**（切ないピアノ）

#### Step c-01
- type: `narrative`, speaker: `narrator`
- 「土曜日の夜11時。ジャージ姿の女性が、フードを深く被って事務所に駆け込んできた」

#### Step c-02
- type: `dialogue`, speaker: `client`, expression: `worried`, showPortrait: true
- 「あの……閃光寺ペコっていう、ええと、VTuberなんですけど、ばれずに来れたかな……」

#### Step c-03
- type: `dialogue`, speaker: `akari`, expression: `eureka`
- 「**えっ、登録者100万人の閃光寺ペコさん！？**私、配信観てます！」

#### Step c-04
- type: `dialogue`, speaker: `client`, expression: `worried`
- 「ありがとうございます……あの、**今すごく炎上してて**……」

#### Step c-05
- type: `dialogue`, speaker: `client`, expression: `distraught`
- 「『**閃光寺ペコがガチャ配信すると、明らかに出やすい！イカサマしてる！**』ってSNSで叩かれてるんです。私、まったく心当たりが無くて……」

#### Step c-06
- type: `dialogue`, speaker: `client`, expression: `distraught`
- 「事務所には聞いたんですけど『そんなことはない、ただの偶然だ』って。でも、**もし本当にイカサマしてたら、私の100万人の登録者は嘘の上に立ってるってこと**」

#### Step c-07
- type: `dialogue`, speaker: `detective`, expression: `thinking`
- 「閃光寺さん、君の配信での排出データはあるか？」

#### Step c-08
- type: `dialogue`, speaker: `client`, expression: `worried`
- 「視聴者が記録してくれてました。**私の配信回数：350回。私が引いた回数：1000回。☆5排出は……57回出てます**」

#### Step c-09
- type: `dialogue`, speaker: `detective`, expression: `thinking`
- 「（探偵が暗算した）……表記確率1%なら、1000回で期待値は10。**観測57回。これは、明らかに**——」

#### Step c-10
- type: `dialogue`, speaker: `detective`, expression: `neutral`
- 「**カイ二乗検定で証明できる**」

---

### 第2幕：現場【適合度検定の解剖】

🎵 **BGM: track_crime_scene_tense**

#### Step s-01
- type: `mini_lesson`, speaker: `detective`
- content: '【適合度検定（カイ二乗検定）】\n\n観測度数 O が、期待度数 E に「適合しているか」を判定する手法。\n\nカイ二乗統計量：'
- formula: `\\chi^2 = \\sum \\frac{(O_i - E_i)^2}{E_i}`

#### Step s-02
- type: `dialogue`, speaker: `detective`, expression: `neutral`
- 「閃光寺さんのケースで考えよう。**☆5の観測度数 O = 57、表記確率1%なら期待度数 E = 10**。これがどれくらい異常か、カイ二乗統計量で測る」

#### Step s-03
- type: `interactive`
- content: '🧮 ☆5/☆4以下の2分類で、カイ二乗統計量を計算しよう（観測：☆5=57, ☆4以下=943 / 期待：☆5=10, ☆4以下=990）'
- interaction: `formula_builder`
  - segments:
    - { kind: 'text', text: 'χ² = (' }
    - { kind: 'slot', id: 's1' }
    - { kind: 'text', text: ')² / 10 + (' }
    - { kind: 'slot', id: 's2' }
    - { kind: 'text', text: ')² / 990 ≈ ' }
    - { kind: 'slot', id: 's3' }
  - chips:
    - { id: 'c1', label: '57-10', correctSlot: 's1' }
    - { id: 'c2', label: '943-990', correctSlot: 's2' }
    - { id: 'c3', label: '223', correctSlot: 's3' }
    - { id: 'c4', label: '47×47=2209' }
- hints:
  - level1: '観測値と期待値の差を、それぞれの期待値で割った2乗を足す'
  - level2: '差は ☆5側で 47、☆4以下側で −47。それぞれ2乗してそれぞれの期待値で割る'
  - level3: '47² = 2209 を、まず10で割り、次に990で割って、両方を足し合わせる'

#### Step s-04
- type: `dialogue`, speaker: `detective`, expression: `neutral`
- 「**χ² ≈ 223**。自由度1のカイ二乗分布で、p値は0.001未満。**偶然この差が出る確率は1000回に1回未満**」

#### Step s-05
- type: `dialogue`, speaker: `client`, expression: `shocked`, showPortrait: true
- 「えっ……**それって、私の配信、本当にイカサマしてたってこと？**」

#### Step s-06
- type: `dialogue`, speaker: `detective`, expression: `neutral`
- 「**事務所が**、だ。君の意思とは関係ない」

#### Step s-07
- type: `interactive`
- content: '統計数値表ビューア：自由度1のカイ二乗分布表で、χ² > 6.63 ならどんな結論が出る？'
- interaction: `choice`
- options:
  - ❌ 帰無仮説を採択する
  - ✅ p < 0.01 で帰無仮説を棄却（=表記確率と観測度数は適合しない）
  - ❌ サンプルサイズを増やす必要がある
  - ❌ 結論は出せない

---

### 第3幕：捜査【独立性検定で配信者を特定】

🎵 **BGM: track_investigation_pulse**

#### Step i-01
- type: `narrative`, speaker: `narrator`
- 「事務所の前に立つと、見覚えのある男が待っていた」

#### Step i-02
- type: `dialogue`, speaker: `sato`, expression: `neutral`, showPortrait: true
- 「クロウ・サトウだ。**Vutubeの中の人として、こいつを渡しに来た**」

#### Step i-03
- type: `dialogue`, speaker: `sato`, expression: `neutral`
- 「ペガサスプロのガチャ運営ログだ。**配信者ID別の☆5排出回数**——内部告発者からのリーク」

#### Step i-04
- type: `dialogue`, speaker: `detective`, expression: `thinking`
- 「ありがたい。**独立性検定**にかける」

#### Step i-05
- type: `mini_lesson`, speaker: `detective`
- content: '【独立性検定】\n\n2つのカテゴリ変数 X, Y が独立かどうかを検定する。\n\n- 帰無仮説 H₀：「X と Y は独立（=排出率は配信者IDと無関係）」\n- クロス集計表で観測度数と期待度数を比較\n\n自由度：(行数 − 1) × (列数 − 1)'

#### Step i-06
- type: `interactive`
- content: 'クロス集計表（配信者ID × ☆5/☆4以下）。期待度数を計算して χ² を求めよう'
- interaction: `evidence_matcher`（変則：4配信者×2の表で計算する）
  - 配信者A（一般）：☆5 = 12 / ☆4以下 = 988 / 計1000
  - 配信者B（人気）：☆5 = 47 / ☆4以下 = 953 / 計1000
  - 配信者C（一般）：☆5 = 9 / ☆4以下 = 991 / 計1000
  - 配信者D（人気）：☆5 = 52 / ☆4以下 = 948 / 計1000
  - 全体平均☆5率 ≈ 3%（4000回中120回）
- 設問：「期待度数（各配信者×☆5）」をクリックで埋める

#### Step i-07
- type: `dialogue`, speaker: `shirase`, expression: `eureka`
- 「（白瀬がデータを見ながら）**配信者BとDだけ、☆5率が10倍以上**！配信者IDと排出率は明らかに独立じゃないです！」

#### Step i-08
- type: `interactive`
- content: '🧮 自由度はいくつ？'
- interaction: `slider_estimate`
  - question: '自由度 (行数−1)×(列数−1)'
  - min: 1, max: 10, step: 1, correctAnswer: 3, tolerance: 0, unit: ''
- hints:
  - level1: '自由度の公式は (行−1) × (列−1)'
  - level2: '行は配信者4人、列は☆5/☆4以下の2分類'
  - level3: '4から1を引き、2から1を引き、それらを掛ける'

#### Step i-09
- type: `dialogue`, speaker: `detective`, expression: `neutral`
- 「**自由度3、χ² ≈ 200。p < 0.001**。配信者IDと排出率は完全に従属。**人気配信者だけ確率が高く設定されている**」

#### Step i-10
- type: `dialogue`, speaker: `client`, expression: `distraught`, showPortrait: true
- 「私……配信者Bじゃなくて、配信者**D**……」

#### Step i-11
- type: `dialogue`, speaker: `client`, expression: `distraught`
- 「**私の人気って、実力じゃなかったんだ……**ガチャがいつもよく出るから、視聴者が集まってきてただけ」

---

### 第4幕：推理【算法の魔女・絶対零度ユキ】

🎵 **BGM: track_deduction_revelation → track_villain_theme**

#### Step d-01
- type: `narrative`, speaker: `narrator`
- 「ペガサスプロの最上階。アルゴリズム室の扉を開けると、シルバーのロングポニーテール、左右の目の色が違う女性が、無数のモニターに囲まれて座っていた」

#### Step d-02
- type: `dialogue`, speaker: `boss_chisq`, expression: `neutral`, showPortrait: true
- 「絶対零度ユキ。アルゴリズムエンジニア。**何の用？**」

#### Step d-03
- type: `dialogue`, speaker: `detective`, expression: `neutral`
- 「**ペガサスプロのガチャ排出率を、配信者によって変えるアルゴリズムを設計したのは君か**」

#### Step d-04
- type: `dialogue`, speaker: `boss_chisq`, expression: `smug`
- 「ええ、私よ。**人気配信者のガチャ運を10倍にするアルゴリズム**。配信者は再生数を稼ぐ家畜だから、当然のメンテナンスでしょ」

#### Step d-05
- type: `dialogue`, speaker: `client`, expression: `angry`, showPortrait: true
- 「**家畜……？**私たち配信者を、家畜って言ったの？」

#### Step d-06
- type: `dialogue`, speaker: `boss_chisq`, expression: `smug`
- 「事実でしょう？視聴者数を稼ぐためにキャラクターを演じ、ガチャに金を払う視聴者を釣る。それが**メトリクスを稼ぐ存在**。家畜と何が違うの？」

#### Step d-07
- type: `dialogue`, speaker: `client`, expression: `angry`
- 「**違う！**私は家畜じゃない！**配信が好きだから、毎日12時間カメラの前にいるの！**視聴者にコメントもらうのが、本当に嬉しいから……」

#### Step d-08
- type: `dialogue`, speaker: `client`, expression: `distraught`
- 「**でも、その視聴者も、私のガチャ運が嘘だったから集まってきただけだったんだね**……」

#### Step d-09
- type: `dialogue`, speaker: `boss_chisq`, expression: `smug`
- 「ふふ、ようやく現実を理解したかしら？**アルゴリズムが配信者を作り、配信者が視聴者を作る**。すべては、私のコードの上で踊っているだけ」

#### Step d-10
- type: `narrative`, speaker: `narrator`
- 「（ユキの両耳でLEDピアスが赤く光る。3つずつ、計6個。それは——**「3つの目」を二重に重ねた、データ・カルテルの最高位の証**）」

#### Step d-11
- type: `dialogue`, speaker: `detective`, expression: `neutral`
- 「絶対零度ユキ。組織の七幹部の一人——『**算法の魔女**』。違うか？」

#### Step d-12
- type: `dialogue`, speaker: `boss_chisq`, expression: `smug`
- 「**正解。あなた、優秀ね、データ探偵**。あなたを家畜にできなかったのは、私の組織の唯一のミスね」

#### Step d-13
- type: `dialogue`, speaker: `client`, expression: `tired`
- 「ユキさん……」

#### Step d-14
- type: `dialogue`, speaker: `client`, expression: `hopeful`, showPortrait: true
- 「**でも、私、それでも配信を続けます**。ユキさんのアルゴリズムで人気が出たかもしれないけど、**今、私の配信を観てくれている人たち、私の言葉に笑ってくれる人たちは、本物**」

#### Step d-15
- type: `dialogue`, speaker: `client`, expression: `hopeful`
- 「**今度は、本当の私で、配信を続ける**。ガチャ運が下がっても、登録者が10万人になっても、私はカメラの前に立ち続けます」

#### Step d-16
- type: `narrative`, speaker: `narrator`
- 「（ユキの片目（赤い方）が一瞬、揺らいだ。冷酷な仮面に、わずかな揺れ）」

#### Step d-17
- type: `dialogue`, speaker: `boss_chisq`, expression: `neutral`
- 「（小声で）……ふん。**つまらない**」

#### Step d-18
- type: `dialogue`, speaker: `boss_chisq`, expression: `defeated`
- 「アルゴリズムを公開する。**今すぐ**。**事務所は終わる、私の経歴も終わる**。だが——」

#### Step d-19
- type: `dialogue`, speaker: `boss_chisq`, expression: `defeated`
- 「**家畜じゃない人間がいた**ということを、私は記録に残しておく」

---

### 第5幕：解決【本物の配信者へ】

🎵 **BGM: track_solution_calm → track_solution_uplift**

#### Step sol-01
- type: `narrative`, speaker: `narrator`
- 「翌週、ユキはガチャアルゴリズムの改ざん証拠をすべて自ら公開。ペガサスプロは関係者が刑事告訴され、解体。閃光寺ペコは事務所を退所し、個人配信者として再出発した。登録者は10万人まで減ったが、視聴者の絆は逆に深くなった」

#### Step sol-02
- type: `dialogue`, speaker: `client`, expression: `hopeful`, showPortrait: true
- 「探偵さん、皆さん、ありがとうございました。**今は、登録者は10分の1ですけど、私の配信を観てくれる人は、本物の私を見てくれてる**」

#### Step sol-03
- type: `dialogue`, speaker: `akari`, expression: `hopeful`
- 「私、これからもペコさんの配信、観ます！」

#### Step sol-04
- type: `dialogue`, speaker: `detective`, expression: `neutral`
- 「閃光寺さん。最後に一つだけ。**統計を学んだ感想は？**」

#### Step sol-05
- type: `dialogue`, speaker: `client`, expression: `hopeful`
- 「**数字って、嘘も真実も両方語るんですね**。でも、それを読み解く人が増えれば、世の中はもう少しまともになる気がします」

#### Step sol-06
- type: `dialogue`, speaker: `detective`, expression: `neutral`
- 「悪くない学びだ」

#### Step sol-07
- type: `mini_lesson`, speaker: `detective`
- content: '【教訓】カイ二乗検定でデータの偏りを見抜く\n\n① 観測度数と期待度数のズレを χ² で測定\n② 自由度 (行−1)(列−1) に応じてp値を判定\n③ クロス集計表の独立性検定で「カテゴリ変数の関係性」を暴く'

#### Step sol-08 (BOSS QUIZ 1)
- type: `interactive`
- content: '【ボス問題1/3】サイコロを600回振って、出目1〜6が以下のようになった：[110, 95, 105, 90, 100, 100]。χ²の値はおよそ？（期待度数は各100）'
- interaction: `choice`
- options:
  - ❌ 約 0.5
  - ✅ 約 2.5
  - ❌ 約 25
  - ❌ 約 250

#### Step sol-09 (BOSS QUIZ 2)
- type: `interactive`
- content: '【ボス問題2/3】3行4列のクロス集計表で独立性検定を行うとき、自由度は？'
- interaction: `choice`
- options:
  - ❌ 12
  - ❌ 7
  - ✅ 6
  - ❌ 3

#### Step sol-10 (BOSS QUIZ 3)
- type: `interactive`
- content: '【ボス問題3/3】カイ二乗検定の前提として最も重要なのは？'
- interaction: `choice`
- options:
  - ❌ サンプルが正規分布している
  - ❌ サンプルサイズが100以上
  - ✅ 各セルの期待度数が概ね5以上ある（少ない場合は別手法を考慮）
  - ❌ 観測度数が整数

#### Step sol-11 (FORESHADOW)
- type: `narrative`, speaker: `narrator`
- 「（事務所のホワイトボード。探偵は『**絶対零度ユキ（算法の魔女）**』にバツ印を付けた。残る幹部はあと一人。**最終ボス・幽鬼丸**——組織の頂点）」

#### Step sol-12
- type: `dialogue`, speaker: `akari`, expression: `worried`
- 「探偵さん、いよいよ最終戦ですね……」

#### Step sol-13
- type: `dialogue`, speaker: `detective`, expression: `thinking`
- 「（**幽鬼丸**——20年、待っていた。あの男に、もう一度会う日を）」

#### Step sol-14
- type: `narrative`, speaker: `detective`
- 「事件 No.009——**解決**」

---

## 🎵 BGM・SE指示

| 幕 | BGM ID | 雰囲気 |
|---|---|---|
| 1 | track_commission_emotion | 配信者の素顔、ピアノ |
| 2 | track_crime_scene_tense | 適合度検定 |
| 3 | track_investigation_pulse | クロス集計と独立性 |
| 4 | track_deduction_revelation → track_villain_theme | ユキの登場 |
| 5 | track_solution_uplift | 本物の絆へ |

| イベント | SE |
|---|---|
| ユキの6個ピアス | se_omen_drone（最大級） |
| ペコの「家畜じゃない」 | se_emotional_strike |
| ユキの片目の揺らぎ | se_subtle_chime（一瞬の人間性） |
| 「幽鬼丸」最後の名前 | se_final_omen（次回への伏線） |
