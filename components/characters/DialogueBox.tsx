'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import ClientAvatar from './ClientAvatar';
import PixelPortrait, { Expression } from './PixelPortrait';
import type { ClientCharacter } from '@/content/cases/types';

type Speaker = 'client' | 'narrator' | 'detective' | 'player';

type Props = {
  speaker?: Speaker;
  client?: ClientCharacter;
  text: string;
  expression?: Expression;
  showLargePortrait?: boolean;
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
  expression,
  showLargePortrait = false,
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
    // 14ms / char(以前は 22ms)で約 1.6 倍速化
    const id = setInterval(() => {
      i++;
      setDisplayed(text.slice(0, i));
      if (i >= text.length) {
        clearInterval(id);
        setDone(true);
      }
    }, 14);
    return () => clearInterval(id);
  }, [text, typewriter]);

  // 吹き出しタップで残りを一気に表示
  const skipToEnd = () => {
    if (done) return;
    setDisplayed(text);
    setDone(true);
  };

  const showsClient = speaker === 'client' && client;
  const showsDetective = speaker === 'detective';

  return (
    <div className="space-y-3">
      {/* 大型ポートレート(showLargePortrait のとき) */}
      {showLargePortrait && (showsClient || showsDetective) && (
        <motion.div
          key={`portrait-${expression}-${speaker}`}
          initial={{ opacity: 0, scale: 0.9, y: 8 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="flex justify-center"
        >
          <div className="rounded-2xl overflow-hidden border-2 border-amber-accent/40 shadow-2xl shadow-amber-500/10">
            <PixelPortrait
              characterId={showsDetective ? 'detective' : client!.characterId}
              expression={expression ?? (showsDetective ? 'thinking' : 'worried')}
              size={240}
            />
          </div>
        </motion.div>
      )}

      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
        onClick={skipToEnd}
        className={`relative rounded-2xl border-l-4 ${speakerColor[speaker]} bg-slate-900/70 backdrop-blur-sm p-4 sm:p-5 shadow-xl ${
          !done ? 'cursor-pointer' : ''
        }`}
        title={!done ? 'タップで全文表示' : ''}
      >
        <div className="flex items-start gap-3">
          {showsClient && !showLargePortrait && (
            <div className="shrink-0 rounded-lg overflow-hidden border border-amber-accent/30">
              <PixelPortrait
                characterId={client!.characterId}
                expression={expression ?? client!.defaultExpression ?? 'worried'}
                size={64}
              />
            </div>
          )}
          {showsClient && !showLargePortrait && false && (
            <div className="shrink-0">
              <ClientAvatar client={client!} size={56} speaking={!done} />
            </div>
          )}
          {showsDetective && !showLargePortrait && (
            <div className="shrink-0 rounded-lg overflow-hidden border border-amber-accent/30">
              <PixelPortrait
                characterId="detective"
                expression={expression ?? 'thinking'}
                size={64}
              />
            </div>
          )}
          <div className="flex-1 min-w-0">
            <div className="text-xs uppercase tracking-widest text-amber-accent/80 mb-1">
              {showsClient ? `${client!.name} (${client!.occupation})` : speakerLabel[speaker]}
            </div>
            <p className="dialog-text text-slate-100 whitespace-pre-line text-sm sm:text-base">
              {displayed}
              {!done && (
                <span className="inline-block w-2 h-4 bg-amber-accent/70 ml-0.5 animate-pulse-slow align-middle" />
              )}
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
