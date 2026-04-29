'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { mean, engagementRate, toPct } from '@/lib/stats';
import type { InfluencerData } from '@/content/cases/types';

export default function EngagementCalc({ influencers }: { influencers: InfluencerData[] }) {
  const [revealed, setRevealed] = useState(false);

  return (
    <div className="space-y-3">
      <div className="grid sm:grid-cols-2 gap-3">
        {influencers.map((inf) => {
          const avgLikes = mean(inf.posts.map((p) => p.likes));
          const er = engagementRate(avgLikes, inf.followers);
          return (
            <div key={inf.handle} className="rounded-xl bg-slate-950/80 border border-slate-800 p-4">
              <div className="text-xs text-slate-500">{inf.handle}</div>
              <div className="font-semibold text-slate-100 mb-2">{inf.displayName}</div>
              <Row k="フォロワー" v={inf.followers.toLocaleString()} />
              <Row k="平均いいね" v={Math.round(avgLikes).toLocaleString()} />
              <div className="border-t border-slate-800 my-2" />
              <Row
                k="エンゲージ率"
                v={revealed ? toPct(er, 1) : '???'}
                highlight={revealed}
              />
            </div>
          );
        })}
      </div>
      {!revealed && (
        <button
          onClick={() => setRevealed(true)}
          className="w-full px-4 py-3 rounded-xl bg-amber-accent text-slate-900 font-bold active:scale-95 transition"
        >
          🔍 エンゲージ率を計算する
        </button>
      )}
      {revealed && (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-xl bg-amber-950/30 border border-amber-700/40 p-3 text-sm text-amber-100"
        >
          見かけのエンゲージ率では、フォロワーの少ない方が「2倍」効率が良い。だがこれはまだ「見かけ」だ。本当の罠は次にある。
        </motion.div>
      )}
    </div>
  );
}

function Row({ k, v, highlight }: { k: string; v: string; highlight?: boolean }) {
  return (
    <div className="flex justify-between text-sm py-0.5">
      <span className="text-slate-400">{k}</span>
      <span className={highlight ? 'text-amber-accent font-bold' : 'text-slate-100'}>{v}</span>
    </div>
  );
}
