'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import ClientAvatar from './ClientAvatar';
import type { ClientCharacter } from '@/content/cases/types';

type Speaker = 'client' | 'narrator' | 'detective' | 'player';

type Props = {
  speaker?: Speaker;
  client?: ClientCharacter;
  text: string;
  // タイプライター効果
  typewriter?: boolean;
};

const speakerLabel: Record<Speaker, string> = {
  client: '依頼人',
  narrator: 'ナレーション',
  detective: 'データ探偵',
  player: 'あなた',
};

const speakerColor: Record<Speaker, string> = {
  client: 'border-amber-accent',
  narrator: 'border-slate-500',
  detective: 'border-amber-accent',
  player: 'border-emerald-500',
};

export default function DialogueBox({
  speaker = 'narrator',
  client,
  text,
  typewriter = true,
}: Props) {
  const [displayed, setDisplayed] = useState(typewriter ? '' : text);
  const [done, setDone] = useState(!typewriter);

  useEffect(() => {
    if (!typewriter) {
      setDisplayed(text);
      setDone(true);
      return;
    }
    setDisplayed('');
    setDone(false);
    let i = 0;
    const id = setInterval(() => {
      i++;
      setDisplayed(text.slice(0, i));
      if (i >= text.length) {
        clearInterval(id);
        setDone(true);
      }
    }, 22);
    return () => clearInterval(id);
  }, [text, typewriter]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      className={`relative rounded-2xl border-l-4 ${speakerColor[speaker]} bg-slate-900/70 backdrop-blur-sm p-4 sm:p-5 shadow-xl`}
    >
      <div className="flex items-start gap-3">
        {speaker === 'client' && client && (
          <div className="shrink-0">
            <ClientAvatar client={client} size={56} speaking={!done} />
          </div>
        )}
        {speaker === 'detective' && (
          <div className="shrink-0 w-14 h-14 rounded-full bg-gradient-to-br from-amber-accent to-yellow-700 flex items-center justify-center text-slate-900 font-bold text-lg font-detective">
            探
          </div>
        )}
        <div className="flex-1 min-w-0">
          <div className="text-xs uppercase tracking-widest text-amber-accent/80 mb-1">
            {speaker === 'client' && client ? `${client.name} (${client.occupation})` : speakerLabel[speaker]}
          </div>
          <p className="dialog-text text-slate-100 whitespace-pre-line text-sm sm:text-base">
            {displayed}
            {!done && <span className="inline-block w-2 h-4 bg-amber-accent/70 ml-0.5 animate-pulse-slow align-middle" />}
          </p>
        </div>
      </div>
    </motion.div>
  );
}
