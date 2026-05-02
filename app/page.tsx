'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import cases from '@/content/cases';
import CaseList from '@/components/ui/CaseList';
import { useDetectiveStore } from '@/lib/store';
import { IS_FREE_MODE } from '@/lib/config';

export default function HomePage() {
  const isPurchased = useDetectiveStore((s) => s.isPurchased);
  const solvedCases = useDetectiveStore((s) => s.solvedCases);
  const [hydrated, setHydrated] = useState(false);
  useEffect(() => setHydrated(true), []);

  const playable = cases.filter((c) => !c.comingSoon).length;
  const total = cases.length;

  return (
    <main className="min-h-screen bg-paper">
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-slate-800">
        <div className="absolute inset-0 bg-gradient-to-br from-navy via-slate-950 to-slate-950" />
        <div className="absolute inset-0 opacity-30 bg-[radial-gradient(circle_at_30%_20%,rgba(245,158,11,0.15),transparent_60%)]" />
        <div className="relative max-w-3xl mx-auto px-4 py-16 sm:py-24 text-center">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-block text-[11px] text-amber-accent uppercase tracking-widest border border-amber-accent/40 rounded-full px-3 py-1 mb-6"
          >
            データ探偵 SNS編
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="font-detective text-4xl sm:text-6xl font-bold text-slate-100 leading-tight"
          >
            SNSの数字に、
            <br />
            <span className="text-amber-accent glow-amber">嘘がある。</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25 }}
            className="text-sm sm:text-base text-slate-300 mt-6 max-w-xl mx-auto leading-relaxed"
          >
            バズ、フォロワー、ガチャ、レビュー、世論調査 ——
            <br className="hidden sm:block" />
            SNSとネットの謎を、<b className="text-slate-100">高校数学</b>で解き明かす探偵ゲーム。
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mt-8 flex flex-col sm:flex-row gap-3 justify-center"
          >
            <Link
              href="/case/case-01-buzz"
              className="px-6 py-3.5 rounded-xl bg-amber-accent text-slate-900 font-bold active:scale-95 transition shadow-lg shadow-amber-500/20"
            >
              {IS_FREE_MODE ? '第1の事件を始める' : '無料で第1の事件を体験'}
            </Link>
            {!IS_FREE_MODE && (
              <Link
                href="/purchase"
                className="px-6 py-3.5 rounded-xl bg-slate-800 border border-slate-700 text-slate-100 font-semibold hover:bg-slate-700 active:scale-95 transition"
              >
                2,480円で全事件購入 →
              </Link>
            )}
          </motion.div>

          <p className="text-[11px] text-slate-500 mt-4">
            {IS_FREE_MODE
              ? `モバイル最適化 / 全${total}ケース完全網羅(数学I・A・B)`
              : `買い切り / 永久アクセス / モバイル最適化 / 全${total}ケース完全網羅(数学I・A・B)`}
          </p>
        </div>
      </section>

      {/* ケース一覧 */}
      <section className="max-w-3xl mx-auto px-4 py-12">
        <div className="text-center mb-8">
          <div className="text-xs text-amber-accent uppercase tracking-widest">事件簿</div>
          <h2 className="font-detective text-2xl sm:text-3xl text-slate-100 mt-1">
            あなたを待つ、6つの事件
          </h2>
          <p className="text-xs text-slate-500 mt-2">
            プレイ可能 {playable} 件 / 全 {total} 件(残りは順次追加)
          </p>
        </div>

        <CaseList
          cases={cases}
          isPurchased={hydrated ? isPurchased : false}
          solvedCases={hydrated ? solvedCases : []}
        />
      </section>

      {/* 価値提案 */}
      <section className="border-y border-slate-800 bg-slate-950/40">
        <div className="max-w-3xl mx-auto px-4 py-12">
          <h2 className="font-detective text-2xl text-slate-100 text-center mb-6">こんな人へ</h2>
          <div className="grid sm:grid-cols-2 gap-3">
            {[
              ['📈', 'SNSマーケで数字を扱う人', 'エンゲージ率と分布の罠を、自分の言葉で説明できるようになる'],
              ['🤔', 'ネットの数字に違和感を感じる人', '「★4.8アプリ」「80%支持」の嘘を、その場で見抜ける'],
              ['🎰', 'ガチャに課金してしまう人', '期待値と分散の罠から自分を守る'],
              ['📚', '数学が苦手だった大人', '「事件 → 必要に迫られて学ぶ」順序で、教科書では身につかなかった統計が腹落ち'],
              ['🎓', '統計検定を目指す人', '高校数学I・A・B の統計分野を実戦演習として総ざらい'],
              ['👨‍👩‍👧', '子供のSNS利用が心配な保護者', 'デジタル時代を生き抜く「数字を疑う目」を、家庭で身につける'],
            ].map(([icon, title, desc]) => (
              <div key={title} className="rounded-xl border border-slate-800 bg-slate-950/60 p-4">
                <div className="text-2xl mb-1">{icon}</div>
                <h3 className="font-semibold text-slate-100">{title}</h3>
                <p className="text-xs text-slate-400 mt-1 leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 商品哲学 */}
      <section className="max-w-3xl mx-auto px-4 py-12">
        <h2 className="font-detective text-2xl text-slate-100 text-center mb-6">
          このゲームの作り方
        </h2>
        <div className="grid sm:grid-cols-2 gap-4">
          <Tile no="01" title="事件 → 必要に迫られて学ぶ">
            「教科書 → 演習」ではなく「謎 → 道具」。各ケースは依頼人から始まり、「この事件を解くには〇〇が必要」と数学の道具が手渡される。
          </Tile>
          <Tile no="02" title="数式アレルギーに優しい">
            最初はギリシャ文字を出さない。「平均」「ばらつき」など日常語で導入。記号は途中で「ちなみに記号で書くと σ」と補足。
          </Tile>
          <Tile no="03" title="モバイル最優先・5〜10分完走">
            スマホ縦画面の片手操作を最優先。SNSアプリと同じ体験。1ケースは5〜10分で完走。
          </Tile>
          <Tile no="04" title="解いた瞬間に「使える」実感">
            各ケース終わりに「あなたは今これができるようになった」を明示。獲得バッジで進捗が見える。
          </Tile>
        </div>
      </section>

      <footer className="border-t border-slate-800 py-8 text-center text-xs text-slate-500">
        © データ探偵 / SNS編 — 高校数学で読み解くSNS時代のリテラシー
        <div className="mt-1 text-[10px] text-slate-600">本作品に登場するSNS・企業・ゲームは全て架空のものです</div>
      </footer>
    </main>
  );
}

function Tile({ no, title, children }: { no: string; title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-xl border border-slate-800 bg-gradient-to-br from-slate-900 to-slate-950 p-5">
      <div className="text-amber-accent text-3xl font-detective leading-none">{no}</div>
      <h3 className="font-detective font-bold text-lg text-slate-100 mt-2">{title}</h3>
      <p className="text-sm text-slate-400 mt-1 leading-relaxed">{children}</p>
    </div>
  );
}
