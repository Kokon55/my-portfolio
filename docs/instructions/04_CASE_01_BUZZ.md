# 04. ケース1：バズの真実 - 10万いいねの嘘

## 📊 統計範囲
- **主**：1変数データの記述統計（平均・分散・標準偏差・外れ値）
- **副**：時系列データ（移動平均で異常検出の前振り）

## 🎬 ストーリー概要

新人マーケター・シズマ・ヤマダが、500万円の予算をインフルエンサーAに突っ込んで撃沈。「フォロワー10万人、いいね5000」のAより「フォロワー3万、いいね3000」のBの方が結果が良かった理由を、探偵が統計で解き明かす。

**二段オチ構造**：
- 表向き：「Aは平均だけ良くて分散が大きい＝バズ偏重」と暴く
- 真相：Aは山田の元同期だった。山田が「うちで広告を打たないか」と相談したまさにその翌日、Aは大量のbotを購入していた——**山田は元同期に裏切られていた**

**伏線**：Aの自宅PCの壁紙に「3つの目」のロゴ（視聴者だけ気づく）

## 👥 登場キャラクター
- 蛇道シェルロック（探偵）
- シズマ・ヤマダ（依頼人・27歳・新人マーケター）
- インフルエンサーA「Aurora」（黒幕、画面越しのみ）
- インフルエンサーB「みなり」（脇役、健全な対比）

---

## 📝 詳細スクリプト（5幕構成）

### 第1幕：依頼【深夜の事務所、雨】

🎵 **BGM: track_commission_noir**（湿ったノワールピアノ）

#### Step c-01
- type: `narrative`, speaker: `narrator`
- 「2030年4月、深夜2時。新宿の探偵事務所に、一通の依頼メールが届いた。件名——**500万円が、消えました**」

#### Step c-02
- type: `dialogue`, speaker: `client`, expression: `distraught`, showPortrait: true
- 「すみません、こんな夜中に。シズマ・ヤマダと申します……うちの会社の500万円が、煙のように消えてしまったんです」

#### Step c-03
- type: `dialogue`, speaker: `detective`, expression: `neutral`
- 「まあ、座りたまえ。そして、煙を吸い込んだ事情を聞かせてくれ」

#### Step c-04
- type: `dialogue`, speaker: `client`, expression: `worried`
- 「インフルエンサーマーケに使ったんです。Aurora（オーロラ）という人気アカウントに、PR投稿4回分で500万円」

#### Step c-05
- type: `dialogue`, speaker: `client`, expression: `worried`
- 「フォロワー10万人、平均いいね5000。一方の候補だったみなりさんは、フォロワー3万、平均いいね3000。Aの方が圧倒的にすごく見えたんです」

#### Step c-06
- type: `dialogue`, speaker: `client`, expression: `distraught`
- 「ところが——売上は想定の5分の1。一方、後から個人の依頼でみなりさんに頼んだ別商品は、想定の2倍売れた。なぜ、こんなことに」

#### Step c-07
- type: `narrative`, speaker: `detective`
- 「（探偵は煙草に火をつけ、灰皿の縁を指で叩いた）……数字で殴られた者の傷は、数字でしか治せない。**まずは両者のプロフィールから見ていこう**」

#### Step c-08
- type: `interactive`
- content: '架空SNS「Fluttr」のプロフィール画面（Aurora）'
- interaction: `sns_profile`（Auroraのプロフィール）
- 達成条件：閲覧後「確認した」ボタン

#### Step c-09
- type: `interactive`
- content: 'Fluttrのプロフィール画面（みなり）'
- interaction: `sns_profile`（みなりのプロフィール）
- 達成条件：閲覧後「確認した」

#### Step c-10
- type: `dialogue`, speaker: `detective`, expression: `thinking`
- 「表面の数字なら、確かにAの圧勝だ。だが——**なぜ売上は逆転した？**ここに違和感がある」

---

### 第2幕：現場【投稿データの解剖】

🎵 **BGM: track_crime_scene_tense**（緊張感のあるシンセ＋低音）

#### Step s-01
- type: `narrative`, speaker: `detective`
- 「事件現場は、投稿データそのものだ。AとBの直近30投稿のいいね数を、ヒストグラムにする。よく見たまえ」

#### Step s-02
- type: `interactive`
- content: '直近30投稿のいいね数の分布'
- interaction: `distribution_compare`
- hints:
  - level1: 「Aは平均が高い。だが、ばらつきはどうだ？」
  - level2: 「Aの分布は左右に幅広い。Bは中央にギュッと集まっている」
  - level3: 「分散の大きさが、安定性の指標だ。分散が大きい＝バズ頼みの投稿パターン」

#### Step s-03
- type: `dialogue`, speaker: `detective`, expression: `thinking`
- 「Aは平均こそ高いが、いいね数が100から20000まで激しく揺れている。**ほとんどの投稿は数百〜千いいね、ごく稀に「バズ」が混じる構造**だ」

#### Step s-04
- type: `mini_lesson`, speaker: `detective`
- content: '【数学I・データの分析】平均値だけ見るな、分散と標準偏差を見ろ。\n\n分散とは、データが平均からどれだけ離れているかの2乗平均。標準偏差は分散の平方根で、ばらつきの「目安」になる。'
- formula: `\sigma^2 = \frac{1}{n}\sum_{i=1}^{n}(x_i - \bar{x})^2`

#### Step s-05
- type: `interactive`
- content: '🚩 君の番だ。Auroraの30投稿の中から「平均を吊り上げているバズ投稿」を全部タップで告発してくれ。'
- interaction: `outlier_spotter`（既存実装どおり、threshold: 1.5）
- hints:
  - level1: 「上位5〜6件あたりが、他とかけ離れた数字になっている」
  - level2: 「平均から標準偏差の1.5倍以上離れていれば外れ値の候補」
  - level3: 「いいね数が万単位の投稿は、千単位の他の投稿と質が違う。万単位の投稿を全部数えると、ちょうど5件ある」

#### Step s-06
- type: `dialogue`, speaker: `client`, expression: `shocked`
- 「えっ……普段の投稿は数百いいねしか取れてない？じゃあ平均5000って表示は……」

#### Step s-07
- type: `dialogue`, speaker: `detective`, expression: `neutral`
- 「**ごく少数のバズ投稿による嵩上げだ**。商品レビューのようなPR投稿は『普段の投稿』に近い。バズが起きにくい」

#### Step s-08
- type: `dialogue`, speaker: `detective`, expression: `thinking`
- 「一方、Bの分布を見たまえ。2000〜4000の狭い範囲に密集している。**安定して、フォロワーに刺さっている**」

---

### 第3幕：捜査【エンゲージメント率の真実】

🎵 **BGM: track_investigation_pulse**（軽快な調査ビート）

#### Step i-01
- type: `narrative`, speaker: `detective`
- 「次は『率』を見る。**フォロワー数あたりのいいね率＝エンゲージメント率**だ」

#### Step i-02
- type: `interactive`
- content: '両者のエンゲージメント率を計算'
- interaction: `engagement_calc`（既存）
- hints:
  - level1: 「いいね数 ÷ フォロワー数 で計算する」
  - level2: 「Aは 5000÷100000 = 5%、Bは 3000÷30000 = 10%」
  - level3: 「Bの方が2倍高い。これがフォロワーへの『届く力』の差」

#### Step i-03
- type: `dialogue`, speaker: `detective`, expression: `neutral`
- 「Aurora：エンゲージ率5%。みなり：10%。**みなりの方が「届く力」では2倍**だ」

#### Step i-04
- type: `dialogue`, speaker: `client`, expression: `eureka`
- 「えっ……でも、それでもAの方が絶対数は多くないですか？10万人の5%なら5000人でしょ？」

#### Step i-05
- type: `dialogue`, speaker: `detective`, expression: `neutral`
- 「鋭い疑問だ。だが、ここで2つ目の罠が登場する。**Auroraの10万人のフォロワーは、本当に10万人いるのか？**」

#### Step i-06
- type: `dialogue`, speaker: `client`, expression: `worried`
- 「……どういうことですか？」

#### Step i-07
- type: `narrative`, speaker: `detective`
- 「**フォロワー成長カーブを見れば分かる**」

#### Step i-08
- type: `interactive`
- content: 'Aurora と みなり のフォロワー成長（24ヶ月）'
- interaction: `follower_growth`
- hints:
  - level1: 「Auroraの曲線は不自然に直線に近い。みなりは波がある」
  - level2: 「自然な成長は、バズった月とそうでない月で必ず波打つ」
  - level3: 「決定係数R²で測れる。R² > 0.99 はほぼ直線、botの仕業の可能性大」

#### Step i-09
- type: `dialogue`, speaker: `detective`, expression: `thinking`
- 「Auroraの曲線——**24ヶ月、ほぼ完全な直線**だ。R² = 0.998。これは自然な人間の成長曲線ではない」

#### Step i-10
- type: `dialogue`, speaker: `client`, expression: `shocked`
- 「まさか……bot？フォロワーを買ってる？」

#### Step i-11
- type: `dialogue`, speaker: `detective`, expression: `neutral`
- 「**そうだ。それも、ある日を境に**」

---

### 第4幕：推理【元同期の裏切り】

🎵 **BGM: track_deduction_revelation**（緊迫したストリングス）

#### Step d-01
- type: `narrative`, speaker: `detective`
- 「ここで、君に聞きたいことがある。山田くん、君はAuroraの中の人を、知っているか？」

#### Step d-02
- type: `dialogue`, speaker: `client`, expression: `worried`
- 「え？……いえ、向こうのマネージャーとしかやり取りしてません……あ、でも、運営してるのは大学の同期だって聞いたことが」

#### Step d-03
- type: `dialogue`, speaker: `detective`, expression: `thinking`
- 「同期、か。名前は」

#### Step d-04
- type: `dialogue`, speaker: `client`, expression: `worried`
- 「えーっと……葛西、葛西アキラだったかな。マーケの世界では珍しいくらい才能あるって、ずっと尊敬してて」

#### Step d-05
- type: `dialogue`, speaker: `detective`, expression: `neutral`
- 「ふむ。**そのアキラ氏に、君は事前に「うちで広告を打たないか」と相談したか？**」

#### Step d-06
- type: `dialogue`, speaker: `client`, expression: `worried`
- 「あ、はい。1ヶ月前に……でもまだ正式オファーじゃなくて、雑談で予算規模だけ話したんです」

#### Step d-07
- type: `interactive`
- content: 'Auroraのフォロワー急増の特異点を時系列で確認しよう'
- interaction: `timeseries_anomaly`
  - 24週分のフォロワー増加データ
  - 真の異常週：山田が相談した翌週
  - hint: 「君が雑談した翌週、フォロワー増加が3倍になっている」
- hints:
  - level1: 「異常な増加が起きた週はいつか？」
  - level2: 「移動平均から大きく外れる週を探そう」
  - level3: 「君が雑談した直後の週に注目。前週比で2万人レベルの跳ね上がりがある」

#### Step d-08
- type: `dialogue`, speaker: `detective`, expression: `neutral`
- 「**君が相談した翌週、Auroraのフォロワーは前週の3倍に急増していた**。それまでは月3000人ペースだったものが、その週だけで2万人増えた」

#### Step d-09
- type: `dialogue`, speaker: `client`, expression: `shocked`, showPortrait: true
- 「……え？それって……」

#### Step d-10
- type: `dialogue`, speaker: `detective`, expression: `neutral`
- 「**葛西アキラ氏は、君の予算を狙って、その週にbotを大量購入したのだろう**。「フォロワー10万」の見栄えで、君の500万円を取りに行くために」

#### Step d-11
- type: `dialogue`, speaker: `client`, expression: `distraught`, showPortrait: true
- 「……そんな……アキラが？俺、あいつのこと、ずっと尊敬してて……」

#### Step d-12
- type: `narrative`, speaker: `detective`
- 「（探偵は黙って煙草を消した。雨はまだ降り続いている）」

#### Step d-13
- type: `dialogue`, speaker: `detective`, expression: `neutral`
- 「人間というものは、数字に化ける。**化けた数字は、いつか嘘だとバレる。それまでだ**」

---

### 第5幕：解決【教訓とボス問題】

🎵 **BGM: track_solution_calm**（穏やかな終幕）

#### Step sol-01
- type: `narrative`, speaker: `detective`
- 「事件は解けた。真犯人は、フォロワー数という見せかけの絶対値、そして——それを利用した君の元同期だ」

#### Step sol-02
- type: `dialogue`, speaker: `client`, expression: `tired`
- 「……探偵さん。俺、これからどうしたら……」

#### Step sol-03
- type: `dialogue`, speaker: `detective`, expression: `neutral`
- 「3つだけ覚えておけ。**①フォロワー数より率（エンゲージメント率）で見る、②平均だけでなくばらつき（分散）を見る、③成長カーブの直線性を疑う**——以上だ」

#### Step sol-04
- type: `mini_lesson`, speaker: `detective`
- content: '【教訓】SNSの数字を読むときの3原則\n\n① 絶対値より「率」\n② 平均より「分布」\n③ 数字の動き方の「自然さ」'

#### Step sol-05 (BOSS QUIZ 1)
- type: `interactive`
- content: '【ボス問題1/3】Vutubeの登録者100万人、平均再生5000のチャンネルがあるとする。エンゲージ率は？'
- interaction: `choice`
- options:
  - ✅ 0.5%。極端に低い。bot やフォロー買いの可能性大
  - ❌ 5%。十分な人気チャンネル
  - ❌ フォロワー100万なら絶対に効果がある
- hints:
  - level1: 「再生数 ÷ 登録者数で計算」
  - level2: 「5000 ÷ 1,000,000 を割り算してパーセント表記に」
  - level3: 「分子は4桁、分母は7桁。差は3桁分。答えは1%未満で『%』のついた選択肢から探そう」

#### Step sol-06 (BOSS QUIZ 2)
- type: `interactive`
- content: '【ボス問題2/3】平均値が同じでも、AとBで投稿パターンが違う場合、何を比較すべきか？'
- interaction: `choice`
- options:
  - ❌ 投稿頻度
  - ❌ フォロワー数
  - ✅ 標準偏差（ばらつきの大きさ）
  - ❌ プラットフォームの種類

#### Step sol-07 (BOSS QUIZ 3)
- type: `interactive`
- content: '【ボス問題3/3】フォロワー成長カーブのR²が0.998だった。考えられることは？'
- interaction: `choice`
- options:
  - ❌ 投稿が継続的にバズっている
  - ❌ アルゴリズムが優遇している
  - ✅ 不自然に直線的＝botを定期購入している可能性が高い
  - ❌ 普通の優良アカウント

#### Step sol-08
- type: `dialogue`, speaker: `client`, expression: `hopeful`
- 「ありがとうございます……俺、これからは『フォロワー数』だけで判断しません。**標準偏差も、R²も、ちゃんと見ます**」

#### Step sol-09
- type: `dialogue`, speaker: `detective`, expression: `neutral`
- 「よろしい。報酬は——**そうだな、コーヒー代でいい**。雨の中、よく事務所まで来た」

#### Step sol-10 (FORESHADOW)
- type: `narrative`, speaker: `narrator`
- 「（カメラはAuroraの自宅PCをズームする。デスクトップの壁紙には——**三角形に並んだ3つの目**のロゴが、薄く浮かんでいた。山田は、それに気づくことなく事務所を出た）」

#### Step sol-11
- type: `narrative`, speaker: `detective`
- 「事件 No.001——**解決**」

---

## 🎵 BGM・SE指示まとめ

| ステップ範囲 | BGM ID | 雰囲気 |
|---|---|---|
| 第1幕 | track_commission_noir | 雨、ピアノソロ、JAZZノワール |
| 第2幕 | track_crime_scene_tense | 緊張、シンセ、低音 |
| 第3幕 | track_investigation_pulse | 調査、刻むビート |
| 第4幕 | track_deduction_revelation | 真相到達、ストリングス |
| 第5幕 | track_solution_calm | 余韻、穏やかなピアノ |

| イベント | SE |
|---|---|
| 各interactive正解時 | se_correct_chime |
| 不正解時 | se_wrong_buzz |
| 第4幕の真相パート | se_reveal_strike（鋭い金属音） |
| 第5幕末尾の伏線 | se_omen_drone（不穏な低音） |
