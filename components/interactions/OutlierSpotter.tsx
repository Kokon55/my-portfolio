'use client';

import { useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { mean, stddev, zScore } from '@/lib/stats';

// プレイヤーが「怪しい投稿」をタップで告発する。
// Z-score が閾値を超えるものが「真の外れ値」。
// 過剰告発(誤検知)も減点される。

type Post = {
  id: string;
  likes: number;
  date: string;
  emoji: string;
  caption: string;
};

type Props = {
  posts: Post[];
  threshold: number; // |z| > これ で外れ値
  question: string;
  successFeedback?: string;
  partialFeedback?: string;
  onComplete?: (correct: number, total: number, falsePositive: number) => void;
};

export default function OutlierSpotter({
  posts,
  threshold,
  question,
  successFeedback = '見事だ。バズった投稿を正確に特定した。あとはこの「平均を吊り上げた数投稿」を除けば、本当の実力が見えてくる。',
  partialFeedback = '惜しい。バズ投稿(平均から大きく離れた値)を見抜くのが鍵だ。',
  onComplete,
}: Props) {
  const [flagged, setFlagged] = useState<Set<string>>(new Set());
  const [submitted, setSubmitted] = useState(false);

  const m = useMemo(() => mean(posts.map((p) => p.likes)), [posts]);
  const sd = useMemo(() => stddev(posts.map((p) => p.likes)), [posts]);
  const trueOutlierIds = useMemo(() => {
    const ids = new Set<string>();
    posts.forEach((p) => {
      if (Math.abs(zScore(p.likes, posts.map((q) => q.likes))) > threshold) {
        ids.add(p.id);
      }
    });
    return ids;
  }, [posts, threshold]);

  const toggle = (id: string) => {
    if (submitted) return;
    setFlagged((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const submit = () => {
    setSubmitted(true);
    let correct = 0;
    let falsePositive = 0;
    flagged.forEach((id) => {
      if (trueOutlierIds.has(id)) correct++;
      else falsePositive++;
    });
    if (onComplete) onComplete(correct, trueOutlierIds.size, falsePositive);
  };

  const correctCount = Array.from(flagged).filter((id) => trueOutlierIds.has(id)).length;
  const falseCount = flagged.size - correctCount;
  const isPerfect = correctCount === trueOutlierIds.size && falseCount === 0;

  return (
    <div className="space-y-3">
      <p className="text-sm text-slate-300">{question}</p>

      {!submitted && (
        <div className="text-xs text-slate-500 flex justify-between items-center bg-slate-900/40 rounded px-3 py-1.5">
          <span>選択中: <b className="text-amber-accent">{flagged.size}</b> 件</span>
          <span>平均 {Math.round(m).toLocaleString()} / σ {Math.round(sd).toLocaleString()}</span>
        </div>
      )}

      <div className="grid grid-cols-3 sm:grid-cols-5 gap-1.5">
        {posts.map((p) => {
          const isFlagged = flagged.has(p.id);
          const isTrue = trueOutlierIds.has(p.id);
          const z = Math.abs(zScore(p.likes, posts.map((q) => q.likes)));
          let bg = 'bg-slate-900/60 border-slate-700 hover:border-amber-accent/40';
          let badge = null;
          if (submitted) {
            if (isFlagged && isTrue) {
              bg = 'bg-emerald-900/40 border-emerald-500';
              badge = <span className="text-emerald-300 text-[10px] font-bold">✓ 的中</span>;
            } else if (isFlagged && !isTrue) {
              bg = 'bg-rose-900/40 border-rose-500';
              badge = <span className="text-rose-300 text-[10px] font-bold">× 誤検知</span>;
            } else if (!isFlagged && isTrue) {
              bg = 'bg-amber-900/30 border-amber-500/60';
              badge = <span className="text-amber-300 text-[10px] font-bold">⚠ 見逃し</span>;
            }
          } else if (isFlagged) {
            bg = 'bg-amber-accent/15 border-amber-accent ring-2 ring-amber-accent/30';
          }
          return (
            <motion.button
              key={p.id}
              onClick={() => toggle(p.id)}
              disabled={submitted}
              whileTap={!submitted ? { scale: 0.94 } : undefined}
              className={`relative rounded-lg border-2 p-2 transition text-left ${bg}`}
            >
              <div className="text-xl leading-none mb-1">{p.emoji}</div>
              <div className="text-[10px] text-slate-500 truncate">{p.caption}</div>
              <div className="font-bold text-sm text-amber-accent mt-0.5">
                {p.likes.toLocaleString()}
              </div>
              <div className="text-[9px] text-slate-500">いいね</div>
              {submitted && (
                <div className="text-[9px] text-slate-400 mt-0.5">z = {z.toFixed(1)}</div>
              )}
              {badge && <div className="absolute top-0.5 right-1">{badge}</div>}
              {isFlagged && !submitted && (
                <div className="absolute top-1 right-1 text-amber-accent text-xs">🚩</div>
              )}
            </motion.button>
          );
        })}
      </div>

      {!submitted ? (
        <button
          onClick={submit}
          disabled={flagged.size === 0}
          className="w-full px-4 py-3 rounded-xl bg-gradient-to-r from-amber-accent to-yellow-600 text-slate-900 font-bold disabled:opacity-40 active:scale-95 transition"
        >
          🚩 {flagged.size} 件を「外れ値」として告発する
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
              {isPerfect ? '✓ 完璧' : `${correctCount}/${trueOutlierIds.size} 的中・誤検知 ${falseCount}`}
            </div>
            <p className="text-sm leading-relaxed">{isPerfect ? successFeedback : partialFeedback}</p>
            <div className="mt-3 text-xs text-slate-300 bg-slate-950/40 rounded p-2">
              📊 真の外れ値判定:|Z-score| &gt; {threshold}(平均から標準偏差の{threshold}倍以上離れている)
            </div>
          </motion.div>
        </AnimatePresence>
      )}
    </div>
  );
}
