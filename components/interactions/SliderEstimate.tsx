'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

type Props = {
  question: string;
  min: number;
  max: number;
  step: number;
  correctAnswer: number;
  tolerance: number;
  unit: string;
  correctFeedback: string;
  wrongFeedback: string;
  onCorrect?: () => void;
};

export default function SliderEstimate({
  question, min, max, step, correctAnswer, tolerance, unit, correctFeedback, wrongFeedback, onCorrect,
}: Props) {
  const [value, setValue] = useState((min + max) / 2);
  const [submitted, setSubmitted] = useState(false);

  const isCorrect = Math.abs(value - correctAnswer) <= tolerance;

  return (
    <div className="space-y-4">
      <p className="text-sm text-slate-300">{question}</p>

      <div className="rounded-xl bg-slate-950/70 border border-slate-800 p-4">
        <div className="text-center text-3xl font-bold text-amber-accent mb-3 font-detective">
          {value.toFixed(step < 1 ? 2 : 0)}
          <span className="text-base text-slate-400 ml-1">{unit}</span>
        </div>
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={(e) => { setValue(Number(e.target.value)); setSubmitted(false); }}
          className="w-full"
        />
        <div className="flex justify-between text-[11px] text-slate-500 mt-1">
          <span>{min}{unit}</span>
          <span>{max}{unit}</span>
        </div>
      </div>

      <button
        onClick={() => { setSubmitted(true); if (isCorrect && onCorrect) onCorrect(); }}
        className="w-full px-4 py-3 rounded-xl bg-gradient-to-r from-amber-accent to-yellow-600 text-slate-900 font-bold active:scale-95 transition"
      >
        この値で推理する
      </button>

      <AnimatePresence>
        {submitted && (
          <motion.div
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className={`rounded-xl p-4 border ${
              isCorrect
                ? 'bg-emerald-950/40 border-emerald-700/60 text-emerald-200'
                : 'bg-rose-950/40 border-rose-800/60 text-rose-200'
            }`}
          >
            <div className="text-xs uppercase tracking-widest mb-1">
              {isCorrect ? '✓ 正解' : '× 不正解'}
            </div>
            <p className="text-sm">{isCorrect ? correctFeedback : wrongFeedback}</p>
            {!isCorrect && (
              <p className="text-xs text-slate-400 mt-2">
                正解: {correctAnswer}{unit}
              </p>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
