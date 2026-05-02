'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// タップで数式を組み立てる。
// テンプレートはセグメント配列で、{slot:'a'} のような穴に
// プレイヤーがチップを当てはめる。

export type Segment =
  | { kind: 'text'; text: string }
  | { kind: 'op'; op: string }  // 演算子
  | { kind: 'slot'; id: string };

type Chip = { id: string; label: string; correctSlot: string };

type Props = {
  question: string;
  segments: Segment[];
  chips: Chip[];
  successFeedback: string;
  failFeedback: string;
  onCorrect?: () => void;
};

export default function FormulaBuilder({
  question,
  segments,
  chips,
  successFeedback,
  failFeedback,
  onCorrect,
}: Props) {
  // slotId → chipId
  const [placement, setPlacement] = useState<Record<string, string>>({});
  const [pickedChip, setPickedChip] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);

  const slots = segments.filter((s): s is { kind: 'slot'; id: string } => s.kind === 'slot');
  const allSlotsFilled = slots.every((s) => placement[s.id]);

  const placedChipIds = new Set(Object.values(placement));
  const availableChips = chips.filter((c) => !placedChipIds.has(c.id));

  const placeChip = (slotId: string) => {
    if (submitted) return;
    if (pickedChip) {
      setPlacement((p) => ({ ...p, [slotId]: pickedChip }));
      setPickedChip(null);
    } else if (placement[slotId]) {
      // タップで取り外し
      setPlacement((p) => {
        const next = { ...p };
        delete next[slotId];
        return next;
      });
    }
  };

  const pickChip = (chipId: string) => {
    if (submitted) return;
    setPickedChip(pickedChip === chipId ? null : chipId);
  };

  const submit = () => {
    setSubmitted(true);
    const allCorrectOnSubmit = slots.every((s) => {
      const placedChip = chips.find((c) => c.id === placement[s.id]);
      return placedChip?.correctSlot === s.id;
    });
    if (allCorrectOnSubmit) onCorrect?.();
  };

  const reset = () => {
    setPlacement({});
    setPickedChip(null);
    setSubmitted(false);
  };

  const allCorrect = slots.every((s) => {
    const placedChip = chips.find((c) => c.id === placement[s.id]);
    return placedChip?.correctSlot === s.id;
  });

  return (
    <div className="space-y-4">
      <p className="text-sm text-slate-300">{question}</p>

      {/* 数式テンプレート */}
      <div className="rounded-xl bg-slate-950/70 border border-slate-800 p-4 sm:p-5 overflow-x-auto">
        <div className="flex items-center justify-center gap-1.5 sm:gap-2 text-base sm:text-xl font-detective text-slate-100 flex-wrap">
          {segments.map((seg, i) => {
            if (seg.kind === 'text') return <span key={i}>{seg.text}</span>;
            if (seg.kind === 'op')
              return (
                <span key={i} className="text-amber-accent text-lg sm:text-2xl">
                  {seg.op}
                </span>
              );
            // slot
            const placedChipId = placement[seg.id];
            const placedChip = chips.find((c) => c.id === placedChipId);
            const isCorrect = submitted && placedChip?.correctSlot === seg.id;
            const isWrong = submitted && placedChip && placedChip.correctSlot !== seg.id;
            return (
              <button
                key={i}
                onClick={() => placeChip(seg.id)}
                disabled={submitted}
                className={`min-w-[80px] sm:min-w-[110px] h-10 sm:h-12 rounded-lg border-2 border-dashed text-sm sm:text-base px-2 transition ${
                  isCorrect
                    ? 'bg-emerald-900/40 border-emerald-500 text-emerald-100'
                    : isWrong
                    ? 'bg-rose-900/40 border-rose-500 text-rose-100'
                    : placedChip
                    ? 'bg-amber-accent/15 border-amber-accent text-amber-100'
                    : pickedChip
                    ? 'border-amber-accent/60 bg-slate-900 text-slate-400 animate-pulse'
                    : 'border-slate-700 bg-slate-900 text-slate-500'
                }`}
              >
                {placedChip ? placedChip.label : 'ここに置く'}
              </button>
            );
          })}
        </div>
      </div>

      {/* チップ置き場 */}
      {!submitted && (
        <div className="rounded-xl bg-slate-900/60 border border-slate-800 p-3">
          <div className="text-[11px] text-slate-500 mb-2">
            ↓ 使う数字を選んで、上の枠をタップして置く
          </div>
          <div className="flex flex-wrap gap-2">
            {availableChips.length === 0 && (
              <div className="text-xs text-slate-500 italic py-1">すべて配置済み</div>
            )}
            {availableChips.map((chip) => (
              <button
                key={chip.id}
                onClick={() => pickChip(chip.id)}
                className={`px-3 py-2 rounded-lg text-sm font-semibold transition ${
                  pickedChip === chip.id
                    ? 'bg-amber-accent text-slate-900 ring-2 ring-amber-accent/40 scale-105'
                    : 'bg-slate-800 text-slate-100 hover:bg-slate-700'
                }`}
              >
                {chip.label}
              </button>
            ))}
          </div>
        </div>
      )}

      {!submitted ? (
        <div className="flex gap-2">
          <button
            onClick={submit}
            disabled={!allSlotsFilled}
            className="flex-1 px-4 py-3 rounded-xl bg-gradient-to-r from-amber-accent to-yellow-600 text-slate-900 font-bold disabled:opacity-40 active:scale-95 transition"
          >
            この式で確定する
          </button>
          {Object.keys(placement).length > 0 && (
            <button
              onClick={() => {
                setPlacement({});
                setPickedChip(null);
              }}
              className="px-4 py-3 rounded-xl bg-slate-800 text-slate-300 text-sm"
            >
              全消し
            </button>
          )}
        </div>
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
              {allCorrect ? '✓ 正解' : '× 間違い'}
            </div>
            <p className="text-sm leading-relaxed">
              {allCorrect ? successFeedback : failFeedback}
            </p>
            {!allCorrect && (
              <button
                onClick={reset}
                className="mt-3 px-3 py-1.5 rounded bg-slate-800 text-slate-200 text-xs"
              >
                もう一度組み立てる
              </button>
            )}
          </motion.div>
        </AnimatePresence>
      )}
    </div>
  );
}
