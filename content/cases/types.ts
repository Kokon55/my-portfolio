import type { DetectiveBadge } from '@/lib/store';
import type { CharacterId, Expression } from '@/components/characters/PixelPortrait';

export type ClientCharacter = {
  name: string;
  age: number;
  occupation: string;
  // ピクセルポートレートのキャラID
  characterId: CharacterId;
  // 旧 SVG アバターのフォールバック用
  avatar: {
    skin: string;
    hair: string;
    accent: string;
    expression: 'worried' | 'distraught' | 'tired' | 'curious';
  };
  introLine: string;
  // ケース一覧カードでのデフォルト表情
  defaultExpression?: Expression;
};

export type InteractionConfig =
  | { kind: 'engagement_calc'; influencers: InfluencerData[] }
  | { kind: 'distribution_compare'; datasets: { label: string; values: number[] }[] }
  | { kind: 'follower_growth'; series: { label: string; points: number[]; isBot: boolean }[] }
  | { kind: 'gacha_simulator'; rate: number; defaultPulls: number }
  | { kind: 'binomial_explorer'; defaultN: number; defaultP: number }
  | { kind: 'choice'; options: { label: string; isCorrect: boolean; feedback: string }[]; question: string }
  | { kind: 'slider_estimate'; question: string; min: number; max: number; step: number; correctAnswer: number; tolerance: number; unit: string; correctFeedback: string; wrongFeedback: string }
  | { kind: 'sns_profile'; profile: SnsProfile }
  | { kind: 'gacha_screen'; results: ('SSR' | 'SR' | 'R' | 'N')[] }
  | { kind: 'true_score'; influencers: InfluencerData[] }
  | {
      kind: 'outlier_spotter';
      question: string;
      threshold: number;
      posts: { id: string; likes: number; date: string; emoji: string; caption: string }[];
      successFeedback?: string;
      partialFeedback?: string;
    }
  | {
      kind: 'formula_builder';
      question: string;
      segments: (
        | { kind: 'text'; text: string }
        | { kind: 'op'; op: string }
        | { kind: 'slot'; id: string }
      )[];
      chips: { id: string; label: string; correctSlot: string }[];
      successFeedback: string;
      failFeedback: string;
    }
  | {
      kind: 'evidence_matcher';
      question: string;
      scenarios: { id: string; label: string; correctProbId: string }[];
      probabilities: { id: string; label: string }[];
      successFeedback: string;
    }
  | {
      kind: 'math_sandbox';
      task: string;
      scenario:
        | { kind: 'bot_engagement'; baseFollowers: number; baseLikes: number }
        | { kind: 'binomial_shape'; nDefault: number; pDefault: number }
        | { kind: 'law_of_large_numbers'; rate: number };
    }
  | {
      kind: 'timeseries_anomaly';
      question: string;
      weeklyDeltas: number[];
      trueAnomalyIndices: number[];
      successFeedback: string;
      partialFeedback: string;
    };

export type InfluencerData = {
  handle: string;
  displayName: string;
  followers: number;
  posts: { likes: number; date: string }[];
  growthCurve: number[]; // 月次フォロワー数の推移
  botRatio: number; // 0-1
};

export type SnsProfile = {
  platform: 'Fluttr' | 'Picgrm' | 'ToTok' | 'Vutube';
  handle: string;
  displayName: string;
  bio: string;
  followers: number;
  following: number;
  posts: number;
  verified: boolean;
};

export type ActStep = {
  id: string;
  type:
    | 'dialogue'
    | 'data_display'
    | 'interactive'
    | 'narrative'
    | 'choice'
    | 'mini_lesson';
  content: string;
  speaker?: 'client' | 'narrator' | 'player' | 'detective';
  interaction?: InteractionConfig;
  // 旧:単一ヒント。後方互換のため残す。新規は hints を使う
  hint?: string;
  // 段階的ヒント(3段階)。Level1 が最も控えめ、Level3 が最もネタバレ寄り
  hints?: { level1: string; level2: string; level3: string };
  formula?: string; // KaTeX
  // 数式の日本語1〜2行解説(mini_lesson の formula 直下に表示)
  formulaMeaning?: string;
  // 各記号の意味(? アイコン → ツールチップ)
  formulaSymbols?: { symbol: string; meaning: string }[];
  // 表情(セリフごとに切替)
  expression?: Expression;
  // ポーズ表示の有無(セリフ大型表示)
  showPortrait?: boolean;
  // インタラクティブステップで「📊 参考データ」パネルに表示する内容
  reference?: ReferenceData;
};

export type ReferenceData = {
  // 主要な数値(平均・標準偏差・n など)
  stats?: { label: string; value: string; highlight?: boolean }[];
  // 直近で出た公式(KaTeX)
  formula?: string;
  // 補足説明(1〜2行)
  note?: string;
};

export type Act = {
  type: 'commission' | 'crime_scene' | 'investigation' | 'deduction' | 'solution';
  title: string;
  steps: ActStep[];
};

export type Case = {
  id: string;
  title: string;
  subtitle: string;
  client: ClientCharacter;
  difficulty: 1 | 2 | 3 | 4 | 5;
  estimatedMinutes: number;
  mathField: string; // 「数学I」「数学A」など
  shortSummary: string;
  acts: Act[];
  acquiredSkills: string[];
  badge: DetectiveBadge;
  comingSoon?: boolean;
};
