'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

type Option = { label: string; isCorrect: boolean; feedback: string };
type Props = {
  question: string;
  options: Option[];
  onCorrect?: () => void;
};

export default function ChoiceQuestion({ question, options, onCorrect }: Props) {
  const [selected, setSelected] = useState<number | null>(null);

  const select = (i: number) => {
    setSelected(i);
    if (options[i].isCorrect && onCorrect) onCorrect();
  };

  return (
    <div className="space-y-3">
      <p className="text-sm font-semibold text-slate-200">{question}</p>
      <div className="space-y-2">
        {options.map((o, i) => {
          const chosen = selected === i;
          const showAnswer = selected !== null;
          const status = !showAnswer
            ? 'border-slate-700 hover:border-amber-accent/60 bg-slate-900/60'
            : chosen
            ? o.isCorrect
              ? 'border-emerald-500 bg-emerald-950/40'
              : 'border-rose-600 bg-rose-950/40'
            : o.isCorrect
            ? 'border-emerald-600/40 bg-emerald-950/20'
            : 'border-slate-800 bg-slate-900/30 opacity-60';

          return (
            <button
              key={i}
              onClick={() => select(i)}
              disabled={selected !== null}
              className={`w-full text-left rounded-xl border-2 px-4 py-3 transition ${status}`}
            >
              <div className="flex items-start gap-2">
                <div
                  className={`shrink-0 w-6 h-6 rounded-full border-2 flex items-center justify-center text-xs font-bold ${
                    showAnswer && o.isCorrect ? 'border-emerald-400 text-emerald-300' :
                    showAnswer && chosen ? 'border-rose-400 text-rose-300' :
                    'border-slate-600 text-slate-500'
                  }`}
                >
                  {showAnswer ? (o.isCorrect ? '✓' : chosen ? '×' : '·') : String.fromCharCode(65 + i)}
                </div>
                <span className="text-sm text-slate-100">{o.label}</span>
              </div>
            </button>
          );
        })}
      </div>
      <AnimatePresence>
        {selected !== null && (
          <motion.div
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            className={`rounded-xl p-4 text-sm ${
              options[selected].isCorrect
                ? 'bg-emerald-950/40 border border-emerald-700/60 text-emerald-100'
                : 'bg-rose-950/40 border border-rose-800/60 text-rose-100'
            }`}
          >
            {options[selected].feedback}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
