'use client';

import { useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { findCase } from '@/content/cases';
import DetectiveBadge from '@/components/ui/DetectiveBadge';
import { useDetectiveStore } from '@/lib/store';

export default function ResultPage() {
  const params = useParams();
  const router = useRouter();
  const caseId = params.caseId as string;
  const caseDef = findCase(caseId);
  const acquiredBadges = useDetectiveStore((s) => s.acquiredBadges);
  const solvedCases = useDetectiveStore((s) => s.solvedCases);

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
          <div className="text-xs text-slate-500 mb-2">獲得バッジ {acquiredBadges.length} 個 / 解決ケース {solvedCases.length} 件</div>
          <div className="flex flex-wrap gap-3 justify-center">
            {acquiredBadges.map((b) => (
              <DetectiveBadge key={b.id} badge={b} size="sm" />
            ))}
          </div>
        </div>

        <div className="grid sm:grid-cols-2 gap-3">
          <a
            href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-3 rounded-xl bg-slate-800 text-slate-100 font-semibold text-center hover:bg-slate-700"
          >
            🚀 結果をシェア
          </a>
          <Link
            href="/"
            className="px-4 py-3 rounded-xl bg-amber-accent text-slate-900 font-bold text-center active:scale-95"
          >
            次の事件へ
          </Link>
        </div>
      </div>
    </main>
  );
}
