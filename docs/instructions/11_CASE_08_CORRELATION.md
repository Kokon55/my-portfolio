# 11. ケース8：相関は因果ではない - 偽の関係を暴け

## 📊 統計範囲
- **主**：散布図、相関係数、共分散、単回帰、最小二乗法、疑似相関、フィッシャー3原則
- **副**：観察研究と実験研究の違い

## 💡 ヒント設計指針（このケース全般）

- **Level 1**：考えるべき方向性だけを示す（例：「第3変数を疑え」）
- **Level 2**：途中までの計算や着眼点を示し、最後の一手は残す
- **Level 3**：手順を細かく分解し、答えそのものは書かない（最後の判断はプレイヤーに残す）

## 🎬 ストーリー概要

「この健康ドリンク『**金剛茶**』を毎日10本飲ませると、夫の年収が上がる！相関係数0.85！」と豪語するインフルエンサー医師・**金剛寺亀蔵教授**（62歳）。被害者の主婦・**若菜ミレイ**（35歳）が「夫に毎日10本飲ませてるのに年収が上がらない、むしろ夫が痛風になった」と相談。

**二段オチ構造**：
- 表向き：「相関0.85だから因果関係がある」
- 真相：第3変数「年齢」を加えると、年齢→年収・年齢→金剛茶摂取量、両方の説明変数。年齢で層別化すると相関は0.05まで落ちる。さらに金剛寺の論文工場が背後にあり、観察研究のみでRCT（ランダム化比較試験）を一切行っていない疑似研究だった

**伏線**：論文工場のオフィス壁画に堂々と「3つの目」が描かれている。もはや隠す気もない

## 👥 登場キャラクター
- 蛇道シェルロック（探偵）
- ヒナタ・アカリ（助手）
- 白瀬ノエル（前話から再登場、組織討伐に参加）
- **若菜ミレイ**（依頼人・35歳・主婦・三人の子持ち）
  - 大柄でふくよか、明るくおおらか、笑い声が大きい
  - エプロン姿、髪を後ろで束ねている、腕に買い物袋
  - 「相関係数って何？」レベルだが、地頭は良い
- **金剛寺亀蔵**（黒幕「論文の悪魔」・62歳・教授）

---

## 📝 詳細スクリプト

### 第1幕：依頼【主婦の珍相談】

🎵 **BGM: track_commission_homely**（穏やかな日常テーマ・ウクレレ＋アコーディオン）

#### Step c-01
- type: `narrative`, speaker: `narrator`
- 「火曜日の午後3時。事務所のドアが、明るくノックされた」

#### Step c-02
- type: `dialogue`, speaker: `client`, expression: `worried`, showPortrait: true
- 「あらまあ、ここが探偵さんの事務所？私、若菜ミレイっていうの、ただの主婦よ。お時間あるかしら？」

#### Step c-03
- type: `dialogue`, speaker: `akari`, expression: `hopeful`
- 「（あかりが慌てて応対）どうぞどうぞ！何かお飲み物でも？」

#### Step c-04
- type: `dialogue`, speaker: `client`, expression: `worried`
- 「ありがとう！実はね、うちの旦那の話なんだけど、**金剛茶**ってご存知？」

#### Step c-05
- type: `dialogue`, speaker: `detective`, expression: `thinking`
- 「金剛寺亀蔵教授が広告塔をしている、健康ドリンクですね」

#### Step c-06
- type: `dialogue`, speaker: `client`, expression: `worried`
- 「そう、それ！『毎日10本飲ませると、夫の年収が上がる！相関係数0.85！』って、テレビでよく言ってるでしょ？」

#### Step c-07
- type: `dialogue`, speaker: `client`, expression: `distraught`
- 「うちの旦那、**3年間、毎日10本ずつ飲ませてるのに、年収全然上がらないの！**それどころか、**先月、痛風になっちゃって**……」

#### Step c-08
- type: `dialogue`, speaker: `detective`, expression: `thinking`
- 「（探偵が口角を一瞬上げた）……痛風」

#### Step c-09
- type: `dialogue`, speaker: `client`, expression: `worried`
- 「あらま、笑わないでよ！真剣な話なのよ！1本300円×10本×365日×3年で、**約328万円**よ！年収上がるどころか、健康保険料まで掛かって……」

#### Step c-10
- type: `dialogue`, speaker: `detective`, expression: `neutral`
- 「失礼。若菜さん、**相関係数0.85という数字は本当か、と疑ったことは？**」

#### Step c-11
- type: `dialogue`, speaker: `client`, expression: `worried`
- 「えーっと、相関係数って……何だっけ？」

#### Step c-12
- type: `dialogue`, speaker: `akari`, expression: `hopeful`
- 「私が説明します！えっと、2つの数字がどれくらい『一緒に動くか』を示す数字で、−1から+1までの値を取って……」

#### Step c-13
- type: `dialogue`, speaker: `detective`, expression: `thinking`
- 「アカリ、悪くない説明だ。続けていいぞ」

---

### 第2幕：現場【相関係数の解剖】

🎵 **BGM: track_crime_scene_light**（軽快な調査ビート・ピチカート系）

#### Step s-01
- type: `mini_lesson`, speaker: `detective`
- content: '【数学I】相関係数 r\n\n2変数 x, y の関係の強さを示す指標。\n\n- r = +1：完全に正の比例\n- r = 0：無相関\n- r = −1：完全に逆比例'
- formula: `r = \\frac{\\frac{1}{n}\\sum(x_i - \\bar{x})(y_i - \\bar{y})}{s_x \\cdot s_y}`

#### Step s-02
- type: `dialogue`, speaker: `detective`, expression: `neutral`
- 「金剛寺教授の論文の元データを、入手した。**金剛茶の年間摂取本数**と**年収**の散布図、見たまえ」

#### Step s-03
- type: `interactive`
- content: '散布図：金剛茶摂取本数 vs 年収'
- interaction: `follower_growth`（仕様流用：散布図モード）
  - データ：300人分、相関係数 r ≈ 0.85
- 達成条件：閲覧後「確認した」ボタン

#### Step s-04
- type: `dialogue`, speaker: `client`, expression: `eureka`
- 「あらまあ、確かに、右上がりに見えるわね。本数が増えるほど、年収が高い人が多い」

#### Step s-05
- type: `dialogue`, speaker: `detective`, expression: `neutral`
- 「相関係数を**目視**で当ててみよう。アカリ、君ならどう見る？」

#### Step s-06
- type: `interactive`
- content: '🧮 この散布図の相関係数の概算値は？'
- interaction: `slider_estimate`
  - question: '相関係数 r の値は（小数第1位）'
  - min: -1, max: 1, step: 0.1, correctAnswer: 0.8, tolerance: 0.15, unit: ''
- hints:
  - level1: '点が右上がりに並んでいるか、ばらついているかを見よう'
  - level2: '点群が直線にそって細長く伸びているなら、強い正の相関'
  - level3: '右上がりが明瞭で、ばらつきがやや小さい——0.7〜0.9のレンジ'

#### Step s-07
- type: `dialogue`, speaker: `detective`, expression: `thinking`
- 「**確かに 0.85 前後。数字としては嘘ではない**。だが——**0.85は『因果関係』を示すか？**」

#### Step s-08
- type: `dialogue`, speaker: `client`, expression: `worried`
- 「えっ、相関が強ければ、因果関係があるんじゃないの？」

#### Step s-09
- type: `dialogue`, speaker: `detective`, expression: `neutral`
- 「**それが、最大の罠だ**」

---

### 第3幕：捜査【第3変数の発見】

🎵 **BGM: track_investigation_pulse**

#### Step i-01
- type: `mini_lesson`, speaker: `detective`
- content: '【疑似相関 / 交絡】\n\n2変数 X, Y に強い相関があっても、**第3変数 Z** が両方に影響している場合、X→Y の因果は存在しない。\n\nZ を「**交絡因子（Confounder）**」と呼ぶ。'

#### Step i-02
- type: `dialogue`, speaker: `detective`, expression: `neutral`
- 「金剛茶の摂取本数と年収——**両方に影響しそうな第3変数**は何か？」

#### Step i-03
- type: `interactive`
- content: '🤔 第3変数として、可能性が高いのはどれ？'
- interaction: `choice`
- options:
  - ❌ 性別
  - ✅ 年齢（年齢が上がる→年収↑、年齢が上がる→健康志向で金剛茶↑）
  - ❌ 学歴
  - ❌ 居住地
- hints:
  - level1: '「年収」と「健康ドリンク摂取」、両方に影響を与える属性は何か'
  - level2: '一般に、年齢が高いほど年収は上がる傾向。健康への関心も同様'
  - level3: '世代差を強く受ける属性は'

#### Step i-04
- type: `dialogue`, speaker: `detective`, expression: `neutral`
- 「正解だ。**年齢**——金剛茶を多く飲む人は40代以上の健康志向の中年。彼らはキャリアを積んでいて、年収も自然に高い」

#### Step i-05
- type: `dialogue`, speaker: `detective`, expression: `neutral`
- 「**年齢で層別化する**と、相関がどう変わるか見せよう」

#### Step i-06
- type: `interactive`
- content: '年齢層別に分けた散布図。20代・30代・40代・50代でそれぞれの相関係数は？'
- interaction: `distribution_compare`（散布図比較モード追加）
  - datasets:
    - { label: '20代の散布図', values: 摂取量と年収のデータ（相関ほぼなし） }
    - { label: '30代の散布図', values: 同上 }
    - { label: '40代の散布図', values: 同上 }
    - { label: '50代の散布図', values: 同上 }
- 達成条件：閲覧後「確認した」

#### Step i-07
- type: `dialogue`, speaker: `detective`, expression: `neutral`
- 「**各年代の中では、相関はほぼゼロ（r ≈ 0.05）**だ。年齢を固定すれば、金剛茶を飲んでも年収は上がらない」

#### Step i-08
- type: `mini_lesson`, speaker: `detective`
- content: '【シンプソンのパラドックス】\n\n全体で見ると相関があるのに、層別化すると相関が消える（または逆転する）現象。\n\n交絡因子の存在を見抜くサインだ。'

#### Step i-09
- type: `dialogue`, speaker: `client`, expression: `eureka`, showPortrait: true
- 「**えーっ！じゃあ、金剛茶飲んでも年収上がらないの？**まあ、3年間328万円でこの結論……あらやだ、私バカみたい！」

#### Step i-10
- type: `dialogue`, speaker: `client`, expression: `hopeful`
- 「でも、**バカな自分を笑える賢さ**を、今手に入れたわ！探偵さん、もっと教えて！」

#### Step i-11
- type: `dialogue`, speaker: `detective`, expression: `neutral`
- 「（こいつ、強い）……次は、**金剛寺教授の研究そのもの**を疑う番だ」

---

### 第4幕：推理【論文の悪魔・金剛寺亀蔵】

🎵 **BGM: track_deduction_revelation → track_villain_theme**

#### Step d-01
- type: `narrative`, speaker: `narrator`
- 「水曜日。探偵・あかり・白瀬・若菜は、金剛寺教授の研究所『**金剛総合研究機構**』を訪れた」

#### Step d-02
- type: `narrative`, speaker: `narrator`
- 「ロビーには巨大な壁画が掛けられていた。**3つの目を持つ亀**——**完全に「3つの目」を堂々と描いている**」

#### Step d-03
- type: `dialogue`, speaker: `akari`, expression: `shocked`
- 「もう……隠す気もないんですね、あの組織」

#### Step d-04
- type: `dialogue`, speaker: `shirase`, expression: `angry`
- 「ここまで露骨だと、逆に怖いです」

#### Step d-05
- type: `narrative`, speaker: `narrator`
- 「会議室に通された一行。やがて入ってきたのは、150cmほどの小柄な老人。**白く長い顎髭が床まで届く**。亀のような猫背」

#### Step d-06
- type: `dialogue`, speaker: `boss_correlation`, expression: `smug`, showPortrait: true
- 「ようこそ、データ探偵さん。金剛寺亀蔵じゃ。**ワシの研究にケチをつけに来たそうじゃの**」

#### Step d-07
- type: `dialogue`, speaker: `detective`, expression: `neutral`
- 「金剛寺教授。あなたの『金剛茶論文』は**観察研究のみで、ランダム化比較試験（RCT）を一切行っていない**。フィッシャーの3原則も満たしていない」

#### Step d-08
- type: `mini_lesson`, speaker: `detective`
- content: '【データ収集法】観察研究 vs 実験研究\n\n- 観察研究：既に存在する集団を観察するだけ→ 因果関係は**主張できない**\n- 実験研究（RCT）：被験者をランダムに割り付けて介入→ 因果関係を**主張できる**\n\n金剛寺の研究は前者で、年齢などの交絡因子を制御していない。'

#### Step d-09
- type: `mini_lesson`, speaker: `detective`
- content: '【フィッシャーの3原則】\n\n① **無作為化**：被験者をランダムに割り付け\n② **反復**：同じ条件を複数回実験\n③ **局所管理**：環境条件を均一にする\n\n3つを満たさない実験は、信頼できる因果結論を出せない。'

#### Step d-10
- type: `dialogue`, speaker: `boss_correlation`, expression: `smug`
- 「ふぉっふぉっふぉ。**RCTにはコストが掛かるんじゃよ**。観察研究で十分な相関が出れば、それで論文として通る。**ジャーナルも金で買えるしの**」

#### Step d-11
- type: `dialogue`, speaker: `client`, expression: `angry`
- 「ジャーナルって何か知らないけど、**お金で論文を載せてるってこと**？それで主婦を騙してるの？」

#### Step d-12
- type: `dialogue`, speaker: `boss_correlation`, expression: `smug`
- 「主婦のおばさん、よろしいかな？ワシが運営しているのは、**論文工場**じゃ。年に1000本以上の偽論文を量産して、組織の利権を支える企業の宣伝に使う。**金剛茶もその一つに過ぎない**」

#### Step d-13
- type: `dialogue`, speaker: `client`, expression: `angry`, showPortrait: true
- 「**おばさんって言わないで！**……あ、それは置いといて、**それを世の中に出してるってこと、信じられない**！全国の主婦が騙されてるじゃないの！」

#### Step d-14
- type: `dialogue`, speaker: `detective`, expression: `neutral`
- 「金剛寺。あなたの組織が量産した偽論文は、何本ある？」

#### Step d-15
- type: `dialogue`, speaker: `boss_correlation`, expression: `smug`
- 「過去10年で**約1万2000本**じゃの。健康食品・サプリ・教育商材・投資商材——『相関係数』だけで効果を主張する偽論文の山」

#### Step d-16
- type: `dialogue`, speaker: `shirase`, expression: `angry`
- 「**1万2000本**……日本中の人が騙されてる規模じゃないですか」

#### Step d-17
- type: `dialogue`, speaker: `boss_correlation`, expression: `smug`
- 「ふぉっふぉ。これがワシの『**論文の悪魔**』としての仕事じゃ。組織の七幹部の名にふさわしかろう」

---

### 第5幕：解決【相関と因果の境目】

🎵 **BGM: track_solution_calm → track_solution_uplift**

#### Step sol-01
- type: `narrative`, speaker: `narrator`
- 「金曜日。若菜の告発と、探偵が押収した論文工場のデータベースは大手新聞社にリークされた。金剛寺は逮捕、研究所は閉鎖。1万2000本の偽論文リストが公開され、医学会・栄養学会が大混乱に陥った」

#### Step sol-02
- type: `dialogue`, speaker: `client`, expression: `hopeful`, showPortrait: true
- 「探偵さん、本当にありがとうございました。**3年間328万円使った私が言うのもなんだけど**——」

#### Step sol-03
- type: `dialogue`, speaker: `client`, expression: `hopeful`
- 「**世の中『相関係数0.85！』って書いてあったら、まず疑う**ようにします。それと、夫には金剛茶じゃなくて、ちゃんとお水を飲ませる！」

#### Step sol-04
- type: `dialogue`, speaker: `akari`, expression: `hopeful`
- 「（小声で）若菜さん、めっちゃ前向きで素敵です……」

#### Step sol-05
- type: `mini_lesson`, speaker: `detective`
- content: '【教訓】「相関＝因果」と思わないために\n\n① **第3変数（交絡因子）**を疑う\n② **層別化**して相関が消えるか確認\n③ 観察研究か実験研究（RCT）か確認\n④ 実験研究なら**フィッシャーの3原則**を満たすか'

#### Step sol-06 (BOSS QUIZ 1)
- type: `interactive`
- content: '【ボス問題1/3】「アイスクリームの売上」と「水難事故」に強い正の相関がある。考えられる第3変数は？'
- interaction: `choice`
- options:
  - ❌ 海水の塩分濃度
  - ✅ 気温（暑い→アイスが売れる、暑い→海に行く人が増える）
  - ❌ 偶然の一致
  - ❌ アイスを食べると泳ぎたくなる

#### Step sol-07 (BOSS QUIZ 2)
- type: `interactive`
- content: '【ボス問題2/3】単回帰直線の最小二乗推定式 ŷ=a+bx で、傾き b の計算式は？'
- interaction: `choice`
- options:
  - ❌ b = 共分散 / 全体平均
  - ✅ b = (xとyの共分散) / (xの分散)
  - ❌ b = (yの分散) / (xの分散)
  - ❌ b = 相関係数 / nの平方根

#### Step sol-08 (BOSS QUIZ 3)
- type: `interactive`
- content: '【ボス問題3/3】因果関係を主張するために最も信頼できる研究デザインは？'
- interaction: `choice`
- options:
  - ❌ 大規模アンケート調査
  - ❌ 観察研究で相関係数を計算
  - ✅ 無作為化比較試験（RCT、フィッシャーの3原則を満たす実験）
  - ❌ メタアナリシスのみ

#### Step sol-09 (FORESHADOW)
- type: `narrative`, speaker: `narrator`
- 「（事務所のホワイトボード。探偵は『**金剛寺亀蔵（論文の悪魔）**』にバツ印を付けた。残る幹部：**算法の魔女**と**最終ボス・幽鬼丸**）」

#### Step sol-10
- type: `dialogue`, speaker: `akari`, expression: `worried`
- 「探偵さん、若菜さんって、**騙されたのに笑える人**ですね。すごい強さ……」

#### Step sol-11
- type: `dialogue`, speaker: `detective`, expression: `neutral`
- 「**学ぶ姿勢を持ち続けられる人間**は、何度でも立ち直れる。彼女は強い」

#### Step sol-12
- type: `narrative`, speaker: `detective`
- 「事件 No.008——**解決**」

---

## 🎵 BGM・SE指示

| 幕 | BGM ID | 雰囲気 |
|---|---|---|
| 1 | track_commission_homely | 主婦の日常テーマ、ウクレレ |
| 2 | track_crime_scene_light | 軽快、コメディ寄り |
| 3 | track_investigation_pulse | 第3変数の発見 |
| 4 | track_deduction_revelation → track_villain_theme | 老教授の悪意 |
| 5 | track_solution_uplift | 主婦の前向きさ |

| イベント | SE |
|---|---|
| 壁画の3つの目 | se_omen_drone |
| 1万2000本発覚 | se_emotional_strike |
| 若菜の「ばかみたい」 | se_warm_chime |
