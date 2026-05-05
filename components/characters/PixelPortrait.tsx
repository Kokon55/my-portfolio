'use client';

import { useMemo, useState, useEffect } from 'react';

// 表情パラメータでキャラクターのポーズ・心情を切り替え可能なピクセルポートレート。
// 表示優先順位:
//   1) public/characters/{characterId}/{expression}.png が存在すればそれを表示
//   2) 失敗 (404 等) したらプロシージャル生成の SVG にフォールバック
// これにより Gemini で生成した画像は1枚ずつ段階的に置換できる。

export type CharacterId = 'yamada' | 'sato' | 'akari' | 'detective';
export type Expression =
  | 'neutral'      // 通常
  | 'worried'      // 困り顔(眉V字・汗なし)
  | 'distraught'   // 取り乱し(眉V字・汗・口開き)
  | 'shocked'      // 衝撃(目大・口開き・血の気引く)
  | 'eureka'       // ひらめき(目見開き・口開き・上向き)
  | 'hopeful'      // 希望(微笑・目に光)
  | 'angry'        // 怒り(眉つり上がり)
  | 'tired'        // 疲労(目細・クマ強)
  | 'thinking';    // 思案(目伏し・口閉じ)

const W = 120;
const H = 150;

// キャラ別の基本パラメータ
type CharacterParams = {
  skinTone: number; // 0-1, 0=darker, 1=lighter
  hairColor: { h: number; s: number; l: number };
  hairStyle: 'short_part_right' | 'messy_long' | 'bob' | 'detective_hat';
  faceShape: 'oval' | 'round' | 'angular';
  eyeShape: 'normal' | 'large' | 'narrow';
};

const CHARACTERS: Record<CharacterId, CharacterParams> = {
  yamada: {
    skinTone: 0.55,
    hairColor: { h: 20, s: 30, l: 8 },
    hairStyle: 'short_part_right',
    faceShape: 'oval',
    eyeShape: 'normal',
  },
  sato: {
    skinTone: 0.5,
    hairColor: { h: 0, s: 0, l: 6 },
    hairStyle: 'messy_long',
    faceShape: 'oval',
    eyeShape: 'narrow',
  },
  akari: {
    skinTone: 0.7,
    hairColor: { h: 30, s: 60, l: 35 }, // 茶髪
    hairStyle: 'bob',
    faceShape: 'round',
    eyeShape: 'large',
  },
  detective: {
    skinTone: 0.45,
    hairColor: { h: 0, s: 0, l: 10 },
    hairStyle: 'detective_hat',
    faceShape: 'angular',
    eyeShape: 'normal',
  },
};

// HSL → RGB hex
const hsl = (h: number, s: number, l: number): string => {
  const a = (s / 100) * Math.min(l / 100, 1 - l / 100);
  const f = (n: number) => {
    const k = (n + h / 30) % 12;
    const c = l / 100 - a * Math.max(-1, Math.min(k - 3, Math.min(9 - k, 1)));
    return Math.round(255 * c).toString(16).padStart(2, '0');
  };
  return `#${f(0)}${f(8)}${f(4)}`;
};

const inEll = (x: number, y: number, cx: number, cy: number, rx: number, ry: number): number =>
  ((x - cx) / rx) ** 2 + ((y - cy) / ry) ** 2;

const noise2 = (x: number, y: number, seed = 1): number => {
  const v = Math.sin(x * 12.9898 + y * 78.233 + seed * 43.42) * 43758.5453;
  return v - Math.floor(v);
};

type ExpressionParams = {
  browAngle: number;       // -1 (V字困り) 〜 +1 (^字怒り)
  browLift: number;        // 0=通常 1=見開き
  eyeOpenness: number;     // 0=細目 1=見開き
  pupilSize: number;       // 0.7=細 1.5=見開き
  eyeShine: boolean;       // キャッチライト強い?
  mouthShape: 'closed' | 'slight_smile' | 'smile' | 'open_o' | 'open_frown' | 'neutral_line';
  sweatAmount: 0 | 1 | 2;  // 汗の量
  pallor: number;          // 0=通常 1=青ざめ
  blushIntensity: number;  // 0=通常 1=紅潮
  facingUp: boolean;       // 顔上向き(ひらめき・希望)
  bagsUnderEyes: number;   // 0=通常 1=濃いクマ
};

const EXPRESSION_PARAMS: Record<Expression, ExpressionParams> = {
  neutral:    { browAngle: 0,    browLift: 0,    eyeOpenness: 1,    pupilSize: 1,   eyeShine: false, mouthShape: 'closed',       sweatAmount: 0, pallor: 0,   blushIntensity: 0,    facingUp: false, bagsUnderEyes: 0 },
  worried:    { browAngle: -0.7, browLift: 0,    eyeOpenness: 0.85, pupilSize: 1,   eyeShine: false, mouthShape: 'open_frown',   sweatAmount: 0, pallor: 0.2, blushIntensity: 0,    facingUp: false, bagsUnderEyes: 0.5 },
  distraught: { browAngle: -1,   browLift: 0,    eyeOpenness: 1,    pupilSize: 1.2, eyeShine: false, mouthShape: 'open_frown',   sweatAmount: 2, pallor: 0.4, blushIntensity: 0,    facingUp: false, bagsUnderEyes: 1 },
  shocked:    { browAngle: 0.3,  browLift: 1,    eyeOpenness: 1.3,  pupilSize: 0.7, eyeShine: false, mouthShape: 'open_o',       sweatAmount: 1, pallor: 0.7, blushIntensity: 0,    facingUp: false, bagsUnderEyes: 0.3 },
  eureka:     { browAngle: 0.4,  browLift: 1,    eyeOpenness: 1.3,  pupilSize: 1.2, eyeShine: true,  mouthShape: 'open_o',       sweatAmount: 0, pallor: 0,   blushIntensity: 0.4,  facingUp: true,  bagsUnderEyes: 0 },
  hopeful:    { browAngle: 0.2,  browLift: 0.3,  eyeOpenness: 1,    pupilSize: 1,   eyeShine: true,  mouthShape: 'slight_smile', sweatAmount: 0, pallor: 0,   blushIntensity: 0.5,  facingUp: true,  bagsUnderEyes: 0 },
  angry:      { browAngle: 1,    browLift: 0,    eyeOpenness: 0.8,  pupilSize: 0.9, eyeShine: false, mouthShape: 'neutral_line', sweatAmount: 0, pallor: 0,   blushIntensity: 0.6,  facingUp: false, bagsUnderEyes: 0 },
  tired:      { browAngle: -0.3, browLift: -0.5, eyeOpenness: 0.5,  pupilSize: 1,   eyeShine: false, mouthShape: 'closed',       sweatAmount: 0, pallor: 0.3, blushIntensity: 0,    facingUp: false, bagsUnderEyes: 1 },
  thinking:   { browAngle: -0.2, browLift: 0,    eyeOpenness: 0.7,  pupilSize: 1,   eyeShine: false, mouthShape: 'neutral_line', sweatAmount: 0, pallor: 0,   blushIntensity: 0,    facingUp: false, bagsUnderEyes: 0.3 },
};

// 肌の階調(明度別12段階)を skinTone から生成
const buildSkinPalette = (tone: number, pallor: number) => {
  // tone 0 = 暗め, 1 = 明るめ
  const baseSat = 30 - pallor * 15;
  const baseHue = 25 - pallor * 10;
  const minL = 22 + tone * 18;
  const maxL = 70 + tone * 22;
  return Array.from({ length: 12 }, (_, i) => {
    const l = minL + (maxL - minL) * (i / 11);
    return hsl(baseHue, baseSat, l);
  });
};

const buildHairPalette = (h: number, s: number, l: number) =>
  Array.from({ length: 7 }, (_, i) => hsl(h, s, l + i * 5));

function buildGrid(charId: CharacterId, expression: Expression): string[][] {
  const char = CHARACTERS[charId];
  const exp = EXPRESSION_PARAMS[expression];

  const skin = buildSkinPalette(char.skinTone, exp.pallor);
  const hair = buildHairPalette(char.hairColor.h, char.hairColor.s, char.hairColor.l);

  // 動的パレット
  const PAL: Record<string, string> = {
    ' ': 'transparent',
    // 背景
    '0': '#06091a',
    '1': '#0a1024',
    '2': '#10182e',
    '3': '#1a2238',
    // 肌(12階調 a〜l)
    a: skin[0],
    b: skin[1],
    c: skin[2],
    d: skin[3],
    e: skin[4],
    f: skin[5],
    g: skin[6],
    h: skin[7],
    i: skin[8],
    j: skin[9],
    k: skin[10],
    l: skin[11],
    // 紅潮
    m: hsl(355, 50, Math.max(35, 55 - exp.pallor * 20)),
    n: hsl(355, 45, Math.max(40, 65 - exp.pallor * 15)),
    o: hsl(355, 35, Math.max(50, 75 - exp.pallor * 10)),
    p: hsl(355, 25, Math.max(60, 82 - exp.pallor * 5)),
    // 髪
    s: hair[0],
    t: hair[1],
    u: hair[2],
    v: hair[3],
    w: hair[4],
    x: hair[5],
    y: hair[6],
    // 眉
    z: '#0a0608',
    A: '#1a1208',
    // 目
    B: '#080608',
    C: '#1c150e',
    D: '#2c1e12',
    E: '#4a3320',
    F: '#6e4a30',
    G: '#8c5e3e',
    H: '#f2e6cc',
    I: '#dcc8a6',
    J: '#fafafa',
    K: '#e6dcc6',
    // 唇
    L: '#4a2620',
    M: '#6a3a30',
    N: '#8a4a3e',
    O: '#a06458',
    P: '#c08070',
    Q: '#3a1a18',
    // ワイシャツ
    R: '#88a0b8',
    S: '#a0b4c8',
    T: '#bcccdc',
    U: '#d4dde6',
    V: '#e8eef4',
    W: '#f4f8fc',
    // ネクタイ
    X: '#0a1428',
    Y: '#1a253f',
    Z: '#2c3a5a',
    // 汗
    '+': '#88b6d2',
    '*': '#b0d2e8',
    '~': '#dcedf6',
    // 探偵帽用
    '!': '#1a1814',
    '@': '#2a2620',
    '#': '#3a3530',
  };

  const g: string[][] = Array.from({ length: H }, () => Array<string>(W).fill(' '));

  // 背景
  for (let y = 0; y < H; y++) {
    for (let x = 0; x < W; x++) {
      const t = y / H;
      const dx = (x - W / 2) / (W / 2),
        dy = (y - H / 2) / (H / 2);
      const r = Math.sqrt(dx * dx + dy * dy);
      const vig = Math.min(1, r * 0.7);
      const base = t < 0.3 ? 0 : t < 0.55 ? 1 : t < 0.8 ? 2 : 3;
      const tone = vig > 0.7 ? Math.max(0, base - 1) : base;
      g[y][x] = String(tone);
    }
  }

  // 顔のオフセット(facingUp で僅かに上向き)
  const FCY = 75 + (exp.facingUp ? -2 : 0);
  const FCX = 60;
  const FRX = char.faceShape === 'round' ? 30 : char.faceShape === 'angular' ? 26 : 28;
  const FRY = char.faceShape === 'round' ? 36 : 38;
  const FRZ = 32;

  // 主光源
  const LMX = -0.5, LMY = -0.55, LMZ = 0.67;
  const LFX = 0.4, LFY = -0.3, LFZ = 0.86;
  const lfLen = Math.sqrt(LFX * LFX + LFY * LFY + LFZ * LFZ);

  // 顔
  for (let y = 0; y < H; y++) {
    for (let x = 0; x < W; x++) {
      const dx = (x - FCX) / FRX;
      const dy = (y - FCY) / FRY;
      const r2 = dx * dx + dy * dy;
      if (r2 > 1) continue;
      const z = Math.sqrt(Math.max(0, 1 - r2));
      let nx = dx / FRX, ny = dy / FRY, nz = z / FRZ;
      const nLen = Math.sqrt(nx * nx + ny * ny + nz * nz) || 1;
      nx /= nLen; ny /= nLen; nz /= nLen;

      const lambert = Math.max(0, nx * LMX + ny * LMY + nz * LMZ);
      const fill = Math.max(0, (nx * LFX + ny * LFY + nz * LFZ) / lfLen) * 0.28;
      const ambient = 0.16;
      let bright = lambert + fill + ambient;
      if (y > FCY + 18) bright -= 0.06;
      bright += (noise2(x, y, 2) - 0.5) * 0.06;

      let tone: string;
      if (bright > 1.22) tone = 'l';
      else if (bright > 1.1) tone = 'k';
      else if (bright > 0.98) tone = 'j';
      else if (bright > 0.86) tone = 'i';
      else if (bright > 0.74) tone = 'h';
      else if (bright > 0.62) tone = 'g';
      else if (bright > 0.5) tone = 'f';
      else if (bright > 0.4) tone = 'e';
      else if (bright > 0.3) tone = 'd';
      else if (bright > 0.2) tone = 'c';
      else if (bright > 0.12) tone = 'b';
      else tone = 'a';
      g[y][x] = tone;
    }
  }

  // 紅潮(両頬)
  if (exp.blushIntensity > 0) {
    const intensity = exp.blushIntensity;
    const tintCheek = (cx: number, cy: number) => {
      for (let y = cy - 5; y <= cy + 5; y++) {
        for (let x = cx - 6; x <= cx + 6; x++) {
          if (x < 0 || y < 0 || x >= W || y >= H) continue;
          if (inEll(x, y, cx, cy, 6, 5) > 1) continue;
          const cur = g[y][x];
          const r = noise2(x, y, 11) * intensity;
          if (r > 0.5) {
            if (cur === 'k' || cur === 'l') g[y][x] = 'p';
            else if (cur === 'j' || cur === 'i') g[y][x] = 'o';
            else if (cur === 'h' || cur === 'g') g[y][x] = 'n';
            else if (cur === 'f') g[y][x] = 'm';
          }
        }
      }
    };
    tintCheek(40, 90);
    tintCheek(80, 90);
  }

  // 髪 ── スタイル別
  const drawHair = () => {
    if (char.hairStyle === 'detective_hat') {
      // 山高帽
      // 帽子の本体(ボウラー風)
      for (let y = 0; y < 50; y++) {
        for (let x = 0; x < W; x++) {
          // 上部のドーム
          if (inEll(x, y, 60, 28, 30, 22) <= 1 && y < 36) {
            const dy = (y - 22) / 22;
            const dx = (x - 60) / 30;
            const z = Math.sqrt(Math.max(0, 1 - dx * dx - dy * dy));
            const lit = (dx * LMX + dy * LMY + z * LMZ);
            const bright = Math.max(0, lit) + 0.2;
            g[y][x] = bright > 0.6 ? '#' : bright > 0.35 ? '@' : '!';
          }
          // つば(横長楕円)
          if (inEll(x, y, 60, 36, 38, 6) <= 1 && y >= 32 && y <= 40) {
            g[y][x] = '!';
          }
        }
      }
      // 帽子のリボン
      for (let x = 30; x < 90; x++) {
        if (g[34][x] === '!' || g[34][x] === '@') g[34][x] = 'X';
        if (g[35][x] === '!' || g[35][x] === '@') g[35][x] = 'Y';
      }
      return;
    }

    // それ以外:ヘアスタイル別の輪郭
    const hairBounds = (() => {
      if (char.hairStyle === 'bob') return { headRy: 24, headRx: 28, bangX: [30, 90], bangBottom: 60, partLine: 50 };
      if (char.hairStyle === 'messy_long') return { headRy: 24, headRx: 30, bangX: [25, 95], bangBottom: 65, partLine: 56 };
      return { headRy: 22, headRx: 32, bangX: [28, 92], bangBottom: 60, partLine: 66 };
    })();

    for (let y = 0; y < H; y++) {
      for (let x = 0; x < W; x++) {
        const inHead = inEll(x, y, 60, 38, hairBounds.headRx, hairBounds.headRy) <= 1;
        const inBangs =
          y >= 38 &&
          y <= hairBounds.bangBottom &&
          Math.abs(x - 60) < hairBounds.headRx &&
          (x < hairBounds.partLine
            ? y < 38 + (hairBounds.partLine - x) * 0.7 + 22
            : y < 38 + (x - hairBounds.partLine) * 0.45 + 8);

        if (((inHead && y < 50) || inBangs) && y < 70) {
          const dx = (x - 60) / hairBounds.headRx;
          const dy = (y - 36) / 26;
          const r2 = dx * dx + dy * dy;
          if (r2 > 1.3) continue;
          const z = Math.sqrt(Math.max(0, 1 - r2));
          const nLen = Math.sqrt(dx * dx + dy * dy + z * z) || 1;
          const lit = (dx * LMX + dy * LMY + z * LMZ) / nLen;
          let bright = Math.max(0, lit) + 0.18;
          if (Math.abs(x - hairBounds.partLine) <= 1 && y >= 38 && y <= 50) bright += 0.5;
          bright += (noise2(x, y, 7) - 0.5) * 0.18;

          let tone: string;
          if (bright > 1.05) tone = 'y';
          else if (bright > 0.85) tone = 'x';
          else if (bright > 0.7) tone = 'w';
          else if (bright > 0.55) tone = 'v';
          else if (bright > 0.4) tone = 'u';
          else if (bright > 0.25) tone = 't';
          else tone = 's';
          g[y][x] = tone;
        }
      }
    }
  };
  drawHair();

  // 眉(角度を browAngle で制御)
  const browY = 56 - exp.browLift * 4;
  const drawBrow = (xStart: number, xEnd: number, dir: 1 | -1) => {
    const len = Math.abs(xEnd - xStart);
    for (let i = 0; i <= len; i++) {
      const bx = xStart + i * dir;
      const t = i / len; // 0=内側, 1=外側
      // browAngle: -1 (V字) 〜 +1 (^字)
      // V字なら内側が高い(y小さい)、外側が低い(y大きい)
      // ^字なら逆
      const lift = (1 - t) * exp.browAngle * 4;
      const by = browY - lift;
      for (let dy = 0; dy < 3; dy++) {
        const cy = by + dy;
        if (g[cy] && g[cy][bx]) {
          const cur = g[cy][bx];
          if (!'styuvwxy0123!@#'.includes(cur)) {
            g[cy][bx] = dy === 0 || dy === 2 ? 'A' : 'z';
          }
        }
      }
      if (i % 2 === 0 && g[by - 1] && g[by - 1][bx]) {
        const cur = g[by - 1][bx];
        if (!'styuvwxy0123!@#'.includes(cur)) g[by - 1][bx] = 'A';
      }
    }
  };
  drawBrow(50, 36, -1);
  drawBrow(70, 84, 1);

  // 額のシワ(困り・取り乱しのとき)
  if (exp.browAngle < -0.5) {
    for (let x = 48; x <= 72; x++) {
      if (g[44][x] && (g[44][x] === 'k' || g[44][x] === 'j')) g[44][x] = 'i';
      if (g[48][x] && (g[48][x] === 'k' || g[48][x] === 'j')) g[48][x] = 'i';
    }
  }

  // 目(eyeOpenness と pupilSize で制御)
  const drawEye = (cx: number, cy: number, mirror: boolean) => {
    const openness = exp.eyeOpenness;
    const halfH = Math.max(1, Math.round(2.5 * openness));
    const eyeRy = 1 + Math.round(openness * 1.5);

    // 目窩の影
    for (let y = cy - 4; y <= cy + 4; y++) {
      for (let x = cx - 7; x <= cx + 7; x++) {
        if (g[y] && g[y][x]) {
          const r = inEll(x, y, cx, cy, 7, 3.5);
          if (r > 0.7 && r <= 1) {
            const cur = g[y][x];
            if (cur === 'k' || cur === 'j') g[y][x] = 'i';
            else if (cur === 'i') g[y][x] = 'h';
          }
        }
      }
    }

    // 上まつ毛
    for (let dx = -6; dx <= 6; dx++) {
      const lashY = cy - halfH - (Math.abs(dx) > 4 ? -1 : 0);
      if (g[lashY] && g[lashY][cx + dx]) g[lashY][cx + dx] = 'B';
      if (g[lashY - 1] && g[lashY - 1][cx + dx] && Math.abs(dx) <= 5)
        g[lashY - 1][cx + dx] = 'C';
    }

    if (openness < 0.6) {
      // 細目:白目とまつ毛のラインだけ
      for (let dx = -5; dx <= 5; dx++) {
        const y = cy;
        if (g[y] && g[y][cx + dx]) g[y][cx + dx] = 'H';
      }
      // 下まつ毛
      for (let dx = -4; dx <= 4; dx++) {
        if (g[cy + 1] && g[cy + 1][cx + dx]) g[cy + 1][cx + dx] = 'C';
      }
    } else {
      // 白目
      for (let y = cy - eyeRy; y <= cy + eyeRy; y++) {
        for (let x = cx - 5; x <= cx + 5; x++) {
          if (inEll(x, y, cx, cy, 5, eyeRy + 0.5) > 1) continue;
          if (g[y] && g[y][x]) g[y][x] = y > cy ? 'I' : 'H';
        }
      }

      // 虹彩
      const irisR = 2.4;
      for (let y = cy - 2; y <= cy + 2; y++) {
        for (let x = cx - 2; x <= cx + 2; x++) {
          const r = Math.sqrt((x - cx) ** 2 + (y - cy) ** 2);
          if (r > irisR) continue;
          if (g[y] && g[y][x]) {
            if (r > 2) g[y][x] = 'D';
            else if (r > 1.4) g[y][x] = 'E';
            else g[y][x] = 'F';
          }
        }
      }
      g[cy + 1][cx] = 'G';

      // 瞳(pupilSize で大きさ調整)
      const pupSize = exp.pupilSize;
      if (pupSize < 1) {
        // 小瞳(衝撃)
        g[cy][cx] = 'B';
      } else {
        // 通常〜大瞳
        g[cy][cx] = 'B';
        g[cy - 1][cx] = 'B';
        if (pupSize > 1.1) {
          g[cy + 1][cx] = 'B';
        }
      }

      // キャッチライト
      const sx = cx - 1;
      g[cy - 1][sx - 1] = 'J';
      g[cy - 1][sx] = 'K';
      if (exp.eyeShine) {
        // 強い光(ひらめき・希望)
        g[cy][sx - 1] = 'J';
        g[cy + 1][cx + 2] = 'K';
      }
    }

    // 涙袋
    for (let dx = -5; dx <= 5; dx++) {
      if (g[cy + 4] && g[cy + 4][cx + dx]) {
        const cur = g[cy + 4][cx + dx];
        if (cur === 'k' || cur === 'j') g[cy + 4][cx + dx] = 'i';
      }
    }
    // クマ
    const bagDepth = exp.bagsUnderEyes;
    if (bagDepth > 0) {
      for (let dx = -6; dx <= 6; dx++) {
        const cur5 = g[cy + 5] && g[cy + 5][cx + dx];
        if (cur5) {
          if (bagDepth > 0.7 && (cur5 === 'i' || cur5 === 'j' || cur5 === 'h'))
            g[cy + 5][cx + dx] = 'g';
          else if (cur5 === 'j' || cur5 === 'i') g[cy + 5][cx + dx] = 'h';
        }
        if (bagDepth > 0.7 && g[cy + 6] && g[cy + 6][cx + dx]) {
          const cur6 = g[cy + 6][cx + dx];
          if (cur6 === 'i' || cur6 === 'j') g[cy + 6][cx + dx] = 'h';
        }
      }
    }

    // カラスの足跡(疲労時のみ)
    if (exp.bagsUnderEyes > 0.6) {
      const ws = mirror ? 1 : -1;
      g[cy + 1][cx + ws * 6] = 'g';
      g[cy + 2][cx + ws * 7] = 'h';
      g[cy + 3][cx + ws * 6] = 'g';
    }
  };

  drawEye(45, 70, false);
  drawEye(76, 71, true);

  // 鼻筋ハイライト
  for (let y = 67; y <= 87; y++) {
    if (g[y][60] === 'i' || g[y][60] === 'j' || g[y][60] === 'h') g[y][60] = 'k';
  }
  // 鼻翼
  for (let y = 84; y <= 94; y++) {
    for (let x = 54; x <= 66; x++) {
      const r = inEll(x, y, 60, 90, 6, 4);
      if (r <= 1) {
        if (Math.abs(x - 60) >= 3 && y >= 87) {
          const cur = g[y][x];
          if (cur === 'k' || cur === 'j') g[y][x] = 'h';
          else if (cur === 'i' || cur === 'h') g[y][x] = 'g';
        }
        if (Math.abs(x - 60) <= 1 && y >= 88 && y <= 90) g[y][x] = 'k';
      }
    }
  }
  g[91][57] = 'b'; g[91][62] = 'b';
  g[92][57] = 'c'; g[92][62] = 'c';
  g[97][60] = 'd';
  g[97][59] = 'e'; g[97][61] = 'e';

  // 口(mouthShape で形を切替)
  const mouth = exp.mouthShape;
  if (mouth === 'closed' || mouth === 'neutral_line') {
    // 一文字
    for (let dx = -5; dx <= 5; dx++) {
      g[103][60 + dx] = 'L';
    }
    g[104][60] = 'M';
  } else if (mouth === 'slight_smile') {
    // 微笑
    for (let dx = -5; dx <= 5; dx++) {
      const t = Math.abs(dx) / 5;
      g[103 + Math.round((1 - t) * -1)][60 + dx] = 'L';
    }
    // 口角上がり
    g[102][55] = 'L'; g[102][65] = 'L';
  } else if (mouth === 'smile') {
    // 笑顔(歯見える)
    for (let dx = -6; dx <= 6; dx++) {
      const t = Math.abs(dx) / 6;
      const yShift = Math.round((1 - t) * -2);
      g[104 + yShift][60 + dx] = 'L';
      g[103 + yShift][60 + dx] = 'M';
    }
    // 歯
    for (let dx = -4; dx <= 4; dx++) {
      g[105][60 + dx] = 'V';
    }
  } else if (mouth === 'open_o') {
    // 驚きの「お」
    for (let y = 102; y <= 107; y++) {
      for (let x = 56; x <= 64; x++) {
        if (inEll(x, y, 60, 104.5, 4, 3) <= 1) {
          if (inEll(x, y, 60, 104.5, 3, 2) <= 1) g[y][x] = 'Q';
          else g[y][x] = 'M';
        }
      }
    }
  } else if (mouth === 'open_frown') {
    // 不安な開き
    for (let dx = -5; dx <= 5; dx++) {
      g[101][60 + dx] = 'L';
    }
    for (let dx = -4; dx <= 4; dx++) {
      g[102][60 + dx] = 'M';
    }
    for (let dx = -3; dx <= 3; dx++) {
      g[103][60 + dx] = 'Q';
    }
    for (let dx = -4; dx <= 4; dx++) {
      g[104][60 + dx] = 'N';
    }
    for (let dx = -3; dx <= 3; dx++) {
      g[105][60 + dx] = 'O';
    }
    g[106][59] = 'M'; g[106][60] = 'M'; g[106][61] = 'M';
  }

  // 汗(sweatAmount に応じて0〜2滴)
  if (exp.sweatAmount > 0) {
    for (let y = 51; y <= 60; y++) {
      if (g[y] && g[y][82]) g[y][82] = '+';
    }
    for (let y = 52; y <= 59; y++) {
      if (g[y] && g[y][83]) g[y][83] = '*';
    }
    g[53][82] = '~'; g[55][82] = '*';
    g[60][82] = '+'; g[61][82] = '+';
  }
  if (exp.sweatAmount === 2) {
    // もう一滴(反対側のこめかみ)
    for (let y = 60; y <= 68; y++) {
      if (g[y] && g[y][32]) g[y][32] = '+';
    }
    g[63][32] = '*'; g[65][32] = '~';
  }

  // 顎下〜首
  for (let dx = -10; dx <= 10; dx++) {
    const x = 60 + dx;
    if (g[116] && g[116][x] && 'hijkl'.includes(g[116][x])) g[116][x] = 'e';
    if (g[117] && g[117][x] && 'hijkl'.includes(g[117][x])) g[117][x] = 'd';
    if (g[118] && g[118][x] && 'hijkl'.includes(g[118][x])) g[118][x] = 'd';
  }
  for (let y = 119; y < 132; y++) {
    for (let dx = -10; dx <= 10; dx++) {
      const x = 60 + dx;
      const widen = 10 - (y - 119) * 0.2;
      if (Math.abs(dx) > widen) continue;
      const t = Math.abs(dx) / widen;
      let tone = 'g';
      if (t < 0.25) tone = 'h';
      else if (t < 0.55) tone = 'g';
      else if (t < 0.8) tone = 'f';
      else tone = 'e';
      g[y][x] = tone;
    }
  }
  // 喉仏
  for (let y = 124; y <= 127; y++) {
    g[y][59] = 'i';
    g[y][60] = 'i';
    g[y][61] = 'h';
  }
  g[125][60] = 'j';

  // ワイシャツ
  for (let y = 130; y < H; y++) {
    for (let x = 0; x < W; x++) {
      const dx = x - 60;
      const widen = 25 + (y - 130) * 1.6;
      if (Math.abs(dx) > widen) continue;
      const edge = widen - Math.abs(dx);
      let tone: string;
      if (edge < 1.5) tone = 'R';
      else if (edge < 4) tone = 'S';
      else if (edge < 8) tone = 'T';
      else if (edge < 14) tone = 'U';
      else tone = 'V';
      g[y][x] = tone;
    }
  }
  for (let i = 0; i < 9; i++) {
    const lx = 60 - 6 - i, ly = 130 + i;
    const rx = 60 + 6 + i, ry = 130 + i;
    g[ly][lx] = 'R';
    if (g[ly][lx - 1]) g[ly][lx - 1] = 'S';
    g[ry][rx] = 'R';
    if (g[ry][rx + 1]) g[ry][rx + 1] = 'S';
  }
  for (let i = 0; i < 7; i++) {
    for (let dx = -i; dx <= i; dx++) {
      const cur = g[130 + i] && g[130 + i][60 + dx];
      if (cur) g[130 + i][60 + dx] = i === 0 ? 'e' : Math.abs(dx) === i ? 'e' : 'f';
    }
  }
  // ネクタイ(キャラ別:探偵は赤系、その他は青系)
  for (let y = 137; y <= 142; y++) {
    for (let dx = -5; dx <= 5; dx++) {
      const t = Math.abs(dx) / 5;
      let tone: string;
      if (t > 0.85) tone = 'X';
      else if (t > 0.6) tone = 'Y';
      else tone = 'Z';
      g[y][60 + dx] = tone;
    }
  }
  for (let y = 143; y < H; y++) {
    const skew = Math.floor((y - 143) * 0.18);
    for (let dx = -3; dx <= 3; dx++) {
      const t = Math.abs(dx) / 3;
      let tone: string;
      if (t > 0.85) tone = 'X';
      else if (t > 0.5) tone = 'Y';
      else tone = 'Z';
      g[y][60 + dx + skew] = tone;
    }
  }

  return g.map((row) => row.map((c) => PAL[c] ?? 'transparent'));
}

// 画像ファイルが存在する組み合わせをキャッシュ(同じ画像を毎回 fetch しないため)
type ImgStatus = 'unknown' | 'available' | 'missing';
const imageStatusCache = new Map<string, ImgStatus>();

const imagePath = (characterId: CharacterId, expression: Expression) =>
  `/characters/${characterId}/${expression}.png`;

export default function PixelPortrait({
  characterId = 'yamada',
  expression = 'worried',
  size = 600,
}: {
  characterId?: CharacterId;
  expression?: Expression;
  size?: number;
}) {
  const path = imagePath(characterId, expression);
  const cached = imageStatusCache.get(path) ?? 'unknown';
  const [status, setStatus] = useState<ImgStatus>(cached);

  useEffect(() => {
    setStatus(imageStatusCache.get(path) ?? 'unknown');
  }, [path]);

  const grid = useMemo(
    () => (status === 'missing' ? buildGrid(characterId, expression) : null),
    [status, characterId, expression]
  );

  // 画像ファイルが利用可能 or 未確認(まだ試していない)→ <img> を試す
  if (status !== 'missing') {
    return (
      <img
        src={path}
        width={size}
        height={(size * H) / W}
        alt={`${characterId} - ${expression}`}
        loading="eager"
        decoding="async"
        style={{
          imageRendering: 'pixelated',
          display: 'block',
          width: size,
          height: (size * H) / W,
        }}
        onLoad={() => {
          imageStatusCache.set(path, 'available');
          if (status === 'unknown') setStatus('available');
        }}
        onError={() => {
          imageStatusCache.set(path, 'missing');
          setStatus('missing');
        }}
      />
    );
  }

  // フォールバック: プロシージャル SVG
  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      width={size}
      height={(size * H) / W}
      shapeRendering="crispEdges"
      style={{ imageRendering: 'pixelated', display: 'block' }}
      aria-label={`${characterId} - ${expression}`}
    >
      {grid?.flatMap((row, y) =>
        row.map((fill, x) => {
          if (!fill || fill === 'transparent') return null;
          return <rect key={`${x}-${y}`} x={x} y={y} width={1.02} height={1.02} fill={fill} />;
        })
      )}
    </svg>
  );
}
