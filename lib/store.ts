import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

export type DetectiveBadge = {
  id: string;
  name: string;
  rank: string;
  description: string;
};

type DetectiveState = {
  // 進捗管理
  currentCaseId: string | null;
  currentActIndex: number;
  currentStepIndex: number;
  setProgress: (caseId: string, actIndex: number, stepIndex: number) => void;

  // 解決済みケース
  solvedCases: string[];
  acquiredBadges: DetectiveBadge[];
  acquiredSkills: string[];
  solveCase: (caseId: string, badge: DetectiveBadge, skills: string[]) => void;

  // 設定
  soundEnabled: boolean;
  toggleSound: () => void;
};

export const useDetectiveStore = create<DetectiveState>()(
  persist(
    (set) => ({
      currentCaseId: null,
      currentActIndex: 0,
      currentStepIndex: 0,
      setProgress: (caseId, actIndex, stepIndex) =>
        set({
          currentCaseId: caseId,
          currentActIndex: actIndex,
          currentStepIndex: stepIndex,
        }),

      solvedCases: [],
      acquiredBadges: [],
      acquiredSkills: [],
      solveCase: (caseId, badge, skills) =>
        set((s) => ({
          solvedCases: s.solvedCases.includes(caseId)
            ? s.solvedCases
            : [...s.solvedCases, caseId],
          acquiredBadges: s.acquiredBadges.find((b) => b.id === badge.id)
            ? s.acquiredBadges
            : [...s.acquiredBadges, badge],
          acquiredSkills: Array.from(new Set([...s.acquiredSkills, ...skills])),
        })),

      soundEnabled: false,
      toggleSound: () => set((s) => ({ soundEnabled: !s.soundEnabled })),
    }),
    {
      name: 'data-detective-progress',
      storage: createJSONStorage(() => {
        if (typeof window === 'undefined') {
          return {
            getItem: () => null,
            setItem: () => undefined,
            removeItem: () => undefined,
          };
        }
        return localStorage;
      }),
    }
  )
);
