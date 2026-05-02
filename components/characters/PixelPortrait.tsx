'use client';

import { useMemo } from 'react';

// 実写寄りのドット絵ポートレート(高解像度版)
// 80×100 ピクセルグリッドに、3D 楕円体シェーディング・主光源/補助光源・
// 環境遮蔽(目窩・鼻下・首)・サブサーフェス散乱(頬・鼻先の赤み)を計算で
// 乗せ、肌を 8 段階に陰影付けし、目・鼻・口・髪の構造を細密に描く。
//
// 山田さん:27歳・新人マーケター・「500万円が消えた」直後の困り顔。

const W = 80;
const H = 100;

// 32色パレット
const PALETTE: Record<string, string> = {
  ' ': 'transparent',

  // 背景(縦グラデ)
  '0': '#080c1a',
  '1': '#0e1426',
  '2': '#141d34',

  // 肌(8段階・暗 → 明)
  a: '#5a4226',
  b: '#7a5a3a',
  c: '#9a7550',
  d: '#b08a64',
  e: '#c9a075',
  f: '#dcb589',
  g: '#ecca9f',
  h: '#f6dbb4',
  i: '#fce6c2', // 最明部

  // サブサーフェス(頬・鼻先のほんのり赤み)
  j: '#d49075',
  k: '#e0a486',
  l: '#ecbc9e',

  // 髪(5段階)
  m: '#040206',
  n: '#0e0a08',
  o: '#1c140d',
  p: '#2d2014',
  q: '#4a3622',
  r: '#6e5034', // ハイライト

  // 眉
  s: '#0a0608',
  t: '#1a1208',

  // 目
  u: '#080608', // まつ毛・瞳
  v: '#26190f', // 虹彩外周
  w: '#4e3520', // 虹彩中
  x: '#7c5a3a', // 虹彩明部
  y: '#f0e4cc', // 白目
  z: '#d6c4a4', // 白目影
  A: '#fafafa', // キャッチライト
  B: '#e8dcc4', // キャッチライト弱

  // 唇
  C: '#5a302a', // 上唇暗部
  D: '#8a4a3e', // 上唇
  E: '#a85e4e', // 下唇
  F: '#c08070', // 下唇明部
  G: '#3a1a18', // 口の中

  // ワイシャツ
  H: '#9aaab8',
  I: '#bccad6',
  J: '#dae2ea',
  K: '#f2f6fa',

  // ネクタイ
  L: '#1a253f',
  M: '#2c3a5a',
  N: '#3e4f70',
  O: '#56688a',

  // 汗
  P: '#a4cce0',
  Q: '#d0e8f4',
};

const inEll = (
  x: number,
  y: number,
  cx: number,
  cy: number,
  rx: number,
  ry: number
): boolean => ((x - cx) / rx) ** 2 + ((y - cy) / ry) ** 2 <= 1;

function buildGrid(): string[][] {
  const g: string[][] = Array.from({ length: H }, () => Array<string>(W).fill(' '));

  // ─────────────────── 背景 ───────────────────
  for (let y = 0; y < H; y++) {
    for (let x = 0; x < W; x++) {
      const t = y / H;
      g[y][x] = t < 0.35 ? '0' : t < 0.7 ? '1' : '2';
    }
  }

  // ─────────────────── 顔(楕円体ライティング)───────────────────
  // 顔の中心とサイズ
  const FCX = 40,
    FCY = 52;
  const FRX = 19,
    FRY = 25,
    FRZ = 21;

  // 主光源(左上前方)・補助光源(右上)
  const LMX = -0.5,
    LMY = -0.55,
    LMZ = 0.67;
  const LFX = 0.4,
    LFY = -0.3,
    LFZ = 0.86;
  const lfLen = Math.sqrt(LFX * LFX + LFY * LFY + LFZ * LFZ);

  for (let y = 0; y < H; y++) {
    for (let x = 0; x < W; x++) {
      const dx = (x - FCX) / FRX;
      const dy = (y - FCY) / FRY;
      const r2 = dx * dx + dy * dy;
      if (r2 > 1) continue;

      // 楕円体上のZ(視点側)
      const z = Math.sqrt(Math.max(0, 1 - r2));

      // 法線(楕円体の勾配を正規化)
      let nx = dx / FRX;
      let ny = dy / FRY;
      let nz = z / FRZ;
      const nLen = Math.sqrt(nx * nx + ny * ny + nz * nz) || 1;
      nx /= nLen;
      ny /= nLen;
      nz /= nLen;

      const lambert = Math.max(0, nx * LMX + ny * LMY + nz * LMZ);
      const fill = Math.max(0, (nx * LFX + ny * LFY + nz * LFZ) / lfLen) * 0.28;
      const ambient = 0.16;
      let bright = lambert + fill + ambient;

      // 顎の下にうっすら影(遮蔽)
      if (y > FCY + 12) bright -= 0.05;

      // 8段階に量子化
      let tone: string;
      if (bright > 1.18) tone = 'i';
      else if (bright > 1.0) tone = 'h';
      else if (bright > 0.86) tone = 'g';
      else if (bright > 0.72) tone = 'f';
      else if (bright > 0.58) tone = 'e';
      else if (bright > 0.43) tone = 'd';
      else if (bright > 0.3) tone = 'c';
      else if (bright > 0.18) tone = 'b';
      else tone = 'a';

      g[y][x] = tone;
    }
  }

  // ─────────────────── サブサーフェス散乱(頬・鼻先・耳の赤み)───────────────────
  // 頬の血色(両頬。明度がある程度ある肌ピクセルにのみ重ねる)
  const tintCheek = (cx: number, cy: number, rx: number, ry: number) => {
    for (let y = cy - ry; y <= cy + ry; y++) {
      for (let x = cx - rx; x <= cx + rx; x++) {
        if (x < 0 || y < 0 || x >= W || y >= H) continue;
        if (!inEll(x, y, cx, cy, rx, ry)) continue;
        const cur = g[y][x];
        if (cur === 'g' || cur === 'h' || cur === 'i') g[y][x] = 'l';
        else if (cur === 'f' || cur === 'e') g[y][x] = 'k';
        else if (cur === 'd') g[y][x] = 'j';
      }
    }
  };
  tintCheek(28, 60, 5, 4);
  tintCheek(52, 60, 5, 4);

  // 鼻先のほんのり赤
  for (let y = 60; y <= 64; y++) {
    for (let x = 38; x <= 42; x++) {
      if (g[y][x] === 'h' || g[y][x] === 'i' || g[y][x] === 'g') g[y][x] = 'l';
    }
  }

  // ─────────────────── 髪 ───────────────────
  // メイン頭頂部:大きめの楕円
  for (let y = 0; y < H; y++) {
    for (let x = 0; x < W; x++) {
      const inHead = inEll(x, y, 40, 28, 22, 22);
      // 前髪:額にかかる楕円(右側に分け目で薄くなる)
      const inBangs =
        y >= 28 &&
        y <= 44 &&
        Math.abs(x - 40) <= 22 &&
        // 分け目を 36 付近に置く:右側は薄く、左側に流れる
        (x < 36
          ? y < 28 + (36 - x) * 0.9 + 14 // 左サイドが下まで降りる
          : y < 28 + (x - 36) * 0.5 + 6); // 右サイドは短い

      if ((inHead && y < 36) || inBangs) {
        // 髪のシェーディング
        const dx = (x - 40) / 22;
        const dy = (y - 26) / 18;
        const r2 = dx * dx + dy * dy;
        if (r2 > 1.2) continue;
        const z = Math.sqrt(Math.max(0, 1 - r2));
        const nLen = Math.sqrt(dx * dx + dy * dy + z * z) || 1;
        const lit = (dx * LMX + dy * LMY + z * LMZ) / nLen;
        const bright = Math.max(0, lit) + 0.2;

        let tone: string;
        if (bright > 1.05) tone = 'r';
        else if (bright > 0.85) tone = 'q';
        else if (bright > 0.7) tone = 'p';
        else if (bright > 0.55) tone = 'o';
        else if (bright > 0.4) tone = 'n';
        else tone = 'm';

        // 分け目に細い線(より明るく)
        if (Math.abs(x - 36) <= 0 && y >= 25 && y <= 32) tone = 'r';

        // 髪の毛流れ:小さなランダム性で1pxの濃淡
        const noise = ((x * 31 + y * 71) % 7) - 3;
        if (noise > 1 && tone === 'p') tone = 'q';
        if (noise < -1 && tone === 'p') tone = 'o';

        g[y][x] = tone;
      }
    }
  }

  // ─────────────────── 眉(困り顔=内側上がり)───────────────────
  // 左眉(画面左側):x=24..32, 内側(=画面中央寄り)で上がる
  const drawBrow = (xStart: number, xEnd: number, dir: 1 | -1) => {
    const len = Math.abs(xEnd - xStart);
    for (let i = 0; i <= len; i++) {
      const bx = xStart + i * dir;
      // 内側ほど高く(=y小さい)、外側は低く下がる
      const t = i / len; // 0=内側, 1=外側
      const by = 41 + Math.round(t * 2.2);
      // メインライン
      for (let dy = 0; dy <= 1; dy++) {
        if (g[by + dy] && g[by + dy][bx] && !'mnopqr'.includes(g[by + dy][bx])) {
          g[by + dy][bx] = dy === 0 ? 's' : 't';
        }
      }
    }
  };
  drawBrow(33, 24, -1); // 左眉(画面左側): 内側=33, 外側=24
  drawBrow(47, 56, 1); // 右眉(画面右側): 内側=47, 外側=56

  // ─────────────────── 目窩(眉下〜頬上の影)───────────────────
  for (let y = 44; y <= 47; y++) {
    for (let x = 23; x <= 36; x++) {
      const cur = g[y][x];
      if (cur === 'h' || cur === 'i') g[y][x] = 'g';
      else if (cur === 'g') g[y][x] = 'f';
    }
    for (let x = 44; x <= 57; x++) {
      const cur = g[y][x];
      if (cur === 'h' || cur === 'i') g[y][x] = 'g';
      else if (cur === 'g') g[y][x] = 'f';
    }
  }

  // ─────────────────── 目 ───────────────────
  // 目のジオメトリ:アーモンド形
  const drawEye = (cx: number, cy: number, mirror: boolean) => {
    // 上まつ毛(濃い)
    for (let dx = -4; dx <= 4; dx++) {
      const lashY = cy - 2 - (Math.abs(dx) > 3 ? 0 : 1);
      g[lashY][cx + dx] = 'u';
      // 厚みを少し
      if (Math.abs(dx) <= 3) g[lashY - 1][cx + dx] = 's';
    }
    // 白目(楕円)
    for (let dy = -1; dy <= 1; dy++) {
      for (let dx = -3; dx <= 3; dx++) {
        if (Math.abs(dx) === 3 && Math.abs(dy) === 1) continue;
        g[cy + dy][cx + dx] = dy === 1 ? 'z' : 'y';
      }
    }
    // 虹彩(2x2-ish、外周→中→明部)
    for (let dy = -1; dy <= 1; dy++) {
      for (let dx = -1; dx <= 1; dx++) {
        const r = Math.sqrt(dx * dx + dy * dy);
        if (r > 1.4) continue;
        if (r > 0.9) g[cy + dy][cx + dx] = 'v';
        else g[cy + dy][cx + dx] = 'w';
      }
    }
    // 虹彩明部(下側)
    g[cy + 1][cx] = 'x';
    // 瞳(中心)
    g[cy][cx] = 'u';
    // キャッチライト(主光源側=左上)
    const sx = mirror ? cx - 1 : cx - 1;
    g[cy - 1][sx] = 'A';
    g[cy - 1][sx + 1] = 'B';
    // 下まつ毛(細く)
    for (let dx = -3; dx <= 2; dx++) {
      if (g[cy + 2] && g[cy + 2][cx + dx]) g[cy + 2][cx + dx] = 't';
    }
    // 涙袋(下)
    for (let dx = -3; dx <= 3; dx++) {
      if (g[cy + 3] && g[cy + 3][cx + dx]) {
        const cur = g[cy + 3][cx + dx];
        if (cur === 'h' || cur === 'g') g[cy + 3][cx + dx] = 'f';
      }
    }
    // クマ(疲労)
    for (let dx = -3; dx <= 3; dx++) {
      if (g[cy + 4] && g[cy + 4][cx + dx]) {
        const cur = g[cy + 4][cx + dx];
        if (cur === 'g' || cur === 'h') g[cy + 4][cx + dx] = 'e';
      }
    }
  };
  drawEye(30, 47, false); // 左目
  drawEye(50, 47, true); // 右目

  // 鼻筋ハイライト(額下〜鼻根)
  for (let y = 45; y <= 56; y++) {
    if (g[y][40] === 'g' || g[y][40] === 'h') g[y][40] = 'i';
    if (g[y][39] === 'g') g[y][39] = 'h';
    if (g[y][41] === 'g') g[y][41] = 'h';
  }

  // ─────────────────── 鼻先 ───────────────────
  // 鼻翼(左右にふくらみ → 影)
  for (let y = 56; y <= 62; y++) {
    for (let x = 37; x <= 43; x++) {
      const cx = 40,
        cy = 60;
      const dx = (x - cx) / 4;
      const dy = (y - cy) / 3;
      if (dx * dx + dy * dy <= 1) {
        // 鼻先側面に影
        if (Math.abs(x - cx) >= 2 && y >= 58) {
          if (g[y][x] === 'h' || g[y][x] === 'g') g[y][x] = 'f';
          else if (g[y][x] === 'f' || g[y][x] === 'l' || g[y][x] === 'k') g[y][x] = 'e';
        }
      }
    }
  }
  // 鼻孔(2点)
  g[61][38] = 'b';
  g[61][42] = 'b';
  g[62][38] = 'c';
  g[62][42] = 'c';

  // 鼻下の影(人中)
  g[64][39] = 'd';
  g[64][40] = 'c';
  g[64][41] = 'd';

  // ─────────────────── 口 ───────────────────
  // 上唇:キューピッドの弓
  for (let dx = -5; dx <= 5; dx++) {
    const x = 40 + dx;
    // 弓の中央が少し下がる
    const yTop = 67 + (Math.abs(dx) <= 1 ? 0 : 0);
    g[yTop][x] = 'C';
  }
  // 弓の凹み(中央)
  g[67][40] = 'D';
  g[68][39] = 'D';
  g[68][40] = 'D';
  g[68][41] = 'D';
  // 上唇の本体
  for (let dx = -5; dx <= 5; dx++) {
    g[68][40 + dx] = dx === 0 ? 'D' : 'C';
  }
  for (let dx = -4; dx <= 4; dx++) {
    g[69][40 + dx] = 'D';
  }
  // 口の中(暗い線)
  for (let dx = -4; dx <= 4; dx++) {
    g[70][40 + dx] = 'G';
  }
  // 下唇:ふくよか
  for (let dx = -4; dx <= 4; dx++) {
    g[71][40 + dx] = Math.abs(dx) <= 2 ? 'F' : 'E';
  }
  for (let dx = -3; dx <= 3; dx++) {
    g[72][40 + dx] = 'E';
  }
  for (let dx = -2; dx <= 2; dx++) {
    g[73][40 + dx] = 'D';
  }
  // 口角下に影
  g[71][35] = 'c';
  g[71][45] = 'c';
  g[72][36] = 'd';
  g[72][44] = 'd';

  // 下唇下の影
  for (let dx = -3; dx <= 3; dx++) {
    if (g[74][40 + dx] && (g[74][40 + dx] === 'g' || g[74][40 + dx] === 'h'))
      g[74][40 + dx] = 'e';
  }

  // ─────────────────── 額の汗(右こめかみ) ───────────────────
  for (let y = 39; y <= 43; y++) {
    if (g[y] && g[y][55]) g[y][55] = 'P';
  }
  g[39][56] = 'Q';
  g[40][56] = 'Q';
  g[42][55] = 'P';
  g[43][55] = 'P';
  // ハイライト
  g[40][55] = 'Q';
  g[41][55] = 'Q';
  g[41][56] = 'P';
  // 雫の先端
  g[43][55] = 'P';
  g[44][55] = 'P';

  // ─────────────────── 顎下〜首 ───────────────────
  // 顎下の影
  for (let dx = -7; dx <= 7; dx++) {
    const x = 40 + dx;
    if (g[78] && g[78][x] && (g[78][x] === 'g' || g[78][x] === 'h' || g[78][x] === 'f'))
      g[78][x] = 'd';
    if (g[79] && g[79][x] && (g[79][x] === 'g' || g[79][x] === 'h' || g[79][x] === 'f'))
      g[79][x] = 'c';
  }
  // 首
  for (let y = 80; y < 88; y++) {
    for (let dx = -7; dx <= 7; dx++) {
      const x = 40 + dx;
      // 首の幅は狭め
      if (Math.abs(dx) > 6 - (y - 80) * 0.3) continue;
      // 中央は明るく、両端は影
      const t = Math.abs(dx) / 6;
      g[y][x] = t < 0.3 ? 'e' : t < 0.6 ? 'd' : 'c';
    }
  }

  // 喉仏(中央線、控えめ)
  g[83][40] = 'd';
  g[84][40] = 'd';

  // ─────────────────── ワイシャツ ───────────────────
  for (let y = 86; y < H; y++) {
    for (let x = 0; x < W; x++) {
      const dx = x - 40;
      // 肩は外に開く
      const widen = 18 + (y - 86) * 1.4;
      if (Math.abs(dx) > widen) continue;
      // 端のシャドウ
      const edge = widen - Math.abs(dx);
      let tone: string;
      if (edge < 1.2) tone = 'H';
      else if (edge < 3) tone = 'I';
      else if (edge < 6) tone = 'J';
      else tone = 'K';
      g[y][x] = tone;
    }
  }

  // 襟(V字、中に肌が見える三角)
  // 襟の輪郭
  for (let i = 0; i < 6; i++) {
    // 左襟
    const lx = 40 - 4 - i;
    const ly = 86 + i;
    g[ly][lx] = 'I';
    g[ly][lx - 1] = 'H';
    g[ly][lx + 1] = 'J';
    // 右襟
    const rx = 40 + 4 + i;
    const ry = 86 + i;
    g[ry][rx] = 'I';
    g[ry][rx + 1] = 'H';
    g[ry][rx - 1] = 'J';
  }
  // 襟の中の三角(肌)
  for (let i = 0; i < 5; i++) {
    for (let dx = -i; dx <= i; dx++) {
      g[86 + i][40 + dx] = i === 0 || Math.abs(dx) === i ? 'd' : 'e';
    }
  }

  // ─────────────────── ネクタイ(緩め)───────────────────
  // 結び目
  for (let y = 90; y <= 93; y++) {
    for (let dx = -3; dx <= 3; dx++) {
      let tone = 'M';
      if (dx === -3) tone = 'L';
      else if (dx === 3) tone = 'L';
      else if (dx === -2) tone = 'M';
      else if (dx === 2) tone = 'N';
      else if (dx === 0) tone = 'O';
      g[y][40 + dx] = tone;
    }
  }
  // 縦の本体(少し斜め:ゆるんでいる)
  for (let y = 94; y < H; y++) {
    const skew = Math.floor((y - 94) * 0.15);
    for (let dx = -2; dx <= 2; dx++) {
      let tone: string;
      if (dx === -2) tone = 'L';
      else if (dx === 2) tone = 'L';
      else if (dx === -1) tone = 'M';
      else if (dx === 1) tone = 'M';
      else tone = 'N';
      g[y][40 + dx + skew] = tone;
    }
  }

  return g;
}

export default function PixelPortrait({ size = 480 }: { size?: number }) {
  const grid = useMemo(() => buildGrid(), []);

  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      width={size}
      height={(size * H) / W}
      shapeRendering="crispEdges"
      style={{ imageRendering: 'pixelated', display: 'block' }}
      aria-label="山田さん(困り顔の依頼人ポートレート)"
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
