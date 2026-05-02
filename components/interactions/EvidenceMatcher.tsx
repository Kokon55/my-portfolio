'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// プレイヤーが「シナリオ ↔ 確率」の組をタップで結びつける。
// 例: 「100連で SSR 0個」← 36.6% を当てる
// 例: 「100連で SSR 1個」← 37.0%
// 例: 「100連で SSR 2個以上」← 26.4%

type Scenario = { id: string; label: string; correctProbId: string };
type Probability = { id: string; label: string };

type Props = {
  question: string;
  scenarios: Scenario[];
  probabilities: Probability[];
  successFeedback: string;
  onCorrect?: () => void;
};

export default function EvidenceMatcher({
  question,
  scenarios,
  probabilities,
  successFeedback,
  onCorrect,
}: Props) {
  const [pairs, setPairs] = useState<Record<string, string>>({}); // scenarioId → probId
  const [pickedProb, setPickedProb] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);

  const usedProbs = new Set(Object.values(pairs));
  const allMatched = scenarios.every((s) => pairs[s.id]);

  const handleScenarioClick = (scenarioId: string) => {
    if (submitted) return;
    if (pickedProb) {
      setPairs((p) => ({ ...p, [scenarioId]: pickedProb }));
      setPickedProb(null);
    } else if (pairs[scenarioId]) {
      // 解除
      setPairs((p) => {
        const next = { ...p };
        delete next[scenarioId];
        return next;
      });
    }
  };

  const handleProbClick = (probId: string) => {
    if (submitted || usedProbs.has(probId)) return;
    setPickedProb(pickedProb === probId ? null : probId);
  };

  const correctCount = scenarios.filter((s) => pairs[s.id] === s.correctProbId).length;
  const allCorrect = correctCount === scenarios.length;

  const reset = () => {
    setPairs({});
    setPickedProb(null);
    setSubmitted(false);
  };

  return (
    <div className="space-y-3">
      <p className="text-sm text-slate-300">{question}</p>

      <div className="space-y-2">
        {scenarios.map((s) => {
          const placedProbId = pairs[s.id];
          const placedProb = probabilities.find((p) => p.id === placedProbId);
          const isCorrect = submitted && placedProbId === s.correctProbId;
          const isWrong = submitted && placedProbId && placedProbId !== s.correctProbId;
          return (
            <button
              key={s.id}
              onClick={() => handleScenarioClick(s.id)}
              disabled={submitted}
              className={`w-full flex items-center gap-2 rounded-xl border-2 p-3 transition text-left ${
                isCorrect
                  ? 'bg-emerald-900/40 border-emerald-500'
                  : isWrong
                  ? 'bg-rose-900/40 border-rose-500'
                  : placedProb
                  ? 'bg-amber-accent/10 border-amber-accent'
                  : pickedProb
                  ? 'border-amber-accent/60 bg-slate-900 animate-pulse'
                  : 'border-slate-700 bg-slate-900/60'
              }`}
            >
              <div className="flex-1 text-sm text-slate-100">{s.label}</div>
              <div className="text-amber-accent">→</div>
              <div
                className={`min-w-[80px] text-right font-bold ${
                  placedProb ? 'text-amber-accent' : 'text-slate-600'
                }`}
              >
                {placedProb ? placedProb.label : '???'}
              </div>
              {submitted && (
                <span className={isCorrect ? 'text-emerald-400' : 'text-rose-400'}>
                  {isCorrect ? '✓' : '×'}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {!submitted && (
        <div className="rounded-xl bg-slate-900/60 border border-slate-800 p-3">
          <div className="text-[11px] text-slate-500 mb-2">
            ↓ 確率を選んで、上のシナリオをタップ
          </div>
          <div className="flex flex-wrap gap-2">
            {probabilities.map((p) => {
              const isUsed = usedProbs.has(p.id);
              return (
                <button
                  key={p.id}
                  onClick={() => handleProbClick(p.id)}
                  disabled={isUsed}
                  className={`px-3 py-2 rounded-lg text-sm font-bold transition ${
                    isUsed
                      ? 'bg-slate-800/40 text-slate-600 line-through cursor-not-allowed'
                      : pickedProb === p.id
                      ? 'bg-amber-accent text-slate-900 ring-2 ring-amber-accent/40 scale-105'
                      : 'bg-slate-800 text-slate-100 hover:bg-slate-700'
                  }`}
                >
                  {p.label}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {!submitted ? (
        <button
          onClick={() => {
            setSubmitted(true);
            const allCorrectOnSubmit = scenarios.every((s) => pairs[s.id] === s.correctProbId);
            if (allCorrectOnSubmit) onCorrect?.();
          }}
          disabled={!allMatched}
          className="w-full px-4 py-3 rounded-xl bg-gradient-to-r from-amber-accent to-yellow-600 text-slate-900 font-bold disabled:opacity-40 active:scale-95 transition"
        >
          この組み合わせで確定する
        </button>
      ) : (
        <AnimatePresence>
          <motion.div
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            className={`rounded-xl p-4 border ${
              allCorrect
                ? 'bg-emerald-950/40 border-emerald-700 text-emerald-100'
                : 'bg-rose-950/40 border-rose-800 text-rose-100'
            }`}
          >
            <div className="text-xs uppercase tracking-widest mb-1">
              {allCorrect ? '✓ 全問正解' : `${correctCount}/${scenarios.length} 正解`}
            </div>
            <p className="text-sm leading-relaxed">
              {allCorrect
                ? successFeedback
                : 'この対応関係を覚えておくと、ガチャの結果に一喜一憂しなくなる。'}
            </p>
            {!allCorrect && (
              <button
                onClick={reset}
                className="mt-3 px-3 py-1.5 rounded bg-slate-800 text-slate-200 text-xs"
              >
                もう一度
              </button>
            )}
          </motion.div>
        </AnimatePresence>
      )}
    </div>
  );
}
