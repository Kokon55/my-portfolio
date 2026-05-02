'use client';

import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip, ReferenceLine, ReferenceArea, Legend } from 'recharts';
import { mean, stddev, binomialDistribution, simulateGachaMany } from '@/lib/stats';

// 「自分が操作することで数学を理解する」サンドボックス。
// シナリオごとに、複数のスライダーを動かすと、
// 結果がリアルタイムで複数のグラフ・統計量に反映される。

export type SandboxScenario =
  // ケース1向け:bot 比率と平均いいね数の連動
  | { kind: 'bot_engagement'; baseFollowers: number; baseLikes: number }
  // ケース2向け:n と p を動かして二項分布の形を観察
  | { kind: 'binomial_shape'; nDefault: number; pDefault: number }
  // ケース2向け:大数の法則を体感(試行回数とゆらぎの関係)
  | { kind: 'law_of_large_numbers'; rate: number };

type Props = {
  scenario: SandboxScenario;
  task: string; // タスク文(発見してほしいパターン)
  successCheck?: (state: Record<string, number>) => boolean;
  successMessage?: string;
};

export default function MathSandbox({ scenario, task, successCheck, successMessage }: Props) {
  if (scenario.kind === 'bot_engagement') {
    return <BotEngagementSandbox scenario={scenario} task={task} successCheck={successCheck} successMessage={successMessage} />;
  }
  if (scenario.kind === 'binomial_shape') {
    return <BinomialShapeSandbox scenario={scenario} task={task} successCheck={successCheck} successMessage={successMessage} />;
  }
  return <LLNSandbox scenario={scenario} task={task} />;
}

// ─────────────── bot 比率サンドボックス ───────────────
function BotEngagementSandbox({
  scenario, task, successCheck, successMessage,
}: { scenario: Extract<SandboxScenario, { kind: 'bot_engagement' }>; task: string; successCheck?: (s: Record<string, number>) => boolean; successMessage?: string; }) {
  const [botRatio, setBotRatio] = useState(0);
  const [followers, setFollowers] = useState(scenario.baseFollowers);
  const [likes, setLikes] = useState(scenario.baseLikes);

  const realFollowers = Math.round(followers * (1 - botRatio));
  const apparentRate = likes / followers;
  const realRate = realFollowers > 0 ? likes / realFollowers : 0;

  const succeeded = successCheck?.({ botRatio, followers, likes, realRate, apparentRate }) ?? false;

  return (
    <div className="space-y-3">
      <div className="rounded-xl bg-amber-950/20 border border-amber-700/40 p-3 text-sm text-amber-100">
        🎯 <b>あなたのタスク:</b> {task}
      </div>

      <div className="rounded-xl bg-slate-950/70 border border-slate-800 p-4 space-y-4">
        <SliderRow label="フォロワー数" value={followers} min={1000} max={500000} step={1000} onChange={setFollowers} format={(v) => v.toLocaleString()} />
        <SliderRow label="平均いいね数" value={likes} min={100} max={50000} step={100} onChange={setLikes} format={(v) => v.toLocaleString()} />
        <SliderRow label="bot 比率" value={Math.round(botRatio * 100)} min={0} max={90} step={1} onChange={(v) => setBotRatio(v / 100)} format={(v) => `${v}%`} />
      </div>

      {/* リアルタイム結果 */}
      <div className="grid grid-cols-2 gap-2">
        <ResultBox label="表面エンゲージ率" value={`${(apparentRate * 100).toFixed(2)}%`} dim />
        <ResultBox label="真のエンゲージ率" value={`${(realRate * 100).toFixed(2)}%`} highlight={realRate > 0.05} alert={realRate < 0.02 && botRatio > 0} />
      </div>

      <div className="rounded-xl bg-slate-950/70 border border-slate-800 p-3">
        <div className="text-[11px] text-slate-500 mb-1">フォロワー内訳</div>
        <div className="h-6 rounded-lg overflow-hidden flex">
          <motion.div
            className="bg-emerald-500 flex items-center justify-center text-[10px] text-emerald-950 font-bold"
            animate={{ width: `${(1 - botRatio) * 100}%` }}
            transition={{ duration: 0.3 }}
          >
            実 {realFollowers.toLocaleString()}
          </motion.div>
          <motion.div
            className="bg-rose-500 flex items-center justify-center text-[10px] text-rose-950 font-bold"
            animate={{ width: `${botRatio * 100}%` }}
            transition={{ duration: 0.3 }}
          >
            {botRatio > 0.1 ? `bot ${(followers - realFollowers).toLocaleString()}` : ''}
          </motion.div>
        </div>
      </div>

      {succeeded && successMessage && (
        <motion.div
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-xl bg-emerald-950/40 border border-emerald-700 p-3 text-sm text-emerald-100"
        >
          ✓ 発見:{successMessage}
        </motion.div>
      )}

      <div className="text-xs text-slate-500 italic">
        💡 スライダーを動かして、bot 比率が「真のエンゲージ率」をどう破壊するか試してみよう。
      </div>
    </div>
  );
}

// ─────────────── 二項分布サンドボックス ───────────────
function BinomialShapeSandbox({
  scenario, task, successCheck, successMessage,
}: { scenario: Extract<SandboxScenario, { kind: 'binomial_shape' }>; task: string; successCheck?: (s: Record<string, number>) => boolean; successMessage?: string; }) {
  const [n, setN] = useState(scenario.nDefault);
  const [p, setP] = useState(scenario.pDefault);

  const data = useMemo(() => {
    const dist = binomialDistribution(n, p);
    const limit = Math.min(dist.length, Math.max(15, Math.ceil(n * p * 4)));
    return dist.slice(0, limit).map((prob, k) => ({ k, prob: prob * 100 }));
  }, [n, p]);

  const expected = n * p;
  const variance = n * p * (1 - p);
  const sd = Math.sqrt(variance);
  const zeroProb = Math.pow(1 - p, n) * 100;

  const succeeded = successCheck?.({ n, p, expected, variance, zeroProb }) ?? false;

  return (
    <div className="space-y-3">
      <div className="rounded-xl bg-amber-950/20 border border-amber-700/40 p-3 text-sm text-amber-100">
        🎯 <b>あなたのタスク:</b> {task}
      </div>

      <div className="rounded-xl bg-slate-950/70 border border-slate-800 p-4 space-y-4">
        <SliderRow label="試行回数 n" value={n} min={10} max={500} step={10} onChange={setN} format={(v) => `${v} 回`} />
        <SliderRow label="確率 p" value={p * 1000} min={1} max={200} step={1} onChange={(v) => setP(v / 1000)} format={() => `${(p * 100).toFixed(1)}%`} />
      </div>

      <div className="grid grid-cols-3 gap-2 text-center">
        <ResultBox label="期待値 np" value={expected.toFixed(2)} highlight />
        <ResultBox label="標準偏差 σ" value={sd.toFixed(2)} />
        <ResultBox label="0個の確率" value={`${zeroProb.toFixed(1)}%`} alert={zeroProb > 30} />
      </div>

      <div className="rounded-xl bg-slate-950/70 border border-slate-800 p-2">
        <div className="text-[11px] text-slate-500 px-2 mb-1">k 個出る確率の分布(縦軸:%)</div>
        <ResponsiveContainer width="100%" height={200}>
          <BarChart data={data}>
            <XAxis dataKey="k" tick={{ fill: '#94a3b8', fontSize: 10 }} />
            <YAxis tick={{ fill: '#94a3b8', fontSize: 10 }} tickFormatter={(v) => `${v.toFixed(0)}%`} />
            <Tooltip contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #334155', fontSize: 12 }} formatter={(v: number) => `${v.toFixed(2)}%`} />
            <Bar dataKey="prob" fill="#f59e0b" />
            <ReferenceLine x={Math.round(expected)} stroke="#dc2626" strokeDasharray="3 3" label={{ value: '期待値', fill: '#dc2626', fontSize: 10 }} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {succeeded && successMessage && (
        <motion.div
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-xl bg-emerald-950/40 border border-emerald-700 p-3 text-sm text-emerald-100"
        >
          ✓ 発見:{successMessage}
        </motion.div>
      )}

      <div className="text-xs text-slate-500 italic">
        💡 n や p を動かして、「期待値が同じでも分布の形が変わる」ことを観察しよう。
      </div>
    </div>
  );
}

// ─────────────── 大数の法則サンドボックス ───────────────
function LLNSandbox({
  scenario, task,
}: { scenario: Extract<SandboxScenario, { kind: 'law_of_large_numbers' }>; task: string; }) {
  const [trials, setTrials] = useState(100);
  const [seed, setSeed] = useState(1);

  const samples = useMemo(() => {
    // trials 個の独立試行を行い、累積平均を返す
    const out: { i: number; cumRate: number; theoreticalRate: number }[] = [];
    let hits = 0;
    // mulberry32 シード
    let state = seed >>> 0;
    for (let i = 1; i <= trials; i++) {
      state = (state + 0x6d2b79f5) >>> 0;
      let t = state;
      t = Math.imul(t ^ (t >>> 15), t | 1);
      t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
      const r = ((t ^ (t >>> 14)) >>> 0) / 4294967296;
      if (r < scenario.rate) hits++;
      out.push({ i, cumRate: (hits / i) * 100, theoreticalRate: scenario.rate * 100 });
    }
    return out;
  }, [trials, seed, scenario.rate]);

  const finalRate = samples[samples.length - 1]?.cumRate ?? 0;
  const deviation = Math.abs(finalRate - scenario.rate * 100);

  return (
    <div className="space-y-3">
      <div className="rounded-xl bg-amber-950/20 border border-amber-700/40 p-3 text-sm text-amber-100">
        🎯 <b>あなたのタスク:</b> {task}
      </div>

      <div className="rounded-xl bg-slate-950/70 border border-slate-800 p-4 space-y-3">
        <SliderRow label="試行回数" value={trials} min={10} max={5000} step={10} onChange={setTrials} format={(v) => `${v.toLocaleString()} 回`} />
        <button
          onClick={() => setSeed((s) => s + 1)}
          className="w-full px-3 py-2 rounded-lg bg-slate-800 text-slate-200 text-sm"
        >
          🎲 もう一度試す(別の乱数で)
        </button>
      </div>

      <div className="grid grid-cols-3 gap-2 text-center">
        <ResultBox label="理論値" value={`${(scenario.rate * 100).toFixed(1)}%`} dim />
        <ResultBox label="今回の結果" value={`${finalRate.toFixed(2)}%`} highlight />
        <ResultBox label="ずれ" value={`±${deviation.toFixed(2)}%`} alert={deviation > 5} />
      </div>

      <div className="rounded-xl bg-slate-950/70 border border-slate-800 p-2">
        <div className="text-[11px] text-slate-500 px-2 mb-1">試行回数を重ねるほど、理論値に近づく</div>
        <ResponsiveContainer width="100%" height={220}>
          <LineChart data={samples}>
            <XAxis dataKey="i" tick={{ fill: '#94a3b8', fontSize: 10 }} />
            <YAxis tick={{ fill: '#94a3b8', fontSize: 10 }} tickFormatter={(v) => `${v.toFixed(1)}%`} />
            <Tooltip contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #334155', fontSize: 12 }} formatter={(v: number) => `${v.toFixed(2)}%`} />
            <Legend wrapperStyle={{ fontSize: 11 }} />
            <Line type="monotone" dataKey="cumRate" stroke="#f59e0b" name="累積出現率" dot={false} strokeWidth={2} />
            <Line type="monotone" dataKey="theoreticalRate" stroke="#dc2626" name="理論値" dot={false} strokeDasharray="4 4" />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="text-xs text-slate-500 italic">
        💡 試行回数を 100 → 1000 → 5000 と動かして、「ずれ」がどう減るか観察しよう。
      </div>
    </div>
  );
}

// ─────────────── 部品 ───────────────
function SliderRow({
  label, value, min, max, step, onChange, format,
}: { label: string; value: number; min: number; max: number; step: number; onChange: (v: number) => void; format?: (v: number) => string; }) {
  return (
    <div>
      <div className="flex justify-between text-xs text-slate-300 mb-1">
        <span>{label}</span>
        <span className="text-amber-accent font-bold">{format ? format(value) : value}</span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full"
      />
    </div>
  );
}

function ResultBox({ label, value, highlight, alert, dim }: { label: string; value: string; highlight?: boolean; alert?: boolean; dim?: boolean; }) {
  return (
    <div className={`rounded-lg border p-2 ${
      alert ? 'bg-rose-950/40 border-rose-700' :
      highlight ? 'bg-amber-950/30 border-amber-700/60' :
      'bg-slate-950/70 border-slate-800'
    }`}>
      <div className={`text-base font-bold ${alert ? 'text-rose-300' : highlight ? 'text-amber-accent' : dim ? 'text-slate-500' : 'text-slate-100'}`}>
        {value}
      </div>
      <div className="text-[10px] text-slate-500">{label}</div>
    </div>
  );
}
