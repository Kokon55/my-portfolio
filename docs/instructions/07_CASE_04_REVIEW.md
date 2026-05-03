# 07. ケース4：★4.8のアプリ - レビュー操作を見抜け

## 📊 統計範囲
- **主**：1変数データの分布（中央値・最頻値・四分位数・歪度・箱ひげ図）
- **副**：分布の二極化（ふたこぶ分布）

## 🎬 ストーリー概要

中堅IT企業のエンジニア・**鬼頭テッペイ**（45歳）が、自分の作ったアプリが★4.8の高評価なのに使われていない件で相談に来る。レビュー分布は★1と★5の二極化（**ふたこぶ分布**）で、平均は4.8でも中央値は3.0。★5は会社が業者に依頼した偽レビュー、★1が本物のユーザーの怒りの声。

**二段オチ構造**：
- 表向き：「レビュー操作している会社が悪い」
- 真相：偽レビューを指示したのは鬼頭の上司ではなく、コンサルとして外部から来ていた**氷室レイア**（七幹部の一人）。鬼頭の会社も騙されていた被害者であり、組織は「企業を養分にして食いつぶす」モデルで動いていた

**伏線**：氷室の白いブレザーの襟の内側に「3つの目」の刺繍（カメラがアップになる演出）

## 👥 登場キャラクター
- 蛇道シェルロック（探偵）
- ヒナタ・アカリ（助手・初お手伝い回）
- **鬼頭テッペイ**（依頼人・45歳・主任エンジニア）
  - 太い眉、四角い顎、職人気質、家族持ち
  - 怒ると顔が真っ赤になる、いじけると小さくなる
- **氷室レイア**（黒幕・七幹部「女王」）

---

## 📝 詳細スクリプト

### 第1幕：依頼【ベテランの怒り】

🎵 **BGM: track_commission_noir**

#### Step c-01
- type: `narrative`, speaker: `narrator`
- 「月曜日の朝10時。事務所のドアが叩かれた。立っていたのは、ガッシリした体格の中年男性。額の血管が浮き出ている」

#### Step c-02
- type: `dialogue`, speaker: `client`, expression: `angry`, showPortrait: true
- 「鬼頭テッペイと申します。ITの会社で、もう20年エンジニアをやっとります。**今日は、絶対に許せねえ話を聞いてもらいたい**」

#### Step c-03
- type: `dialogue`, speaker: `akari`, expression: `worried`
- 「（あかりがコーヒーを差し出しながら）どうぞ、お茶でも。落ち着いてからゆっくりお聞かせください」

#### Step c-04
- type: `dialogue`, speaker: `client`, expression: `worried`
- 「すみません、若いお嬢さん……あ、ありがとうございます」

#### Step c-05
- type: `dialogue`, speaker: `client`, expression: `angry`
- 「うちの会社が出してる『**家計簿マスターPro**』ってアプリがあるんです。**App Storeで★4.8。ダウンロード数も30万**」

#### Step c-06
- type: `dialogue`, speaker: `client`, expression: `worried`
- 「でも、サポートに来る問い合わせの数が、**ダウンロード数の3倍**なんですよ。みんな『使えない』『落ちる』『金返せ』って」

#### Step c-07
- type: `dialogue`, speaker: `client`, expression: `angry`
- 「『これは絶対におかしい』って上司に言ったら『お前は数字が読めないのか？★4.8だぞ？』って怒鳴られて。**俺、20年やってきて、こんな侮辱は初めてだ**」

#### Step c-08
- type: `dialogue`, speaker: `detective`, expression: `thinking`
- 「興味深い。**平均と現実が乖離している**——これは、データを見る角度を変えれば必ず見えてくる」

#### Step c-09
- type: `dialogue`, speaker: `detective`, expression: `neutral`
- 「鬼頭さん、**平均値は分布の一面しか見せない**。見るべきは『分布』そのものだ」

---

### 第2幕：現場【ふたこぶ分布の発見】

🎵 **BGM: track_crime_scene_tense**

#### Step s-01
- type: `narrative`, speaker: `detective`
- 「探偵は、家計簿マスターProの全レビュー1500件をスクレイピングした。星評価ごとの件数を、ヒストグラムで描く」

#### Step s-02
- type: `interactive`
- content: '★1〜★5のレビュー件数分布'
- interaction: `distribution_compare`
  - datasets:
    - { label: '家計簿マスターPro', values: [600, 50, 80, 120, 650] }  // 1星, 2星, 3星, 4星, 5星
- hints:
  - level1: 「この分布、何か変だ。山が一つではない」
  - level2: 「★1と★5の両端に山がある『ふたこぶ』分布」
  - level3: 「中央値や最頻値が、平均値と大きくズレている」

#### Step s-03
- type: `dialogue`, speaker: `akari`, expression: `eureka`
- 「あ、これ……山が**2つ**ありませんか？★1と★5に、どちらも大きな山が」

#### Step s-04
- type: `dialogue`, speaker: `detective`, expression: `neutral`
- 「アカリ、見事だ。**これがふたこぶ分布。賛否が極端に分かれているとき**に現れる」

#### Step s-05
- type: `mini_lesson`, speaker: `detective`
- content: '【数学I】平均・中央値・最頻値\n\n- 平均：全データを足して個数で割る\n- 中央値：データを小さい順に並べた真ん中の値\n- 最頻値：最も多く出現する値\n\nふたこぶ分布では、これら3つが大きく異なる。'

#### Step s-06
- type: `interactive`
- content: '🧮 このアプリの中央値はいくつ？（1500件のレビューで★1が600、★5が650だから……）'
- interaction: `slider_estimate`
  - question: '中央値（★何）？'
  - min: 1, max: 5, step: 1, correctAnswer: 3, tolerance: 0, unit: '★'
- hints:
  - level1: 「全1500件の真ん中（750番目）の値」
  - level2: 「★1が600件、★2が50件、★3が80件……」
  - level3: 「★1で600、★2で計650、★3で計730、★4で計850。750番目はどこに含まれる？」

#### Step s-07
- type: `dialogue`, speaker: `detective`, expression: `neutral`
- 「**中央値は3.0**。平均4.8の幻想を、中央値が剥がす」

---

### 第3幕：捜査【箱ひげ図と歪度】

🎵 **BGM: track_investigation_pulse**

#### Step i-01
- type: `mini_lesson`, speaker: `detective`
- content: '【数学I】箱ひげ図と四分位数\n\n- Q1（第1四分位）：下位25%の境界\n- Q2（中央値）：真ん中\n- Q3（第3四分位）：上位25%の境界\n\n四分位範囲（IQR）= Q3 − Q1 で「中央50%の幅」が分かる。'

#### Step i-02
- type: `dialogue`, speaker: `detective`, expression: `neutral`
- 「家計簿マスターProの箱ひげ図を見たまえ。**箱が異常に大きい。Q1は★1、Q3は★5。中央50%が両端を含む**」

#### Step i-03
- type: `interactive`
- content: '正常なアプリと家計簿マスターProの箱ひげ図比較'
- interaction: `distribution_compare`（仕様変更：箱ひげ図表示モードを追加）
  - datasets:
    - { label: '正常なアプリ', values: [50, 100, 600, 500, 250] }  // 中央値4
    - { label: '家計簿マスターPro', values: [600, 50, 80, 120, 650] }
- hints:
  - level1: 「箱の大きさの違いを比べよう」
  - level2: 「正常なアプリは箱が小さく中央が高い」
  - level3: 「家計簿は箱が異常に大きい＝極端な意見が混在」

#### Step i-04
- type: `dialogue`, speaker: `client`, expression: `worried`
- 「俺、エンジニアで、ヒストグラムくらいは知ってたつもりでしたけど……**箱ひげ図、こんな風に使うんですか**」

#### Step i-05
- type: `dialogue`, speaker: `detective`, expression: `neutral`
- 「ふたこぶ分布を一目で炙り出すには、箱ひげ図が最強だ。さて、ここから推理を進める」

#### Step i-06
- type: `dialogue`, speaker: `detective`, expression: `thinking`
- 「**★5の650件と、★1の600件、それぞれの『投稿パターン』を見るぞ**」

#### Step i-07
- type: `interactive`
- content: '★5レビューと★1レビューの投稿時刻分布'
- interaction: `distribution_compare`（時刻別のヒストグラム）
  - datasets:
    - { label: '★5レビュー', values: [10, 5, 0, 200, 230, 200, 5, 0, 0, 0, 0, 0] }  // 時刻ヒストグラム
    - { label: '★1レビュー', values: [20, 30, 25, 30, 35, 40, 50, 60, 70, 80, 90, 70] }  // 自然な分布
- hints:
  - level1: 「★5レビューの時刻分布が異常に偏っている」
  - level2: 「★5が午前3〜5時に集中投稿されている＝人間らしくない」
  - level3: 「★1は1日中まんべんなく＝本物のユーザー」

#### Step i-08
- type: `dialogue`, speaker: `akari`, expression: `shocked`
- 「★5が**深夜3〜5時**に集中してる……これって、**業者ですか？**」

#### Step i-09
- type: `dialogue`, speaker: `detective`, expression: `neutral`
- 「ほぼ確定的だ。**人間のレビュー投稿は1日にまんべんなく分布する**。深夜3時に650件中600件が投稿される確率は、限りなくゼロ」

---

### 第4幕：推理【女王・氷室レイアの登場】

🎵 **BGM: track_deduction_revelation → track_villain_theme**（敵側のテーマ）

#### Step d-01
- type: `narrative`, speaker: `narrator`
- 「翌日、探偵と鬼頭は、家計簿マスターProの開発元『**マネット社**』のオフィスを訪れた」

#### Step d-02
- type: `narrative`, speaker: `narrator`
- 「会議室で待っていたのは、白いパワースーツの女性。氷のような美貌、銀のストレートヘア。胸元には金色の★型バッジ」

#### Step d-03
- type: `dialogue`, speaker: `boss_review`, expression: `smug`, showPortrait: true
- 「初めまして、データ探偵さん。マーケティングコンサルタントの**氷室レイア**と申します。鬼頭さんの件、上から伺っています」

#### Step d-04
- type: `dialogue`, speaker: `client`, expression: `angry`
- 「氷室さん、あなた、ウチの会社のレビューを操作してたって本当ですか！？」

#### Step d-05
- type: `dialogue`, speaker: `boss_review`, expression: `smug`
- 「ふふ……『操作』とは穏やかではありませんね。私たちは『**評価のテコ入れ**』をしているだけ。それで、御社のアプリは30万ダウンロード達成し、御社は売上を伸ばした。**Win-Winでしょう？**」

#### Step d-06
- type: `dialogue`, speaker: `detective`, expression: `neutral`
- 「氷室さん。レビュー操作は景品表示法違反だ。それと——**あなたが、この一連のレビュー詐称ビジネスの黒幕か？**」

#### Step d-07
- type: `dialogue`, speaker: `boss_review`, expression: `smug`
- 「あら、私は黒幕ではありませんわ。私はただの**コンサルタント**。指示を出す側ですらない」

#### Step d-08
- type: `dialogue`, speaker: `boss_review`, expression: `smug`
- 「私の組織は——もっと、**広く、深く**、世界を見ています」

#### Step d-09
- type: `narrative`, speaker: `narrator`
- 「氷室は、ジャケットの襟を整えるしぐさをした。その瞬間、襟の内側に**三角形に並んだ3つの目の刺繍**が、一瞬だけ見えた」

#### Step d-10
- type: `dialogue`, speaker: `detective`, expression: `thinking`
- 「（やはり、お前たちか……）」

#### Step d-11
- type: `dialogue`, speaker: `detective`, expression: `neutral`
- 「氷室さん、一つだけ教えてくれ。**あなたの組織の名前は？**」

#### Step d-12
- type: `dialogue`, speaker: `boss_review`, expression: `smug`
- 「お答えする義務はありません。**ただし**、ヒントだけ。私たちは、数字を支配する。数字を支配する者が、世界を支配する。それが、私たちの哲学」

#### Step d-13
- type: `dialogue`, speaker: `boss_review`, expression: `smug`
- 「では、失礼を。鬼頭さんの会社は、私たちが寄生していた『**良い宿主**』でした。次の宿主を探しますわ」

#### Step d-14
- type: `dialogue`, speaker: `client`, expression: `shocked`, showPortrait: true
- 「**寄生……？俺たちの会社は、あんたらにとって寄生先だっただけか……？**」

#### Step d-15
- type: `narrative`, speaker: `narrator`
- 「氷室は微笑を浮かべたまま、会議室を出て行った」

---

### 第5幕：解決【鬼頭の決意とボス問題】

🎵 **BGM: track_solution_calm**

#### Step sol-01
- type: `dialogue`, speaker: `client`, expression: `tired`
- 「探偵さん、これからどうしたらいいですか……俺、20年このアプリ作ってきたんです……」

#### Step sol-02
- type: `dialogue`, speaker: `detective`, expression: `neutral`
- 「鬼頭さん。レビュー操作は会社ぐるみではない。あなたの会社も**騙されていた**。氷室は外部コンサルとして入り込み、上層部に『これで売上が伸びますよ』とそそのかし、業者を手配していた」

#### Step sol-03
- type: `dialogue`, speaker: `detective`, expression: `neutral`
- 「**会社を救うには、内部告発と再出発しかない**。証拠は、私が集めたデータ全てを提供する。あなたが声を上げれば、社内には味方が現れるはずだ」

#### Step sol-04
- type: `dialogue`, speaker: `client`, expression: `hopeful`
- 「……探偵さん。俺、20年エンジニアやってきて、自分の作ったアプリを誇りに思ってました。**もう一度、誇れる会社にします**」

#### Step sol-05
- type: `dialogue`, speaker: `akari`, expression: `hopeful`
- 「鬼頭さん、頑張ってください！」

#### Step sol-06
- type: `mini_lesson`, speaker: `detective`
- content: '【教訓】★4.8の罠を見抜く3原則\n\n① 平均だけでなく**中央値**を見る\n② **箱ひげ図**で分布の幅を確認\n③ レビューの**投稿時刻分布**で業者を炙り出す'

#### Step sol-07 (BOSS QUIZ 1)
- type: `interactive`
- content: '【ボス問題1/3】平均が4.8なのに中央値が3.0のアプリ。考えられる原因は？'
- interaction: `choice`
- options:
  - ❌ 全レビューが平均4.8に集中している
  - ✅ ★1と★5の二極化（ふたこぶ分布）が起きている
  - ❌ 計算ミス
  - ❌ レビュー数が少なすぎる

#### Step sol-08 (BOSS QUIZ 2)
- type: `interactive`
- content: '【ボス問題2/3】箱ひげ図の「箱」が異常に大きい場合の解釈は？'
- interaction: `choice`
- options:
  - ❌ データの数が多い
  - ❌ 平均値が高い
  - ✅ 中央50%のデータが広範囲に分布している（ばらつきが大きい）
  - ❌ 最大値が大きい

#### Step sol-09 (BOSS QUIZ 3)
- type: `interactive`
- content: '【ボス問題3/3】★5レビューの大半が「深夜3〜5時」に集中している。最も適切な解釈は？'
- interaction: `choice`
- options:
  - ❌ 深夜にアプリを使う人が多い
  - ❌ 偶然の現象
  - ✅ 業者による組織的なレビュー投稿の可能性が高い
  - ❌ サーバー時刻のバグ

#### Step sol-10 (FORESHADOW)
- type: `narrative`, speaker: `narrator`
- 「（事務所に戻った探偵は、ホワイトボードに新しい絵を描いた。**氷室レイア**——『**女王**』。組織の幹部の一人。そして、彼女の上には、まだ誰かがいる）」

#### Step sol-11
- type: `dialogue`, speaker: `akari`, expression: `worried`
- 「探偵さん……あの組織、本当に『世界中の数字を支配する』ってことなんですか？」

#### Step sol-12
- type: `dialogue`, speaker: `detective`, expression: `neutral`
- 「**まだ、序章だ**。事件 No.004——解決」

---

## 🎵 BGM・SE指示

| 幕 | BGM ID | 雰囲気 |
|---|---|---|
| 1 | track_commission_noir | ベテランの怒り、低音ピアノ |
| 2 | track_crime_scene_tense | 分布の解剖、シンセ |
| 3 | track_investigation_pulse | 箱ひげ図解析、軽快ビート |
| 4 | track_deduction_revelation → track_villain_theme | 氷室登場、邪悪なテーマ |
| 5 | track_solution_calm | 余韻 |

| イベント | SE |
|---|---|
| 氷室の襟の3つの目発覚 | se_omen_drone（強調） |
| 鬼頭の「20年」叫び | se_emotional_strike |
| 氷室退場 | se_villain_exit（高音ピアノの不気味な残響） |
