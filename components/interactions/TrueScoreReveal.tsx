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
    const realLikes = Math.round(avgLikes * (1 - inf.botRatio * 0.95)); // bot もごく一部は反応する設定
    const apparentRate = avgLikes / inf.followers;
    const realRate = realFollowers > 0 ? realLikes / realFollowers : 0;
    return { inf, avgLikes, realFollowers, realLikes, apparentRate, realRate };
  });

  return (
    <div className="space-y-3">
      <div className="grid sm:grid-cols-2 gap-3">
        {computed.map(({ inf, avgLikes, realFollowers, realLikes, apparentRate, realRate }) => (
          <div key={inf.handle} className="rounded-xl bg-slate-950/80 border border-slate-800 p-4 space-y-1.5">
            <div className="font-semibold text-slate-100">{inf.displayName}</div>
            <Row k="表示フォロワー" v={inf.followers.toLocaleString()} />
            <Row k="表示エンゲージ率" v={`${(apparentRate * 100).toFixed(1)}%`} muted />
            {revealed && (
              <>
                <div className="border-t border-rose-900/40 my-2" />
                <Row k="bot 比率" v={`${(inf.botRatio * 100).toFixed(0)}%`} bad={inf.botRatio > 0.3} />
                <Row k="実フォロワー" v={realFollowers.toLocaleString()} />
                <Row
                  k="真のエンゲージ率"
                  v={`${(realRate * 100).toFixed(1)}%`}
                  highlight
                />
              </>
            )}
          </div>
        ))}
      </div>

      {!revealed ? (
        <button
          onClick={() => setRevealed(true)}
          className="w-full px-4 py-3 rounded-xl bg-gradient-to-r from-rose-600 to-rose-700 text-white font-bold active:scale-95 transition"
        >
          🔓 bot を除いて、真の数字を暴く
        </button>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-xl bg-rose-950/30 border border-rose-800/60 p-4 text-sm text-rose-100 leading-relaxed"
        >
          <strong className="text-amber-accent">真相:</strong> Aurora の真エンゲージ率は2%以下、みなりは10%。みなりが Aurora の <b>3倍以上</b> 影響力がある。フォロワー10万という数字に、500万円が吸い込まれた。
        </motion.div>
      )}
    </div>
  );
}

function Row({ k, v, muted, highlight, bad }: { k: string; v: string; muted?: boolean; highlight?: boolean; bad?: boolean }) {
  return (
    <div className="flex justify-between text-sm">
      <span className="text-slate-400">{k}</span>
      <span className={
        highlight ? 'text-amber-accent font-bold' :
        bad ? 'text-rose-400 font-semibold' :
        muted ? 'text-slate-500 line-through' : 'text-slate-100'
      }>{v}</span>
    </div>
  );
}
