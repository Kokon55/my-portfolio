'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import PixelPortrait from '../characters/PixelPortrait';
import type { Case } from '@/content/cases/types';

const difficultyDots = (n: number) =>
  Array.from({ length: 5 }, (_, i) => (
    <span
      key={i}
      className={`inline-block w-1.5 h-1.5 rounded-full mx-px ${
        i < n ? 'bg-amber-accent' : 'bg-slate-700'
      }`}
    />
  ));

export default function CaseList({
  cases,
  solvedCases,
}: {
  cases: Case[];
  solvedCases: string[];
}) {
  return (
    <div className="grid sm:grid-cols-2 gap-4">
      {cases.map((c, idx) => {
        const isSolved = solvedCases.includes(c.id);
        const ComingSoon = !!c.comingSoon;

        return (
          <motion.div
            key={c.id}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.06 }}
            className="relative rounded-2xl border border-slate-800 bg-gradient-to-br from-slate-900 to-slate-950 p-4 case-card-shadow overflow-hidden"
          >
            {ComingSoon && (
              <div className="absolute top-2 right-2 text-[10px] uppercase tracking-widest px-2 py-0.5 rounded bg-slate-800 text-slate-400">
                Coming Soon
              </div>
            )}
            {isSolved && (
              <div className="absolute top-2 right-2 text-[10px] uppercase tracking-widest px-2 py-0.5 rounded bg-emerald-700/60 text-emerald-100">
                ✓ 解決済み
              </div>
            )}

            <div className="flex items-start gap-3">
              <div className="shrink-0 rounded-lg overflow-hidden border border-amber-accent/20">
                <PixelPortrait
                  characterId={c.client.characterId}
                  expression={c.client.defaultExpression ?? 'worried'}
                  size={72}
                />
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-[10px] text-slate-500 uppercase tracking-widest">
                  事件 No.{String(idx + 1).padStart(3, '0')} / {c.mathField}
                </div>
                <h3 className="font-detective font-bold text-lg text-amber-accent leading-tight">
                  {c.title}
                </h3>
                <p className="text-xs text-slate-300">— {c.subtitle}</p>
                <div className="flex items-center gap-2 mt-2 text-[10px] text-slate-500">
                  <span>難易度</span>
                  {difficultyDots(c.difficulty)}
                  <span className="ml-auto">⏱ 約{c.estimatedMinutes}分</span>
                </div>
              </div>
            </div>

            <p className="text-sm text-slate-300 mt-3 leading-relaxed line-clamp-3">
              {c.shortSummary}
            </p>

            <div className="mt-3">
              {ComingSoon ? (
                <div className="w-full px-3 py-2 rounded-lg bg-slate-900 text-slate-500 text-sm text-center border border-dashed border-slate-700">
                  続報をお待ちください
                </div>
              ) : (
                <Link
                  href={`/case/${c.id}`}
                  className="block w-full px-3 py-2 rounded-lg bg-amber-accent text-slate-900 font-bold text-sm text-center active:scale-95 transition"
                >
                  {isSolved ? '✓ もう一度解く' : '事件に挑む'}
                </Link>
              )}
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}
