# 13. ケース10：最終事件・データ・カルテルの正体

## 📊 統計範囲
- **主**：全範囲の総合（特に**回帰分析×推定×検定の組み合わせ**）
- **副**：再現性危機、メタ分析の入り口（コンセプトのみ）

## 💡 ヒント設計指針（最終話）

最終話のボス問題群は**ヒントを表示する条件をやや厳しく**してください：
- 30秒経過 → 自動でレベル1ヒントの提案（控えめ）
- 1回間違えるとレベル1解放
- 2回間違えるとレベル2解放
- 3回間違えるとレベル3解放
- ヒント無しクリアで「真・データ探偵」称号獲得

## 🎬 ストーリー概要

これまでの全事件の黒幕たちが、ある一人の人物の指示で動いていた——「**幽鬼丸（ゆうきまる）**」。その正体は、**国家統計を作る官庁の元エリート官僚**。20年前、若き探偵（蛇道シェルロック）の上司だった男。

**ストーリー構造**：
- 第1幕：これまでの依頼人たちが事務所に集結。最終決戦への招集
- 第2幕：データ・カルテル本部への突入。ケース1〜3の手法を使う
- 第3幕：本部最深部、ケース4〜6の手法を使う
- 第4幕：最終ボス・幽鬼丸との対峙、ケース7〜9の手法と全範囲の応用
- 第5幕：解決、データ探偵・一級称号、修了証PDF発行

**最大の見せ場**：探偵と幽鬼丸の20年越しの因縁。20年前、若き官僚だった蛇道は、上司の幽鬼丸が国家統計を改竄しているのを見つけた。告発しようとしたが潰され、辞職に追い込まれた。それが「データ探偵」を生んだ理由

**伏線回収**：これまでに登場した依頼人全員（山田、雷神、あかり、鬼頭、深津、月詠、白瀬、若菜、閃光寺）が最終決戦に駆けつける

## 👥 登場キャラクター
- 蛇道シェルロック（探偵）
- ヒナタ・アカリ（助手）
- これまでの依頼人 全員：シズマ・ヤマダ、雷神タケシ、鬼頭テッペイ、深津カオリ、月詠きらら、白瀬ノエル、若菜ミレイ、閃光寺ペコ
- クロウ・サトウ（情報提供者）
- **幽鬼丸**（最終ボス・68歳・組織の頂点）
- 補助キャラ：佐藤の元同僚で官僚時代の仲間「**真壁ハルカ**」（若手女性官僚、終盤で重要な情報を提供）

---

## 📝 詳細スクリプト（最終話・特別構成・全80ステップ程度）

### 第1幕：依頼【最終決戦への招集】

🎵 **BGM: track_final_call**（壮大なオーケストラのオープニング）

#### Step c-01
- type: `narrative`, speaker: `narrator`
- 「2030年12月。雪が降りしきる新宿。事務所には、これまで探偵が救った人々が、自然と集まっていた」

#### Step c-02
- type: `narrative`, speaker: `narrator`
- 「シズマ・ヤマダ、雷神タケシ、鬼頭テッペイ、深津カオリ、月詠きらら、白瀬ノエル、若菜ミレイ、閃光寺ペコ。ヒナタ・アカリと、クロウ・サトウ。**全員、データ探偵の事件で人生を変えられた者たち**」

#### Step c-03
- type: `dialogue`, speaker: `yamada`, expression: `worried`, showPortrait: true
- 「探偵さん。みんな、何となく集まりました。**最後の事件、手伝わせてください**」

#### Step c-04
- type: `dialogue`, speaker: `client`(若菜), expression: `hopeful`
- 「あらまあ、すごい人数ね！主婦の私でも何かできるかしら」

#### Step c-05
- type: `dialogue`, speaker: `client`(白瀬), expression: `angry`
- 「私、組織を倒すまで諦めません」

#### Step c-06
- type: `dialogue`, speaker: `client`(鬼頭), expression: `angry`
- 「俺は20年エンジニアやってきました。**こいつらに、技術で負けるわけにいかねえ**」

#### Step c-07
- type: `dialogue`, speaker: `detective`, expression: `neutral`
- 「（探偵は珍しく、皆を見渡してから、口角を上げた）……驚いた。**全員、揃うとはな**」

#### Step c-08
- type: `dialogue`, speaker: `akari`, expression: `hopeful`
- 「みんな、自然と集まってきてくれたんですよ！」

#### Step c-09
- type: `dialogue`, speaker: `sato`, expression: `neutral`, showPortrait: true
- 「探偵。最後の幹部の居場所が掴めた。**虎ノ門の地下、データ・カルテル本部**。最終ボス・幽鬼丸が、そこにいる」

#### Step c-10
- type: `dialogue`, speaker: `detective`, expression: `thinking`
- 「（**幽鬼丸**——**20年待った**）」

#### Step c-11
- type: `dialogue`, speaker: `akari`, expression: `worried`
- 「探偵さん、何か、表情が……？」

#### Step c-12
- type: `dialogue`, speaker: `detective`, expression: `neutral`
- 「**幽鬼丸は、20年前の俺の上司だ**」

#### Step c-13
- type: `dialogue`, speaker: `narrator`, expression: `neutral`
- 「（事務所が静まり返った。あかりは口を覆った）」

#### Step c-14
- type: `dialogue`, speaker: `detective`, expression: `thinking`
- 「20年前、俺は霞が関の統計局でエリート官僚だった。ある日、**幽鬼丸が国家経済統計を改竄しているのを見つけた**。告発しようとして、潰された」

#### Step c-15
- type: `dialogue`, speaker: `detective`, expression: `neutral`
- 「あの男は、**俺がデータ探偵を始めた理由そのもの**。今夜、20年の借りを返す」

#### Step c-16
- type: `dialogue`, speaker: `yamada`, expression: `eureka`
- 「探偵さん、**僕たちで一緒に行きましょう**！全員で！」

#### Step c-17
- type: `dialogue`, speaker: `detective`, expression: `neutral`
- 「**ありがたい**。皆、データの読み方は身につけた。**今日は、各々が事件で学んだ手法を使って、ボスを追い詰める**」

---

### 第2幕：本部突入【ケース1〜3の手法復習】

🎵 **BGM: track_infiltration**（潜入アクションテーマ・ロックドラム＋エレキ）

#### Step s-01
- type: `narrative`, speaker: `narrator`
- 「虎ノ門の地下3階。データ・カルテル本部のエントランス。一行はゲートを突破するため、巨大なディスプレイの前に立った」

#### Step s-02
- type: `dialogue`, speaker: `narrator`
- 「ディスプレイには警告：『**3つの問題に正答せよ。さもなくばゲートは閉じる**』」

#### Step s-03 (PROBLEM 2-1: ケース1の応用)
- type: `interactive`
- content: '【問題2-1】平均は同じ100、標準偏差はAが10、Bが30。Aの30投稿のいいね分布で、いいね値130以上は何個程度と予測されるか？（正規分布を仮定、標準正規分布表を参照）'
- interaction: `choice`
- options:
  - ❌ 0個
  - ✅ 約1個（z=3.0で確率0.13%）
  - ❌ 約5個
  - ❌ 15個
- hints:
  - level1: '標準化得点 z = (x − μ) / σ で計算'
  - level2: 'A: z = (130 − 100) / 10 = 3.0'
  - level3: 'z=3.0 の上側確率は標準正規分布表で確認。それに30件を掛けると個数の期待値'

#### Step s-04 (PROBLEM 2-2: ケース2の応用)
- type: `interactive`
- content: '【問題2-2】確率0.5%のガチャを200連で2個以上出る確率は？（ポアソン近似で考えてOK）'
- interaction: `slider_estimate`
  - question: '確率（％）'
  - min: 0, max: 100, step: 1, correctAnswer: 26, tolerance: 5, unit: '%'
- hints:
  - level1: '余事象「0個または1個」を考えよう'
  - level2: 'np = 200×0.005 = 1。ポアソン近似でλ=1'
  - level3: 'P(0) = e⁻¹、P(1) = e⁻¹。これらを1から引く'

#### Step s-05 (PROBLEM 2-3: ケース3の応用)
- type: `interactive`
- content: '【問題2-3】平均1000、標準偏差200の週次フォロワー増加。Z-scoreが2.5を超える週があった場合、最も適切な説明は？'
- interaction: `choice`
- options:
  - ❌ ノイズの一種で、無視してよい
  - ❌ 必ず計測ミス
  - ✅ 統計的に異常（正規分布なら確率約0.6%）の候補。原因を調査すべき
  - ❌ 平均値が変動した

#### Step s-06
- type: `dialogue`, speaker: `client`(雷神), expression: `eureka`
- 「**よっしゃ！俺、ガチャの問題で復活してやったぜ！**」

#### Step s-07
- type: `narrative`, speaker: `narrator`
- 「ゲートが開く。一行は本部の最初のフロアに足を踏み入れた」

---

### 第3幕：核心へ【ケース4〜6の手法復習】

🎵 **BGM: track_deeper**（より重く深いテーマ）

#### Step i-01
- type: `narrative`, speaker: `narrator`
- 「本部最深部に向かう途中、3つの『試練の間』を通過する必要がある」

#### Step i-02 (PROBLEM 3-1: ケース4の応用)
- type: `interactive`
- content: '【問題3-1】あるサービスの満足度が「平均7.5/10、中央値5.0」。最も適切な解釈は？'
- interaction: `choice`
- options:
  - ❌ 多くの人が満足している
  - ❌ 少数の不満が平均を下げている
  - ✅ 評価が二極化している可能性が高い（高評価と低評価が両端に分布）
  - ❌ 計測誤差
- hints:
  - level1: '平均と中央値が大きくズレている分布を考える'
  - level2: '中央値が5なのに平均が7.5——上位半分に強く偏った値がある'
  - level3: '上位群が極端に高評価で、下位群もそれなりに存在するパターン'

#### Step i-03 (PROBLEM 3-2: ケース5の応用)
- type: `interactive`
- content: '【問題3-2】標本サイズn=400で標本支持率p̂=50%。95%信頼区間の幅は？'
- interaction: `slider_estimate`
  - question: '±何ポイント？'
  - min: 0, max: 10, step: 0.1, correctAnswer: 4.9, tolerance: 0.5, unit: '%'
- hints:
  - level1: '公式 1.96 × √(p̂(1-p̂)/n) を使う'
  - level2: '√(0.5×0.5/400) = √(0.000625) = 0.025'
  - level3: '1.96 × 0.025 を計算してパーセント表示に'

#### Step i-04 (PROBLEM 3-3: ケース6の応用)
- type: `interactive`
- content: '【問題3-3】感度0.95、特異度0.95、事前確率1%の場合、陽性的中率は？'
- interaction: `slider_estimate`
  - question: '陽性的中率（％）'
  - min: 0, max: 100, step: 1, correctAnswer: 16, tolerance: 3, unit: '%'
- hints:
  - level1: '1万人で計算してみよう。本物=100人、本物以外=9900人'
  - level2: '正検出 = 100×0.95 = 95、誤検出 = 9900×0.05 = 495'
  - level3: '陽性総数は95+495=590。本物は95。割合をパーセントに'

#### Step i-05
- type: `dialogue`, speaker: `client`(月詠), expression: `eureka`
- 「**陽性的中率16%……低い**！精度95%でも、事前確率が低ければやっぱり冤罪だらけになる」

#### Step i-06
- type: `dialogue`, speaker: `detective`, expression: `neutral`
- 「皆、よく学んだ。**ベイズの定理は、世界の見方を変える道具だ**」

---

### 第4幕：対峙【ケース7〜9の応用 + 最終ボス】

🎵 **BGM: track_final_battle_part1**（緊迫した最終決戦の前奏・ストリングス＋低音シンセ）

#### Step d-01
- type: `narrative`, speaker: `narrator`
- 「最深部の扉を開けると、巨大な円形の部屋。中央に、ひとりの老人が立っていた」

#### Step d-02
- type: `narrative`, speaker: `narrator`
- 「真っ白な総白髪オールバック、漆黒の和洋折衷の長衣、首から3つの目のメダル。手には古い算盤——**幽鬼丸**」

#### Step d-03
- type: `dialogue`, speaker: `boss_final`, expression: `smug`, showPortrait: true
- 「久しぶりだな、**蛇道四郎**。20年ぶりか」

#### Step d-04
- type: `dialogue`, speaker: `detective`, expression: `thinking`
- 「幽鬼丸……**統計局の元統括官**」

#### Step d-05
- type: `dialogue`, speaker: `boss_final`, expression: `smug`
- 「お前は若かった。GDP統計の改竄に気づいた、**唯一の若手**だった。あの時、お前を消すべきだったかも知れんな」

#### Step d-06
- type: `dialogue`, speaker: `detective`, expression: `neutral`
- 「**なぜ統計を改竄した**」

#### Step d-07
- type: `dialogue`, speaker: `boss_final`, expression: `smug`
- 「**国家のためじゃよ**。経済が低迷しているとき、本当の数字を出せば、株価が下がる、政権が倒れる、社会が混乱する。だから、ワシは『調整』した」

#### Step d-08
- type: `dialogue`, speaker: `boss_final`, expression: `smug`
- 「だが、ある時気づいた——**もっと大きなことができる**。SNS、AI、評価システム、選挙——**世界の数字すべてを支配すれば、世界そのものを動かせる**」

#### Step d-09
- type: `dialogue`, speaker: `boss_final`, expression: `smug`
- 「それが『**データ・カルテル**』の誕生じゃ。ワシは20年かけて、組織を作り上げた」

#### Step d-10
- type: `dialogue`, speaker: `detective`, expression: `neutral`
- 「お前のせいで、何百万人が騙された」

#### Step d-11
- type: `dialogue`, speaker: `boss_final`, expression: `smug`
- 「**衆愚に真実は不要**じゃ。彼らに必要なのは、彼らが信じたい数字だけ」

#### Step d-12
- type: `dialogue`, speaker: `client`(若菜), expression: `angry`
- 「**衆愚って言わないで！**私、おばさんで主婦で、確かに金剛茶に騙されたわ。**でも、そこから学んで、今ここに立ってる**！」

#### Step d-13
- type: `dialogue`, speaker: `client`(閃光寺), expression: `angry`
- 「私も、配信者は家畜だって言われたけど、**家畜じゃない**。**学んで、強くなれる人間**よ」

#### Step d-14
- type: `dialogue`, speaker: `client`(yamada), expression: `angry`
- 「僕も、最初は数字に騙されたバカでした。**でも、もう騙されません**！」

#### Step d-15
- type: `dialogue`, speaker: `boss_final`, expression: `enraged`, showPortrait: true
- 「（幽鬼丸の表情が初めて崩れる）……**お前ら、ゴミどもが**！数字を読めるくらいで、ワシに勝てると思っているのか！」

🎵 **BGM切替: track_final_battle_part2**（最終決戦本編・激しい交響曲）

#### Step d-16
- type: `narrative`, speaker: `narrator`
- 「（幽鬼丸の和装外套が裂ける。背中から統計図表で構成された幾何学的な翼が展開し、額に3つの赤く光る目が浮かぶ。**第2形態・覚醒態**）」

#### Step d-17
- type: `dialogue`, speaker: `boss_final`, expression: `enraged`
- 「**5問**じゃ！全て正答できれば、ワシは負けを認める。1問でも誤れば、お前らは**ここで終わる**！」

#### Step d-18 (FINAL BOSS QUIZ 1: 仮説検定)
- type: `interactive`
- content: '【最終決戦1/5】全国の有権者母集団で支持率μ₀=40%という仮説を、n=400の標本（標本支持率45%）で検定する。z値は？'
- interaction: `slider_estimate`
  - question: 'z値（小数第1位）'
  - min: 0, max: 5, step: 0.1, correctAnswer: 2.0, tolerance: 0.2, unit: ''
- hints:
  - level1: '比率の検定 z = (p̂ − p₀) / √(p₀(1-p₀)/n)'
  - level2: '分母 = √(0.4×0.6/400) = √0.0006 ≈ 0.0245'
  - level3: '差は 0.05、分母は約 0.025。両者を割る'

#### Step d-19 (FINAL BOSS QUIZ 2: 回帰分析)
- type: `interactive`
- content: '【最終決戦2/5】単回帰 y = a + bx で、x の分散12、xとyの共分散9のとき、傾き b は？'
- interaction: `slider_estimate`
  - question: 'b（小数第2位）'
  - min: 0, max: 2, step: 0.05, correctAnswer: 0.75, tolerance: 0.05, unit: ''
- hints:
  - level1: '最小二乗法での傾きの公式は b = Cov(x,y) / Var(x)'
  - level2: '分子と分母の値を当てはめる'
  - level3: '共分散9を分散12で割る。1未満の値になる'

#### Step d-20 (FINAL BOSS QUIZ 3: カイ二乗)
- type: `interactive`
- content: '【最終決戦3/5】3カテゴリの観測度数 [40, 50, 30]、各カテゴリの期待度数が均等（n=120, 各40）。カイ二乗統計量は？'
- interaction: `slider_estimate`
  - question: 'χ²（小数第1位）'
  - min: 0, max: 20, step: 0.5, correctAnswer: 5.0, tolerance: 0.5, unit: ''
- hints:
  - level1: 'χ² = Σ (O−E)² / E を全カテゴリで合計'
  - level2: '各カテゴリの (O−E)² は 0、100、100'
  - level3: '0、100、100 をそれぞれ40で割って、全部を足し合わせる'

#### Step d-21 (FINAL BOSS QUIZ 4: 区間推定)
- type: `interactive`
- content: '【最終決戦4/5】n=100, 標本平均x̄=50, 標本標準偏差s=10。母平均μの95%信頼区間は？'
- interaction: `choice`
- options:
  - ❌ [49.0, 51.0]
  - ✅ [48.04, 51.96]
  - ❌ [40.2, 59.8]
  - ❌ [45.0, 55.0]
- hints:
  - level1: '区間の式は x̄ ± z₀.₀₂₅ × (s/√n)'
  - level2: '誤差項 = 1.96 × (10/10) = 1.96'
  - level3: '中心は標本平均、両側に約2広がる。選択肢のうち、中心50で幅が約4のものを探す'

#### Step d-22 (FINAL BOSS QUIZ 5: 総合)
- type: `interactive`
- content: '【最終決戦5/5】「精度99%のAIが陽性判定。事前確率0.1%の状況で、本当に偽物の確率は約9%」——この事実から幽鬼丸が悪用した手法は？'
- interaction: `choice`
- options:
  - ❌ p値ハッキング
  - ❌ サンプリングバイアスのみ
  - ✅ 高精度の数字を見せて、事前確率の低さを隠す（ベイズの罠）
  - ❌ カイ二乗検定の悪用

#### Step d-23
- type: `dialogue`, speaker: `boss_final`, expression: `defeated`, showPortrait: true
- 「（幽鬼丸の3つの目のうち、2つが消える。残る1つも、弱々しく明滅する）……まさか、**全問正答**じゃと……」

#### Step d-24
- type: `dialogue`, speaker: `detective`, expression: `neutral`
- 「**幽鬼丸**。お前を倒したのは、俺一人じゃない。**この場にいる全員、そして、家でこのゲームをプレイしている全ての人間**だ」

#### Step d-25
- type: `dialogue`, speaker: `boss_final`, expression: `defeated`
- 「**ゲーム……？**」

#### Step d-26
- type: `narrative`, speaker: `narrator`
- 「（カメラが探偵側に回り込み、第四の壁を破る演出。プレイヤーが見ている画面に向かって、探偵が真っ直ぐ目を向ける）」

#### Step d-27
- type: `dialogue`, speaker: `detective`, expression: `neutral`
- 「世界中で、**今この瞬間も、数字を読み解く力を身につけた者たちが増えている**。お前のような『**衆愚を支配する者**』は、もう時代遅れだ」

#### Step d-28
- type: `dialogue`, speaker: `boss_final`, expression: `defeated`
- 「……ワシは、**統計を愛していた**だけだった」

#### Step d-29
- type: `dialogue`, speaker: `boss_final`, expression: `defeated`
- 「だが、愛は支配に変わり、**支配は破滅を生む**。蛇道よ……お前が、正しかったのかも知れんな」

#### Step d-30
- type: `narrative`, speaker: `narrator`
- 「（幽鬼丸の翼が崩れ、額の3つ目が完全に消える。彼は静かに膝をついた）」

---

### 第5幕：解決【継承】

🎵 **BGM: track_finale**（壮大な終楽章・希望のテーマ）

#### Step sol-01
- type: `narrative`, speaker: `narrator`
- 「3日後。データ・カルテルは解体。幽鬼丸は警察に引き渡され、20年に及ぶ国家統計改竄の罪状が明らかにされた。世界中のメディアが、組織が悪用してきた手法を報じ、『データリテラシー教育』が国家戦略として動き始めた」

#### Step sol-02
- type: `narrative`, speaker: `narrator`
- 「事務所では、これまでの依頼人たちが集まり、ささやかな祝賀会が開かれていた」

#### Step sol-03
- type: `dialogue`, speaker: `client`(yamada), expression: `hopeful`, showPortrait: true
- 「探偵さん、**僕、会社で「データ部」を立ち上げました**。新人マーケターに統計を教える役職です」

#### Step sol-04
- type: `dialogue`, speaker: `client`(若菜), expression: `hopeful`
- 「私は、地域のお母さんたちに**「家計データの読み方教室」**始めたのよ！主婦が一番、数字に騙されやすいから」

#### Step sol-05
- type: `dialogue`, speaker: `client`(白瀬), expression: `hopeful`
- 「私は転職して、**統計コンサル**になりました。組織の手口を知っているから、そういう連中の仕事を潰すために」

#### Step sol-06
- type: `dialogue`, speaker: `client`(月詠), expression: `hopeful`
- 「私は、**数字を学ぶイラストレーター**になりました！絵で統計の魅力を伝えたい！」

#### Step sol-07
- type: `dialogue`, speaker: `client`(閃光寺), expression: `hopeful`
- 「私は、**統計学を配信するVTuber**になりました！登録者は20万人ですが、皆、本当に統計を学びに来てくれてます」

#### Step sol-08
- type: `dialogue`, speaker: `akari`, expression: `hopeful`, showPortrait: true
- 「皆さん、ステキすぎます……！私は、**この事務所に残って、探偵さんの助手を続けます**。次の依頼が来たら、また一緒に解きましょうね」

#### Step sol-09
- type: `dialogue`, speaker: `detective`, expression: `neutral`
- 「（探偵は、Σペンダントを指でなぞった）……皆。**ありがとう**」

#### Step sol-10
- type: `dialogue`, speaker: `detective`, expression: `neutral`
- 「俺がデータ探偵を始めた20年前、こうなる未来は、想像できなかった。**数字を読める人間が、こんなにも増える未来**は」

#### Step sol-11 (CERTIFICATE)
- type: `narrative`, speaker: `narrator`
- 「【**修了証発行**】\n\n プレイヤー名：________ 様\n\n あなたは、データ探偵ゲーム全10事件を完走し、統計検定2級レベルの数学を身につけました。称号「**データ探偵・一級**」を授与します。\n\n この修了証は、あなたが「**数字に騙される側ではなく、読み解く側**」になった証です。\n\n（PDF修了証ダウンロードボタン表示）'

#### Step sol-12
- type: `dialogue`, speaker: `detective`, expression: `neutral`
- 「（探偵はカメラ＝プレイヤーに向き直る）」

#### Step sol-13
- type: `dialogue`, speaker: `detective`, expression: `neutral`
- 「**おめでとう、新人探偵**。ここで身につけた目は、本物だ。これから先、**数字に出会うたび、平均だけでなく分散を見ろ。確率だけでなく事前確率を見ろ。相関だけでなく因果を疑え**」

#### Step sol-14
- type: `dialogue`, speaker: `detective`, expression: `neutral`
- 「**数字は嘘をつかない。嘘をつくのは、数字を使う人間だ**——それを忘れるな」

#### Step sol-15
- type: `narrative`, speaker: `narrator`
- 「事件 No.010、ならびに**全10事件**——\n\n**完全解決**」

🎵 **BGM フェードアウト → ED曲: track_credits_theme**（エンドロール用の感動的な楽曲）

---

## 🎵 BGM・SE指示

| 幕 | BGM ID | 雰囲気 |
|---|---|---|
| 1 | track_final_call | 壮大、招集、オーケストラ |
| 2 | track_infiltration | 潜入、ロックドラム |
| 3 | track_deeper | 深淵、重厚 |
| 4 part1 | track_final_battle_part1 | 緊迫の前奏 |
| 4 part2 | track_final_battle_part2 | 最終決戦本編 |
| 5 | track_finale | 希望、継承 |
| ED | track_credits_theme | 感動の終楽章 |

| イベント | SE |
|---|---|
| 探偵の過去告白 | se_emotional_strike（強く） |
| 第2形態への変身 | se_transform_omen（不穏な変化音） |
| 全問正答時 | se_victory_fanfare（勝利のファンファーレ） |
| 修了証発行 | se_certificate_chime（厳かな鐘） |
