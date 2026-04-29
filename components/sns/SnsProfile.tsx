'use client';

import { motion } from 'framer-motion';
import type { SnsProfile as Profile } from '@/content/cases/types';

const platformStyle: Record<Profile['platform'], { name: string; color: string; logo: string }> = {
  Fluttr: { name: 'Fluttr', color: 'from-sky-400 to-cyan-300', logo: 'F' },
  Picgrm: { name: 'Picgrm', color: 'from-pink-400 via-fuchsia-500 to-amber-400', logo: 'P' },
  ToTok: { name: 'ToTok', color: 'from-rose-500 to-cyan-400', logo: 'T' },
  Vutube: { name: 'Vutube', color: 'from-red-500 to-red-700', logo: 'V' },
};

const fmt = (n: number): string => {
  if (n >= 10000) return `${(n / 10000).toFixed(n >= 100000 ? 0 : 1)}万`;
  if (n >= 1000) return `${(n / 1000).toFixed(1)}K`;
  return String(n);
};

export default function SnsProfile({ profile }: { profile: Profile }) {
  const style = platformStyle[profile.platform];
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.97 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4 }}
      className="rounded-2xl overflow-hidden border border-slate-700 bg-slate-900 shadow-2xl max-w-md mx-auto"
    >
      {/* 上部バー(架空SNS) */}
      <div className="flex items-center justify-between px-4 py-2 bg-slate-950 border-b border-slate-800">
        <div className="flex items-center gap-2">
          <div className={`w-7 h-7 rounded-md bg-gradient-to-br ${style.color} flex items-center justify-center font-bold text-slate-900`}>
            {style.logo}
          </div>
          <span className="text-sm font-semibold text-slate-200">{style.name}</span>
        </div>
        <div className="text-xs text-slate-500">※ 架空のSNSサービスです</div>
      </div>

      {/* カバー */}
      <div className={`h-20 sm:h-24 bg-gradient-to-r ${style.color}`} />

      {/* プロフィール */}
      <div className="px-5 pb-5 -mt-10">
        <div className="w-20 h-20 rounded-full bg-slate-700 border-4 border-slate-900 flex items-center justify-center text-3xl font-detective text-slate-300">
          {profile.displayName.charAt(0)}
        </div>
        <div className="mt-2 flex items-center gap-1">
          <h3 className="text-lg font-bold text-slate-100">{profile.displayName}</h3>
          {profile.verified && (
            <span className="text-amber-accent text-sm" title="認証済み">✓</span>
          )}
        </div>
        <div className="text-sm text-slate-400">{profile.handle}</div>
        <p className="mt-2 text-sm text-slate-300 whitespace-pre-line">{profile.bio}</p>

        <div className="mt-4 grid grid-cols-3 gap-2 text-center">
          <Stat label="フォロワー" value={fmt(profile.followers)} highlight />
          <Stat label="フォロー中" value={fmt(profile.following)} />
          <Stat label="投稿" value={fmt(profile.posts)} />
        </div>
      </div>
    </motion.div>
  );
}

function Stat({ label, value, highlight }: { label: string; value: string; highlight?: boolean }) {
  return (
    <div className="rounded-lg bg-slate-950/70 px-2 py-2">
      <div className={`text-base sm:text-lg font-bold ${highlight ? 'text-amber-accent glow-amber' : 'text-slate-100'}`}>
        {value}
      </div>
      <div className="text-[11px] text-slate-500 tracking-wide">{label}</div>
    </div>
  );
}
