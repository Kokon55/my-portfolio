'use client';

import { useMemo } from 'react';
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip, ReferenceLine } from 'recharts';
import { mean, stddev, histogram } from '@/lib/stats';

type Props = {
  datasets: { label: string; values: number[] }[];
};

export default function DistributionCompare({ datasets }: Props) {
  const allValues = useMemo(() => datasets.flatMap((d) => d.values), [datasets]);
  const lo = Math.min(...allValues);
  const hi = Math.max(...allValues);

  return (
    <div className="space-y-4">
      {datasets.map((d, idx) => {
        const m = mean(d.values);
        const sd = stddev(d.values);
        const cv = sd / m;
        const h = histogram(d.values, 10, lo, hi);
        return (
          <div key={idx} className="rounded-xl bg-slate-950/70 border border-slate-800 p-3 sm:p-4">
            <div className="flex items-baseline justify-between mb-2 flex-wrap gap-2">
              <h4 className="font-semibold text-slate-100">{d.label}</h4>
              <div className="text-[11px] text-slate-400 flex gap-3">
                <span>平均 <b className="text-amber-accent">{Math.round(m).toLocaleString()}</b></span>
                <span>標準偏差 <b className="text-slate-200">{Math.round(sd).toLocaleString()}</b></span>
                <span>変動係数 <b className={cv > 0.5 ? 'text-rose-400' : 'text-emerald-300'}>{(cv * 100).toFixed(0)}%</b></span>
              </div>
            </div>
            <ResponsiveContainer width="100%" height={140}>
              <BarChart data={h}>
                <XAxis dataKey="bin" tick={{ fill: '#94a3b8', fontSize: 9 }} angle={-25} textAnchor="end" height={40} />
                <YAxis tick={{ fill: '#94a3b8', fontSize: 10 }} />
                <Tooltip contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #334155', fontSize: 12 }} />
                <Bar dataKey="count" fill={idx === 0 ? '#1e3a8a' : '#f59e0b'} />
                <ReferenceLine x={Math.round(m).toLocaleString()} stroke="#dc2626" strokeDasharray="3 3" />
              </BarChart>
            </ResponsiveContainer>
            {cv > 0.5 ? (
              <p className="text-xs text-rose-300 mt-1">⚠ ばらつき大:バズ依存型(平均は外れ値に引っ張られている)</p>
            ) : (
              <p className="text-xs text-emerald-300 mt-1">✓ ばらつき小:安定発信型</p>
            )}
          </div>
        );
      })}
    </div>
  );
}
