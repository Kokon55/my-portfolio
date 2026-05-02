'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { AnimatePresence } from 'framer-motion';
import CaseStep from './CaseStep';
import ProgressBar from '../ui/ProgressBar';
import { useDetectiveStore } from '@/lib/store';
import { totalSteps } from '@/lib/progress';
import type { Case } from '@/content/cases/types';

const actLabel: Record<string, string> = {
  commission: '第1幕 / 依頼',
  crime_scene: '第2幕 / 現場',
  investigation: '第3幕 / 捜査',
  deduction: '第4幕 / 推理',
  solution: '第5幕 / 解決',
};

const actBadge: Record<string, string> = {
  commission: 'bg-slate-800 text-slate-200',
  crime_scene: 'bg-blue-900/60 text-blue-200',
  investigation: 'bg-amber-900/60 text-amber-200',
  deduction: 'bg-rose-900/60 text-rose-200',
  solution: 'bg-emerald-900/60 text-emerald-200',
};

export default function CaseRunner({ caseDef }: { caseDef: Case }) {
  const router = useRouter();
  const setProgress = useDetectiveStore((s) => s.setProgress);
  const solveCase = useDetectiveStore((s) => s.solveCase);

  const [actIdx, setActIdx] = useState(0);
  const [stepIdx, setStepIdx] = useState(0);

  const act = caseDef.acts[actIdx];
  const step = act?.steps[stepIdx];

  // 進捗の積み上げカウント
  let progressCount = 0;
  for (let a = 0; a < actIdx; a++) progressCount += caseDef.acts[a].steps.length;
  progressCount += stepIdx + 1;

  useEffect(() => {
    setProgress(caseDef.id, actIdx, stepIdx);
  }, [caseDef.id, actIdx, stepIdx, setProgress]);

  const goNext = () => {
    if (!act) return;
    if (stepIdx + 1 < act.steps.length) {
      setStepIdx(stepIdx + 1);
    } else if (actIdx + 1 < caseDef.acts.length) {
      setActIdx(actIdx + 1);
      setStepIdx(0);
    } else {
      // 完走
      solveCase(caseDef.id, caseDef.badge, caseDef.acquiredSkills);
      router.push(`/case/${caseDef.id}/result`);
    }
  };

  const goBack = () => {
    if (stepIdx > 0) {
      setStepIdx(stepIdx - 1);
    } else if (actIdx > 0) {
      const prevAct = caseDef.acts[actIdx - 1];
      setActIdx(actIdx - 1);
      setStepIdx(prevAct.steps.length - 1);
    }
  };

  if (!act || !step) return null;

  const isLastStep = stepIdx === act.steps.length - 1 && actIdx === caseDef.acts.length - 1;

  return (
    <div className="relative min-h-screen bg-paper">
      {/* ヘッダー */}
      <header className="sticky top-0 z-30 backdrop-blur-md bg-slate-950/80 border-b border-slate-800">
        <div className="max-w-2xl mx-auto px-4 py-3 space-y-2">
          <div className="flex items-center justify-between">
            <Link href="/" className="text-xs text-slate-400 hover:text-amber-accent">
              ← 事件簿に戻る
            </Link>
            <span
              className={`text-[10px] uppercase tracking-widest px-2 py-1 rounded ${actBadge[act.type]}`}
            >
              {actLabel[act.type]}
            </span>
          </div>
          <ProgressBar
            current={progressCount}
            total={totalSteps(caseDef)}
            label={`事件「${caseDef.title}」`}
          />
        </div>
      </header>

      {/* 本文 */}
      <main className="max-w-2xl mx-auto px-4 py-6 space-y-4 pb-32">
        <AnimatePresence mode="wait">
          <CaseStep key={`${actIdx}-${stepIdx}`} step={step} client={caseDef.client} />
        </AnimatePresence>
      </main>

      {/* フッターナビ */}
      <nav className="fixed bottom-0 inset-x-0 z-30 backdrop-blur-md bg-slate-950/90 border-t border-slate-800">
        <div className="max-w-2xl mx-auto px-4 py-3 flex items-center gap-2">
          <button
            onClick={goBack}
            disabled={actIdx === 0 && stepIdx === 0}
            className="px-4 py-2.5 rounded-xl bg-slate-800 text-slate-200 disabled:opacity-30 disabled:cursor-not-allowed"
          >
            ←
          </button>
          <button
            onClick={goNext}
            className="flex-1 px-4 py-3 rounded-xl bg-gradient-to-r from-amber-accent to-yellow-600 text-slate-900 font-bold active:scale-95 transition shadow-lg shadow-amber-500/20"
          >
            {isLastStep ? '🏆 事件を解決する' : '次へ →'}
          </button>
        </div>
      </nav>
    </div>
  );
}
