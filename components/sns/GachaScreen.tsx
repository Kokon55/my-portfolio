'use client';

import { motion } from 'framer-motion';

type Props = { results: ('SSR' | 'SR' | 'R' | 'N')[] };

const rarityClass: Record<string, string> = {
  SSR: 'bg-gradient-to-br from-amber-300 to-yellow-600 text-slate-900 shadow-lg shadow-amber-500/40',
  SR: 'bg-gradient-to-br from-fuchsia-500 to-purple-700 text-white',
  R: 'bg-gradient-to-br from-sky-500 to-blue-700 text-white',
  N: 'bg-slate-700 text-slate-300',
};

export default function GachaScreen({ results }: Props) {
  return (
    <div className="rounded-2xl border border-slate-700 bg-slate-950/80 p-3 sm:p-4 max-w-md mx-auto">
      <div className="flex items-center justify-between text-xs mb-2">
        <span className="px-2 py-0.5 rounded bg-rose-700/40 text-rose-200">★4 SSR 排出率 1%</span>
        <span className="text-slate-500">100連結果(再現)</span>
      </div>
      <div className="grid grid-cols-10 gap-1">
        {results.map((r, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.005, duration: 0.2 }}
            className={`aspect-square rounded text-[10px] sm:text-xs font-bold flex items-center justify-center ${rarityClass[r]}`}
          >
            {r}
          </motion.div>
        ))}
      </div>
      <div className="mt-3 grid grid-cols-4 gap-2 text-xs text-center">
        <Tally results={results} target="SSR" color="text-amber-accent" />
        <Tally results={results} target="SR" color="text-fuchsia-300" />
        <Tally results={results} target="R" color="text-sky-300" />
        <Tally results={results} target="N" color="text-slate-400" />
      </div>
    </div>
  );
}

function Tally({ results, target, color }: { results: string[]; target: string; color: string }) {
  const c = results.filter((r) => r === target).length;
  return (
    <div className="rounded bg-slate-900/70 py-1.5">
      <div className={`font-bold text-base ${color}`}>{c}</div>
      <div className="text-slate-500">{target}</div>
    </div>
  );
}
