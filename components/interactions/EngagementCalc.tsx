'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { mean, engagementRate, toPct } from '@/lib/stats';
import type { InfluencerData } from '@/content/cases/types';

// A vs B を 1 つの比較テーブル + 横棒グラフで一画面に。
export default function EngagementCalc({ influencers }: { influencers: InfluencerData[] }) {
  const [revealed, setRevealed] = useState(false);

  const rows = influencers.map((inf) => {
    const avgLikes = mean(inf.posts.map((p) => p.likes));
    const er = engagementRate(avgLikes, inf.followers);
    return { inf, avgLikes, er };
  });

  const maxEr = Math.max(...rows.map((r) => r.er));

  return (
    <div className="space-y-3">
      {/* 比較テーブル(1つにまとまる) */}
      <div className="rounded-xl bg-slate-950/70 border border-slate-800 overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-slate-900/80 text-[11px] text-slate-400 uppercase tracking-widest">
              <th className="px-3 py-2 text-left font-normal">指標</th>
              {rows.map((r, idx) => (
                <th
                  key={r.inf.handle}
                  className="px-3 py-2 text-right font-semibold"
                  style={{ color: idx === 0 ? '#3b82f6' : '#f59e0b' }}
                >
                  {r.inf.displayName}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="text-slate-200">
            <tr className="border-t border-slate-800">
              <td className="px-3 py-2 text-slate-400">フォロワー</td>
              {rows.map((r) => (
                <td key={r.inf.handle} className="px-3 py-2 text-right font-semibold">
                  {r.inf.followers.toLocaleString()}
                </td>
              ))}
            </tr>
            <tr className="border-t border-slate-800">
              <td className="px-3 py-2 text-slate-400">平均いいね</td>
              {rows.map((r) => (
                <td key={r.inf.handle} className="px-3 py-2 text-right font-semibold">
                  {Math.round(r.avgLikes).toLocaleString()}
                </td>
              ))}
            </tr>
            <tr className="border-t border-slate-800 bg-amber-950/20">
              <td className="px-3 py-2 text-amber-accent font-semibold">エンゲージ率</td>
              {rows.map((r) => (
                <td
                  key={r.inf.handle}
                  className={`px-3 py-2 text-right font-bold ${
                    revealed ? 'text-amber-accent' : 'text-slate-600'
                  }`}
                >
                  {revealed ? toPct(r.er, 1) : '???'}
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>

      {/* 計算ボタン */}
      {!revealed && (
        <button
          onClick={() => setRevealed(true)}
          className="w-full px-4 py-3 rounded-xl bg-gradient-to-r from-amber-accent to-yellow-600 text-slate-900 font-bold active:scale-95 transition"
        >
          🔍 エンゲージ率を計算して比較する
        </button>
      )}

      {/* 比較バー(同じ画面で長さで比較) */}
      {revealed && (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-xl bg-slate-950/70 border border-slate-800 p-4"
        >
          <div className="text-[11px] text-slate-500 mb-2">エンゲージ率の比較</div>
          <div className="space-y-3">
            {rows.map((r, idx) => (
              <div key={r.inf.handle}>
                <div className="flex justify-between text-xs mb-1">
                  <span style={{ color: idx === 0 ? '#3b82f6' : '#f59e0b' }} className="font-semibold">
                    {r.inf.displayName}
                  </span>
                  <span className="font-bold text-amber-accent">{toPct(r.er, 2)}</span>
                </div>
                <div className="h-3 rounded-full bg-slate-800 overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${(r.er / maxEr) * 100}%` }}
                    transition={{ duration: 0.8, delay: idx * 0.15 }}
                    className="h-full rounded-full"
                    style={{
                      backgroundColor: idx === 0 ? '#3b82f6' : '#f59e0b',
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
          <p className="mt-3 text-sm text-amber-100 bg-amber-950/30 border border-amber-700/40 rounded p-2">
            見かけのエンゲージ率では、フォロワーの少ない方が「2倍」効率が良い。だがこれはまだ「見かけ」だ。本当の罠は次の幕にある。
          </p>
        </motion.div>
      )}
    </div>
  );
}
