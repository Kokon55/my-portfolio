'use client';

import { useState, useMemo } from 'react';
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip } from 'recharts';
import { binomialDistribution, probabilityOfZeroHits, probabilityOfAtLeastOne } from '@/lib/stats';

type Props = { defaultN: number; defaultP: number };

export default function BinomialExplorer({ defaultN, defaultP }: Props) {
  const [n, setN] = useState(defaultN);
  const [p, setP] = useState(defaultP);

  const data = useMemo(() => {
    const dist = binomialDistribution(n, p);
    const limit = Math.min(dist.length, Math.max(15, Math.ceil(n * p * 4)));
    return dist.slice(0, limit).map((prob, k) => ({ k, prob }));
  }, [n, p]);

  const zero = probabilityOfZeroHits(n, p);
  const atLeastOne = probabilityOfAtLeastOne(n, p);

  return (
    <div className="space-y-3">
      <div className="grid grid-cols-2 gap-3">
        <Slider label="試行回数 n" value={n} min={10} max={500} step={10} onChange={setN} display={String(n)} />
        <Slider label="確率 p" value={p * 1000} min={1} max={100} step={1} onChange={(v) => setP(v / 1000)} display={`${(p * 100).toFixed(1)}%`} />
      </div>
      <div className="grid grid-cols-3 gap-2 text-center">
        <Stat label="期待値 (np)" value={(n * p).toFixed(2)} />
        <Stat label="0個の確率" value={`${(zero * 100).toFixed(1)}%`} accent />
        <Stat label="1個以上" value={`${(atLeastOne * 100).toFixed(1)}%`} />
      </div>
      <div className="rounded-xl bg-slate-950/70 border border-slate-800 p-2">
        <ResponsiveContainer width="100%" height={180}>
          <BarChart data={data}>
            <XAxis dataKey="k" tick={{ fill: '#94a3b8', fontSize: 10 }} />
            <YAxis tick={{ fill: '#94a3b8', fontSize: 10 }} tickFormatter={(v) => `${(v * 100).toFixed(0)}%`} />
            <Tooltip
              contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #334155', fontSize: 12 }}
              formatter={(v: number) => `${(v * 100).toFixed(2)}%`}
            />
            <Bar dataKey="prob" fill="#f59e0b" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

function Slider({ label, value, min, max, step, onChange, display }: {
  label: string; value: number; min: number; max: number; step: number;
  onChange: (v: number) => void; display: string;
}) {
  return (
    <div className="rounded-lg bg-slate-950/70 border border-slate-800 p-3">
      <div className="flex justify-between text-xs text-slate-400">
        <span>{label}</span>
        <span className="text-amber-accent font-bold">{display}</span>
      </div>
      <input type="range" min={min} max={max} step={step} value={value} onChange={(e) => onChange(Number(e.target.value))} className="w-full mt-1" />
    </div>
  );
}

function Stat({ label, value, accent }: { label: string; value: string; accent?: boolean }) {
  return (
    <div className="rounded-lg bg-slate-900/70 border border-slate-800 px-2 py-2">
      <div className={`text-base font-bold ${accent ? 'text-rose-400' : 'text-slate-100'}`}>{value}</div>
      <div className="text-[10px] text-slate-500">{label}</div>
    </div>
  );
}
