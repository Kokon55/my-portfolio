'use client';

import { useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Tooltip,
  ReferenceArea,
  Legend,
} from 'recharts';

// 時系列データ(週次フォロワー増減)から、異常な「ジャンプ」週を
// プレイヤーがタップで指摘する。
//
// 真の異常週は、移動平均からの Z-score が threshold を超える週。
// プレイヤーは「移動平均ウィンドウ」もスライダーで操作できる。

type Props = {
  question: string;
  // 各週のフォロワー増加数(差分)
  weeklyDeltas: number[];
  // 真の異常週インデックス(0-based)
  trueAnomalyIndices: number[];
  successFeedback: string;
  partialFeedback: string;
  onComplete?: (correct: number, total: number, falsePositive: number) => void;
};

export default function TimeSeriesAnomaly({
  question,
  weeklyDeltas,
  trueAnomalyIndices,
  successFeedback,
  partialFeedback,
  onComplete,
}: Props) {
  const [flagged, setFlagged] = useState<Set<number>>(new Set());
  const [submitted, setSubmitted] = useState(false);
  const [windowSize, setWindowSize] = useState(4);

  // 移動平均と移動標準偏差を計算
  const data = useMemo(() => {
    return weeklyDeltas.map((delta, i) => {
      const start = Math.max(0, i - windowSize);
      const win = weeklyDeltas.slice(start, i);
      const m = win.length === 0 ? delta : win.reduce((a, b) => a + b, 0) / win.length;
      const v =
        win.length === 0
          ? 0
          : win.reduce((s, x) => s + (x - m) ** 2, 0) / Math.max(1, win.length - 1);
      const sd = Math.sqrt(v) || 1;
      const z = (delta - m) / sd;
      return {
        week: `W${i + 1}`,
        idx: i,
        delta,
        ma: m,
        zScore: z,
        upper: m + 2 * sd,
        lower: m - 2 * sd,
      };
    });
  }, [weeklyDeltas, windowSize]);

  const trueSet = useMemo(() => new Set(trueAnomalyIndices), [trueAnomalyIndices]);

  const toggle = (idx: number) => {
    if (submitted) return;
    setFlagged((prev) => {
      const next = new Set(prev);
      if (next.has(idx)) next.delete(idx);
      else next.add(idx);
      return next;
    });
  };

  const submit = () => {
    setSubmitted(true);
    let correct = 0;
    let fp = 0;
    flagged.forEach((idx) => {
      if (trueSet.has(idx)) correct++;
      else fp++;
    });
    if (onComplete) onComplete(correct, trueSet.size, fp);
  };

  const correctCount = Array.from(flagged).filter((i) => trueSet.has(i)).length;
  const falseCount = flagged.size - correctCount;
  const isPerfect = correctCount === trueSet.size && falseCount === 0;

  return (
    <div className="space-y-3">
      <p className="text-sm text-slate-300">{question}</p>

      <div className="rounded-xl bg-slate-950/70 border border-slate-800 p-3">
        <div className="flex items-center justify-between text-xs mb-2">
          <span className="text-slate-400">📐 移動平均ウィンドウ</span>
          <span className="font-bold text-amber-accent">{windowSize} 週</span>
        </div>
        <input
          type="range"
          min={2}
          max={8}
          step={1}
          value={windowSize}
          onChange={(e) => setWindowSize(Number(e.target.value))}
          className="w-full"
        />
      </div>

      <div className="rounded-xl bg-slate-950/70 border border-slate-800 p-2">
        <div className="text-[11px] text-slate-500 px-2 mb-1">
          縦軸:1週間あたりのフォロワー増加。橙=実測、青=移動平均、点線=±2σ範囲
        </div>
        <ResponsiveContainer width="100%" height={220}>
          <LineChart data={data}>
            <XAxis dataKey="week" tick={{ fill: '#94a3b8', fontSize: 9 }} />
            <YAxis tick={{ fill: '#94a3b8', fontSize: 10 }} />
            <Tooltip
              contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #334155', fontSize: 12 }}
              formatter={(v: number, name: string) =>
                [`${Math.round(v).toLocaleString()}`, name === 'delta' ? '実測' : name === 'ma' ? '移動平均' : name]
              }
            />
            {/* フラグした週をハイライト */}
            {Array.from(flagged).map((idx) => (
              <ReferenceArea
                key={`flag-${idx}`}
                x1={`W${idx + 1}`}
                x2={`W${idx + 1}`}
                strokeOpacity={0.3}
                fill="#f59e0b"
                fillOpacity={0.3}
              />
            ))}
            {/* 提出後、真の異常を示す */}
            {submitted &&
              trueAnomalyIndices.map((idx) => (
                <ReferenceArea
                  key={`true-${idx}`}
                  x1={`W${idx + 1}`}
                  x2={`W${idx + 1}`}
                  fill="#dc2626"
                  fillOpacity={0.2}
                />
              ))}
            <Line type="monotone" dataKey="delta" stroke="#f59e0b" strokeWidth={2} dot={{ r: 3 }} name="実測" />
            <Line type="monotone" dataKey="ma" stroke="#3b82f6" strokeWidth={2} strokeDasharray="3 3" dot={false} name="移動平均" />
            <Line type="monotone" dataKey="upper" stroke="#64748b" strokeDasharray="2 4" dot={false} name="+2σ" />
            <Line type="monotone" dataKey="lower" stroke="#64748b" strokeDasharray="2 4" dot={false} name="-2σ" />
            <Legend wrapperStyle={{ fontSize: 11 }} />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* 週ごとのタップターゲット */}
      <div className="grid grid-cols-6 sm:grid-cols-10 gap-1">
        {data.map((d) => {
          const isFlagged = flagged.has(d.idx);
          const isTrue = trueSet.has(d.idx);
          let cls = 'bg-slate-900/60 border-slate-700 hover:border-amber-accent/50';
          if (submitted) {
            if (isFlagged && isTrue) cls = 'bg-emerald-900/50 border-emerald-500';
            else if (isFlagged && !isTrue) cls = 'bg-rose-900/50 border-rose-500';
            else if (!isFlagged && isTrue) cls = 'bg-amber-900/50 border-amber-500';
          } else if (isFlagged) {
            cls = 'bg-amber-accent/20 border-amber-accent ring-2 ring-amber-accent/30';
          }
          return (
            <button
              key={d.idx}
              onClick={() => toggle(d.idx)}
              disabled={submitted}
              className={`text-[10px] py-1.5 rounded border-2 ${cls}`}
            >
              W{d.idx + 1}
              {isFlagged && !submitted && <div className="text-[8px] text-amber-accent">🚩</div>}
              {submitted && (
                <div className="text-[9px] text-slate-400">z={d.zScore.toFixed(1)}</div>
              )}
            </button>
          );
        })}
      </div>

      {!submitted ? (
        <button
          onClick={submit}
          disabled={flagged.size === 0}
          className="w-full px-4 py-3 rounded-xl bg-gradient-to-r from-amber-accent to-yellow-600 text-slate-900 font-bold disabled:opacity-40 active:scale-95 transition"
        >
          🚩 {flagged.size} 週を「異常」として告発する
        </button>
      ) : (
        <AnimatePresence>
          <motion.div
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            className={`rounded-xl p-4 border ${
              isPerfect
                ? 'bg-emerald-950/40 border-emerald-700 text-emerald-100'
                : 'bg-amber-950/30 border-amber-800/60 text-amber-100'
            }`}
          >
            <div className="text-xs uppercase tracking-widest mb-1">
              {isPerfect ? '✓ 完璧' : `${correctCount}/${trueSet.size} 的中・誤検知 ${falseCount}`}
            </div>
            <p className="text-sm leading-relaxed">{isPerfect ? successFeedback : partialFeedback}</p>
            <div className="mt-3 text-xs text-slate-300 bg-slate-950/40 rounded p-2">
              📊 真の異常判定:|Z-score| &gt; 2(±2σ範囲を逸脱した週)
            </div>
          </motion.div>
        </AnimatePresence>
      )}
    </div>
  );
}
