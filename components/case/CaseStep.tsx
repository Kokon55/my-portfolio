'use client';

import { motion } from 'framer-motion';
import dynamic from 'next/dynamic';
import DialogueBox from '../characters/DialogueBox';
import InteractionRenderer from '../interactions/InteractionRenderer';
import type { ActStep, ClientCharacter } from '@/content/cases/types';

const BlockMath = dynamic(() => import('react-katex').then((m) => m.BlockMath), { ssr: false });

type Props = { step: ActStep; client: ClientCharacter };

export default function CaseStep({ step, client }: Props) {
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
          {step.content && (
            <p className="text-sm text-slate-300 mb-3">{step.content}</p>
          )}
          <InteractionRenderer interaction={step.interaction} />
          {step.hint && (
            <details className="mt-3">
              <summary className="text-[11px] text-slate-500 cursor-pointer hover:text-amber-accent">💡 ヒント</summary>
              <p className="mt-2 text-xs text-slate-400 bg-slate-900/60 p-2 rounded">{step.hint}</p>
            </details>
          )}
        </div>
      )}
    </motion.div>
  );
}
