import type { Case } from './types';

const gachaCase: Case = {
  id: 'case-02-gacha',
  title: 'ガチャの数学',
  subtitle: '100連で出ない理由',
  client: {
    name: '佐藤',
    age: 32,
    occupation: 'ITエンジニア',
    characterId: 'sato',
    defaultExpression: 'tired',
    avatar: {
      skin: '#e9c8a8',
      hair: '#1a1a1a',
      accent: '#dc2626',
      expression: 'distraught',
    },
    introLine: '探偵さん…ぼくの10万円が、画面の中で「N」になって消えました。',
  },
  difficulty: 3,
  estimatedMinutes: 9,
  mathField: '数学A「確率」+ 数学B「二項分布」',
  shortSummary:
    '排出率1%のガチャを100連回したのに SSR がゼロ。これは詐欺なのか、それともあなたの直感の方が間違っているのか?',
  acquiredSkills: [
    '期待値と実際のばらつきの違いを正しく理解できる',
    '二項分布で「k 個出る確率」を計算・直感できる',
    '大数の法則を体感し、「確率収束には膨大な試行が必要」と知る',
    'ギャンブラーの誤謬を見抜き、確率事象に冷静な判断を下せる',
    '数学A「確率」+ 数学B「二項分布」+ 大数の法則を実戦で使える',
  ],
  badge: {
    id: 'badge-gacha-investigator',
    name: 'ガチャ捜査官',
    rank: '弐級',
    description: '期待値の罠を見抜く者の証',
  },

  acts: [
    // ──────────────── 第1幕:依頼 ────────────────
    {
      type: 'commission',
      title: '【依頼】事件ファイル No.002',
      steps: [
        {
          id: 'c-01',
          type: 'dialogue',
          speaker: 'narrator',
          content:
            '深夜2時。事務所のドアが叩かれる。立っていたのは、目を真っ赤にした男——佐藤さん、32歳。',
        },
        {
          id: 'c-02',
          type: 'dialogue',
          speaker: 'client',
          expression: 'tired',
          showPortrait: true,
          content:
            '探偵さん、聞いてください。あるソシャゲのガチャ、「SSR排出率 1%」って書いてあるんです。',
        },
        {
          id: 'c-03',
          type: 'dialogue',
          speaker: 'client',
          expression: 'distraught',
          content:
            'ぼく、100連回したんですよ。10万円。でも SSR ……ゼロ。1個も出ない。これって詐欺じゃないですか?',
        },
        {
          id: 'c-04',
          type: 'interactive',
          content: '佐藤さんのガチャ結果画面(再現)',
          interaction: {
            kind: 'gacha_screen',
            results: Array.from({ length: 100 }, (_, i) => {
              if (i % 9 === 3) return 'SR';
              if (i % 5 === 0) return 'R';
              return 'N';
            }) as ('SSR' | 'SR' | 'R' | 'N')[],
          },
        },
        {
          id: 'c-05',
          type: 'dialogue',
          speaker: 'client',
          content:
            '運営に問い合わせる前に、確認してほしくて…ぼく、騙されたんですよね?',
        },
        {
          id: 'c-06',
          type: 'narrative',
          speaker: 'detective',
          content:
            '——興味深い事件だ。だが、結論を急ぐな。今回の犯人は「運営」ではなく「君の直感」かもしれない。',
        },
      ],
    },

    // ──────────────── 第2幕:現場 ────────────────
    {
      type: 'crime_scene',
      title: '【現場】期待値という名の罠',
      steps: [
        {
          id: 's-01',
          type: 'narrative',
          speaker: 'detective',
          content:
            '事件現場は、君の頭の中だ。質問しよう——排出率1%、100連を回す。期待値はいくつだ?',
        },
        {
          id: 's-02',
          type: 'interactive',
          content: '直感クイズ',
          interaction: {
            kind: 'choice',
            question: '排出率1%、100連で SSR は何個出る?(期待値)',
            options: [
              { label: '0個。出ないものは出ない', isCorrect: false, feedback: '違う。期待値は出る。' },
              { label: '1個。100 × 0.01 = 1', isCorrect: true, feedback: '正解。期待値は確かに 1 個だ。だが、ここからが本当の罠なんだ…' },
              { label: '5個くらい', isCorrect: false, feedback: '出すぎだ。100 × 0.01 = 1 が期待値。' },
              { label: '10個。100連なんだから', isCorrect: false, feedback: 'これは「期待値」と「試行回数」の混同。' },
            ],
          },
        },
        {
          id: 's-03',
          type: 'dialogue',
          speaker: 'detective',
          content:
            '期待値は1個。なのに、佐藤さんは0個だった。これは矛盾じゃない。なぜか?',
        },
        {
          id: 's-04',
          type: 'mini_lesson',
          content:
            '【現場の謎】「期待値1個」と「1個出る」は違う。期待値は「無限回試行したときの平均」であって、たった1回(=100連を1セット)の結果は、毎回大きく揺れる。これを知らないと、確率事象は危険だ。',
        },
      ],
    },

    // ──────────────── 第3幕:捜査 ────────────────
    {
      type: 'investigation',
      title: '【捜査】二項分布と大数の法則',
      steps: [
        {
          id: 'i-01',
          type: 'mini_lesson',
          speaker: 'detective',
          content:
            '【道具1:二項分布】100連で k 個出る確率は、二項分布で計算できる。記号で書くとこうなる。',
          formula:
            'P(X = k) = \\binom{n}{k} p^k (1-p)^{n-k}',
        },
        {
          id: 'i-01b',
          type: 'interactive',
          content: '🛠 「100連で 0個」の確率を、簡略式で組み立てよう。下のチップを正しい場所に配置せよ。',
          interaction: {
            kind: 'formula_builder',
            question: '「100回引いて、0回も出ない」確率の式は?',
            segments: [
              { kind: 'text', text: 'P(0個) =' },
              { kind: 'slot', id: 'base' },
              { kind: 'op', op: '^' },
              { kind: 'slot', id: 'exp' },
            ],
            chips: [
              { id: 'c1', label: '(1 − p)', correctSlot: 'base' },
              { id: 'c2', label: 'n', correctSlot: 'exp' },
              { id: 'c3', label: 'p', correctSlot: '__none__' },
              { id: 'c4', label: 'k', correctSlot: '__none__' },
            ],
            successFeedback:
              '正解。(1 − p)^n。「外す確率を、n 回連続で引く」と考えれば直感的だ。p=0.01, n=100 で (0.99)^100 ≈ 0.366。',
            failFeedback:
              '違う。「外す」確率 = (1 − p)。それが n 回連続で起こる確率を計算する。',
          },
        },
        {
          id: 'i-02',
          type: 'narrative',
          speaker: 'detective',
          content:
            '排出率1%、100連の場合:\n・0個出る確率 ≈ 36.6%\n・1個出る確率 ≈ 37.0%\n・2個以上出る確率 ≈ 26.4%',
        },
        {
          id: 'i-03',
          type: 'narrative',
          speaker: 'detective',
          content:
            'つまり、3人に1人は SSR ゼロ。これは仕様通りだ——ただし、表記には書かれていない。',
        },
        {
          id: 'i-03b',
          type: 'interactive',
          content: '🎯 君の番だ。下のシナリオに「正しい確率」をタップで結びつけろ。',
          interaction: {
            kind: 'evidence_matcher',
            question: '排出率1%・100連で、それぞれの結果が起こる確率を当ててください',
            scenarios: [
              { id: 's1', label: 'SSRが 0個 出る確率', correctProbId: 'p2' },
              { id: 's2', label: 'SSRが ちょうど1個 出る確率', correctProbId: 'p3' },
              { id: 's3', label: 'SSRが 2個以上 出る確率', correctProbId: 'p1' },
              { id: 's4', label: 'SSRが 5個以上 出る確率(超強運)', correctProbId: 'p4' },
            ],
            probabilities: [
              { id: 'p1', label: '約 26.4%' },
              { id: 'p2', label: '約 36.6%' },
              { id: 'p3', label: '約 37.0%' },
              { id: 'p4', label: '約 0.3%' },
            ],
            successFeedback:
              '正解。ほぼ同じ確率で「0個」と「1個」が起こる。これが二項分布の姿だ。佐藤さんの「100連で0個」は、3人に1人が引く、ごく普通の結果。',
          },
        },
        {
          id: 'i-04',
          type: 'mini_lesson',
          speaker: 'detective',
          content:
            '【道具2:ガチャシミュレーター】理論だけではない。実際に体感しよう。シミュレーターを起動する。',
        },
        {
          id: 'i-05',
          type: 'interactive',
          content:
            '実際にガチャを引いてみよう。10連、100連、1000連を選んで「ガチャを引く」ボタンを連打。毎回結果が違うことを体感せよ。',
          interaction: {
            kind: 'gacha_simulator',
            rate: 0.01,
            defaultPulls: 100,
          },
        },
        {
          id: 'i-05b',
          type: 'interactive',
          content:
            '🧪 サンドボックス:n と p を自由に動かして「分布の形」がどう変わるか観察しよう。同じ期待値1でも形が違うことに気づくはず。',
          interaction: {
            kind: 'math_sandbox',
            task: 'まず n=100, p=1% で分布を見る。次に n=200, p=0.5% にしても期待値は1のまま。だが分布の形は?',
            scenario: {
              kind: 'binomial_shape',
              nDefault: 100,
              pDefault: 0.01,
            },
          },
        },
        {
          id: 'i-05c',
          type: 'interactive',
          content:
            '🧪 サンドボックス:大数の法則を体感。試行回数を増やすと「ずれ」がどう減るか見て。',
          interaction: {
            kind: 'math_sandbox',
            task: '試行回数を 100 → 1000 → 5000 と増やしてみる。同じ排出率1%でも、試行が少ないと結果は大きく揺れる。',
            scenario: {
              kind: 'law_of_large_numbers',
              rate: 0.01,
            },
          },
        },
        {
          id: 'i-06',
          type: 'mini_lesson',
          speaker: 'detective',
          content:
            '【道具3:大数の法則】試行回数 n を増やすと、出現率は理論値 p に収束する。100連では揺れるが、10000連回せば1%に近づく。だが、ここに「ギャンブラーの誤謬」が潜む。',
        },
        {
          id: 'i-07',
          type: 'narrative',
          speaker: 'detective',
          content:
            '「99連外れたから、次は出やすい」——完全な錯覚だ。各試行は独立。前の結果は次の確率に影響しない。コイントスで5連続表が出ても、6回目の表は依然として50%だ。',
        },
      ],
    },

    // ──────────────── 第4幕:推理 ────────────────
    {
      type: 'deduction',
      title: '【推理】二項分布で真相を導け',
      steps: [
        {
          id: 'd-01',
          type: 'narrative',
          speaker: 'detective',
          content:
            '道具は揃った。スライダーで条件を変え、自分で計算してみろ。',
        },
        {
          id: 'd-02',
          type: 'interactive',
          content:
            '推理①:排出率1%、100連で SSR が0個の確率は何%?',
          hint: '式は P(X=0) = (1-p)^n = (0.99)^100',
          interaction: {
            kind: 'slider_estimate',
            question: 'スライダーで 0〜100% の範囲を推測',
            min: 0,
            max: 100,
            step: 0.5,
            correctAnswer: 36.6,
            tolerance: 2,
            unit: '%',
            correctFeedback:
              '正解。約36.6%。3人に1人は0個。佐藤さんは「運が悪かった」のではなく、「ごく普通の確率」を引いた。',
            wrongFeedback:
              '惜しい。(0.99)^100 ≈ 0.366 = 36.6%。',
          },
        },
        {
          id: 'd-03',
          type: 'interactive',
          content:
            '推理②:排出率0.5%、100連で SSR が0個の確率は?',
          hint: '式は (0.995)^100。期待値は0.5個。',
          interaction: {
            kind: 'slider_estimate',
            question: 'スライダーで推測',
            min: 0,
            max: 100,
            step: 0.5,
            correctAnswer: 60.6,
            tolerance: 2,
            unit: '%',
            correctFeedback:
              '正解。約60.6%。半数以上が0個。期待値半個でも、過半数の人がゼロ——これが「分散の罠」だ。',
            wrongFeedback:
              '違う。(0.995)^100 ≈ 0.606 = 60.6%。',
          },
        },
        {
          id: 'd-04',
          type: 'interactive',
          content:
            '推理③:二項分布エクスプローラー。n と p を動かして、確率がどう変わるか体感せよ。',
          interaction: {
            kind: 'binomial_explorer',
            defaultN: 100,
            defaultP: 0.01,
          },
        },
        {
          id: 'd-05',
          type: 'interactive',
          content:
            '最終推理:「天井300連で SSR 確定」のガチャ。期待値だけ見ると損しない設計でも、実際にプレイヤーが破産する理由は?',
          interaction: {
            kind: 'choice',
            question: '正しい説明はどれ?',
            options: [
              { label: '期待値は確実に出るので破産しない', isCorrect: false, feedback: '期待値「確実に出る」のではなく「平均」だ。' },
              { label: '300連で確定でも、それまでに10万円以上の課金が必要なケースがある', isCorrect: true, feedback: '正解。300連 ≈ 9万円。だが「特定の SSR が欲しい」場合、たまたま欲しいキャラが出るとは限らない。確率の罠は二重三重に張られている。' },
              { label: 'ガチャは公平だから破産は錯覚', isCorrect: false, feedback: '「公平」と「破産しない」は別問題。' },
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
          type: 'dialogue',
          speaker: 'detective',
          content:
            '佐藤さん。事件は解けた。',
        },
        {
          id: 'sol-02',
          type: 'dialogue',
          speaker: 'detective',
          content:
            'これは詐欺じゃない。確率1%のガチャで100連回しても、3人に1人は0個。あなたは運が悪かっただけだ。',
        },
        {
          id: 'sol-03',
          type: 'dialogue',
          speaker: 'client',
          content:
            'え、じゃあ運営は悪くないんですか…?',
        },
        {
          id: 'sol-04',
          type: 'dialogue',
          speaker: 'detective',
          content:
            'いや。確率表記は嘘ではないが、運営の本当の罠は別にある——「期待値で釣って、分散の大きさで沼らせる」設計だ。',
        },
        {
          id: 'sol-05',
          type: 'narrative',
          speaker: 'detective',
          content:
            '「期待値1個」と書けば、人は「だいたい1個出る」と思う。だが実際には0個も2個もある。0個だった人は「次は出るはず」と追加課金する——ギャンブラーの誤謬。確率は冷酷に1%のままだ。',
        },
        {
          id: 'sol-06',
          type: 'mini_lesson',
          speaker: 'detective',
          content:
            '【教訓】\n① 「期待値1個」と「1個出る」は全く違う\n② 確率事象は、期待値だけでなく分散(リスク)を見ろ\n③ ギャンブラーの誤謬:過去の結果は次の確率に影響しない\n④ ガチャ・宝くじ・投資・ビジネス——すべての確率事象に同じ法則が働く',
        },
        {
          id: 'sol-07',
          type: 'interactive',
          content:
            '応用問題:期待リターン年5%・標準偏差20%の投資商品。1年後にマイナスになる確率は約何%?',
          interaction: {
            kind: 'choice',
            question: '正規分布近似で考える',
            options: [
              { label: '0%。期待リターンがプラスなら絶対プラス', isCorrect: false, feedback: '期待値=確実、ではない。今回学んだ罠。' },
              { label: '約40%。期待値はプラスでも、標準偏差が大きいとマイナスは普通に起こる', isCorrect: true, feedback: '正解。Z = (0 - 5) / 20 = -0.25。下側確率は約 40%。期待値だけ見て投資する者は、ガチャ廃課金者と同じ罠に堕ちる。' },
              { label: '50%。コインの裏表と同じ', isCorrect: false, feedback: '期待値がプラスならマイナスは50%未満になる。' },
            ],
          },
        },
        {
          id: 'sol-08',
          type: 'dialogue',
          speaker: 'client',
          expression: 'hopeful',
          showPortrait: true,
          content:
            '探偵さん…ありがとうございます。これで、また衝動的に行動しそうになっても、踏みとどまれます。',
        },
        // ───── ボス問題:3問連続 ─────
        {
          id: 'sol-boss-intro',
          type: 'narrative',
          speaker: 'detective',
          content:
            '【最終試験】ここからは「ボス問題」だ。確率の3連戦。これが解ければ、君は真のガチャ捜査官だ。',
        },
        {
          id: 'sol-boss-01',
          type: 'interactive',
          content: '【ボス問題 1/3】排出率1%のガチャを100連回したとき、SSR が1個も出ない確率は約何%?',
          interaction: {
            kind: 'slider_estimate',
            question: 'スライダーで推測してください',
            min: 0,
            max: 100,
            step: 0.5,
            correctAnswer: 36.6,
            tolerance: 2,
            unit: '%',
            correctFeedback: '正解。約36.6%。3人に1人がゼロ。',
            wrongFeedback: '違う。(1 − 0.01)^100 = 0.99^100 ≈ 0.366 = 36.6%。',
          },
          hints: {
            level1: '「外す確率」が n 回連続で起こる確率を計算する。',
            level2: '式は (1 − p)^n。ここでは (1 − 0.01)^100 = 0.99^100。',
            level3: '0.99^100 ≈ 0.366 = 36.6%。3人に1人がゼロ個。',
          },
        },
        {
          id: 'sol-boss-02',
          type: 'interactive',
          content: '【ボス問題 2/3】二項分布 B(100, 0.01) の平均と分散の組み合わせとして正しいのは?',
          interaction: {
            kind: 'choice',
            question: '正しい組み合わせを選んでください',
            options: [
              { label: '平均 = 1、分散 = 0.99', isCorrect: true, feedback: '正解。E(X) = np = 100 × 0.01 = 1。V(X) = np(1−p) = 100 × 0.01 × 0.99 = 0.99。' },
              { label: '平均 = 100、分散 = 1', isCorrect: false, feedback: '違う。E(X) = np。100 × 0.01 = 1 が正しい。' },
              { label: '平均 = 0.01、分散 = 1', isCorrect: false, feedback: '違う。p ではなく np。' },
              { label: '平均 = 1、分散 = 1', isCorrect: false, feedback: '惜しい。平均は正しいが、分散は np(1−p) = 0.99。' },
            ],
          },
          hints: {
            level1: '二項分布の平均は np、分散は np(1 − p)。',
            level2: 'n = 100, p = 0.01 なので、np = 1。',
            level3: 'np(1 − p) = 100 × 0.01 × 0.99 = 0.99。標準偏差は √0.99 ≈ 0.995。',
          },
        },
        {
          id: 'sol-boss-03',
          type: 'interactive',
          content: '【ボス問題 3/3】「全 SSR の合計排出率1%」の表記でも、目当てのキャラに絞ると別の話。SSR が10種類あって均等排出のとき、目当てのキャラ1体の排出率は?',
          interaction: {
            kind: 'choice',
            question: '目当てキャラ1体の排出確率は?',
            options: [
              { label: '0.1% (= 1% ÷ 10)', isCorrect: true, feedback: '正解。1% ÷ 10 = 0.1%。100連で目当てが1個でも出る確率はわずか約 9.5%。これが「確率表記の罠」だ。' },
              { label: '1% (どのキャラも同じ確率)', isCorrect: false, feedback: '違う。「全 SSR で1%」なので、10種類で割る必要がある。' },
              { label: '10% (10種類あるから)', isCorrect: false, feedback: '逆。10種類あるから1体あたりは小さくなる。' },
              { label: '0.01% (1% を100で割る)', isCorrect: false, feedback: '違う。10種類で割る。' },
            ],
          },
          hints: {
            level1: '「全SSR」と「目当てキャラ」は別々に考える。',
            level2: '10種類が均等排出なら、1種類あたりは合計排出率 ÷ 10。',
            level3: '1% ÷ 10 = 0.1%。100連で目当てが0個の確率は (0.999)^100 ≈ 90.5%。',
          },
        },
        {
          id: 'sol-09',
          type: 'narrative',
          speaker: 'detective',
          content:
            '事件 No.002 — 完全解決。「ガチャ捜査官」の称号を授ける。',
        },
      ],
    },
  ],
};

export default gachaCase;
