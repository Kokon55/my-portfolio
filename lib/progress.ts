import type { Case } from '@/content/cases/types';

export const totalSteps = (caseDef: Case): number =>
  caseDef.acts.reduce((sum, a) => sum + a.steps.length, 0);
