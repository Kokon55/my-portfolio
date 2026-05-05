'use client';

import { useState } from 'react';
import dynamic from 'next/dynamic';
import { motion, AnimatePresence } from 'framer-motion';

const BlockMath = dynamic(() => import('react-katex').then((m) => m.BlockMath), { ssr: false });

type Symbol = { symbol: string; meaning: string };

export default function FormulaExplain({
  formula,
  meaning,
  symbols,
}: {
  formula: string;
  meaning?: string;
  symbols?: Symbol[];
}) {
  const [openIdx, setOpenIdx] = useState<number | null>(null);

  return (
    <div className="mt-3 space-y-2">
      <div className="p-3 bg-slate-950/70 rounded-lg overflow-x-auto">
        <BlockMath math={formula} />
      </div>

      {meaning && (
        <div className="rounded-lg bg-amber-950/20 border border-amber-800/40 px-3 py-2">
          <div className="text-[10px] uppercase tracking-widest text-amber-300/80 mb-1">
            ↓ この式の意味
          </div>
          <p className="text-sm text-amber-100 leading-relaxed">{meaning}</p>
        </div>
      )}

      {symbols && symbols.length > 0 && (
        <div className="rounded-lg bg-slate-950/50 border border-slate-700/50 px-3 py-2">
          <div className="text-[10px] uppercase tracking-widest text-slate-400 mb-2">
            記号の意味（タップで開閉）
          </div>
          <div className="flex flex-wrap gap-1.5">
            {symbols.map((s, i) => (
              <button
                key={`${s.symbol}-${i}`}
                onClick={() => setOpenIdx(openIdx === i ? null : i)}
                className={`group inline-flex items-center gap-1 px-2 py-1 rounded-md border text-xs transition ${
                  openIdx === i
                    ? 'bg-amber-900/40 border-amber-600/60 text-amber-100'
                    : 'bg-slate-900 border-slate-700 text-slate-200 hover:border-amber-accent/40'
                }`}
                aria-expanded={openIdx === i}
              >
                <span className="font-mono">{s.symbol}</span>
                <span className="text-[10px] text-slate-400 group-hover:text-amber-accent">
                  {openIdx === i ? '×' : '?'}
                </span>
              </button>
            ))}
          </div>
          <AnimatePresence initial={false}>
            {openIdx !== null && symbols[openIdx] && (
              <motion.div
                key={openIdx}
                initial={{ opacity: 0, height: 0, marginTop: 0 }}
                animate={{ opacity: 1, height: 'auto', marginTop: 8 }}
                exit={{ opacity: 0, height: 0, marginTop: 0 }}
                className="overflow-hidden"
              >
                <div className="rounded-md bg-slate-900/80 border border-amber-700/40 px-2.5 py-2 text-xs text-slate-100">
                  <span className="font-mono text-amber-accent mr-2">
                    {symbols[openIdx].symbol}
                  </span>
                  <span>= {symbols[openIdx].meaning}</span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
}
