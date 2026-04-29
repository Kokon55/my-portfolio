'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';

export default function PaywallModal({ caseTitle }: { caseTitle: string }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="fixed inset-0 bg-slate-950/85 backdrop-blur-sm z-50 flex items-center justify-center p-4"
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0, y: 12 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        className="bg-gradient-to-br from-slate-900 to-slate-950 border border-amber-accent/40 rounded-2xl p-6 max-w-md w-full shadow-2xl"
      >
        <div className="text-amber-accent text-3xl font-detective text-center mb-2">🔒</div>
        <h3 className="font-detective text-xl text-center text-slate-100 mb-1">事件はここから核心へ</h3>
        <p className="text-sm text-slate-400 text-center mb-4">
          「{caseTitle}」の捜査・推理・解決パートはこの先。
        </p>

        <ul className="space-y-2 text-sm text-slate-200 mb-5">
          <li>✓ 全6ケース永久アクセス(うち2件プレイ可、4件追加予定)</li>
          <li>✓ 全推理パート + 修了証PDF</li>
          <li>✓ 早期割引価格 1,980円(通常 2,480円)</li>
        </ul>

        <Link
          href="/purchase"
          className="block w-full px-4 py-3 rounded-xl bg-gradient-to-r from-amber-accent to-yellow-600 text-slate-900 font-bold text-center active:scale-95"
        >
          全ての事件を解放する
        </Link>
        <Link href="/" className="block text-center text-xs text-slate-500 mt-3 hover:text-slate-300">
          ケース一覧に戻る
        </Link>
      </motion.div>
    </motion.div>
  );
}
