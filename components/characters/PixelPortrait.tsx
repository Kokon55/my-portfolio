'use client';

import { useMemo } from 'react';

// 実写寄りのドット絵ポートレート。
// 32x40 ピクセルグリッドに、形状演算と簡易ライティング(左上から光源)で
// 5〜6段階の肌陰影 + 髪のハイライト + 目のスパークル + 衣服を描き分ける。
//
// 山田さん:27歳・新人マーケター・「500万円が消えた」直後の、
// 額に汗・眉が困り顔・少し開いた口の半身像。

const PALETTE: Record<string, string> = {
  ' ': 'transparent',
  // 背景(ヴィネット)
  K: '#0a0f1f',
  k: '#141c2e',
  // 髪
  H: '#0c0805',
  h: '#1c140d',
  G: '#2c2117',
  g: '#4a3826',
  // 肌
  D: '#7a5a3e',
  d: '#a07d5a',
  s: '#caa479',
  S: '#e8caa6',
  L: '#f3dcb6',
  l: '#fce8c6',
  // 眉
  E: '#0c0805',
  e: '#241a10',
  // 目
  W: '#f8f0e0',
  w: '#d8c5a8',
  I: '#5a3d2a',
  i: '#3a2618',
  P: '#08040a',
  X: '#ffffff',
  // 唇
  M: '#a06658',
  m: '#7a4638',
  N: '#b8786a',
  // ワイシャツ
  R: '#d4dde6',
  r: '#a4b4c4',
  Q: '#7c8c9c',
  // ネクタイ
  T: '#2a3a5a',
  t: '#1a253f',
  u: '#3e4f70',
  // 汗
  J: '#aed4e6',
  j: '#dceff8',
};

const W = 32;
const H = 40;

const inEllipse = (
  x: number,
  y: number,
  cx: number,
  cy: number,
  rx: number,
  ry: number
): boolean => ((x - cx) / rx) ** 2 + ((y - cy) / ry) ** 2 <= 1;

function buildGrid(): string[][] {
  const g: string[][] = Array.from({ length: H }, () => Array<string>(W).fill(' '));

  // 1) 背景:上部ほど暗い縦グラデ
  for (let y = 0; y < H; y++) {
    for (let x = 0; x < W; x++) {
      g[y][x] = y < 14 ? 'K' : 'k';
    }
  }

  // 2) 顔(楕円)+ ライティング(光源は左上)
  const fcx = 16,
    fcy = 19;
  const frx = 7.5,
    fry = 9.5;
  for (let y = 0; y < H; y++) {
    for (let x = 0; x < W; x++) {
      if (inEllipse(x, y, fcx, fcy, frx, fry)) {
        const dx = (x - fcx) / frx;
        const dy = (y - fcy) / fry;
        // 表面法線近似:楕円中心からの方向ベクトル
        const nrm = Math.sqrt(dx * dx + dy * dy) || 1;
        const nx = dx / nrm;
        const ny = dy / nrm;
        // ライト方向(左上 → 右下に進む):正規化
        // dot(光源方向, 法線) で輝度
        const lx = -0.7,
          ly = -0.7;
        const dot = nx * lx + ny * ly;
        if (dot > 0.55) g[y][x] = 'l';
        else if (dot > 0.25) g[y][x] = 'L';
        else if (dot > -0.05) g[y][x] = 'S';
        else if (dot > -0.35) g[y][x] = 's';
        else if (dot > -0.6) g[y][x] = 'd';
        else g[y][x] = 'D';
      }
    }
  }

  // 頬骨の僅かなハイライト(左側)
  g[20][12] = 'L';
  g[21][12] = 'L';
  g[20][11] = 'S';

  // 3) 髪(楕円 + 前髪ライン)
  // 髪の本体:頭頂を中心に大きめの楕円、Y < 14 を主領域
  for (let y = 0; y < H; y++) {
    for (let x = 0; x < W; x++) {
      const isMain = inEllipse(x, y, 16, 11, 8.5, 7.5) && y < 16;
      // 前髪の流れ(左寄りに分け目)
      const isBang =
        y >= 11 &&
        y < 18 &&
        Math.abs(x - 16) < 8 &&
        // 左サイドを長めに:右へいくほど高い位置で終わる斜め境界
        x * 0.45 + (16 - y * 0.6) > 5 &&
        x < 24;
      if ((isMain || isBang) && g[y][x] !== ' ') {
        // 髪の陰影
        const dx = x - 16,
          dy = y - 11;
        const len = Math.sqrt(dx * dx + dy * dy) || 1;
        const lit = (-dx * 0.6 + -dy * 0.5) / len;
        // 中央(分け目)はやや明るく
        if (Math.abs(x - 14) <= 1 && y >= 10 && y <= 13) g[y][x] = 'g';
        else if (lit > 0.5 && y < 11) g[y][x] = 'g';
        else if (lit > 0.1) g[y][x] = 'G';
        else if (lit > -0.3) g[y][x] = 'h';
        else g[y][x] = 'H';
      }
    }
  }

  // 4) 眉(困り顔=内側が上がるV字)
  // 左眉
  const drawBrow = (xs: number, dir: 1 | -1) => {
    for (let i = 0; i < 5; i++) {
      const bx = xs + i * dir;
      const by = 16 - Math.floor(i * 0.55);
      if (g[by] && g[by][bx] && g[by][bx] !== ' ' && g[by][bx] !== 'K' && g[by][bx] !== 'k') {
        g[by][bx] = i < 4 ? 'E' : 'e';
        // 眉の毛流れの下にうっすら影
        if (g[by + 1] && g[by + 1][bx] && (g[by + 1][bx] === 'S' || g[by + 1][bx] === 'L'))
          g[by + 1][bx] = 's';
      }
    }
  };
  drawBrow(11, 1); // 左眉(顔向きで左 = 画面右?いや左眉=画面右側)
  drawBrow(20, -1); // 右眉

  // 5) 目
  // 左目(画面左、x=12-14, y=18-19)
  const drawEye = (ex: number, ey: number, mirror: boolean) => {
    // 白目
    for (let dx = 0; dx < 3; dx++) {
      g[ey][ex + dx] = 'W';
      g[ey + 1][ex + dx] = 'W';
    }
    // 白目の影(下まぶた側)
    g[ey + 1][ex] = 'w';
    g[ey + 1][ex + 2] = 'w';
    // 虹彩(中央2x2)
    g[ey][ex + 1] = 'I';
    g[ey + 1][ex + 1] = 'I';
    // 瞳(1ピクセル)
    g[ey + 1][ex + 1] = 'P';
    // ハイライト(左目は右上、右目は左上にして人間味を出す)
    g[ey][mirror ? ex : ex + 1] = 'X';
    // 上まぶたのまつ毛(ライン)
    g[ey - 1][ex] = 'E';
    g[ey - 1][ex + 1] = 'E';
    g[ey - 1][ex + 2] = 'E';
    // 涙袋〜クマ(疲れ目)
    g[ey + 2][ex] = 's';
    g[ey + 2][ex + 1] = 'd';
    g[ey + 2][ex + 2] = 's';
  };
  drawEye(12, 18, false); // 左目
  drawEye(18, 18, true); // 右目

  // 6) 鼻(右側に陰影。鼻筋は明るく)
  g[20][16] = 'L';
  g[21][16] = 'L';
  g[22][16] = 'S';
  g[22][17] = 's';
  g[23][16] = 's';
  g[23][17] = 'd';
  g[24][15] = 's';
  g[24][16] = 'd';
  g[24][17] = 's';

  // 7) 口(少し開いた、不安げ)
  // 上唇
  g[27][14] = 'M';
  g[27][15] = 'N';
  g[27][16] = 'M';
  g[27][17] = 'N';
  g[27][18] = 'M';
  // 口の中(暗)
  g[28][14] = 'm';
  g[28][15] = 'm';
  g[28][16] = 'm';
  g[28][17] = 'm';
  g[28][18] = 'm';
  // 下唇
  g[29][14] = 's';
  g[29][15] = 'M';
  g[29][16] = 'N';
  g[29][17] = 'M';
  g[29][18] = 's';

  // 口角の影
  g[28][13] = 's';
  g[28][19] = 's';

  // 8) 額の汗(右側、依頼人の動揺)
  g[14][22] = 'J';
  g[15][22] = 'J';
  g[15][21] = 'j'; // ハイライト

  // 9) 顎下の影 + 首
  for (let x = 12; x <= 19; x++) {
    if (g[29] && g[29][x] === ' ') g[29][x] = ' ';
    if (g[30] && g[30][x] !== ' ' && g[30][x] !== 'K' && g[30][x] !== 'k') g[30][x] = 's';
  }
  // 首
  for (let y = 30; y < 33; y++) {
    for (let x = 13; x < 19; x++) {
      g[y][x] = y === 30 ? 'D' : x === 13 || x === 18 ? 'd' : 'S';
    }
  }

  // 10) ワイシャツ + 襟(三角の襟)
  for (let y = 33; y < H; y++) {
    for (let x = 0; x < W; x++) {
      const dx = x - 16;
      const widen = (y - 33) * 1.6 + 5;
      if (Math.abs(dx) < widen) {
        // 端は陰
        if (Math.abs(dx) > widen - 1.5) g[y][x] = 'r';
        else if (Math.abs(dx) > widen - 3) g[y][x] = 'R';
        else g[y][x] = 'R';
      }
    }
  }
  // 襟(V字)
  for (let i = 0; i < 4; i++) {
    g[33 + i][16 - 2 - i] = 'r';
    g[33 + i][16 + 2 + i] = 'r';
    g[33 + i][16 - 1 - i] = 'R';
    g[33 + i][16 + 1 + i] = 'R';
  }
  // 襟の中(肌が見える三角)
  for (let i = 0; i < 3; i++) {
    for (let dx = -i; dx <= i; dx++) {
      g[33 + i][16 + dx] = 'S';
    }
  }

  // 11) ネクタイ(緩く、結び目が斜め)
  // 結び目
  g[34][15] = 't';
  g[34][16] = 'T';
  g[34][17] = 'u';
  g[35][14] = 't';
  g[35][15] = 'T';
  g[35][16] = 'T';
  g[35][17] = 'T';
  g[35][18] = 'u';
  // 縦の本体
  for (let y = 36; y < H; y++) {
    g[y][15] = 't';
    g[y][16] = 'T';
    g[y][17] = 'u';
  }

  return g;
}

export default function PixelPortrait({ size = 256 }: { size?: number }) {
  const grid = useMemo(() => buildGrid(), []);
  const px = size / W;

  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      width={size}
      height={(size * H) / W}
      shapeRendering="crispEdges"
      style={{ imageRendering: 'pixelated', display: 'block' }}
      aria-label="山田さん(困り顔の依頼人)"
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
