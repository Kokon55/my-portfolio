'use client';

import { motion, AnimatePresence } from 'framer-motion';
import dynamic from 'next/dynamic';
import { useState, useEffect } from 'react';
import DialogueBox from '../characters/DialogueBox';
import InteractionRenderer from '../interactions/InteractionRenderer';
import type { ActStep, ClientCharacter } from '@/content/cases/types';

const BlockMath = dynamic(() => import('react-katex').then((m) => m.BlockMath), { ssr: false });

type Props = {
  step: ActStep;
  client: ClientCharacter;
  // インタラクション完了通知。CaseRunner が「次へ」解錠の判定に使う。
  onComplete?: () => void;
};

export default function CaseStep({ step, client, onComplete }: Props) {
  const [hintLevel, setHintLevel] = useState(0);

  // ステップが変わったらヒント開示状態をリセット
  useEffect(() => {
    setHintLevel(0);
  }, [step.id]);

  // 段階ヒントを配列に変換(後方互換:旧 hint は level1 にフォールバック)
  const hintsList: string[] = step.hints
    ? [step.hints.level1, step.hints.level2, step.hints.level3]
    : step.hint
    ? [step.hint]
    : [];

  return (
    <motion.div
      key={step.id}
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="space-y-4"
    >
      {(step.type === 'dialogue' || step.type === 'narrative') && (
        <DialogueBox
          speaker={step.speaker ?? 'narrator'}
          client={client}
          text={step.content}
          expression={step.expression}
          showLargePortrait={step.showPortrait}
        />
      )}

      {step.type === 'mini_lesson' && (
        <div className="rounded-2xl border border-amber-accent/40 bg-gradient-to-br from-amber-950/30 to-slate-950/60 p-5">
          <div className="text-[11px] uppercase tracking-widest text-amber-accent mb-2">📖 道具を学ぶ</div>
          <p className="dialog-text text-slate-100 whitespace-pre-line text-sm sm:text-base">{step.content}</p>
          {step.formula && (
            <div className="mt-3 p-3 bg-slate-950/70 rounded-lg overflow-x-auto">
              <BlockMath math={step.formula} />
            </div>
          )}
        </div>
      )}

      {step.type === 'data_display' && (
        <div className="rounded-2xl border border-slate-800 bg-slate-950/60 p-4">
          <p className="text-sm text-slate-300">{step.content}</p>
        </div>
      )}

      {step.type === 'interactive' && step.interaction && (
        <div className="rounded-2xl border border-slate-800 bg-slate-950/40 p-4 sm:p-5">
          {step.content && <p className="text-sm text-slate-300 mb-3">{step.content}</p>}
          <InteractionRenderer interaction={step.interaction} onCorrect={onComplete} />

          {hintsList.length > 0 && (
            <div className="mt-3 space-y-2">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-[11px] text-slate-500">困ったら:</span>
                {hintsList.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setHintLevel(Math.max(hintLevel, i + 1))}
                    disabled={hintLevel > i}
                    className={`text-[11px] px-2.5 py-1 rounded-full border transition ${
                      hintLevel > i
                        ? 'bg-amber-900/30 border-amber-700/40 text-amber-300/70'
                        : 'bg-slate-900 border-slate-700 text-slate-300 hover:border-amber-accent/40'
                    }`}
                  >
                    💡 ヒント{i + 1}{hintLevel > i ? ' ✓' : ''}
                  </button>
                ))}
              </div>
              <AnimatePresence>
                {hintsList.slice(0, hintLevel).map((h, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className={`text-xs rounded-lg p-2.5 ${
                      i === 0
                        ? 'bg-slate-900/60 border border-slate-700 text-slate-300'
                        : i === 1
                        ? 'bg-amber-950/30 border border-amber-800/40 text-amber-100'
                        : 'bg-rose-950/30 border border-rose-800/40 text-rose-100'
                    }`}
                  >
                    <span className="text-[10px] uppercase tracking-widest opacity-70 mr-1">
                      Lv{i + 1}
                    </span>
                    {h}
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          )}
        </div>
      )}
    </motion.div>
  );
}
