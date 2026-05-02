'use client';

import { useMemo } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Tooltip,
  Legend,
} from 'recharts';
import { mean, stddev, histogram } from '@/lib/stats';

type Props = {
  datasets: { label: string; values: number[] }[];
};

const COLORS = ['#3b82f6', '#f59e0b', '#10b981', '#dc2626'];

// 同じ X 軸スケールで複数データセットを横並びの棒グラフとして重ね、
// 比較統計テーブルを直下に併記。A と B が一目で比較できる。
export default function DistributionCompare({ datasets }: Props) {
  const allValues = useMemo(() => datasets.flatMap((d) => d.values), [datasets]);
  const lo = Math.min(...allValues);
  const hi = Math.max(...allValues);

  const stats = useMemo(
    () =>
      datasets.map((d) => {
        const m = mean(d.values);
        const sd = stddev(d.values);
        return { label: d.label, mean: m, sd, cv: sd / m };
      }),
    [datasets]
  );

  // 同じビン幅でヒストグラム化、各ビンに全データセットの count を持たせる
  const merged = useMemo(() => {
    const bins = 10;
    const w = (hi - lo) / bins;
    const rows: Array<Record<string, string | number>> = Array.from({ length: bins }, (_, i) => ({
      bin: `${Math.round(lo + i * w).toLocaleString()}〜${Math.round(lo + (i + 1) * w).toLocaleString()}`,
      binStart: lo + i * w,
    }));
    datasets.forEach((d) => {
      const h = histogram(d.values, bins, lo, hi);
      h.forEach((b, i) => {
        rows[i][d.label] = b.count;
      });
    });
    return rows;
  }, [datasets, lo, hi]);

  return (
    <div className="space-y-3">
      {/* 統計量を上に表示 — A・B が左右に並ぶテーブル形式 */}
      <div className="rounded-xl bg-slate-950/70 border border-slate-800 overflow-hidden">
        <table className="w-full text-xs sm:text-sm">
          <thead>
            <tr className="bg-slate-900/80 text-slate-400">
              <th className="px-2 py-2 text-left font-normal text-[11px]">指標</th>
              {stats.map((s, idx) => (
                <th key={s.label} className="px-2 py-2 text-right font-semibold" style={{ color: COLORS[idx] }}>
                  {s.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="text-slate-200">
            <tr className="border-t border-slate-800">
              <td className="px-2 py-1.5 text-slate-400">平均</td>
              {stats.map((s) => (
                <td key={s.label} className="px-2 py-1.5 text-right font-bold text-amber-accent">
                  {Math.round(s.mean).toLocaleString()}
                </td>
              ))}
            </tr>
            <tr className="border-t border-slate-800">
              <td className="px-2 py-1.5 text-slate-400">標準偏差 σ</td>
              {stats.map((s) => (
                <td key={s.label} className="px-2 py-1.5 text-right font-semibold">
                  {Math.round(s.sd).toLocaleString()}
                </td>
              ))}
            </tr>
            <tr className="border-t border-slate-800">
              <td className="px-2 py-1.5 text-slate-400">ばらつき(σ÷平均)</td>
              {stats.map((s) => (
                <td
                  key={s.label}
                  className={`px-2 py-1.5 text-right font-bold ${
                    s.cv > 0.5 ? 'text-rose-400' : 'text-emerald-300'
                  }`}
                >
                  {(s.cv * 100).toFixed(0)}%
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>

      {/* オーバーレイ・ヒストグラム — 同じ X 軸で並べると形の違いが一目瞭然 */}
      <div className="rounded-xl bg-slate-950/70 border border-slate-800 p-3">
        <div className="text-[11px] text-slate-500 mb-2">
          📊 同じ「いいね数」スケールで重ねて比較(横軸:いいね数の範囲、縦軸:投稿数)
        </div>
        <ResponsiveContainer width="100%" height={220}>
          <BarChart data={merged} barCategoryGap={2}>
            <XAxis
              dataKey="bin"
              tick={{ fill: '#94a3b8', fontSize: 9 }}
              angle={-30}
              textAnchor="end"
              height={56}
            />
            <YAxis tick={{ fill: '#94a3b8', fontSize: 10 }} />
            <Tooltip
              contentStyle={{
                backgroundColor: '#0f172a',
                border: '1px solid #334155',
                fontSize: 12,
              }}
            />
            <Legend wrapperStyle={{ fontSize: 11 }} />
            {datasets.map((d, idx) => (
              <Bar key={d.label} dataKey={d.label} fill={COLORS[idx]} />
            ))}
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* 各データセットごとの判定 */}
      <div className="grid sm:grid-cols-2 gap-2">
        {stats.map((s, idx) => (
          <div
            key={s.label}
            className="rounded-lg border p-2.5 text-xs"
            style={{
              backgroundColor: 'rgba(15,23,42,0.5)',
              borderColor: COLORS[idx] + '60',
            }}
          >
            <div className="font-semibold mb-0.5" style={{ color: COLORS[idx] }}>
              {s.label}
            </div>
            {s.cv > 0.5 ? (
              <p className="text-rose-300">⚠ ばらつき大:バズ依存型(数件の大バズで平均が引き上げられている)</p>
            ) : (
              <p className="text-emerald-300">✓ ばらつき小:安定して反応されている</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
