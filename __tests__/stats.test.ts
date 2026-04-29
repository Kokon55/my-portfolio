import {
  mean,
  variance,
  stddev,
  median,
  engagementRate,
  binomialPMF,
  binomialCDF,
  probabilityOfZeroHits,
  probabilityOfAtLeastOne,
  binomialExpectation,
  binomialDistribution,
  SeededRng,
  simulateGachaMany,
  linearityScore,
  histogram,
  zScore,
} from '../lib/stats';

const close = (a: number, b: number, eps = 1e-6) => Math.abs(a - b) < eps;

describe('basic statistics', () => {
  test('mean works', () => {
    expect(mean([1, 2, 3, 4, 5])).toBe(3);
    expect(mean([])).toBe(0);
  });

  test('variance and stddev', () => {
    // values: 1,2,3,4,5; mean=3; squared diffs sum = 4+1+0+1+4=10; var=10/5=2
    expect(variance([1, 2, 3, 4, 5])).toBeCloseTo(2, 6);
    expect(stddev([1, 2, 3, 4, 5])).toBeCloseTo(Math.sqrt(2), 6);
  });

  test('median', () => {
    expect(median([3, 1, 4, 1, 5, 9, 2, 6])).toBe(3.5);
    expect(median([7])).toBe(7);
  });

  test('engagement rate', () => {
    expect(engagementRate(5000, 100000)).toBeCloseTo(0.05, 6);
    expect(engagementRate(3000, 30000)).toBeCloseTo(0.1, 6);
    expect(engagementRate(10, 0)).toBe(0);
  });
});

describe('binomial distribution - 検算3パターン以上', () => {
  // パターン1: n=10, p=0.5 (二項分布の対称ケース)
  // P(X=5) = C(10,5) * 0.5^10 = 252 * (1/1024) ≈ 0.24609375
  test('pattern 1: n=10, p=0.5, k=5', () => {
    expect(binomialPMF(10, 5, 0.5)).toBeCloseTo(252 / 1024, 8);
  });

  // パターン2: n=100, p=0.01 (ガチャ100連、SSR排出率1%)
  // P(X=0) = (0.99)^100 ≈ 0.36603234
  test('pattern 2: 100連 排出率1%、0個出る確率', () => {
    expect(probabilityOfZeroHits(100, 0.01)).toBeCloseTo(0.366032341, 6);
    expect(binomialPMF(100, 0, 0.01)).toBeCloseTo(0.366032341, 6);
  });

  // パターン3: n=100, p=0.01, k=1
  // P(X=1) = 100 * 0.01 * 0.99^99 ≈ 0.36972953
  test('pattern 3: 100連 排出率1%、1個出る確率', () => {
    expect(binomialPMF(100, 1, 0.01)).toBeCloseTo(0.36972953, 6);
  });

  // パターン4: n=200, p=0.005 (排出率0.5%、200連)
  // 期待値1個。0個出る確率 = (0.995)^200 ≈ 0.36695822
  test('pattern 4: n=200, p=0.005, P(X=0)', () => {
    expect(probabilityOfZeroHits(200, 0.005)).toBeCloseTo(0.366958, 5);
  });

  // パターン5: 排出率0.5%、100連で0個の確率 ≈ 60.58%
  test('pattern 5: n=100, p=0.005, P(X=0) ≈ 0.6058', () => {
    expect(probabilityOfZeroHits(100, 0.005)).toBeCloseTo(0.605770, 5);
  });

  test('CDF 単調増加 & 末端は1', () => {
    let prev = 0;
    for (let k = 0; k <= 10; k++) {
      const cdf = binomialCDF(10, k, 0.3);
      expect(cdf).toBeGreaterThanOrEqual(prev);
      prev = cdf;
    }
    expect(binomialCDF(10, 10, 0.3)).toBeCloseTo(1, 8);
  });

  test('期待値 = np', () => {
    expect(binomialExpectation(100, 0.01)).toBe(1);
    expect(binomialExpectation(1000, 0.005)).toBe(5);
  });

  test('分布の合計は1', () => {
    const dist = binomialDistribution(50, 0.1);
    const sum = dist.reduce((a, b) => a + b, 0);
    expect(close(sum, 1, 1e-8)).toBe(true);
  });

  test('少なくとも1回 = 1 - P(0)', () => {
    expect(probabilityOfAtLeastOne(100, 0.01)).toBeCloseTo(
      1 - 0.366032341,
      6
    );
  });
});

describe('SeededRng - 再現性', () => {
  test('同じシードなら同じ列', () => {
    const a = new SeededRng(42);
    const b = new SeededRng(42);
    for (let i = 0; i < 100; i++) {
      expect(a.next()).toBe(b.next());
    }
  });

  test('値域は[0,1)', () => {
    const rng = new SeededRng(1);
    for (let i = 0; i < 1000; i++) {
      const v = rng.next();
      expect(v).toBeGreaterThanOrEqual(0);
      expect(v).toBeLessThan(1);
    }
  });
});

describe('ガチャシミュレーション 大数の法則', () => {
  test('1万回シミュレーション、平均は理論値に近い', () => {
    // 1万試行、各100連、p=0.01 → 期待値 1.0
    const results = simulateGachaMany(10000, 100, 0.01, 7);
    const m = mean(results);
    // 大数の法則により ±0.1 程度に収束
    expect(Math.abs(m - 1.0)).toBeLessThan(0.1);
  });

  test('0個出る試行の割合が理論値(36.6%)に収束', () => {
    const results = simulateGachaMany(10000, 100, 0.01, 13);
    const zeros = results.filter((x) => x === 0).length / results.length;
    expect(Math.abs(zeros - 0.366)).toBeLessThan(0.03);
  });
});

describe('SNSデータ分析', () => {
  test('linearityScore: 完全に線形 → R²≈1', () => {
    const ys = [10, 20, 30, 40, 50, 60, 70];
    expect(linearityScore(ys)).toBeCloseTo(1, 8);
  });

  test('linearityScore: ノイズが多い → R²が下がる', () => {
    const ys = [10, 50, 30, 80, 20, 100, 40];
    const s = linearityScore(ys);
    expect(s).toBeLessThan(0.7);
    expect(s).toBeGreaterThanOrEqual(0);
  });

  test('histogram の合計はデータ数と等しい', () => {
    const data = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    const h = histogram(data, 5);
    expect(h.reduce((a, b) => a + b.count, 0)).toBe(data.length);
    expect(h.length).toBe(5);
  });

  test('zScore: 平均値はz=0', () => {
    const data = [1, 2, 3, 4, 5];
    expect(zScore(3, data)).toBeCloseTo(0, 8);
  });
});
