'use client';

import { motion } from 'framer-motion';
import type { DetectiveBadge as Badge } from '@/lib/store';

export default function DetectiveBadge({ badge, size = 'md' }: { badge: Badge; size?: 'sm' | 'md' | 'lg' }) {
  const px = size === 'sm' ? 56 : size === 'lg' ? 120 : 80;
  return (
    <motion.div
      initial={{ rotate: -8, scale: 0.8, opacity: 0 }}
      animate={{ rotate: 0, scale: 1, opacity: 1 }}
      transition={{ type: 'spring', stiffness: 220, damping: 14 }}
      className="inline-flex flex-col items-center gap-2"
    >
      <div
        className="relative rounded-full bg-gradient-to-br from-amber-accent via-yellow-600 to-amber-700 flex items-center justify-center shadow-lg shadow-amber-500/30 ring-4 ring-amber-300/20"
        style={{ width: px, height: px }}
      >
        <div className="absolute inset-2 rounded-full border-2 border-slate-900/40" />
        <div className="text-slate-900 font-detective text-center">
          <div className="text-[10px] uppercase tracking-wider">DATA</div>
          <div className="font-bold text-base leading-none">{badge.rank}</div>
          <div className="text-[10px]">DETECTIVE</div>
        </div>
      </div>
      <div className="text-center">
        <div className="font-detective font-bold text-amber-accent">{badge.name}</div>
        <div className="text-[10px] text-slate-500">{badge.description}</div>
      </div>
    </motion.div>
  );
}
