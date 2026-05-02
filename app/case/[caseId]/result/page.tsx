'use client';

import { useEffect, useMemo } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import cases, { findCase } from '@/content/cases';
import DetectiveBadge from '@/components/ui/DetectiveBadge';
import { useDetectiveStore } from '@/lib/store';

export default function ResultPage() {
  const params = useParams();
  const router = useRouter();
  const caseId = params.caseId as string;
  const caseDef = findCase(caseId);
  const acquiredBadges = useDetectiveStore((s) => s.acquiredBadges);
  const solvedCases = useDetectiveStore((s) => s.solvedCases);

  // 次のケース ID を求める(プレイ可能ケースの順序で次)
  const nextCase = useMemo(() => {
    const playable = cases.filter((c) => !c.comingSoon);
    const idx = playable.findIndex((c) => c.id === caseId);
    if (idx < 0 || idx >= playable.length - 1) return null;
    return playable[idx + 1];
  }, [caseId]);

  const playableCount = cases.filter((c) => !c.comingSoon).length;
  const allSolved = solvedCases.length >= playableCount;

  useEffect(() => {
    if (!caseDef) router.push('/');
  }, [caseDef, router]);

  if (!caseDef) return null;

  const shareText = `「${caseDef.title} - ${caseDef.subtitle}」を解決しました! データ探偵 SNS編 #データ探偵`;

  return (
    <main className="min-h-screen bg-paper">
      <div className="max-w-2xl mx-auto px-4 py-12 space-y-8">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <div className="text-[11px] text-slate-500 uppercase tracking-widest">事件解決</div>
          <h1 className="font-detective text-3xl text-amber-accent mt-1">{caseDef.title}</h1>
          <p className="text-sm text-slate-400">— {caseDef.subtitle}</p>
        </motion.div>

        <div className="flex justify-center">
          <DetectiveBadge badge={caseDef.badge} size="lg" />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="rounded-2xl border border-slate-800 bg-slate-950/60 p-5"
        >
          <div className="text-xs text-amber-accent uppercase tracking-widest mb-3">
            🎯 あなたが今、できるようになったこと
          </div>
          <ul className="space-y-2">
            {caseDef.acquiredSkills.map((s, i) => (
              <motion.li
                key={i}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6 + i * 0.1 }}
                className="flex gap-2 text-sm text-slate-200"
              >
                <span className="text-emerald-400">✓</span>
                <span>{s}</span>
              </motion.li>
            ))}
          </ul>
        </motion.div>

        <div className="rounded-2xl border border-slate-800 bg-slate-950/40 p-4 text-center">
          <div className="text-xs text-slate-500 mb-2">
            獲得バッジ {acquiredBadges.length} 個 / 解決ケース {solvedCases.length} 件
          </div>
          <div className="flex flex-wrap gap-3 justify-center">
            {acquiredBadges.map((b) => (
              <DetectiveBadge key={b.id} badge={b} size="sm" />
            ))}
          </div>
        </div>

        {/* メイン動線:次のケースへ進む(あれば) */}
        <div className="space-y-3">
          {nextCase ? (
            <Link
              href={`/case/${nextCase.id}`}
              className="block w-full px-4 py-4 rounded-2xl bg-gradient-to-r from-amber-accent to-yellow-600 text-slate-900 font-bold text-center text-lg active:scale-95 transition shadow-xl shadow-amber-500/30"
            >
              ▶ 次の事件へ:「{nextCase.title}」
            </Link>
          ) : (
            <div className="rounded-2xl border-2 border-amber-accent/50 bg-gradient-to-br from-amber-950/40 to-slate-950 p-5 text-center">
              <div className="text-3xl mb-2">🏆</div>
              <div className="font-detective text-xl text-amber-accent mb-1">
                {allSolved ? '完全制覇' : '現時点で公開中の事件をすべて解決'}
              </div>
              <p className="text-xs text-slate-300 mt-1">
                次の事件は順次追加されます。お疲れさまでした。
              </p>
            </div>
          )}

          <div className="grid grid-cols-2 gap-2">
            <a
              href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 py-2.5 rounded-xl bg-slate-800 text-slate-200 text-sm font-semibold text-center hover:bg-slate-700"
            >
              🚀 結果をシェア
            </a>
            <Link
              href="/"
              className="px-3 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-slate-300 text-sm text-center hover:bg-slate-800"
            >
              タイトルへ戻る
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
