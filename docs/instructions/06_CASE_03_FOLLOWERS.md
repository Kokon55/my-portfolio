# 06. ケース3：フォロワー買いました - 偽アカウントの統計学

## 📊 統計範囲
- **主**：時系列の異常検知（移動平均・Z-score）、正規分布の標準化
- **副**：仮説検定の入り口（次のケースへの繋ぎ）

## 🎬 ストーリー概要

新人女優・**ヒナタ・アカリ**（22歳）がマネジメント会社から「フォロワー1万人以上ないと仕事を回せない」と言われ、闇業者からフォロワーを購入してしまった。直後にスキャンダル週刊誌「**週刊フラッシュ**」から「フォロワー買い疑惑」記事が出る寸前。**24時間以内に潔白を証明しないと女優生命が終わる**。

**二段オチ構造**：
- 表向き：「あかり自身が買ったから有罪」と思える
- 真相：探偵が時系列を精査すると、**あかりが買った週とは別に、もう1週間異常な急増がある**。それは闇業者「**3つ目商会**」が在庫を一気に放出した日。あかりは買ったが、それ以上に「勝手に増やされた」被害者でもある。業者を暴くことが彼女を救う鍵

**伏線**：闇業者のオフィスの看板に「3つの目」（探偵が初めて言葉にする：「またこのマークか…」）

## 👥 登場キャラクター
- 蛇道シェルロック（探偵）
- **ヒナタ・アカリ**（依頼人・22歳・新人女優）—— 後にシリーズ準ヒロイン
- 暗黒のマネージャー（チラ見せ程度）
- 闇業者「3つ目商会」の社長（黒幕、正体は伏せる）

---

## 📝 詳細スクリプト

### 第1幕：依頼【涙の駆け込み】

🎵 **BGM: track_commission_emotion**（切ないピアノ＋ストリングス）

#### Step c-01
- type: `narrative`, speaker: `narrator`
- 「金曜日の夜10時。事務所のドアを叩く音が、いつもより小さく、震えていた」

#### Step c-02
- type: `dialogue`, speaker: `client`, expression: `distraught`, showPortrait: true
- 「……探偵さん、助けてください。ヒナタ・アカリと申します……あの……あの、私……」

#### Step c-03
- type: `dialogue`, speaker: `client`, expression: `distraught`
- 「フォロワーを、買ってしまったんです。1万人」

#### Step c-04
- type: `dialogue`, speaker: `detective`, expression: `neutral`
- 「……話を聞こう。座って、まず深呼吸を」

#### Step c-05
- type: `dialogue`, speaker: `client`, expression: `worried`
- 「事務所のマネージャーから『フォロワー1万人ないと、ドラマのオーディションすら回せない』って言われて……自費で5万円払って、闇業者から買いました」

#### Step c-06
- type: `dialogue`, speaker: `client`, expression: `distraught`
- 「でも、明日の朝、**週刊フラッシュ**っていう雑誌が『新人女優ヒナタ・アカリ、フォロワー水増し疑惑』って記事を出すって、リーク情報が……」

#### Step c-07
- type: `dialogue`, speaker: `client`, expression: `distraught`
- 「もし載ったら、私、女優人生終わります……でも、買ったのは事実だから、認めるしかない、ですよね……」

#### Step c-08
- type: `dialogue`, speaker: `detective`, expression: `thinking`
- 「**まだ早い**。確かに君は1万人を買った。だが、本当にそれだけなのか？——時系列を見せてくれ」

#### Step c-09
- type: `dialogue`, speaker: `client`, expression: `worried`
- 「えっ……？」

---

### 第2幕：現場【週次フォロワー増加の解剖】

🎵 **BGM: track_crime_scene_tense**

#### Step s-01
- type: `narrative`, speaker: `detective`
- 「探偵は彼女のスマホからフォロワー推移データをダウンロードした。過去24週分の週次増加量だ」

#### Step s-02
- type: `mini_lesson`, speaker: `detective`
- content: '【数学I】時系列データの異常検知：移動平均\n\n移動平均とは、直近n週の平均を取ることで、ノイズを抑えて全体の傾向を見る手法。'
- formula: `MA_t = \\frac{1}{n}\\sum_{i=0}^{n-1} x_{t-i}`

#### Step s-03
- type: `dialogue`, speaker: `detective`, expression: `neutral`
- 「君のフォロワー増加を、3週移動平均でならしてみる。すると——**普段の増加ペースが見える**」

#### Step s-04
- type: `interactive`
- content: '24週分のフォロワー週次増加量。異常な週はどれ？'
- interaction: `timeseries_anomaly`
  - weeklyDeltas: [120, 95, 110, 130, 105, 140, 125, 95, 110, 100, **8500**, 130, 145, 120, 135, 105, 110, **5200**, 125, 130, 140, 115, 100, 95]
  - trueAnomalyIndices: [10, 17]
- hints:
  - level1: 「移動平均から大きく外れる週を探そう」
  - level2: 「Z-scoreが2を超える週は『異常』の目安」
  - level3: 「24週のうち、4桁台の数字が混じっている週が2つあるはず」

#### Step s-05
- type: `dialogue`, speaker: `client`, expression: `worried`
- 「……11週目は、私が買った週です。でも、18週目って何ですか？私、その週は何もしてません！」

#### Step s-06
- type: `dialogue`, speaker: `detective`, expression: `thinking`
- 「**そう、君は何もしていない**。だが、君のアカウントには勝手にフォロワーが5200人増えている」

#### Step s-07
- type: `mini_lesson`, speaker: `detective`
- content: '【数学I】Z-score（標準化得点）\n\nデータが「平均から標準偏差の何倍離れているか」を表す指標。|Z|>2 で異常値の目安。'
- formula: `Z = \\frac{x - \\bar{x}}{\\sigma}`

#### Step s-08
- type: `interactive`
- content: '11週目（8500増加）のZ-scoreを計算しよう。平均=120, 標準偏差=20とする'
- interaction: `slider_estimate`
  - question: 'Z-scoreの値は？'
  - min: 0, max: 500, step: 1, correctAnswer: 419, tolerance: 20, unit: ''
- hints:
  - level1: 「(8500 − 120) ÷ 20」
  - level2: 「8380 ÷ 20」
  - level3: 「分子は8380、分母は20。割り算すれば一目瞭然——『2を超える』どころではない」

---

### 第3幕：捜査【闇業者の看板】

🎵 **BGM: track_investigation_pulse → track_underworld**（地下街のジャジーなビート）

#### Step i-01
- type: `dialogue`, speaker: `detective`, expression: `neutral`
- 「アカリ、君が買った業者の名前は？」

#### Step i-02
- type: `dialogue`, speaker: `client`, expression: `worried`
- 「えーっと……『**3つ目商会**』っていう……ネットの闇市場で見つけて」

#### Step i-03
- type: `dialogue`, speaker: `detective`, expression: `thinking`
- 「**……3つ目商会**、か」

#### Step i-04
- type: `narrative`, speaker: `narrator`
- 「（探偵の脳裏に、佐藤の名刺の3つの目のロゴが蘇る）」

#### Step i-05
- type: `dialogue`, speaker: `detective`, expression: `thinking`
- 「（また、このマークか……）」

#### Step i-06
- type: `narrative`, speaker: `narrator`
- 「翌朝、探偵は新宿の歌舞伎町、地下3階の雑居ビル前に立っていた。ビルの看板には——**三角形に並んだ3つの目**のロゴと、『3つ目商会』の文字」

#### Step i-07
- type: `dialogue`, speaker: `detective`, expression: `neutral`
- 「（このロゴ、ケース1のAuroraの壁紙、ケース2の佐藤の名刺、そしてここ。**偶然じゃない**）」

#### Step i-08
- type: `narrative`, speaker: `detective`
- 「探偵は業者の取引ログを入手した（ハッキング描写は省略・「とある手段で」）。ログには、業者が在庫を一気に放出した日が記録されていた」

#### Step i-09
- type: `interactive`
- content: '業者の在庫放出ログ。あかりのアカウントへの放出日は？'
- interaction: `evidence_matcher`
  - scenarios:
    - { id: 's1', label: 'あかり購入分（11週目）', correctProbId: 'p1' }
    - { id: 's2', label: '謎の急増（18週目）', correctProbId: 'p2' }
  - probabilities:
    - { id: 'p1', label: 'あかり自身が5万円で購入' }
    - { id: 'p2', label: '業者が在庫処分でばらまき' }
  - successFeedback: '完璧だ。18週目の急増は業者の在庫処分。あかりは「買った犯人」でもあるが、「ばらまかれた被害者」でもある。'
- hints:
  - level1: 「11週目はあかりが自分で買った週」
  - level2: 「18週目は業者の都合で勝手に増やされた週」
  - level3: 「2つの異常は性質が違う」

---

### 第4幕：推理【週刊フラッシュへの反論】

🎵 **BGM: track_deduction_revelation**

#### Step d-01
- type: `dialogue`, speaker: `detective`, expression: `neutral`
- 「アカリ、これで君を救う論理が組み立てられた」

#### Step d-02
- type: `dialogue`, speaker: `client`, expression: `worried`
- 「ど、どうやって……？私、買ったのは事実です」

#### Step d-03
- type: `dialogue`, speaker: `detective`, expression: `thinking`
- 「事実と、文脈は違う。**君の購入は5万円・1万人。業者がばらまいた分は5200人**。週刊フラッシュは、両方をひとまとめに『水増し疑惑』と書こうとしている」

#### Step d-04
- type: `dialogue`, speaker: `detective`, expression: `neutral`
- 「だが、データを見れば**業者側の犯行が明確に分離できる**。Z-scoreで2つの異常を別々に証明し、君が認めるのは購入分のみ。残りは業者の犯罪行為の証拠として警察に提出する」

#### Step d-05
- type: `dialogue`, speaker: `client`, expression: `eureka`, showPortrait: true
- 「……えっ、……それって、私が業者を告発すれば、私は被害者にもなれるってこと……？」

#### Step d-06
- type: `dialogue`, speaker: `detective`, expression: `neutral`
- 「**完全な無罪にはならない**。1万人購入は事実だから、フォロワー数を1万人減らして、SNSで謝罪する。だが、業者の犯行を暴き、女優として復帰する道は残せる」

#### Step d-07
- type: `dialogue`, speaker: `detective`, expression: `neutral`
- 「**罪を認める部分と、戦う部分を分ける**。それが、数字の使い方だ」

#### Step d-08
- type: `dialogue`, speaker: `client`, expression: `hopeful`, showPortrait: true
- 「探偵さん……ありがとうございます。私、勇気を出して、SNSで全部話します。買ったことも、被害者だったことも」

#### Step d-09
- type: `dialogue`, speaker: `detective`, expression: `neutral`
- 「賢明だ。**透明性こそが、君を守る唯一の盾になる**」

---

### 第5幕：解決【女優の復活とボス問題】

🎵 **BGM: track_solution_calm → track_solution_uplift**（穏やかから希望へ）

#### Step sol-01
- type: `narrative`, speaker: `narrator`
- 「翌日。あかりはSNSで全てを告白した。週刊フラッシュの記事は出たが、世論はあかりの誠実さを評価した。業者『3つ目商会』は警察に踏み込まれ、社長は雲隠れ」

#### Step sol-02
- type: `dialogue`, speaker: `client`, expression: `hopeful`
- 「探偵さん、あの……一つお願いが」

#### Step sol-03
- type: `dialogue`, speaker: `detective`, expression: `thinking`
- 「？」

#### Step sol-04
- type: `dialogue`, speaker: `client`, expression: `hopeful`, showPortrait: true
- 「**お礼に、事務所を手伝わせてください**。私、もっと数字のことを勉強したいんです。同じように騙される人を、減らしたい」

#### Step sol-05
- type: `dialogue`, speaker: `detective`, expression: `neutral`
- 「（探偵は少し驚いた顔をしたが、すぐに表情を戻した）……コーヒーは淹れられるか」

#### Step sol-06
- type: `dialogue`, speaker: `client`, expression: `hopeful`
- 「淹れられます！得意です！」

#### Step sol-07
- type: `dialogue`, speaker: `detective`, expression: `neutral`
- 「では、明日から来い。**事件ごとに勉強会を開く。退屈はしないだろう**」

#### Step sol-08 (BOSS QUIZ 1)
- type: `interactive`
- content: '【ボス問題1/3】平均120、標準偏差20の週次増加量で、ある週8500増加した。Z-scoreは？'
- interaction: `choice`
- options:
  - ❌ 約 4.2
  - ❌ 約 42
  - ✅ 約 419
  - ❌ 約 0.42

#### Step sol-09 (BOSS QUIZ 2)
- type: `interactive`
- content: '【ボス問題2/3】移動平均の役割として正しいものは？'
- interaction: `choice`
- options:
  - ❌ 全データの最大値を出す
  - ✅ ノイズを抑えて全体の傾向を見やすくする
  - ❌ 異常値を消去する
  - ❌ データを増やす

#### Step sol-10 (BOSS QUIZ 3)
- type: `interactive`
- content: '【ボス問題3/3】|Z|>2 となるデータの解釈として正しいのは？'
- interaction: `choice`
- options:
  - ❌ 必ず誤データである
  - ✅ 正規分布なら起こる確率は約5%、異常値の候補
  - ❌ 必ず正規分布である
  - ❌ 平均値である

#### Step sol-11
- type: `narrative`, speaker: `detective`
- 「事件 No.003——**解決。そして新たな仲間が、事務所に加わった**」

#### Step sol-12 (FORESHADOW)
- type: `narrative`, speaker: `narrator`
- 「（その夜。探偵は事務所のホワイトボードに、3つのロゴを描いた。**①Auroraの壁紙、②佐藤の名刺、③3つ目商会の看板**——どれも、同じシンボル）」

#### Step sol-13
- type: `dialogue`, speaker: `detective`, expression: `thinking`
- 「（**3つの目**——お前たちは、いったい、何者だ）」

---

## 🎵 BGM・SE指示

| 幕 | BGM ID | 雰囲気 |
|---|---|---|
| 1 | track_commission_emotion | 涙の依頼、ピアノ＋ストリングス |
| 2 | track_crime_scene_tense | 解析、低音シンセ |
| 3 | track_investigation_pulse → track_underworld | 闇市場潜入、ジャジービート |
| 4 | track_deduction_revelation | 真相到達 |
| 5 | track_solution_calm → track_solution_uplift | 救済の余韻 |

| イベント | SE |
|---|---|
| 闇業者の看板を見るとき | se_omen_drone（不穏な低音） |
| 真相判明 | se_reveal_strike |
| あかりが助手に名乗り出る | se_warm_chime |
