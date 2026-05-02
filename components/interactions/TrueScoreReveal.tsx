'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { mean } from '@/lib/stats';
import type { InfluencerData } from '@/content/cases/types';

export default function TrueScoreReveal({ influencers }: { influencers: InfluencerData[] }) {
  const [revealed, setRevealed] = useState(false);

  const computed = influencers.map((inf) => {
    const avgLikes = mean(inf.posts.map((p) => p.likes));
    const realFollowers = Math.round(inf.followers * (1 - inf.botRatio));
    const realLikes = Math.round(avgLikes * (1 - inf.botRatio * 0.95));
    const apparentRate = avgLikes / inf.followers;
    const realRate = realFollowers > 0 ? realLikes / realFollowers : 0;
    return { inf, avgLikes, realFollowers, realLikes, apparentRate, realRate };
  });

  const maxRealRate = Math.max(...computed.map((c) => c.realRate), 0.001);

  return (
    <div className="space-y-3">
      {/* 統合比較テーブル */}
      <div className="rounded-xl bg-slate-950/70 border border-slate-800 overflow-hidden">
        <table className="w-full text-xs sm:text-sm">
          <thead>
            <tr className="bg-slate-900/80 text-[11px] text-slate-400 uppercase tracking-widest">
              <th className="px-2 py-2 text-left font-normal">指標</th>
              {computed.map((c, idx) => (
                <th
                  key={c.inf.handle}
                  className="px-2 py-2 text-right font-semibold"
                  style={{ color: idx === 0 ? '#3b82f6' : '#f59e0b' }}
                >
                  {c.inf.displayName}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="text-slate-200">
            <tr className="border-t border-slate-800">
              <td className="px-2 py-1.5 text-slate-400">表示フォロワー</td>
              {computed.map((c) => (
                <td key={c.inf.handle} className="px-2 py-1.5 text-right">
                  {c.inf.followers.toLocaleString()}
                </td>
              ))}
            </tr>
            <tr className="border-t border-slate-800">
              <td className="px-2 py-1.5 text-slate-400">表示エンゲージ率</td>
              {computed.map((c) => (
                <td key={c.inf.handle} className="px-2 py-1.5 text-right text-slate-500 line-through">
                  {(c.apparentRate * 100).toFixed(1)}%
                </td>
              ))}
            </tr>
            {revealed && (
              <>
                <tr className="border-t border-rose-900/40 bg-rose-950/20">
                  <td className="px-2 py-1.5 text-rose-300">bot 比率</td>
                  {computed.map((c) => (
                    <td
                      key={c.inf.handle}
                      className={`px-2 py-1.5 text-right font-semibold ${
                        c.inf.botRatio > 0.3 ? 'text-rose-400' : 'text-emerald-300'
                      }`}
                    >
                      {(c.inf.botRatio * 100).toFixed(0)}%
                    </td>
                  ))}
                </tr>
                <tr className="border-t border-slate-800">
                  <td className="px-2 py-1.5 text-slate-400">実フォロワー(bot除く)</td>
                  {computed.map((c) => (
                    <td key={c.inf.handle} className="px-2 py-1.5 text-right">
                      {c.realFollowers.toLocaleString()}
                    </td>
                  ))}
                </tr>
                <tr className="border-t border-amber-700/40 bg-amber-950/20">
                  <td className="px-2 py-1.5 text-amber-accent font-semibold">真のエンゲージ率</td>
                  {computed.map((c) => (
                    <td
                      key={c.inf.handle}
                      className="px-2 py-1.5 text-right font-bold text-amber-accent text-base"
                    >
                      {(c.realRate * 100).toFixed(1)}%
                    </td>
                  ))}
                </tr>
              </>
            )}
          </tbody>
        </table>
      </div>

      {!revealed ? (
        <button
          onClick={() => setRevealed(true)}
          className="w-full px-4 py-3 rounded-xl bg-gradient-to-r from-rose-600 to-rose-700 text-white font-bold active:scale-95 transition"
        >
          🔓 bot を除いて、真の数字を暴く
        </button>
      ) : (
        <>
          {/* 比較バー */}
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-xl bg-slate-950/70 border border-slate-800 p-4"
          >
            <div className="text-[11px] text-slate-500 mb-2">
              真の影響力(bot を除いた実エンゲージ率)
            </div>
            <div className="space-y-3">
              {computed.map((c, idx) => (
                <div key={c.inf.handle}>
                  <div className="flex justify-between text-xs mb-1">
                    <span style={{ color: idx === 0 ? '#3b82f6' : '#f59e0b' }} className="font-semibold">
                      {c.inf.displayName}
                    </span>
                    <span className="font-bold text-amber-accent">
                      {(c.realRate * 100).toFixed(1)}%
                    </span>
                  </div>
                  <div className="h-4 rounded-full bg-slate-800 overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${(c.realRate / maxRealRate) * 100}%` }}
                      transition={{ duration: 0.9, delay: idx * 0.2 }}
                      className="h-full rounded-full"
                      style={{ backgroundColor: idx === 0 ? '#3b82f6' : '#f59e0b' }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="rounded-xl bg-rose-950/30 border border-rose-800/60 p-4 text-sm text-rose-100 leading-relaxed"
          >
            <strong className="text-amber-accent">真相:</strong> Aurora の真エンゲージ率は2%以下、みなりは10%。
            みなりが Aurora の <b>3倍以上</b> 影響力がある。フォロワー10万という数字に、500万円が吸い込まれた。
          </motion.div>
        </>
      )}
    </div>
  );
}
