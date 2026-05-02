import type { Case } from './types';
import buzzCase from './case-01-buzz';
import gachaCase from './case-02-gacha';
import followerCase from './case-03-followers';

// MVP 実装済み:ケース1, 2
// 第2段階で追加予定:ケース3〜6 は Coming Soon
const comingSoon = (
  id: string,
  title: string,
  subtitle: string,
  field: string,
  difficulty: 1 | 2 | 3 | 4 | 5,
  short: string,
  clientName: string,
  occupation: string
): Case => ({
  id,
  title,
  subtitle,
  client: {
    name: clientName,
    age: 30,
    occupation,
    characterId: 'akari',
    avatar: { skin: '#e9c8a8', hair: '#2a2a2a', accent: '#1e3a8a', expression: 'curious' },
    introLine: '——',
  },
  difficulty,
  estimatedMinutes: 8,
  mathField: field,
  shortSummary: short,
  acquiredSkills: [],
  badge: { id: `badge-${id}`, name: '?', rank: '?', description: '?' },
  acts: [],
  comingSoon: true,
});

const cases: Case[] = [
  buzzCase,
  gachaCase,
  followerCase,
  comingSoon(
    'case-04-reviews',
    '★4.8のアプリ',
    'レビュー操作を見抜け',
    '数学I「中央値・分布」',
    2,
    '★4.8の高評価アプリ。だが分布を見れば「★1か★5しかない」二極化が露呈する。レビュー詐欺の検出術。',
    '高橋',
    'アプリ開発者'
  ),
  comingSoon(
    'case-05-poll',
    'Twitter世論調査の罠',
    '80%支持の真実',
    '数学B「サンプリング・信頼区間」',
    3,
    '「フォロワーアンケートで80%が支持!」——だがそれは何人に聞いた? サンプリングバイアスを暴く。',
    '渡辺',
    '政治記者'
  ),
  comingSoon(
    'case-06-bayes',
    'AI画像識別精度99%?',
    'ベイズの逆襲',
    '数学A「条件付き確率」+ ベイズの定理',
    5,
    '「精度99%のAI診断」——だが珍しい疾患では誤診の方が多い。条件付き確率の最終試練。',
    '伊藤',
    '医療スタートアップCTO'
  ),
];

export default cases;
export const findCase = (id: string): Case | undefined => cases.find((c) => c.id === id);
