// 進捗関連のヘルパー
import type { Case } from '@/content/cases/types';

export const isCaseAccessible = (
  caseDef: Case,
  isPurchased: boolean
): boolean => {
  if (caseDef.isFreePreview) return true;
  return isPurchased;
};

export const isStepAccessible = (
  caseDef: Case,
  actIndex: number,
  isPurchased: boolean
): boolean => {
  if (isPurchased) return true;
  if (!caseDef.isFreePreview) return false;
  return actIndex < caseDef.freeUntilAct;
};

export const totalSteps = (caseDef: Case): number =>
  caseDef.acts.reduce((sum, a) => sum + a.steps.length, 0);
