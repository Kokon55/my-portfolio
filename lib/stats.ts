// データ探偵 - 統計計算ユーティリティ
// 全関数は副作用なし。テスト容易性最優先。

export const mean = (xs: readonly number[]): number => {
  if (xs.length === 0) return 0;
  let s = 0;
  for (const x of xs) s += x;
  return s / xs.length;
};

export const variance = (xs: readonly number[]): number => {
  if (xs.length === 0) return 0;
  const m = mean(xs);
  let s = 0;
  for (const x of xs) s += (x - m) * (x - m);
  return s / xs.length;
};

export const stddev = (xs: readonly number[]): number => Math.sqrt(variance(xs));

export const median = (xs: readonly number[]): number => {
  if (xs.length === 0) return 0;
  const s = [...xs].sort((a, b) => a - b);
  const m = Math.floor(s.length / 2);
  return s.length % 2 === 0 ? (s[m - 1] + s[m]) / 2 : s[m];
};

export const min = (xs: readonly number[]): number =>
  xs.length === 0 ? 0 : xs.reduce((a, b) => (a < b ? a : b));
export const max = (xs: readonly number[]): number =>
  xs.length === 0 ? 0 : xs.reduce((a, b) => (a > b ? a : b));

// エンゲージメント率 = いいね数 / フォロワー数
export const engagementRate = (likes: number, followers: number): number => {
  if (followers <= 0) return 0;
  return likes / followers;
};

// 整数で大きい階乗を扱うため、対数を使う(コンビネーション)
export const logFactorial = (n: number): number => {
  if (n < 0 || !Number.isFinite(n)) return NaN;
  if (n < 2) return 0;
  let s = 0;
  for (let k = 2; k <= n; k++) s += Math.log(k);
  return s;
};

export const logCombination = (n: number, k: number): number => {
  if (k < 0 || k > n) return -Infinity;
  return logFactorial(n) - logFactorial(k) - logFactorial(n - k);
};

// 二項分布 P(X = k) で n試行、確率p
export const binomialPMF = (n: number, k: number, p: number): number => {
  if (k < 0 || k > n) return 0;
  if (p <= 0) return k === 0 ? 1 : 0;
  if (p >= 1) return k === n ? 1 : 0;
  const logP =
    logCombination(n, k) + k * Math.log(p) + (n - k) * Math.log(1 - p);
  return Math.exp(logP);
};

// 二項累積分布 P(X <= k)
export const binomialCDF = (n: number, k: number, p: number): number => {
  if (k < 0) return 0;
  if (k >= n) return 1;
  let s = 0;
  for (let i = 0; i <= k; i++) s += binomialPMF(n, i, p);
  return s;
};

// 1個も出ない確率: P(X = 0) = (1-p)^n
export const probabilityOfZeroHits = (n: number, p: number): number => {
  if (p <= 0) return 1;
  if (p >= 1) return 0;
  return Math.pow(1 - p, n);
};

// 少なくとも1個出る確率
export const probabilityOfAtLeastOne = (n: number, p: number): number =>
  1 - probabilityOfZeroHits(n, p);

// 期待値 (二項分布)
export const binomialExpectation = (n: number, p: number): number => n * p;

// k個ちょうど出る確率の分布を返す配列(k = 0..n)
export const binomialDistribution = (n: number, p: number): number[] => {
  const out = new Array<number>(n + 1);
  for (let k = 0; k <= n; k++) out[k] = binomialPMF(n, k, p);
  return out;
};

// 疑似乱数(線形合同法)。シードを指定可能。テストで再現性を確保。
export class SeededRng {
  private state: number;
  constructor(seed = 1) {
    this.state = seed >>> 0 || 1;
  }
  next(): number {
    // mulberry32
    this.state = (this.state + 0x6d2b79f5) >>> 0;
    let t = this.state;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  }
}

// ガチャシミュレーション(n連、確率p)。SSRが何個出たか返す
export const simulateGacha = (
  n: number,
  p: number,
  rng: { next: () => number } = Math.random as unknown as { next: () => number }
): number => {
  // Mathの場合とSeededRngの両方に対応
  const draw = typeof rng === 'function' ? (rng as unknown as () => number) : () => rng.next();
  let hits = 0;
  for (let i = 0; i < n; i++) {
    if (draw() < p) hits++;
  }
  return hits;
};

// 多数回のシミュレーションを実行(分布生成用)
export const simulateGachaMany = (
  trials: number,
  n: number,
  p: number,
  seed = 1
): number[] => {
  const rng = new SeededRng(seed);
  const results = new Array<number>(trials);
  for (let i = 0; i < trials; i++) {
    let hits = 0;
    for (let j = 0; j < n; j++) {
      if (rng.next() < p) hits++;
    }
    results[i] = hits;
  }
  return results;
};

// 「直線的すぎる成長」を判定するスコア(線形回帰の決定係数 R^2)
// SNSのフォロワー成長が「不自然に直線的」かを検出
export const linearityScore = (ys: readonly number[]): number => {
  const n = ys.length;
  if (n < 2) return 0;
  const xs = Array.from({ length: n }, (_, i) => i);
  const mx = mean(xs);
  const my = mean(ys);
  let num = 0;
  let denX = 0;
  let denY = 0;
  for (let i = 0; i < n; i++) {
    num += (xs[i] - mx) * (ys[i] - my);
    denX += (xs[i] - mx) ** 2;
    denY += (ys[i] - my) ** 2;
  }
  if (denX === 0 || denY === 0) return 0;
  const r = num / Math.sqrt(denX * denY);
  return r * r;
};

// 値域 0..1 をパーセント文字列に
export const toPct = (x: number, digits = 1): string =>
  `${(x * 100).toFixed(digits)}%`;

// ヒストグラム生成。bins 個の等幅ビンに振り分ける。
export const histogram = (
  values: readonly number[],
  bins: number,
  minVal?: number,
  maxVal?: number
): { bin: string; count: number; from: number; to: number }[] => {
  if (values.length === 0 || bins <= 0) return [];
  const lo = minVal ?? min(values);
  const hi = maxVal ?? max(values);
  const w = (hi - lo) / bins || 1;
  const buckets = Array.from({ length: bins }, (_, i) => ({
    from: lo + i * w,
    to: lo + (i + 1) * w,
    count: 0,
    bin: '',
  }));
  for (const v of values) {
    let idx = Math.floor((v - lo) / w);
    if (idx >= bins) idx = bins - 1;
    if (idx < 0) idx = 0;
    buckets[idx].count++;
  }
  for (const b of buckets) {
    b.bin = `${Math.round(b.from)}–${Math.round(b.to)}`;
  }
  return buckets;
};

// Z-score: 値の偏差(標準偏差で正規化)
export const zScore = (value: number, xs: readonly number[]): number => {
  const sd = stddev(xs);
  if (sd === 0) return 0;
  return (value - mean(xs)) / sd;
};
