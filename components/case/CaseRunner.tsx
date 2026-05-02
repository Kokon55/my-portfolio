'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { AnimatePresence, motion } from 'framer-motion';
import CaseStep from './CaseStep';
import ProgressBar from '../ui/ProgressBar';
import { useDetectiveStore } from '@/lib/store';
import { totalSteps } from '@/lib/progress';
import { getBGM, resolveTrackForCase } from '@/lib/bgm';
import { playSE, setSEMuted, setSEVolume } from '@/lib/se';
import type { Case } from '@/content/cases/types';

const actLabel: Record<string, string> = {
  commission: '第1幕 / 依頼',
  crime_scene: '第2幕 / 現場',
  investigation: '第3幕 / 捜査',
  deduction: '第4幕 / 推理',
  solution: '第5幕 / 解決',
};

const actBadge: Record<string, string> = {
  commission: 'bg-slate-800 text-slate-200',
  crime_scene: 'bg-blue-900/60 text-blue-200',
  investigation: 'bg-amber-900/60 text-amber-200',
  deduction: 'bg-rose-900/60 text-rose-200',
  solution: 'bg-emerald-900/60 text-emerald-200',
};

export default function CaseRunner({ caseDef }: { caseDef: Case }) {
  const router = useRouter();
  const setProgress = useDetectiveStore((s) => s.setProgress);
  const solveCase = useDetectiveStore((s) => s.solveCase);
  const soundEnabled = useDetectiveStore((s) => s.soundEnabled);
  const toggleSound = useDetectiveStore((s) => s.toggleSound);
  const bgmVolume = useDetectiveStore((s) => s.bgmVolume);
  const seVolume = useDetectiveStore((s) => s.seVolume);
  const setBgmVolume = useDetectiveStore((s) => s.setBgmVolume);
  const setSeVolumeStore = useDetectiveStore((s) => s.setSeVolume);

  const [actIdx, setActIdx] = useState(0);
  const [stepIdx, setStepIdx] = useState(0);
  const [bgmStarted, setBgmStarted] = useState(false);
  const [soundPanelOpen, setSoundPanelOpen] = useState(false);
  const [completedSteps, setCompletedSteps] = useState<Set<string>>(new Set());

  const act = caseDef.acts[actIdx];
  const step = act?.steps[stepIdx];

  let progressCount = 0;
  for (let a = 0; a < actIdx; a++) progressCount += caseDef.acts[a].steps.length;
  progressCount += stepIdx + 1;

  const isCurrentInteractive = step?.type === 'interactive' && !!step?.interaction;
  const isStepUnlocked = !isCurrentInteractive || completedSteps.has(step?.id ?? '');

  const markStepComplete = () => {
    if (!step) return;
    setCompletedSteps((prev) => {
      if (prev.has(step.id)) return prev;
      const next = new Set(prev);
      next.add(step.id);
      return next;
    });
  };

  useEffect(() => {
    setProgress(caseDef.id, actIdx, stepIdx);
  }, [caseDef.id, actIdx, stepIdx, setProgress]);

  // BGM:幕の type に応じてケース毎のトラックに切替
  useEffect(() => {
    if (!bgmStarted) return;
    const bgm = getBGM();
    bgm.setMuted(!soundEnabled);
    bgm.setBgmVolume(bgmVolume);
    if (soundEnabled && act) {
      const trackId = resolveTrackForCase(caseDef.id, act.type as 'commission' | 'crime_scene' | 'investigation' | 'deduction' | 'solution');
      bgm.playTrack(trackId);
    }
    return () => {
      // act が変わるときは stop は呼ばない(playTrack 内で前曲は stop される)
    };
  }, [act?.type, bgmStarted, soundEnabled, bgmVolume, caseDef.id]);

  // SE 音量・ミュートをグローバルに反映
  useEffect(() => {
    setSEVolume(seVolume);
    setSEMuted(!soundEnabled);
  }, [seVolume, soundEnabled]);

  // ページ離脱で停止
  useEffect(() => {
    return () => {
      getBGM().stop();
    };
  }, []);

  const goNext = () => {
    if (!act) return;
    if (!isStepUnlocked) return;
    if (!bgmStarted) {
      setBgmStarted(true);
      getBGM().resume();
    }
    playSE('step_advance');
    if (stepIdx + 1 < act.steps.length) {
      setStepIdx(stepIdx + 1);
    } else if (actIdx + 1 < caseDef.acts.length) {
      // 幕が変わるタイミングで章クリア音
      playSE('chapter_clear');
      setActIdx(actIdx + 1);
      setStepIdx(0);
    } else {
      // 最終ステップ → 事件解決
      playSE('case_solved');
      solveCase(caseDef.id, caseDef.badge, caseDef.acquiredSkills);
      // 結果画面へ遷移する前に少し待って音を聞かせる
      setTimeout(() => {
        getBGM().stop();
        router.push(`/case/${caseDef.id}/result`);
      }, 600);
    }
  };

  const goBack = () => {
    if (stepIdx > 0) {
      setStepIdx(stepIdx - 1);
    } else if (actIdx > 0) {
      const prevAct = caseDef.acts[actIdx - 1];
      setActIdx(actIdx - 1);
      setStepIdx(prevAct.steps.length - 1);
    }
  };

  if (!act || !step) return null;

  const isLastStep = stepIdx === act.steps.length - 1 && actIdx === caseDef.acts.length - 1;

  return (
    <div className="relative min-h-screen bg-paper">
      <header className="sticky top-0 z-30 backdrop-blur-md bg-slate-950/80 border-b border-slate-800">
        <div className="max-w-2xl mx-auto px-4 py-3 space-y-2">
          <div className="flex items-center justify-between">
            <Link href="/" className="text-xs text-slate-400 hover:text-amber-accent">
              ← 事件簿に戻る
            </Link>
            <div className="flex items-center gap-2">
              <button
                onClick={() => {
                  if (!bgmStarted) setBgmStarted(true);
                  getBGM().resume();
                  setSoundPanelOpen((v) => !v);
                  playSE('button_click');
                }}
                className="text-xs text-slate-400 hover:text-amber-accent px-2 py-1"
                aria-label="サウンド設定"
                title="サウンド設定"
              >
                {soundEnabled ? '🔊' : '🔇'}
              </button>
              <span
                className={`text-[10px] uppercase tracking-widest px-2 py-1 rounded ${actBadge[act.type]}`}
              >
                {actLabel[act.type]}
              </span>
            </div>
          </div>
          <ProgressBar
            current={progressCount}
            total={totalSteps(caseDef)}
            label={`事件「${caseDef.title}」`}
          />

          {/* サウンド設定パネル */}
          <AnimatePresence>
            {soundPanelOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="rounded-xl bg-slate-900/80 border border-slate-700 p-3 space-y-2"
              >
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-300">音を出す</span>
                  <button
                    onClick={() => {
                      toggleSound();
                      playSE('button_click');
                    }}
                    className={`px-3 py-1 rounded-full text-[11px] font-bold ${
                      soundEnabled ? 'bg-amber-accent text-slate-900' : 'bg-slate-700 text-slate-300'
                    }`}
                  >
                    {soundEnabled ? 'ON' : 'OFF'}
                  </button>
                </div>
                <div className="text-xs space-y-1">
                  <div className="flex justify-between text-slate-400">
                    <span>BGM</span>
                    <span>{Math.round(bgmVolume * 100)}%</span>
                  </div>
                  <input
                    type="range"
                    min={0}
                    max={100}
                    step={1}
                    value={Math.round(bgmVolume * 100)}
                    onChange={(e) => setBgmVolume(Number(e.target.value) / 100)}
                    className="w-full"
                  />
                </div>
                <div className="text-xs space-y-1">
                  <div className="flex justify-between text-slate-400">
                    <span>効果音</span>
                    <span>{Math.round(seVolume * 100)}%</span>
                  </div>
                  <input
                    type="range"
                    min={0}
                    max={100}
                    step={1}
                    value={Math.round(seVolume * 100)}
                    onChange={(e) => setSeVolumeStore(Number(e.target.value) / 100)}
                    className="w-full"
                  />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </header>

      <main className="max-w-2xl mx-auto px-4 py-6 space-y-4 pb-32">
        <AnimatePresence mode="wait">
          <CaseStep
            key={`${actIdx}-${stepIdx}`}
            step={step}
            client={caseDef.client}
            onComplete={markStepComplete}
          />
        </AnimatePresence>
      </main>

      <nav className="fixed bottom-0 inset-x-0 z-30 backdrop-blur-md bg-slate-950/90 border-t border-slate-800">
        <div className="max-w-2xl mx-auto px-4 py-3 flex items-center gap-2">
          <button
            onClick={goBack}
            disabled={actIdx === 0 && stepIdx === 0}
            className="px-4 py-2.5 rounded-xl bg-slate-800 text-slate-200 disabled:opacity-30 disabled:cursor-not-allowed"
          >
            ←
          </button>
          <button
            onClick={goNext}
            disabled={!isStepUnlocked}
            className={`flex-1 px-4 py-3 rounded-xl font-bold transition ${
              isStepUnlocked
                ? 'bg-gradient-to-r from-amber-accent to-yellow-600 text-slate-900 active:scale-95 shadow-lg shadow-amber-500/20'
                : 'bg-slate-800 text-slate-500 cursor-not-allowed'
            }`}
          >
            {!isStepUnlocked
              ? '⚠ 問題を解いてください'
              : isLastStep
              ? '🏆 事件を解決する'
              : '次へ →'}
          </button>
        </div>
      </nav>
    </div>
  );
}
