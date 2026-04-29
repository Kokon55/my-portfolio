'use client';

import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { linearityScore } from '@/lib/stats';

type Props = {
  series: { label: string; points: number[]; isBot: boolean }[];
};

export default function FollowerGrowth({ series }: Props) {
  const months = Math.max(...series.map((s) => s.points.length));
  const data = Array.from({ length: months }, (_, i) => {
    const row: Record<string, number | string> = { month: `M${i + 1}` };
    for (const s of series) row[s.label] = s.points[i] ?? 0;
    return row;
  });

  return (
    <div className="rounded-xl bg-slate-950/70 border border-slate-800 p-3">
      <ResponsiveContainer width="100%" height={220}>
        <LineChart data={data}>
          <XAxis dataKey="month" tick={{ fill: '#94a3b8', fontSize: 10 }} />
          <YAxis tick={{ fill: '#94a3b8', fontSize: 10 }} tickFormatter={(v) => v >= 1000 ? `${(v / 1000).toFixed(0)}K` : `${v}`} />
          <Tooltip contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #334155', fontSize: 12 }} />
          <Legend wrapperStyle={{ fontSize: 11 }} />
          {series.map((s, idx) => (
            <Line
              key={s.label}
              type="monotone"
              dataKey={s.label}
              stroke={idx === 0 ? '#f59e0b' : '#38bdf8'}
              strokeWidth={2}
              dot={false}
            />
          ))}
        </LineChart>
      </ResponsiveContainer>
      <div className="mt-2 grid sm:grid-cols-2 gap-2 text-xs">
        {series.map((s) => {
          const r2 = linearityScore(s.points);
          return (
            <div key={s.label} className="rounded-lg bg-slate-900/60 px-3 py-2 border border-slate-800">
              <div className="font-semibold text-slate-100">{s.label}</div>
              <div className="text-slate-400">線形フィッティング R² = <b className={r2 > 0.99 ? 'text-rose-400' : 'text-emerald-300'}>{r2.toFixed(3)}</b></div>
              <div className={r2 > 0.99 ? 'text-rose-300' : 'text-emerald-300'}>
                {r2 > 0.99 ? '⚠ 不自然な直線(bot 購入の疑い)' : '✓ 自然な揺らぎ'}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
