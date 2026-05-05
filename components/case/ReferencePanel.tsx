'use client';

import { useState } from 'react';
import dynamic from 'next/dynamic';
import { motion, AnimatePresence } from 'framer-motion';
import type { ReferenceData } from '@/content/cases/types';

const BlockMath = dynamic(() => import('react-katex').then((m) => m.BlockMath), { ssr: false });

// インタラクティブステップで「考えるための元データ」を常時参照できるパネル。
// - デスクトップ(md以上): 上部に sticky で配置(ヘッダー直下に追従)
// - モバイル(md未満): 画面下部に固定タブとして配置、開閉トグルで畳める
// - data が未指定でも、直近 mini_lesson の公式があれば fallbackFormula として表示する
export default function ReferencePanel({
  data,
  fallbackFormula,
}: {
  data?: ReferenceData;
  fallbackFormula?: { formula: string; meaning?: string } | null;
}) {
  // フォールバック公式は明示指定が無いときだけ採用する
  const formula = data?.formula ?? fallbackFormula?.formula;
  const isFallback = !data?.formula && !!fallbackFormula?.formula;

  const stats = data?.stats;
  const note = data?.note;
  const meaning = isFallback ? fallbackFormula?.meaning : undefined;

  const hasContent = (stats && stats.length > 0) || !!formula || !!note;
  if (!hasContent) return null;

  return (
    <>
      {/* デスクトップ: 上部 sticky */}
      <div className="hidden md:block sticky top-[80px] z-20">
        <PanelBody
          stats={stats}
          formula={formula}
          meaning={meaning}
          isFallback={isFallback}
          note={note}
          variant="desktop"
        />
      </div>

      {/* モバイル: 下部固定タブ */}
      <div className="md:hidden fixed bottom-[64px] inset-x-0 z-40 px-2">
        <PanelBody
          stats={stats}
          formula={formula}
          meaning={meaning}
          isFallback={isFallback}
          note={note}
          variant="mobile"
        />
      </div>
    </>
  );
}

function PanelBody({
  stats,
  formula,
  meaning,
  isFallback,
  note,
  variant,
}: {
  stats?: { label: string; value: string; highlight?: boolean }[];
  formula?: string;
  meaning?: string;
  isFallback?: boolean;
  note?: string;
  variant: 'desktop' | 'mobile';
}) {
  // モバイルは画面占有を抑えるためデフォルト閉じ、デスクトップは開く
  const [open, setOpen] = useState(variant === 'desktop');

  return (
    <div className="rounded-xl border border-blue-700/50 bg-slate-950/95 backdrop-blur-md shadow-lg shadow-blue-900/30 overflow-hidden">
      <button
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center justify-between px-3 py-2 text-left bg-blue-950/40 hover:bg-blue-950/60 transition"
        aria-expanded={open}
      >
        <span className="text-xs font-bold text-blue-200 tracking-wide">
          📊 参考データ{' '}
          {!open && stats && stats.length > 0 && (
            <span className="text-blue-400/70 font-normal">({stats.length}件)</span>
          )}
        </span>
        <span className="text-[10px] text-blue-300/70">{open ? '▼ 閉じる' : '▲ 開く'}</span>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div
              className={`px-3 py-3 space-y-2 ${
                variant === 'mobile' ? 'max-h-[40vh] overflow-y-auto' : ''
              }`}
            >
              {stats && stats.length > 0 && (
                <div className="grid grid-cols-2 gap-1.5">
                  {stats.map((s, i) => (
                    <div
                      key={`${s.label}-${i}`}
                      className={`rounded-lg px-2.5 py-1.5 ${
                        s.highlight
                          ? 'bg-amber-950/30 border border-amber-700/50'
                          : 'bg-slate-900/70 border border-slate-700/50'
                      }`}
                    >
                      <div className="text-[10px] text-slate-400 leading-tight">{s.label}</div>
                      <div
                        className={`font-bold leading-tight ${
                          s.highlight
                            ? 'text-amber-accent text-base'
                            : 'text-slate-100 text-sm'
                        }`}
                      >
                        {s.value}
                      </div>
                    </div>
                  ))}
                </div>
              )}
              {formula && (
                <div className="rounded-lg bg-slate-900/80 border border-slate-700/50 px-2 py-2 overflow-x-auto">
                  <div className="text-[10px] text-slate-500 mb-0.5 flex items-center gap-1">
                    <span>{isFallback ? '直近の公式' : '公式'}</span>
                    {isFallback && (
                      <span className="text-blue-300/70 text-[9px]">(直前の道具を参照)</span>
                    )}
                  </div>
                  <BlockMath math={formula} />
                  {meaning && (
                    <p className="text-[11px] text-amber-100/90 mt-1 leading-relaxed">
                      {meaning}
                    </p>
                  )}
                </div>
              )}
              {note && (
                <p className="text-[11px] text-slate-300 leading-relaxed">{note}</p>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
