'use client';

import type { ClientCharacter } from '@/content/cases/types';

type Props = {
  client: ClientCharacter;
  size?: number;
  speaking?: boolean;
};

export default function ClientAvatar({ client, size = 80, speaking = false }: Props) {
  const { skin, hair, accent, expression } = client.avatar;

  const eye = expression === 'distraught' || expression === 'tired' ? 'M -3 0 L 3 0' : 'M -3 -1 L 3 -1';
  const mouth =
    expression === 'distraught'
      ? 'M -8 8 Q 0 4 8 8'
      : expression === 'worried'
      ? 'M -7 8 L 7 8'
      : expression === 'tired'
      ? 'M -7 7 L 7 7'
      : 'M -7 6 Q 0 10 7 6';

  return (
    <div
      className={`relative inline-block ${speaking ? 'animate-pulse-slow' : ''}`}
      style={{ width: size, height: size }}
    >
      <svg viewBox="-50 -50 100 100" width={size} height={size} aria-label={client.name}>
        {/* hair back */}
        <ellipse cx="0" cy="-15" rx="34" ry="32" fill={hair} />
        {/* face */}
        <ellipse cx="0" cy="0" rx="28" ry="32" fill={skin} />
        {/* hair front */}
        <path d={`M -32 -22 Q -10 -50 8 -32 Q 22 -42 32 -20 Q 28 -34 0 -42 Q -28 -38 -32 -22 Z`} fill={hair} />
        {/* eyes */}
        <g stroke="#1f1f1f" strokeWidth="2.4" strokeLinecap="round" fill="none">
          <path d={eye} transform="translate(-10 -2)" />
          <path d={eye} transform="translate(10 -2)" />
        </g>
        {/* mouth */}
        <path d={mouth} stroke="#7f1d1d" strokeWidth="2.4" fill="none" strokeLinecap="round" />
        {/* accent collar */}
        <rect x="-26" y="32" width="52" height="20" fill={accent} rx="6" />
        <rect x="-26" y="32" width="52" height="6" fill={`${accent}AA`} />
      </svg>
    </div>
  );
}
