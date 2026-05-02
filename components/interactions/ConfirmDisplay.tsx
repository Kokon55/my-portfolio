'use client';

import { useState, ReactNode } from 'react';
import { motion } from 'framer-motion';

// 「表示するだけ」のインタラクション(プロフィール表示・グラフ確認など)を
// ラップして「確認した」ボタンを付ける。
// プレイヤーがボタンを押すまで「次へ」ボタンが解錠されない。
export default function ConfirmDisplay({
  children,
  onCorrect,
  confirmLabel = '確認した',
}: {
  children: ReactNode;
  onCorrect?: () => void;
  confirmLabel?: string;
}) {
  const [confirmed, setConfirmed] = useState(false);

  const confirm = () => {
    setConfirmed(true);
    onCorrect?.();
  };

  return (
    <div className="space-y-3">
      {children}
      {!confirmed ? (
        <button
          onClick={confirm}
          className="w-full px-4 py-3 rounded-xl bg-gradient-to-r from-amber-accent to-yellow-600 text-slate-900 font-bold active:scale-95 transition shadow-lg shadow-amber-500/20"
        >
          ✓ {confirmLabel}
        </button>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full px-4 py-2.5 rounded-xl bg-emerald-950/30 border border-emerald-700/40 text-emerald-200 text-center text-sm"
        >
          ✓ 確認済み
        </motion.div>
      )}
    </div>
  );
}
