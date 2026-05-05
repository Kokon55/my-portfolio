import type { Case } from './types';

// 24週のフォロワー増加データ。最初の14週は自然成長(±200程度)、
// W15-W18 で異常な大ジャンプ(数千〜1万)、W19-W24 はまた自然成長。
const WEEKLY_DELTAS = [
  120, 180, 220, 95, 310, 250, 180, 340, 280, 410,  // W1-W10 自然成長
  390, 450, 380, 520,                                  // W11-W14 自然加速
  8500, 12000, 9500, 7800,                             // W15-W18 ★異常ジャンプ(bot 購入)
  680, 720, 690, 810, 770, 850,                        // W19-W24 自然成長(再開)
];
const TRUE_ANOMALIES = [14, 15, 16, 17]; // 0-based: W15-W18

const followerCase: Case = {
  id: 'case-03-followers',
  title: 'フォロワー買いました',
  subtitle: '偽アカウントの統計学',
  client: {
    name: '灯里',
    age: 24,
    occupation: 'ファッションインフルエンサー',
    characterId: 'akari',
    defaultExpression: 'worried',
    avatar: {
      skin: '#f5d8b8',
      hair: '#5a3f2a',
      accent: '#dc2626',
      expression: 'worried',
    },
    introLine: '探偵さん、誤解なんです!信じてください…私、フォロワーなんて買ってません!',
  },
  difficulty: 3,
  estimatedMinutes: 10,
  mathField: '数学I「データの分析」+ 移動平均・Z-score',
  shortSummary:
    'フォロワーが2ヶ月で5,000→10万人。所属事務所「フォロワー買ったでしょ?」と詰問。灯里さんは涙ながらに無実を主張するが、データは何を語るか?',
  acquiredSkills: [
    '時系列データの「異常な変化点」を移動平均と Z-score で特定できる',
    '自然成長と人為的操作を、変動係数の「不自然な急増」で見分けられる',
    '統計の道具を使って、誤解された人を救うことも、嘘を暴くこともできる',
  ],
  badge: {
    id: 'badge-timeseries-detective',
    name: '時系列探偵',
    rank: '弐級',
    description: '時の流れの中の異常を見抜く者の証',
  },

  acts: [
    // ─────────── 第1幕 ───────────
    {
      type: 'commission',
      title: '【依頼】事件ファイル No.003',
      steps: [
        {
          id: 'c-01',
          type: 'dialogue',
          speaker: 'narrator',
          content:
            'ある雨の日。事務所のドアが乱暴に叩かれた。立っていたのは、目を真っ赤にした若いインフルエンサー——灯里さん。',
        },
        {
          id: 'c-02',
          type: 'dialogue',
          speaker: 'client',
          expression: 'distraught',
          showPortrait: true,
          content:
            '探偵さん!助けてください…!事務所が私に「フォロワー買ったでしょ?契約解除します」って…!',
        },
        {
          id: 'c-03',
          type: 'dialogue',
          speaker: 'client',
          expression: 'distraught',
          content:
            '私、本当に買ってないんです!でも確かに、2ヶ月でフォロワーが急に増えて…自分でもびっくりしてて…',
        },
        {
          id: 'c-04',
          type: 'dialogue',
          speaker: 'detective',
          expression: 'thinking',
          content:
            '——落ち着いて。データが嘘をつかなければ、無実は証明できる。逆に、本当に買っていればデータが告白する。まずは見せてもらおう。',
        },
        {
          id: 'c-05',
          type: 'dialogue',
          speaker: 'client',
          expression: 'hopeful',
          content:
            'お願いします!これが私の24週分の「フォロワー増加数」のデータです…',
        },
      ],
    },

    // ─────────── 第2幕 ───────────
    {
      type: 'crime_scene',
      title: '【現場】時系列データを目撃せよ',
      steps: [
        {
          id: 's-01',
          type: 'narrative',
          speaker: 'detective',
          expression: 'thinking',
          content:
            '24週分のデータがある。各週、何人フォロワーが増えたか。最初に、君の目で見て——「明らかにおかしい週」がいくつあるか?',
        },
        {
          id: 's-02',
          type: 'interactive',
          content:
            '時系列のグラフを観察しよう。下の数字を眺めて、まず素朴に「ここ怪しい」と感じた週をタップで指摘してくれ。',
          interaction: {
            kind: 'timeseries_anomaly',
            question: '24週のうち、フォロワー増加数が「異常」な週をすべてタップで指摘してください',
            weeklyDeltas: WEEKLY_DELTAS,
            trueAnomalyIndices: TRUE_ANOMALIES,
            successFeedback:
              '完璧だ。W15〜W18 の4週間。普段100〜500人/週のペースが、突然 7,800〜12,000人/週になっている。これは「成長の加速」では説明がつかない不連続なジャンプ。',
            partialFeedback:
              'まだ慎重に。移動平均ウィンドウを動かしてみて、±2σ範囲を逸脱している週を探そう。W15-W18 の4週間が答えだ。',
          },
        },
        {
          id: 's-03',
          type: 'dialogue',
          speaker: 'detective',
          expression: 'thinking',
          content:
            'W15からW18の4週間だけ、桁が二つ違う。これは、自然な成長ではない——何かが介入している。',
        },
        {
          id: 's-04',
          type: 'dialogue',
          speaker: 'client',
          expression: 'shocked',
          content:
            'え、ほんとですか…?でも私、本当に買ってないんです…じゃあ誰が…?',
        },
      ],
    },

    // ─────────── 第3幕 ───────────
    {
      type: 'investigation',
      title: '【捜査】移動平均と Z-score',
      steps: [
        {
          id: 'i-01',
          type: 'mini_lesson',
          speaker: 'detective',
          expression: 'thinking',
          content:
            '【道具1:移動平均】時系列データの「普段の流れ」を見るには、直近 N 週の平均を取る。一時的なノイズが消え、トレンドが見える。',
          formula:
            'MA_t = \\frac{1}{N}\\sum_{i=t-N+1}^{t} x_i',
          formulaMeaning:
            '「t 週時点での移動平均」=「直近 N 週ぶんのデータを平均したもの」。1週ぶんの一時的な揺れを吸収し、なだらかなトレンドを浮かび上がらせる。',
          formulaSymbols: [
            { symbol: 'MAₜ', meaning: 'Moving Average at t。「t 週時点までの直近 N 週」の平均値。' },
            { symbol: 't', meaning: '今注目している週(時点)。' },
            { symbol: 'N', meaning: 'ウィンドウ幅。何週ぶんを平均に含めるか。N=4 なら直近4週。' },
            { symbol: 'Σ', meaning: 'シグマ。「i = t-N+1 から t まで全部足す」を意味する総和記号。' },
            { symbol: 'xᵢ', meaning: 'i 週目の実測値(今回はその週のフォロワー増加数)。' },
          ],
        },
        {
          id: 'i-02',
          type: 'mini_lesson',
          speaker: 'detective',
          content:
            '【道具2:時系列の Z-score】各週の値が「移動平均からどれだけ標準偏差σ離れているか」を測る。|z| > 2 は通常の成長範囲を逸脱した「異常」と判定する。',
          formula:
            'z_t = \\frac{x_t - MA_t}{\\sigma_t}',
          formulaMeaning:
            '「t 週の実測値が、普段の流れ(移動平均)から、ばらつきの何倍ぶん離れているか」を表す数値。|z| が 2 を超えたら「めったに起こらない異常」と判定する基準。',
          formulaSymbols: [
            { symbol: 'zₜ', meaning: 'Z-score。t 週の値が「ばらつきの何σぶん」平均から離れているか。' },
            { symbol: 'xₜ', meaning: 't 週の実測値(今回はその週のフォロワー増加数)。' },
            { symbol: 'MAₜ', meaning: 'その週時点の移動平均(=普段の流れの基準値)。' },
            { symbol: 'σₜ', meaning: 'シグマ。その時期のデータのばらつき(標準偏差)。' },
            { symbol: '|z| > 2', meaning: '絶対値が2を超える=正規分布なら起こる確率が約5%以下の「異常」。' },
          ],
        },
        {
          id: 'i-03',
          type: 'narrative',
          speaker: 'detective',
          content:
            '先ほどのグラフで、移動平均ウィンドウを 2 → 8 と動かすと、検出される異常が変わる。狭すぎると過敏、広すぎると鈍感だ。今回は 4〜6 週がちょうど良い。',
        },
        {
          id: 'i-04',
          type: 'mini_lesson',
          speaker: 'detective',
          content:
            '【道具3:変化の不連続性】自然な成長は連続的:今週 +500、来週 +600。bot 購入は不連続:今週 +500、来週 +12,000。確率論的に、自然成長で 1 週間に 20 倍跳ねる確率はほぼゼロ。',
        },
      ],
    },

    // ─────────── 第4幕 ───────────
    {
      type: 'deduction',
      title: '【推理】真相に迫れ',
      steps: [
        {
          id: 'd-01',
          type: 'narrative',
          speaker: 'detective',
          content:
            '事実関係はこうだ:W15〜W18 の4週間、誰かが灯里さんのアカウントに 約38,000 のフォロワーを送り込んだ。だが、灯里さん自身は買っていないと主張する。となると——犯人は誰だ?',
        },
        {
          id: 'd-02',
          type: 'interactive',
          content: '推理①:あなたは誰が真犯人だと思う?',
          interaction: {
            kind: 'choice',
            question: 'データから推測される真犯人は?',
            options: [
              {
                label: '灯里さん本人(嘘をついている)',
                isCorrect: false,
                feedback:
                  '可能性はあるが、データだけで断定はできない。次の証拠を見よう。',
              },
              {
                label: '事務所が「人気を盛る」ためにやった',
                isCorrect: true,
                feedback:
                  '正解候補。事務所が無断で施策した可能性が高い——これはよくある事件。事務所側にメリット(契約料upや案件獲得)があり、本人に黙ってやることがある。',
              },
              {
                label: '誰かが嫌がらせで送り込んだ',
                isCorrect: true,
                feedback:
                  'これも可能性がある。「炎上を狙った人為操作」は実際に起こる。両方の可能性があるが、いずれにせよ「灯里さん本人による購入」とは限らない。',
              },
              {
                label: '自然なバズで偶然増えた',
                isCorrect: false,
                feedback:
                  '違う。自然なバズなら徐々に減衰する。今回は4週間きっかり同じ規模でジャンプし続け、その後ピタッと止まっている。明らかに人為的だ。',
              },
            ],
          },
        },
        {
          id: 'd-03',
          type: 'interactive',
          content:
            '推理②:bot を除いた「真の灯里さんの実力」を計算しよう。',
          interaction: {
            kind: 'math_sandbox',
            task: '「異常な4週間(W15-W18)」を除外した場合、灯里さんの「真の」フォロワーは何人?スライダーで bot 比率を動かして、実エンゲージ率がどう変わるか観察してみよう。',
            scenario: {
              kind: 'bot_engagement',
              baseFollowers: 100000,
              baseLikes: 3500,
            },
          },
        },
        {
          id: 'd-04',
          type: 'interactive',
          content:
            '推理③:正常週(W1-W14、W19-W24)の平均増加数を眺めて、灯里さんの本来の成長ペースは月あたり何人?',
          reference: {
            stats: [
              { label: '対象週', value: 'W1-W14, W19-W24', highlight: true },
              { label: '対象週数', value: '20週' },
              { label: '異常週(除外)', value: 'W15-W18' },
              { label: '異常週合計増加', value: '約 +38,000' },
            ],
            note: '正常週の合計を20で割る。月換算なら週平均×4。健全な成長は週数百人程度。',
          },
          interaction: {
            kind: 'slider_estimate',
            question: '正常週20週の平均は、約何人/週?',
            min: 0,
            max: 1500,
            step: 50,
            correctAnswer: 470,
            tolerance: 100,
            unit: '人/週',
            correctFeedback:
              '正解。正常週の平均は約470人/週。月で言うと約2,000人。これは健全な成長だ。',
            wrongFeedback:
              '計算しなおそう。20週の合計を20で割る。約470人/週が答え。',
          },
        },
      ],
    },

    // ─────────── 第5幕 ───────────
    {
      type: 'solution',
      title: '【解決】灯里さんの無実を証明する時間だ',
      steps: [
        {
          id: 'sol-01',
          type: 'dialogue',
          speaker: 'detective',
          expression: 'thinking',
          content:
            '灯里さん。データはあなたの主張を裏付けている。',
        },
        {
          id: 'sol-02',
          type: 'dialogue',
          speaker: 'detective',
          showPortrait: true,
          content:
            '24週のうち、自然な成長は20週分。平均470人/週で着実に伸びている。これは、ある程度の影響力を持つアカウントの典型的な姿だ。',
        },
        {
          id: 'sol-03',
          type: 'dialogue',
          speaker: 'detective',
          content:
            '一方、W15からW18の4週間だけ、突如として 約38,000人のフォロワーが流入した。週あたり1万人——通常の20倍。これは bot 購入特有のパターンだ。',
        },
        {
          id: 'sol-04',
          type: 'dialogue',
          speaker: 'detective',
          content:
            '通常、本人が買うときは「徐々に増やす」ように調整する。今回のように4週間ピタッと同規模で、その後ピタッと止まる買い方は、本人ではなく代理が業者に「○万フォロワー追加」を発注したパターンだ。',
        },
        {
          id: 'sol-05',
          type: 'dialogue',
          speaker: 'client',
          expression: 'eureka',
          showPortrait: true,
          content:
            'え——!じゃあ事務所が…?',
        },
        {
          id: 'sol-06',
          type: 'dialogue',
          speaker: 'detective',
          content:
            '統計的には、その可能性が高い。事務所には「灯里さんの数字を盛る」動機がある。あとは話し合いで解決してくれ。データは君を支援する。',
        },
        {
          id: 'sol-07',
          type: 'mini_lesson',
          speaker: 'detective',
          content:
            '【教訓】\n① 時系列データは「不連続なジャンプ」が人為操作の手がかり\n② 移動平均と Z-score で「普段の流れ」と「外れ値」を分離できる\n③ 数字を疑う目は、自分を守るだけでなく、誤解された人を救うこともできる',
        },
        {
          id: 'sol-08',
          type: 'interactive',
          content: '応用問題',
          interaction: {
            kind: 'choice',
            question:
              'あるアカウントの月次フォロワー増加が「100, 95, 110, 130, 5800, 120, 105」だった。どう判断する?',
            options: [
              {
                label: '5,800 の月だけ Z-score が突出している。bot 購入の疑いがある',
                isCorrect: true,
                feedback:
                  '正解。前後の月との差が桁違いに大きい。1ヶ月だけ50倍に跳ねるのは自然成長では起こりえない。',
              },
              {
                label: '平均すれば普通の成長率',
                isCorrect: false,
                feedback:
                  '平均だけ見てはいけない、これが今回の教訓だ。分布の異常を見る。',
              },
              {
                label: '自然なバズで偶然増えた',
                isCorrect: false,
                feedback:
                  'バズは前後にも余波がある。1ヶ月だけピンポイントで跳ねるのは不自然。',
              },
            ],
          },
        },
        {
          id: 'sol-09',
          type: 'dialogue',
          speaker: 'client',
          expression: 'hopeful',
          showPortrait: true,
          content:
            '探偵さん、ありがとうございます…!事務所と話してきます…!',
        },
        // ───── ボス問題:3問連続 ─────
        {
          id: 'sol-boss-intro',
          type: 'narrative',
          speaker: 'detective',
          content:
            '【最終試験】ここからは「ボス問題」だ。時系列分析の3連戦。これが解ければ、君は真の時系列探偵だ。',
        },
        {
          id: 'sol-boss-01',
          type: 'interactive',
          content:
            '【ボス問題 1/3】データ {100, 200, 300, 400, 500} に対して窓3の単純移動平均を計算する。第3週の移動平均(=W1, W2, W3 の平均)は?',
          interaction: {
            kind: 'choice',
            question: '正しい値を選んでください',
            options: [
              { label: '200', isCorrect: true, feedback: '正解。(100 + 200 + 300) ÷ 3 = 200。窓3の移動平均は直近3点の平均。' },
              { label: '300', isCorrect: false, feedback: '違う。それは中央の値。窓3の移動平均なら (100+200+300)/3 = 200。' },
              { label: '100', isCorrect: false, feedback: '違う。最古の値ではない。直近3点の平均を取る。' },
              { label: '500', isCorrect: false, feedback: '違う。最新値ではない。直近3点の平均を取る。' },
            ],
          },
          hints: {
            level1: '移動平均は「直近 N 点の平均」。',
            level2: '窓3 なら直近3点を足して3で割る。',
            level3: 'W1=100, W2=200, W3=300。(100+200+300)/3 = 200。',
          },
        },
        {
          id: 'sol-boss-02',
          type: 'interactive',
          content: '【ボス問題 2/3】時系列の Z-score の正しい定義式は?',
          interaction: {
            kind: 'choice',
            question: '正しい式を選んでください',
            options: [
              { label: 'z = (xₜ − MAₜ) / σₜ', isCorrect: true, feedback: '正解。「観測値から移動平均を引いて、標準偏差で割る」。これが時系列の Z-score。' },
              { label: 'z = xₜ × MAₜ', isCorrect: false, feedback: '違う。観測値と移動平均を掛け算しない。差を取って標準偏差で正規化する。' },
              { label: 'z = MAₜ / σₜ', isCorrect: false, feedback: '違う。観測値が出てきていない。Z-score は「観測値が平均からどれだけ離れているか」を測る。' },
              { label: 'z = √(xₜ − MAₜ)', isCorrect: false, feedback: '違う。√ は使わない。標準偏差で割って正規化する。' },
            ],
          },
          hints: {
            level1: 'Z-score は「平均から何標準偏差離れているか」。',
            level2: '「(値 − 平均) ÷ 標準偏差」の形をしている。',
            level3: '時系列では「平均」は移動平均、「標準偏差」は移動標準偏差で代用する。',
          },
        },
        {
          id: 'sol-boss-03',
          type: 'interactive',
          content: '【ボス問題 3/3】|Z| > 2 の判定について最も適切な記述は?',
          interaction: {
            kind: 'choice',
            question: '|Z| > 2 を異常と判定する根拠として最も適切なのは?',
            options: [
              { label: '正規分布なら ±2σ範囲に約95%のデータが入るため、外側の約5%が「異常」と見なせる', isCorrect: true, feedback: '正解。正規分布の経験則「68-95-99.7」より、±2σの外側は約5%。これが「異常」判定の根拠。' },
              { label: 'Z = 2 は数学的に最大値だから', isCorrect: false, feedback: '違う。Z-score は無限に大きくなりうる。経験則の閾値として 2 を使うだけ。' },
              { label: '計算が簡単だから', isCorrect: false, feedback: '違う。理由はそこではなく、正規分布の確率分布に基づく。' },
              { label: 'すべての分布で必ず Z>2 が異常になる', isCorrect: false, feedback: '違う。正規分布を仮定したときの目安。分布によっては別の閾値を使う。' },
            ],
          },
          hints: {
            level1: '「68-95-99.7」のルールを思い出そう。',
            level2: '正規分布なら ±1σ で68%、±2σ で95%、±3σ で99.7%。',
            level3: '±2σ の外側は約5%(両側)。これが「めったに起こらない=異常」の根拠。',
          },
        },
        {
          id: 'sol-10',
          type: 'narrative',
          speaker: 'detective',
          content:
            '事件 No.003 — 完全解決。「時系列探偵」の称号を授ける。',
        },
      ],
    },
  ],
};

export default followerCase;
