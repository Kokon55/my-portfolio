import type { DetectiveBadge } from '@/lib/store';

export type ClientCharacter = {
  name: string;
  age: number;
  occupation: string;
  // SVGアバターのパラメータ。ClientAvatar.tsx で描画
  avatar: {
    skin: string;
    hair: string;
    accent: string;
    expression: 'worried' | 'distraught' | 'tired' | 'curious';
  };
  introLine: string;
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
  hint?: string;
  formula?: string; // KaTeX
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
  isFreePreview: boolean;
  freeUntilAct: number;
  comingSoon?: boolean;
};
