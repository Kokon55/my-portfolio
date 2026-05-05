import type { Case } from './types';

// インフルエンサーAの投稿いいね数(30件)。平均約5000、分散が大きい
const A_LIKES = [
  20000, 18000, 17000, 15000, 12000,
  8000, 7000, 6500, 6000, 5500,
  5000, 4500, 4000, 3500, 3000,
  2500, 2000, 1800, 1500, 1200,
  1100, 900, 800, 700, 600,
  500, 400, 300, 200, 100,
];
// 合計 = 約 145,100、平均 ≈ 4,837 — UIでは「約5000」と表記

// インフルエンサーBの投稿いいね数(30件)。平均約3000、分散が小さい
const B_LIKES = [
  4000, 3900, 3800, 3700, 3600,
  3500, 3400, 3300, 3200, 3100,
  3050, 3000, 2950, 2900, 2850,
  2800, 2750, 2700, 2650, 2600,
  2550, 2500, 2450, 2400, 2350,
  2300, 2250, 2200, 2150, 2100,
];

// Aのフォロワー成長(24ヶ月、不自然に直線的)
const A_GROWTH = Array.from({ length: 24 }, (_, i) => 5000 + i * 4000);
// Bのフォロワー成長(24ヶ月、自然な波)
const B_GROWTH = [
  500, 800, 1100, 1300, 1800, 2200, 2500, 3500,
  4200, 5000, 6500, 8000, 9500, 11000, 14000, 16500,
  18000, 20000, 22500, 24000, 26000, 27500, 28500, 30000,
];

const buzzCase: Case = {
  id: 'case-01-buzz',
  title: 'バズの真実',
  subtitle: '10万いいねの嘘',
  client: {
    name: '山田',
    age: 27,
    occupation: '新人マーケター',
    characterId: 'yamada',
    defaultExpression: 'worried',
    avatar: {
      skin: '#f3d1b6',
      hair: '#3a2a1e',
      accent: '#1e3a8a',
      expression: 'distraught',
    },
    introLine: 'すみません、探偵さん…会社の500万円が、煙のように消えたんです。',
  },
  difficulty: 2,
  estimatedMinutes: 8,
  mathField: '数学I 「データの分析」',
  shortSummary:
    'フォロワー10万、いいね5000のインフルエンサーA。フォロワー3万、いいね3000のインフルエンサーB。Aを契約したが、なぜ効果が出ない?',
  acquiredSkills: [
    'SNSの数字を「絶対値」ではなく「率」と「分布」で評価できる',
    '平均だけでなく分散を見て、バズ偏重か安定発信かを判別できる',
    'フォロワー成長カーブの「不自然な直線性」から bot 購入を見抜ける',
    '高校数学I「データの分析」(平均・分散・標準偏差・外れ値)を実戦で使える',
  ],
  badge: {
    id: 'badge-sns-detective-3',
    name: 'SNS探偵・三級',
    rank: '三級',
    description: 'SNSの「絶対値の罠」を見抜く者の証',
  },

  acts: [
    // ──────────────── 第1幕:依頼 ────────────────
    {
      type: 'commission',
      title: '【依頼】事件ファイル No.001',
      steps: [
        {
          id: 'c-01',
          type: 'dialogue',
          speaker: 'narrator',
          content:
            '夜更けの探偵事務所。一通の依頼メールが届いた——差出人は新人マーケターの山田。件名「500万円が、消えました」。',
        },
        {
          id: 'c-02',
          type: 'dialogue',
          speaker: 'client',
          expression: 'distraught',
          showPortrait: true,
          content:
            'すみません、探偵さん…うちの会社、インフルエンサーマーケに500万円使ったんです。',
        },
        {
          id: 'c-03',
          type: 'dialogue',
          speaker: 'client',
          expression: 'worried',
          content:
            'インフルエンサーAは「フォロワー10万人、いいね平均5000」、Bは「フォロワー3万人、いいね平均3000」。Aの方が良さそうだから契約したのに…結果は全然違って。',
        },
        {
          id: 'c-04',
          type: 'dialogue',
          speaker: 'client',
          expression: 'distraught',
          content:
            'PR投稿のいいねは、想定の1/5。フォロワーの数だけ見たら、桁違いの差なのに——何が間違ってたんでしょう?',
        },
        {
          id: 'c-05',
          type: 'narrative',
          speaker: 'detective',
          content:
            'なるほど。フォロワー数の絶対値で判断したわけだ。だが SNS の数字には、しばしば嘘が紛れ込んでいる。まずは両者のプロフィールを見せてもらおう。',
        },
        {
          id: 'c-06',
          type: 'interactive',
          content: '架空SNS「Fluttr」のプロフィール画面',
          interaction: {
            kind: 'sns_profile',
            profile: {
              platform: 'Fluttr',
              handle: '@aurora_lifestyle',
              displayName: 'Aurora ✦ ライフスタイル',
              bio: '🌙 暮らしを彩る発信 / フォロワー10万人 / お仕事 → DM',
              followers: 100000,
              following: 432,
              posts: 1284,
              verified: true,
            },
          },
        },
        {
          id: 'c-07',
          type: 'interactive',
          content: '架空SNS「Fluttr」のプロフィール画面',
          interaction: {
            kind: 'sns_profile',
            profile: {
              platform: 'Fluttr',
              handle: '@minari_kurashi',
              displayName: 'みなり / 暮らしの研究家',
              bio: '🪴 小さな発見をシェア / 質問はDMで / フォロワー3万',
              followers: 30000,
              following: 280,
              posts: 612,
              verified: false,
            },
          },
        },
        {
          id: 'c-08',
          type: 'dialogue',
          speaker: 'detective',
          content:
            '——確かに、表面の数字ならAの圧勝だ。だが、ここに違和感がある。先へ進もう。',
        },
      ],
    },

    // ──────────────── 第2幕:現場 ────────────────
    {
      type: 'crime_scene',
      title: '【現場】データに残された痕跡',
      steps: [
        {
          id: 's-01',
          type: 'narrative',
          speaker: 'detective',
          content:
            '事件現場は「投稿データ」だ。AとB、それぞれ直近30投稿のいいね数をヒストグラムにする。よく見たまえ。',
        },
        {
          id: 's-02',
          type: 'interactive',
          content: '直近30投稿のいいね数の分布',
          interaction: {
            kind: 'distribution_compare',
            datasets: [
              { label: 'Aurora (フォロワー10万)', values: A_LIKES },
              { label: 'みなり (フォロワー3万)', values: B_LIKES },
            ],
          },
          hint: 'Aは平均が高い。だが、ばらつきはどうだ?',
        },
        {
          id: 's-03',
          type: 'dialogue',
          speaker: 'detective',
          content:
            'Aは平均こそ高いが、いいね数が100から20000まで激しく揺れている。ほとんどの投稿は数百〜千いいね、ごく稀に「バズ」が混じる構造だ。',
        },
        {
          id: 's-03b',
          type: 'interactive',
          content: '🚩 君の番だ。Aurora の30投稿の中から「平均を吊り上げているバズ投稿」を全部タップで告発してくれ。',
          interaction: {
            kind: 'outlier_spotter',
            threshold: 1.5,
            question: '怪しい投稿(=平均から大きく離れた値)をすべてタップして告発してください',
            posts: [
              { id: 'p1', likes: 20000, date: '2/14', emoji: '🎉', caption: '突然バズ' },
              { id: 'p2', likes: 18000, date: '2/22', emoji: '🔥', caption: '炎上気味' },
              { id: 'p3', likes: 17000, date: '3/05', emoji: '💫', caption: 'PR記事' },
              { id: 'p4', likes: 15000, date: '3/12', emoji: '✨', caption: '何故か伸びた' },
              { id: 'p5', likes: 12000, date: '3/19', emoji: '🌟', caption: 'コラボ' },
              { id: 'p6', likes: 8000, date: '3/26', emoji: '☕', caption: '日常' },
              { id: 'p7', likes: 7000, date: '4/02', emoji: '🪴', caption: '日常' },
              { id: 'p8', likes: 6500, date: '4/09', emoji: '📚', caption: '日常' },
              { id: 'p9', likes: 6000, date: '4/16', emoji: '🍰', caption: '日常' },
              { id: 'p10', likes: 5500, date: '4/23', emoji: '🌸', caption: '日常' },
              { id: 'p11', likes: 5000, date: '4/30', emoji: '🍵', caption: '日常' },
              { id: 'p12', likes: 4500, date: '5/07', emoji: '☁', caption: '日常' },
              { id: 'p13', likes: 4000, date: '5/14', emoji: '🥐', caption: '日常' },
              { id: 'p14', likes: 3500, date: '5/21', emoji: '🌿', caption: '日常' },
              { id: 'p15', likes: 3000, date: '5/28', emoji: '🌙', caption: '日常' },
              { id: 'p16', likes: 2500, date: '6/04', emoji: '🍃', caption: '日常' },
              { id: 'p17', likes: 2000, date: '6/11', emoji: '🌼', caption: '日常' },
              { id: 'p18', likes: 1800, date: '6/18', emoji: '🎐', caption: '日常' },
              { id: 'p19', likes: 1500, date: '6/25', emoji: '☔', caption: '日常' },
              { id: 'p20', likes: 1200, date: '7/02', emoji: '🍉', caption: '日常' },
              { id: 'p21', likes: 1100, date: '7/09', emoji: '🌻', caption: '日常' },
              { id: 'p22', likes: 900, date: '7/16', emoji: '🍦', caption: '日常' },
              { id: 'p23', likes: 800, date: '7/23', emoji: '🌊', caption: '日常' },
              { id: 'p24', likes: 700, date: '7/30', emoji: '⛱', caption: '日常' },
              { id: 'p25', likes: 600, date: '8/06', emoji: '🌴', caption: '日常' },
              { id: 'p26', likes: 500, date: '8/13', emoji: '🌺', caption: '日常' },
              { id: 'p27', likes: 400, date: '8/20', emoji: '🍑', caption: '日常' },
              { id: 'p28', likes: 300, date: '8/27', emoji: '🪼', caption: '不発' },
              { id: 'p29', likes: 200, date: '9/03', emoji: '🍂', caption: '不発' },
              { id: 'p30', likes: 100, date: '9/10', emoji: '🥀', caption: '不発' },
            ],
            successFeedback:
              '見事だ。上位5件のバズ投稿(z>1.5)を正確に特定した。これらを除けば「普段の Aurora」は数百いいねしか取れていない、と分かる。「平均5000」の正体は、ごく少数のバズ投稿による嵩上げだったわけだ。',
            partialFeedback:
              '惜しい。上位5件(2万・1.8万・1.7万・1.5万・1.2万)が真の外れ値だ。標準偏差の1.5倍以上、平均から離れている。',
          },
          hint: '上位5〜6件あたりが、他とかけ離れた数字になっている。',
        },
        {
          id: 's-04',
          type: 'dialogue',
          speaker: 'detective',
          content:
            '一方Bは2000〜4000の狭い範囲に密集している。安定して、フォロワーに刺さっている。',
        },
        {
          id: 's-05',
          type: 'dialogue',
          speaker: 'client',
          content:
            'え…平均は同じなのに、こんなに分布が違うんですか?',
        },
        {
          id: 's-06',
          type: 'dialogue',
          speaker: 'detective',
          content:
            '「平均」だけでは、データの真の姿は見えない。これは古来データ分析の鉄則だ。捜査に必要な道具を揃えよう。',
        },
      ],
    },

    // ──────────────── 第3幕:捜査(道具を学ぶ)────────────────
    {
      type: 'investigation',
      title: '【捜査】統計の道具を授ける',
      steps: [
        {
          id: 'i-01',
          type: 'mini_lesson',
          speaker: 'detective',
          content:
            '【道具1:エンゲージメント率】SNSの真の影響力は、フォロワー数ではなく「フォロワーのうち何%が反応したか」で測る。これを「率」または「比率」で考えるという。',
          formula: 'エンゲージ率 = \\frac{\\text{いいね数}}{\\text{フォロワー数}} \\times 100\\%',
          formulaMeaning:
            '「届いた人(=フォロワー)のうち、何%が実際に反応したか」を百分率で表したもの。フォロワー数が多くても、反応する人が少なければエンゲージ率は低い。',
          formulaSymbols: [
            { symbol: 'いいね数', meaning: '1投稿あたりのいいね数(平均)。SNSの「反応の量」を表す。' },
            { symbol: 'フォロワー数', meaning: 'そのアカウントを購読している人の数。「届く可能性のある母数」。' },
            { symbol: '× 100%', meaning: '率を百分率(パーセント)で表すための変換。'},
          ],
        },
        {
          id: 'i-01b',
          type: 'interactive',
          content: '🛠 道具を組み立てよう。下のチップを上の枠にタップで配置して、エンゲージ率の式を完成させてくれ。',
          reference: {
            stats: [
              { label: 'Aurora フォロワー', value: '100,000人', highlight: true },
              { label: 'Aurora 平均いいね', value: '約 5,000', highlight: true },
              { label: 'みなり フォロワー', value: '30,000人' },
              { label: 'みなり 平均いいね', value: '約 3,000' },
            ],
            note: '組み立てるべきは「届いた人(分母)に対して、何人が反応したか(分子)」を表す式。',
          },
          interaction: {
            kind: 'formula_builder',
            question: 'エンゲージメント率の正しい式を組み立ててください',
            segments: [
              { kind: 'text', text: 'エンゲージ率 =' },
              { kind: 'slot', id: 'numerator' },
              { kind: 'op', op: '÷' },
              { kind: 'slot', id: 'denominator' },
              { kind: 'op', op: '×' },
              { kind: 'text', text: '100%' },
            ],
            chips: [
              { id: 'c1', label: 'いいね数', correctSlot: 'numerator' },
              { id: 'c2', label: 'フォロワー数', correctSlot: 'denominator' },
              { id: 'c3', label: '投稿数', correctSlot: '__none__' },
              { id: 'c4', label: 'コメント数', correctSlot: '__none__' },
            ],
            successFeedback:
              '正解。いいね数 ÷ フォロワー数。これだけ覚えれば、SNS の数字に騙されない最低ラインは確保できる。',
            failFeedback:
              '違う。「届いた人(分母)に対して、何人が反応したか(分子)」。順番が逆だと意味が変わる。',
          },
        },
        {
          id: 'i-02',
          type: 'interactive',
          content: '実際に計算してみよう',
          interaction: {
            kind: 'engagement_calc',
            influencers: [
              {
                handle: '@aurora_lifestyle',
                displayName: 'Aurora',
                followers: 100000,
                posts: A_LIKES.map((l, i) => ({ likes: l, date: `2026-${String(((i % 12) + 1)).padStart(2, '0')}-15` })),
                growthCurve: A_GROWTH,
                botRatio: 0.6,
              },
              {
                handle: '@minari_kurashi',
                displayName: 'みなり',
                followers: 30000,
                posts: B_LIKES.map((l, i) => ({ likes: l, date: `2026-${String(((i % 12) + 1)).padStart(2, '0')}-15` })),
                growthCurve: B_GROWTH,
                botRatio: 0.02,
              },
            ],
          },
          hint: '見かけのエンゲージ率では Aは5%、Bは10%。Bが既に2倍だ。',
        },
        {
          id: 'i-03',
          type: 'mini_lesson',
          speaker: 'detective',
          content:
            '【道具2:分散と標準偏差】平均だけでなく「データのばらつき」も見る。バズ依存型かどうかを判別できる。記号で書くと σ(シグマ:標準偏差)、または σ²(シグマ二乗:分散)。',
          formula: 's^2 = \\frac{1}{n} \\sum_{i=1}^{n}(x_i - \\bar{x})^2',
          formulaMeaning:
            '「各データが平均からどれだけ離れているか」を二乗して全部足し、個数で割ったもの。値が大きいほど、データが平均から大きく散らばっていることを意味する。',
          formulaSymbols: [
            { symbol: 's²', meaning: '分散(variance)。ばらつきの大きさそのもの。これの平方根が標準偏差 σ。' },
            { symbol: 'n', meaning: 'データの個数。今回は30投稿だから n = 30。' },
            { symbol: 'Σ', meaning: 'シグマ。「i = 1 から n まで全部足す」を意味する総和記号。' },
            { symbol: 'xᵢ', meaning: 'i 番目のデータの値。今回なら i 番目の投稿のいいね数。' },
            { symbol: 'x̄', meaning: 'エックスバー。データ全体の平均値。' },
            { symbol: '(xᵢ - x̄)²', meaning: '各データと平均との差を二乗したもの。マイナスを消し、大きく外れたデータを強調する。' },
          ],
        },
        {
          id: 'i-04',
          type: 'narrative',
          speaker: 'detective',
          content:
            'A の標準偏差は約 5,500。平均5000に対し、ばらつきが平均と同じくらい大きい——「バズった1投稿が平均を吊り上げている」典型だ。',
        },
        {
          id: 'i-05',
          type: 'narrative',
          speaker: 'detective',
          content:
            'B の標準偏差は約 540。平均3000に対しばらつきは18%。「安定して反応されている」証拠。',
        },
        {
          id: 'i-06',
          type: 'mini_lesson',
          speaker: 'detective',
          content:
            '【道具3:成長カーブの不自然さ】最後の道具だ。フォロワー成長の時系列を見る。bot を買ったアカウントは、不自然に直線的な伸びを示す。これを数値で測るのが「決定係数 R²」。直線にどれだけぴったり乗っているかを 0〜1 で表す。',
          formula: 'R^2 = 1 - \\frac{\\sum_{i}(y_i - \\hat{y}_i)^2}{\\sum_{i}(y_i - \\bar{y})^2}',
          formulaMeaning:
            '「データが直線にどれだけ近いか」を 0〜1 で表す指標。1.0 は完璧な直線、0.0 はバラバラ。自然なフォロワー成長は通常 0.85 未満で揺らぎがあるが、bot 購入は不自然に 0.99 以上の直線になりやすい。',
          formulaSymbols: [
            { symbol: 'R²', meaning: '決定係数。回帰直線がデータをどれだけ説明できているか。1 に近いほど直線的。' },
            { symbol: 'yᵢ', meaning: 'i 番目の実測値(その月のフォロワー数)。' },
            { symbol: 'ŷᵢ', meaning: 'ワイハット。回帰直線が予測する i 番目の値(直線上の点)。' },
            { symbol: 'ȳ', meaning: 'ワイバー。実測値の平均。' },
            { symbol: 'Σ(yᵢ - ŷᵢ)²', meaning: '残差平方和。実測値と直線とのズレを二乗して合計したもの。' },
          ],
        },
        {
          id: 'i-06b',
          type: 'interactive',
          content: '🧪 サンドボックス:bot 比率を動かして、エンゲージ率がどう壊れるか自分の手で確かめよう。',
          interaction: {
            kind: 'math_sandbox',
            task: 'スライダーを動かして、bot 比率が 0% → 60% に上がると、真のエンゲージ率がどう変わるか体感する。フォロワー10万・いいね5000を起点に。',
            scenario: {
              kind: 'bot_engagement',
              baseFollowers: 100000,
              baseLikes: 5000,
            },
          },
        },
        {
          id: 'i-07',
          type: 'interactive',
          content: 'フォロワー数の月次推移を比較',
          interaction: {
            kind: 'follower_growth',
            series: [
              { label: 'Aurora', points: A_GROWTH, isBot: true },
              { label: 'みなり', points: B_GROWTH, isBot: false },
            ],
          },
          hint: 'Auroraの曲線は直線に近すぎる。R²(決定係数)で測れる。',
        },
      ],
    },

    // ──────────────── 第4幕:推理 ────────────────
    {
      type: 'deduction',
      title: '【推理】データを分析せよ',
      steps: [
        {
          id: 'd-01',
          type: 'narrative',
          speaker: 'detective',
          content:
            '道具は揃った。ここから先は君の番だ。データを操作して、真相を導き出してくれ。',
        },
        {
          id: 'd-02',
          type: 'interactive',
          content:
            '推理①:Aurora(フォロワー10万、平均いいね約5000)のエンゲージメント率は何%?',
          reference: {
            stats: [
              { label: 'Aurora フォロワー', value: '100,000', highlight: true },
              { label: 'Aurora 平均いいね', value: '約 5,000', highlight: true },
            ],
            formula: 'エンゲージ率 = \\frac{\\text{いいね数}}{\\text{フォロワー数}} \\times 100\\%',
            note: '5,000 ÷ 100,000 × 100% を計算する。スライダーは 0〜20% の範囲。',
          },
          interaction: {
            kind: 'slider_estimate',
            question: 'スライダーでエンゲージメント率を推測してください',
            min: 0,
            max: 20,
            step: 0.5,
            correctAnswer: 5,
            tolerance: 0.6,
            unit: '%',
            correctFeedback:
              '正解。約5%。だが、これは「見かけ」の数字に過ぎない。',
            wrongFeedback:
              '惜しい。5000 ÷ 100,000 × 100% = 5% だ。',
          },
        },
        {
          id: 'd-03',
          type: 'interactive',
          content:
            '推理②:みなり(フォロワー3万、平均いいね3000)のエンゲージメント率は何%?',
          reference: {
            stats: [
              { label: 'みなり フォロワー', value: '30,000', highlight: true },
              { label: 'みなり 平均いいね', value: '約 3,000', highlight: true },
            ],
            formula: 'エンゲージ率 = \\frac{\\text{いいね数}}{\\text{フォロワー数}} \\times 100\\%',
            note: '3,000 ÷ 30,000 × 100% を計算する。SNS業界では3%超で「優秀」とされる。',
          },
          interaction: {
            kind: 'slider_estimate',
            question: 'スライダーでエンゲージメント率を推測してください',
            min: 0,
            max: 20,
            step: 0.5,
            correctAnswer: 10,
            tolerance: 0.6,
            unit: '%',
            correctFeedback:
              '正解。10%。SNS業界では「3%超えれば優秀」とされる中、これは異例の高さだ。',
            wrongFeedback:
              '違うな。3000 ÷ 30,000 × 100% = 10% だ。',
          },
        },
        {
          id: 'd-04',
          type: 'interactive',
          content:
            '推理③:Aurora のフォロワー成長は「不自然に直線的」だ。R²(決定係数)を直線フィッティングで測ると、いくつになる?',
          reference: {
            stats: [
              { label: 'R² の範囲', value: '0.00 〜 1.00' },
              { label: '完全直線', value: '1.00', highlight: true },
              { label: '実在の自然成長', value: '0.7〜0.9 程度' },
              { label: '判定基準', value: '0.99 超で「異常」', highlight: true },
            ],
            note: 'R² = 1 は「データが完璧に直線に乗っている」状態。実データはノイズで必ず0.99未満になる。',
          },
          interaction: {
            kind: 'slider_estimate',
            question: '完全直線=1.00、ノイズが多い=0.5以下',
            min: 0,
            max: 1,
            step: 0.01,
            correctAnswer: 1.0,
            tolerance: 0.05,
            unit: '',
            correctFeedback:
              'R² ≈ 1.00。完璧な直線。実在する人気アカウントの成長で R² が 0.99 を超えるのは、ほぼ不可能だ。',
            wrongFeedback:
              'もっと高い。Auroraの成長は完全な直線——R² ≈ 1.00 だ。',
          },
        },
        {
          id: 'd-05',
          type: 'interactive',
          content:
            '最終推理:bot 比率を考慮した「真のエンゲージメント率」は何%?',
          hint: 'Aurora のフォロワー10万のうち6万が bot。実フォロワー4万に対して、いいね 5000(うち bot は反応しない)。',
          interaction: {
            kind: 'true_score',
            influencers: [
              {
                handle: '@aurora_lifestyle',
                displayName: 'Aurora',
                followers: 100000,
                posts: A_LIKES.map((l, i) => ({ likes: l, date: `2026-${String(((i % 12) + 1)).padStart(2, '0')}-15` })),
                growthCurve: A_GROWTH,
                botRatio: 0.6,
              },
              {
                handle: '@minari_kurashi',
                displayName: 'みなり',
                followers: 30000,
                posts: B_LIKES.map((l, i) => ({ likes: l, date: `2026-${String(((i % 12) + 1)).padStart(2, '0')}-15` })),
                growthCurve: B_GROWTH,
                botRatio: 0.02,
              },
            ],
          },
        },
      ],
    },

    // ──────────────── 第5幕:解決 ────────────────
    {
      type: 'solution',
      title: '【解決】真相を告げる時間だ',
      steps: [
        {
          id: 'sol-01',
          type: 'narrative',
          speaker: 'detective',
          content:
            '事件は解けた。では、真相を告げよう。',
        },
        {
          id: 'sol-02',
          type: 'dialogue',
          speaker: 'detective',
          content:
            '犯人は——「フォロワー数」という見せかけの絶対値だ。',
        },
        {
          id: 'sol-03',
          type: 'narrative',
          speaker: 'detective',
          content:
            'Aurora のフォロワー10万人のうち、6万人は購入された bot だった。bot は商品を買わない。実フォロワー4万人に対するエンゲージメント率は2%以下。',
        },
        {
          id: 'sol-04',
          type: 'narrative',
          speaker: 'detective',
          content:
            'みなりは bot 比率2%、実エンゲージ率は約10%。真の「届く力」で言えば、みなりは Aurora の3倍以上だった。',
        },
        {
          id: 'sol-05',
          type: 'dialogue',
          speaker: 'client',
          expression: 'shocked',
          showPortrait: true,
          content:
            'そんな…じゃあ僕は、フォロワーの数字に騙されて、500万円を bot に投げたってことですか…',
        },
        {
          id: 'sol-06',
          type: 'dialogue',
          speaker: 'detective',
          content:
            'ご愁傷様。だが、君は今この瞬間、二度と同じ罠に堕ちない目を手に入れた。今後は3つを必ず確認しろ:',
        },
        {
          id: 'sol-07',
          type: 'mini_lesson',
          speaker: 'detective',
          content:
            '【教訓】\n① フォロワー数より、エンゲージメント率(率)で見る\n② 平均だけでなく、ばらつき(分散)を見る\n③ 成長カーブが不自然に直線的なアカウントを疑う',
        },
        {
          id: 'sol-08',
          type: 'interactive',
          content:
            '応用問題:「Vutube 登録者100万・平均再生5000」のチャンネルがある。エンゲージ率は?',
          reference: {
            stats: [
              { label: '登録者数', value: '1,000,000', highlight: true },
              { label: '平均再生数', value: '5,000', highlight: true },
              { label: '健全な水準', value: '3〜10%' },
            ],
            formula: 'エンゲージ率 = \\frac{\\text{いいね数}}{\\text{フォロワー数}} \\times 100\\%',
            note: '5,000 ÷ 1,000,000 × 100% を計算してみよう。',
          },
          interaction: {
            kind: 'choice',
            question: '次のうち正しいのは?',
            options: [
              { label: '0.5%。極端に低い。bot やフォロー買いの可能性大', isCorrect: true, feedback: '正解。100万人いて5000再生は、エンゲージ率0.5%。健全な動画チャンネルなら3-10%は欲しい。' },
              { label: '5%。十分な人気チャンネル', isCorrect: false, feedback: '違う。5000 ÷ 1,000,000 = 0.5%。' },
              { label: 'フォロワー100万なら絶対に効果がある', isCorrect: false, feedback: 'まさにそれが今回学んだ罠だ。' },
            ],
          },
          hints: {
            level1: 'エンゲージ率の式を思い出そう。',
            level2: 'いいね数 ÷ フォロワー数 × 100% で計算する。',
            level3: '5,000 ÷ 1,000,000 × 100% = 0.5%。健全なチャンネルなら 3〜10% は欲しい。',
          },
        },
        // ───── ボス問題:3問連続 ─────
        {
          id: 'sol-boss-intro',
          type: 'narrative',
          speaker: 'detective',
          content:
            '【最終試験】ここからは「ボス問題」だ。3問連続で答えてもらう。これが解ければ、君は真の SNS 探偵だ。',
        },
        {
          id: 'sol-boss-01',
          type: 'interactive',
          content: '【ボス問題 1/3】Aurora の30投稿(平均約4837、最大20000、最小100)の標準偏差は?最も近い値を選んでください。',
          reference: {
            stats: [
              { label: 'データ個数 n', value: '30' },
              { label: '平均 x̄', value: '約 4,837', highlight: true },
              { label: '最大値', value: '20,000' },
              { label: '最小値', value: '100' },
              { label: 'データ幅', value: '約 20,000' },
              { label: '変動係数 σ/x̄', value: '約 1.0', highlight: true },
            ],
            formula: 's = \\sqrt{\\frac{1}{n} \\sum_{i=1}^{n}(x_i - \\bar{x})^2}',
            note: '変動係数(σ÷平均)が約1.0の「バズ依存型」分布。σ ≈ 平均と同程度。',
          },
          interaction: {
            kind: 'choice',
            question: 'この分布の標準偏差として妥当な値は?',
            options: [
              { label: '約 500', isCorrect: false, feedback: '小さすぎる。これは平均±数百しか動かない安定型の値。Aurora は大きく揺れる。' },
              { label: '約 2,000', isCorrect: false, feedback: '小さい。データの最大値が20000、最小値が100で、平均5000周辺に散らばっている。' },
              { label: '約 5,500', isCorrect: true, feedback: '正解。データの幅が0〜20,000、平均が約5000、ばらつきが平均と同程度大きい。これが「バズ依存型」の典型値だ。' },
              { label: '約 15,000', isCorrect: false, feedback: '大きすぎる。標準偏差は最大値と平均の差(約15,000)よりは小さい。' },
            ],
          },
          hints: {
            level1: '標準偏差は「平均からのばらつき」の代表値。',
            level2: 'データの幅は20,000、平均は約5,000。各値は平均から平均で5000程度離れている。',
            level3: 'この分布は「バズ依存型」で、変動係数(σ÷平均)が約1.0。よって σ ≈ 5,500。',
          },
        },
        {
          id: 'sol-boss-02',
          type: 'interactive',
          content: '【ボス問題 2/3】「平均値が同じでも、標準偏差が違えば実態は異なる」を最も適切に説明する記述は?',
          interaction: {
            kind: 'choice',
            question: '正しい記述を選んでください',
            options: [
              { label: '平均が同じならどんな分布も同じと見なせる', isCorrect: false, feedback: '違う。これが今回の事件で否定された考え方。' },
              { label: '平均は分布の中心、標準偏差はばらつきを表すため、両方を見ないとデータの姿は見えない', isCorrect: true, feedback: '正解。平均=中心、標準偏差=ばらつき。「同じ平均でも、ばらつきが違えば中身が違う」。これが統計の鉄則。' },
              { label: '標準偏差が大きいほど良いデータである', isCorrect: false, feedback: '良し悪しではない。標準偏差は単に「ばらつきの大きさ」を表すだけ。' },
              { label: '平均と標準偏差は必ず比例する', isCorrect: false, feedback: '違う。比例しない。今回の Aurora と みなり がその反例。' },
            ],
          },
          hints: {
            level1: '平均と標準偏差は別々の役割を持つ。',
            level2: '平均=中心位置、標準偏差=ばらつきの大きさ。',
            level3: '両方見ないと、Aurora と みなり の違いを見抜けなかった。',
          },
        },
        {
          id: 'sol-boss-03',
          type: 'interactive',
          content: '【ボス問題 3/3】Aurora のフォロワー成長は完全な直線(R² ≈ 1.00)だった。R² が 0.99 を超えるのが「不自然」と言える理由は?',
          interaction: {
            kind: 'choice',
            question: 'R² > 0.99 が不自然な理由として最も適切なのは?',
            options: [
              { label: '実在のアカウントは外部要因(バズ・スランプ・ニュース)で必ず波があるため、自然成長で R² が 0.99 を超えるのはほぼ不可能', isCorrect: true, feedback: '正解。実世界のデータには必ずノイズが入る。R² ≈ 1 は「人為的に毎週同じ数だけ追加した」証拠。' },
              { label: 'R² は 1 を超えてはいけないので不自然', isCorrect: false, feedback: '違う。R² は定義上 0〜1 の範囲。1 を超えることはない。' },
              { label: '直線は数学的に綺麗だから不自然', isCorrect: false, feedback: '美しさは判断基準ではない。実データのノイズの有無が問題。' },
              { label: 'R² は人気度の指標なので高いほど良い', isCorrect: false, feedback: 'R² は「直線への当てはまり」を測る指標で、人気度ではない。' },
            ],
          },
          hints: {
            level1: 'R² が1に近いほど「完全な直線」を意味する。',
            level2: '実在のアカウントは毎週同じペースで増えるか?バズ・スランプ・ニュースは?',
            level3: '実データにはノイズが必ずある。R² ≈ 1.00 は「機械的な追加」のしるしだ。',
          },
        },
        {
          id: 'sol-09',
          type: 'narrative',
          speaker: 'detective',
          content:
            'よくやった、新人探偵。事件 No.001 — 完全解決。データ探偵の素質が君にはある。',
        },
      ],
    },
  ],
};

export default buzzCase;
