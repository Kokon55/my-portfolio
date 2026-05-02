'use client';

import { useMemo } from 'react';

// 実写寄りピクセルポートレート v3
// 120×150 ピクセル(従来の 6 倍)+ 40 色パレット
// 追加要素:
//  - 顔の左右非対称性(片目高め、眉非対称、口元のわずかな歪み)
//  - 肌のテクスチャノイズ(疑似ランダムで毛穴感)
//  - 額の心配しわ(2本)+ 目尻のカラスの足跡
//  - 鼻翼溝(法令線の薄い影)
//  - 5時のヒゲ(ストレスで剃り残し)
//  - 耳(片側のみ可視)
//  - 唇のたて筋
//  - 喉仏のはっきりした立体感
//  - 襟のしわとボタンの示唆
//  - ネクタイの斜めストライプ柄

const W = 120;
const H = 150;

const PALETTE: Record<string, string> = {
  ' ': 'transparent',
  // 背景(ヴィネット縦グラデ)
  '0': '#06091a',
  '1': '#0a1024',
  '2': '#10182e',
  '3': '#1a2238',

  // 肌(10段階)
  a: '#3a2818',
  b: '#5a4028',
  c: '#7a583a',
  d: '#946a48',
  e: '#ad7e58',
  f: '#c4956a',
  g: '#d6aa80',
  h: '#e2ba93',
  i: '#ecc8a4',
  j: '#f4d4b3',
  k: '#fbe0c2',
  l: '#fdebd0', // 最明部

  // サブサーフェス散乱(頬・鼻先・耳の温かみ)
  m: '#c8896a',
  n: '#d49d7e',
  o: '#dcaf91',
  p: '#e6c0a3',

  // 5時のヒゲ(青みグレー)
  q: '#7e7560',
  r: '#928a73',

  // 髪(7段階)
  s: '#040206',
  t: '#0a0608',
  u: '#160f0a',
  v: '#241a10',
  w: '#36281a',
  x: '#4e3826',
  y: '#6e5034', // ハイライト

  // 眉(濃い)
  z: '#0a0608',
  A: '#1a1208',

  // 目
  B: '#080608', // 瞳・最暗まつ毛
  C: '#1c150e', // まつ毛
  D: '#2c1e12', // 虹彩リム
  E: '#4a3320', // 虹彩中
  F: '#6e4a30', // 虹彩明
  G: '#8c5e3e', // 虹彩最明
  H: '#f2e6cc', // 白目
  I: '#dcc8a6', // 白目影
  J: '#fafafa', // キャッチライト主
  K: '#e6dcc6', // キャッチライト副

  // 唇
  L: '#4a2620', // 上唇陰
  M: '#6a3a30', // 上唇
  N: '#8a4a3e', // 下唇陰
  O: '#a06458', // 下唇
  P: '#c08070', // 下唇明
  Q: '#3a1a18', // 口の中

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
  '@': '#3e5078',
  '#': '#586e96',

  // 汗
  '+': '#88b6d2',
  '*': '#b0d2e8',
  '~': '#dcedf6',
};

const inEll = (
  x: number,
  y: number,
  cx: number,
  cy: number,
  rx: number,
  ry: number
): number => ((x - cx) / rx) ** 2 + ((y - cy) / ry) ** 2;

// 疑似ランダム(決定論的・X,Y から生成)
const noise2 = (x: number, y: number, seed = 1): number => {
  const v = Math.sin(x * 12.9898 + y * 78.233 + seed * 43.42) * 43758.5453;
  return v - Math.floor(v); // 0..1
};

function buildGrid(): string[][] {
  const g: string[][] = Array.from({ length: H }, () => Array<string>(W).fill(' '));

  // ─── 1. 背景:縦グラデ + ヴィネット ───
  for (let y = 0; y < H; y++) {
    for (let x = 0; x < W; x++) {
      const t = y / H;
      const dx = (x - W / 2) / (W / 2);
      const dy = (y - H / 2) / (H / 2);
      const r = Math.sqrt(dx * dx + dy * dy);
      const vig = Math.min(1, r * 0.7);
      const base = t < 0.3 ? 0 : t < 0.55 ? 1 : t < 0.8 ? 2 : 3;
      const tone = vig > 0.7 ? Math.max(0, base - 1) : base;
      g[y][x] = String(tone);
    }
  }

  // ─── 2. 顔(楕円体ライティング)───
  // 中心と半径
  const FCX = 60,
    FCY = 75;
  const FRX = 28,
    FRY = 38;
  const FRZ = 32;

  // 主光源(左上前方)
  const LMX = -0.5,
    LMY = -0.55,
    LMZ = 0.67;
  // 補助光(右上)
  const LFX = 0.4,
    LFY = -0.3,
    LFZ = 0.86;
  const lfLen = Math.sqrt(LFX * LFX + LFY * LFY + LFZ * LFZ);

  // わずかな顔の歪み(右側がほんの少し膨らむ:asymmetry)
  for (let y = 0; y < H; y++) {
    for (let x = 0; x < W; x++) {
      const adjX = x > FCX ? x - 0.5 : x; // 右半分を僅かにシフト
      const dx = (adjX - FCX) / FRX;
      const dy = (y - FCY) / FRY;
      const r2 = dx * dx + dy * dy;
      if (r2 > 1) continue;
      const z = Math.sqrt(Math.max(0, 1 - r2));
      let nx = dx / FRX,
        ny = dy / FRY,
        nz = z / FRZ;
      const nLen = Math.sqrt(nx * nx + ny * ny + nz * nz) || 1;
      nx /= nLen;
      ny /= nLen;
      nz /= nLen;

      const lambert = Math.max(0, nx * LMX + ny * LMY + nz * LMZ);
      const fill = Math.max(0, (nx * LFX + ny * LFY + nz * LFZ) / lfLen) * 0.28;
      const ambient = 0.16;
      let bright = lambert + fill + ambient;

      // 顎下に環境遮蔽
      if (y > FCY + 18) bright -= 0.06;
      // 額にうっすらシワ(横線2本)
      if ((y === 38 || y === 41) && Math.abs(x - 60) < 14 && noise2(x, y, 5) > 0.5) bright -= 0.08;
      // 微小な肌テクスチャ(ノイズ ±1段)
      const tex = (noise2(x, y, 2) - 0.5) * 0.06;
      bright += tex;

      // 12段階に量子化
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

  // ─── 3. サブサーフェス散乱 ───
  const tintCheek = (cx: number, cy: number, rx: number, ry: number, seed: number) => {
    for (let y = cy - ry; y <= cy + ry; y++) {
      for (let x = cx - rx; x <= cx + rx; x++) {
        if (x < 0 || y < 0 || x >= W || y >= H) continue;
        if (inEll(x, y, cx, cy, rx, ry) > 1) continue;
        const cur = g[y][x];
        // ノイズで赤みの強さを変える
        const intensity = 0.5 + noise2(x, y, seed) * 0.5;
        if (intensity > 0.7) {
          if (cur === 'k' || cur === 'l') g[y][x] = 'p';
          else if (cur === 'j' || cur === 'i') g[y][x] = 'o';
          else if (cur === 'h' || cur === 'g') g[y][x] = 'n';
          else if (cur === 'f') g[y][x] = 'm';
        }
      }
    }
  };
  // 両頬
  tintCheek(40, 90, 8, 6, 11);
  tintCheek(80, 90, 8, 6, 13);
  // 鼻先
  tintCheek(60, 91, 5, 4, 17);
  // 耳(後で描画)前の血色

  // ─── 4. 髪(細密) ───
  for (let y = 0; y < H; y++) {
    for (let x = 0; x < W; x++) {
      // 頭頂部の主シェイプ
      const inHead = inEll(x, y, 60, 42, 32, 32) <= 1;
      // 前髪:額にかかる、左に流れる(分け目右寄り)
      const partLine = 66; // 分け目の位置(右寄り)
      const inBangs =
        y >= 40 &&
        y <= 65 &&
        Math.abs(x - 60) < 32 &&
        (x < partLine
          ? y < 40 + (partLine - x) * 0.7 + 22 // 左サイド長め
          : y < 40 + (x - partLine) * 0.45 + 8); // 右サイド短め

      if (((inHead && y < 55) || inBangs) && y < 70) {
        // 髪のシェーディング
        const dx = (x - 60) / 32;
        const dy = (y - 38) / 28;
        const r2 = dx * dx + dy * dy;
        if (r2 > 1.3) continue;
        const z = Math.sqrt(Math.max(0, 1 - r2));
        const nLen = Math.sqrt(dx * dx + dy * dy + z * z) || 1;
        const lit = (dx * LMX + dy * LMY + z * LMZ) / nLen;
        let bright = Math.max(0, lit) + 0.18;

        // 分け目の明るいライン
        if (Math.abs(x - partLine) <= 1 && y >= 38 && y <= 50) bright += 0.5;

        // 毛流れノイズ(1pxの濃淡)
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

  // 個別の髪の毛束(額の境界に1pxのほつれ)
  for (let i = 0; i < 6; i++) {
    const sx = 40 + i * 8;
    const sy = 60 + Math.floor(noise2(sx, 0, 9) * 4);
    if (g[sy] && g[sy][sx] && (g[sy][sx] === 'i' || g[sy][sx] === 'j' || g[sy][sx] === 'k')) {
      g[sy][sx] = 'u';
    }
  }

  // ─── 5. 耳(右側:画面の右端、髪と顔の境界) ───
  // 耳の楕円
  for (let y = 75; y < 100; y++) {
    for (let x = 87; x < 96; x++) {
      const inEar = inEll(x, y, 90, 87, 4, 8) <= 1;
      if (inEar && g[y][x] !== ' ') {
        const dy = (y - 87) / 8;
        const lit = -dy * 0.5 + 0.4;
        const tex = noise2(x, y, 3) * 0.15;
        const bright = lit + tex;
        let tone: string;
        if (bright > 0.5) tone = 'h';
        else if (bright > 0.3) tone = 'g';
        else if (bright > 0.15) tone = 'f';
        else tone = 'e';
        g[y][x] = tone;
      }
    }
  }
  // 耳の影(顔とのジョイント)
  for (let y = 80; y < 95; y++) {
    if (g[y][86] && (g[y][86] === 'h' || g[y][86] === 'g')) g[y][86] = 'd';
  }

  // ─── 6. 眉(困り顔・非対称) ───
  const drawBrow = (xStart: number, xEnd: number, dir: 1 | -1, raise: number) => {
    const len = Math.abs(xEnd - xStart);
    for (let i = 0; i <= len; i++) {
      const bx = xStart + i * dir;
      const t = i / len;
      const by = 56 - Math.round((1 - t) * 4 + raise); // 内側上がり
      // 厚み3px
      for (let dy = 0; dy < 3; dy++) {
        const cy = by + dy;
        if (g[cy] && g[cy][bx]) {
          const cur = g[cy][bx];
          if (!'styuvwx0123'.includes(cur)) {
            g[cy][bx] = dy === 0 ? 'A' : dy === 1 ? 'z' : 'A';
          }
        }
      }
      // 細い毛流れ
      if (i % 2 === 0 && g[by - 1] && g[by - 1][bx]) {
        const cur = g[by - 1][bx];
        if (!'styuvwx0123'.includes(cur)) g[by - 1][bx] = 'A';
      }
    }
  };
  drawBrow(50, 36, -1, 0);  // 左眉(画面左)
  drawBrow(70, 84, 1, 1);   // 右眉(僅かに高め=非対称)

  // 額のシワ(ストレス線2本)
  for (let x = 48; x <= 72; x++) {
    if (g[44] && g[44][x] && (g[44][x] === 'k' || g[44][x] === 'j')) g[44][x] = 'i';
    if (g[48] && g[48][x] && (g[48][x] === 'k' || g[48][x] === 'j')) g[48][x] = 'i';
  }

  // ─── 7. 目(細密 9 層) ───
  const drawEye = (cx: number, cy: number, mirror: boolean) => {
    // 目窩の影(楕円ぼかし)
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

    // 上まつ毛(濃いライン+睫毛跳ね)
    for (let dx = -6; dx <= 6; dx++) {
      const lashY = cy - 3 + (Math.abs(dx) > 4 ? 1 : 0);
      if (g[lashY] && g[lashY][cx + dx]) g[lashY][cx + dx] = 'B';
      // 厚み
      if (g[lashY - 1] && g[lashY - 1][cx + dx] && Math.abs(dx) <= 5)
        g[lashY - 1][cx + dx] = 'C';
    }
    // 個別の睫毛(縦に伸びる)
    for (const ex of [-5, -3, -1, 1, 3, 5]) {
      if (g[cy - 4] && g[cy - 4][cx + ex]) g[cy - 4][cx + ex] = 'C';
    }

    // 白目(大きめ楕円)
    for (let y = cy - 2; y <= cy + 2; y++) {
      for (let x = cx - 5; x <= cx + 5; x++) {
        if (inEll(x, y, cx, cy, 5, 2.5) > 1) continue;
        if (g[y] && g[y][x]) g[y][x] = y > cy ? 'I' : 'H';
      }
    }
    // 白目の血管(微細な赤み)— ストレスで充血
    if (g[cy + 1] && g[cy + 1][cx - 4]) g[cy + 1][cx - 4] = 'm';
    if (g[cy + 1] && g[cy + 1][cx + 3]) g[cy + 1][cx + 3] = 'n';

    // 虹彩(同心円:外周→中→明)
    for (let y = cy - 2; y <= cy + 2; y++) {
      for (let x = cx - 2; x <= cx + 2; x++) {
        const r = Math.sqrt((x - cx) ** 2 + (y - cy) ** 2);
        if (r > 2.4) continue;
        if (g[y] && g[y][x]) {
          if (r > 2) g[y][x] = 'D';
          else if (r > 1.4) g[y][x] = 'E';
          else g[y][x] = 'F';
        }
      }
    }
    // 虹彩下半分はやや明るい
    g[cy + 1][cx] = 'G';
    g[cy + 1][cx - 1] = 'F';
    g[cy + 1][cx + 1] = 'F';

    // 瞳(中心)
    g[cy][cx] = 'B';
    g[cy - 1][cx] = 'B';

    // キャッチライト主(左上)
    const sx = mirror ? cx - 1 : cx - 1;
    g[cy - 1][sx - 1] = 'J';
    g[cy - 1][sx] = 'K';
    // キャッチライト副(右下、小さく)
    g[cy + 1][cx + 1] = 'K';

    // 下まつ毛(細く)
    for (let dx = -5; dx <= 4; dx++) {
      if (g[cy + 3] && g[cy + 3][cx + dx]) g[cy + 3][cx + dx] = 'C';
    }
    // 涙袋
    for (let dx = -5; dx <= 5; dx++) {
      if (g[cy + 4] && g[cy + 4][cx + dx]) {
        const cur = g[cy + 4][cx + dx];
        if (cur === 'k' || cur === 'j') g[cy + 4][cx + dx] = 'i';
      }
    }
    // クマ(疲労)
    for (let dx = -6; dx <= 6; dx++) {
      if (g[cy + 5] && g[cy + 5][cx + dx]) {
        const cur = g[cy + 5][cx + dx];
        if (cur === 'j' || cur === 'i') g[cy + 5][cx + dx] = 'h';
        else if (cur === 'h') g[cy + 5][cx + dx] = 'g';
      }
      if (g[cy + 6] && g[cy + 6][cx + dx]) {
        const cur = g[cy + 6][cx + dx];
        if (cur === 'i' || cur === 'j') g[cy + 6][cx + dx] = 'h';
      }
    }

    // カラスの足跡(目尻のしわ・1px線)
    const wrinkleSign = mirror ? 1 : -1;
    g[cy + 1][cx + wrinkleSign * 6] = 'g';
    g[cy + 2][cx + wrinkleSign * 7] = 'h';
    g[cy + 3][cx + wrinkleSign * 6] = 'g';
  };

  // 左目はわずかに高い位置(非対称)
  drawEye(45, 70, false);
  drawEye(76, 71, true);

  // 鼻筋ハイライト
  for (let y = 67; y <= 87; y++) {
    if (g[y][60] === 'i' || g[y][60] === 'j' || g[y][60] === 'h') g[y][60] = 'k';
    if (g[y][59] === 'i') g[y][59] = 'j';
    if (g[y][61] === 'h') g[y][61] = 'i';
  }

  // ─── 8. 鼻(より立体的に) ───
  // 鼻翼(両側のふくらみ → 影)
  for (let y = 84; y <= 94; y++) {
    for (let x = 54; x <= 66; x++) {
      const r = inEll(x, y, 60, 90, 6, 4);
      if (r <= 1) {
        // 側面に影
        if (Math.abs(x - 60) >= 3 && y >= 87) {
          const cur = g[y][x];
          if (cur === 'k' || cur === 'j') g[y][x] = 'h';
          else if (cur === 'i' || cur === 'h') g[y][x] = 'g';
          else if (cur === 'g' || cur === 'p' || cur === 'o') g[y][x] = 'f';
        }
        // 鼻先のハイライト
        if (Math.abs(x - 60) <= 1 && y >= 88 && y <= 90) g[y][x] = 'k';
      }
    }
  }
  // 鼻孔(2点・楕円)
  for (let dx = 0; dx < 2; dx++) {
    g[91][57 + dx] = 'b';
    g[91][62 + dx] = 'b';
    g[92][57 + dx] = 'c';
    g[92][62 + dx] = 'c';
  }
  // 鼻翼溝(法令線の薄い影、頬まで続く)
  for (let i = 0; i < 6; i++) {
    const lx = 53 - Math.floor(i * 0.6),
      ly = 92 + i;
    const rx = 67 + Math.floor(i * 0.6),
      ry = 92 + i;
    if (g[ly] && g[ly][lx] && (g[ly][lx] === 'h' || g[ly][lx] === 'g')) g[ly][lx] = 'f';
    if (g[ry] && g[ry][rx] && (g[ry][rx] === 'h' || g[ry][rx] === 'g')) g[ry][rx] = 'f';
  }

  // 鼻下の影(人中)
  for (let dx = -1; dx <= 1; dx++) {
    g[97][60 + dx] = 'e';
  }
  g[97][60] = 'd';

  // ─── 9. 口(キューピッドの弓・たて筋・口角影) ───
  // 上唇(M字型)
  for (let dx = -8; dx <= 8; dx++) {
    const x = 60 + dx;
    // M字の凹み中央
    let yTop = 100;
    if (Math.abs(dx) <= 1) yTop = 101;
    g[yTop][x] = 'L';
  }
  // 上唇本体
  for (let dx = -8; dx <= 8; dx++) {
    g[101][60 + dx] = Math.abs(dx) <= 2 ? 'M' : 'L';
    g[102][60 + dx] = 'M';
  }
  // 上唇のたて筋(細く)
  for (let dx = -6; dx <= 6; dx += 2) {
    g[100][60 + dx] = 'L';
  }

  // 口の中(暗線)
  for (let dx = -7; dx <= 7; dx++) {
    g[103][60 + dx] = 'Q';
  }

  // 下唇(ふくよか・3行)
  for (let dx = -7; dx <= 7; dx++) {
    g[104][60 + dx] = Math.abs(dx) <= 3 ? 'P' : 'O';
  }
  for (let dx = -6; dx <= 6; dx++) {
    g[105][60 + dx] = Math.abs(dx) <= 2 ? 'O' : 'N';
  }
  for (let dx = -4; dx <= 4; dx++) {
    g[106][60 + dx] = 'N';
  }
  for (let dx = -3; dx <= 3; dx++) {
    g[107][60 + dx] = 'M';
  }

  // 口角の影(唇の終わりに翻り)
  g[103][52] = 'd';
  g[103][68] = 'd';
  g[102][52] = 'e';
  g[102][68] = 'e';

  // 唇のたて筋(下唇)
  for (let dx = -5; dx <= 5; dx += 2) {
    if (g[105][60 + dx] === 'O' || g[105][60 + dx] === 'P') g[105][60 + dx] = 'N';
  }

  // 下唇下の影
  for (let dx = -5; dx <= 5; dx++) {
    if (g[108][60 + dx] && (g[108][60 + dx] === 'k' || g[108][60 + dx] === 'j'))
      g[108][60 + dx] = 'h';
  }

  // ─── 10. 5時のヒゲ(ストレスで剃り残し) ───
  // 顎周りに薄いノイズで点描
  for (let y = 110; y < 122; y++) {
    for (let x = 38; x < 82; x++) {
      if (!g[y] || !g[y][x]) continue;
      const cur = g[y][x];
      if ('hijkl'.includes(cur) && noise2(x, y, 19) > 0.65) {
        g[y][x] = 'q';
      }
    }
  }
  // 鼻下にも軽く
  for (let y = 98; y < 100; y++) {
    for (let x = 50; x < 71; x++) {
      const cur = g[y][x];
      if ('hijk'.includes(cur) && noise2(x, y, 21) > 0.7) g[y][x] = 'r';
    }
  }

  // ─── 11. 額の汗(右こめかみ・ハイライト付き水滴) ───
  for (let y = 51; y <= 60; y++) {
    if (g[y] && g[y][82]) g[y][82] = '+';
  }
  for (let y = 52; y <= 59; y++) {
    if (g[y] && g[y][83]) g[y][83] = '*';
  }
  // 主ハイライト
  g[53][82] = '~';
  g[54][82] = '~';
  g[55][82] = '*';
  g[56][82] = '*';
  // 雫の先端
  g[60][82] = '+';
  g[61][82] = '+';

  // ─── 12. 顎下〜首 ───
  // 顎下の強い影
  for (let dx = -10; dx <= 10; dx++) {
    const x = 60 + dx;
    if (g[116] && g[116][x] && 'hijkl'.includes(g[116][x])) g[116][x] = 'e';
    if (g[117] && g[117][x] && 'hijkl'.includes(g[117][x])) g[117][x] = 'd';
    if (g[118] && g[118][x] && 'hijkl'.includes(g[118][x])) g[118][x] = 'd';
  }
  // 首
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
      // 首にも僅かなテクスチャ
      const tex = noise2(x, y, 23) - 0.5;
      if (tex > 0.3 && tone === 'g') tone = 'h';
      if (tex < -0.3 && tone === 'g') tone = 'f';
      g[y][x] = tone;
    }
  }
  // 喉仏(中央のはっきりした立体)
  for (let y = 124; y <= 127; y++) {
    g[y][59] = 'i';
    g[y][60] = 'i';
    g[y][61] = 'h';
  }
  g[125][60] = 'j'; // 喉仏ハイライト

  // ─── 13. ワイシャツ ───
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
      // 微細なシワ(ノイズ)
      const tex = noise2(x, y, 31);
      if (tex > 0.7 && tone === 'U') tone = 'T';
      if (tex < 0.3 && tone === 'U') tone = 'V';
      g[y][x] = tone;
    }
  }

  // 襟の輪郭(V字で2本のライン)
  for (let i = 0; i < 9; i++) {
    const lx = 60 - 6 - i,
      ly = 130 + i;
    const rx = 60 + 6 + i,
      ry = 130 + i;
    g[ly][lx] = 'R';
    if (g[ly][lx - 1]) g[ly][lx - 1] = 'S';
    g[ry][rx] = 'R';
    if (g[ry][rx + 1]) g[ry][rx + 1] = 'S';
  }
  // 襟の中の三角(肌が見える)
  for (let i = 0; i < 7; i++) {
    for (let dx = -i; dx <= i; dx++) {
      const cur = g[130 + i] && g[130 + i][60 + dx];
      if (cur) g[130 + i][60 + dx] = i === 0 ? 'e' : Math.abs(dx) === i ? 'e' : 'f';
    }
  }
  // 襟のシワ(肩口)
  g[133][45] = 'S';
  g[134][46] = 'S';
  g[133][75] = 'S';
  g[134][74] = 'S';

  // ─── 14. ネクタイ(緩め・斜めストライプ) ───
  // 結び目(台形)
  for (let y = 137; y <= 142; y++) {
    for (let dx = -5; dx <= 5; dx++) {
      const t = Math.abs(dx) / 5;
      let tone: string;
      if (t > 0.85) tone = 'X';
      else if (t > 0.6) tone = 'Y';
      else if (t > 0.3) tone = 'Z';
      else tone = '@';
      g[y][60 + dx] = tone;
    }
  }
  // 結び目の凹み(中央上に細い線)
  g[137][60] = 'X';
  g[138][60] = 'Y';

  // 縦の本体(緩く斜め)
  for (let y = 143; y < H; y++) {
    const skew = Math.floor((y - 143) * 0.18);
    for (let dx = -3; dx <= 3; dx++) {
      const t = Math.abs(dx) / 3;
      let tone: string;
      if (t > 0.85) tone = 'X';
      else if (t > 0.5) tone = 'Y';
      else tone = 'Z';
      const x = 60 + dx + skew;
      g[y][x] = tone;
      // 斜めストライプ柄(明るい線)
      if ((x + y) % 5 === 0 && tone === 'Z') g[y][x] = '@';
    }
  }

  return g;
}

export default function PixelPortrait({ size = 600 }: { size?: number }) {
  const grid = useMemo(() => buildGrid(), []);

  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      width={size}
      height={(size * H) / W}
      shapeRendering="crispEdges"
      style={{ imageRendering: 'pixelated', display: 'block' }}
      aria-label="山田さん(困り顔の依頼人ポートレート・高解像度版)"
    >
      {grid.flatMap((row, y) =>
        row.map((c, x) => {
          const fill = PALETTE[c];
          if (!fill || fill === 'transparent') return null;
          return <rect key={`${x}-${y}`} x={x} y={y} width={1.02} height={1.02} fill={fill} />;
        })
      )}
    </svg>
  );
}
