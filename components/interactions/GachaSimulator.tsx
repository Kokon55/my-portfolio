'use client';

import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, ReferenceLine, Tooltip } from 'recharts';
import { simulateGachaMany, mean, binomialDistribution } from '@/lib/stats';

type Props = { rate: number; defaultPulls: number };

export default function GachaSimulator({ rate, defaultPulls }: Props) {
  const [pulls, setPulls] = useState<10 | 100 | 1000>(defaultPulls === 10 ? 10 : defaultPulls === 1000 ? 1000 : 100);
  const [history, setHistory] = useState<number[]>([]);
  const [seed, setSeed] = useState(1);
  const [lastResult, setLastResult] = useState<number | null>(null);

  const pull = () => {
    const result = simulateGachaMany(1, pulls, rate, seed)[0];
    setLastResult(result);
    setHistory((h) => [...h, result]);
    setSeed((s) => s + 1);
  };

  const pull100Times = () => {
    const results = simulateGachaMany(100, pulls, rate, seed);
    setLastResult(results[results.length - 1]);
    setHistory((h) => [...h, ...results]);
    setSeed((s) => s + 100);
  };

  const reset = () => {
    setHistory([]);
    setLastResult(null);
  };

  const histogram = useMemo(() => {
    if (history.length === 0) return [];
    const counts = new Map<number, number>();
    for (const h of history) counts.set(h, (counts.get(h) ?? 0) + 1);
    const maxK = Math.max(...history, Math.ceil(pulls * rate * 3));
    const arr: { k: number; count: number; theory: number }[] = [];
    const dist = binomialDistribution(pulls, rate);
    for (let k = 0; k <= Math.min(maxK, 30); k++) {
      arr.push({ k, count: counts.get(k) ?? 0, theory: (dist[k] ?? 0) * history.length });
    }
    return arr;
  }, [history, pulls, rate]);

  const expected = pulls * rate;
  const observed = history.length > 0 ? mean(history) : 0;
  const zeroCount = history.filter((h) => h === 0).length;
  const zeroRate = history.length > 0 ? zeroCount / history.length : 0;

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center gap-2">
        <div className="text-xs text-slate-400">試行設定:</div>
        {([10, 100, 1000] as const).map((p) => (
          <button
            key={p}
            onClick={() => { setPulls(p); reset(); }}
            className={`px-3 py-1.5 rounded-lg text-sm font-semibold transition ${
              pulls === p ? 'bg-amber-accent text-slate-900' : 'bg-slate-800 text-slate-300'
            }`}
          >
            {p}連
          </button>
        ))}
        <div className="ml-auto text-xs text-slate-500">排出率 {(rate * 100).toFixed(1)}%</div>
      </div>

      <div className="flex flex-wrap gap-2">
        <button
          onClick={pull}
          className="flex-1 min-w-[140px] px-4 py-3 rounded-xl bg-gradient-to-r from-amber-accent to-yellow-600 text-slate-900 font-bold shadow-lg shadow-amber-500/20 active:scale-95 transition"
        >
          🎲 ガチャを引く ({pulls}連)
        </button>
        <button
          onClick={pull100Times}
          className="px-4 py-3 rounded-xl bg-slate-800 text-slate-200 text-sm border border-slate-700"
        >
          100セット一気に
        </button>
        <button onClick={reset} className="px-3 py-3 rounded-xl bg-slate-900 text-slate-500 text-sm border border-slate-800">
          リセット
        </button>
      </div>

      {lastResult !== null && (
        <motion.div
          key={history.length}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="rounded-xl bg-slate-950 border border-slate-800 p-4 text-center"
        >
          <div className="text-xs text-slate-500">直近の{pulls}連結果</div>
          <div className={`text-3xl font-bold mt-1 ${lastResult === 0 ? 'text-rose-400' : lastResult > expected ? 'text-amber-accent' : 'text-slate-200'}`}>
            SSR {lastResult} 個
          </div>
        </motion.div>
      )}

      {history.length > 0 && (
        <>
          <div className="grid grid-cols-3 gap-2 text-center">
            <Stat label="試行回数" value={String(history.length)} />
            <Stat label="平均SSR数" value={observed.toFixed(2)} hint={`期待値 ${expected.toFixed(2)}`} />
            <Stat label="0個率" value={`${(zeroRate * 100).toFixed(1)}%`} />
          </div>

          <div className="rounded-xl bg-slate-950/80 border border-slate-800 p-3">
            <div className="text-xs text-slate-400 mb-2">SSR個数の分布(理論値=橙線)</div>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={histogram}>
                <XAxis dataKey="k" tick={{ fill: '#94a3b8', fontSize: 11 }} />
                <YAxis tick={{ fill: '#94a3b8', fontSize: 11 }} />
                <Tooltip contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #334155' }} />
                <Bar dataKey="count" fill="#1e3a8a" name="実測" />
                <Bar dataKey="theory" fill="#f59e0b" name="理論値" opacity={0.55} />
                <ReferenceLine x={expected} stroke="#dc2626" strokeDasharray="3 3" label={{ value: '期待値', fill: '#dc2626', fontSize: 11 }} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {history.length >= 100 && (
            <div className="text-xs text-slate-400 bg-slate-950/60 border border-slate-800 rounded-lg p-3">
              💡 試行回数を増やすほど、平均が期待値 ({expected.toFixed(2)}) に収束していく ——「大数の法則」だ。だが、毎回の結果は揺れる。これが「分散」。
            </div>
          )}
        </>
      )}
    </div>
  );
}

function Stat({ label, value, hint }: { label: string; value: string; hint?: string }) {
  return (
    <div className="rounded-lg bg-slate-900/70 border border-slate-800 px-2 py-2">
      <div className="text-lg font-bold text-amber-accent">{value}</div>
      <div className="text-[11px] text-slate-500">{label}</div>
      {hint && <div className="text-[10px] text-slate-600">{hint}</div>}
    </div>
  );
}
