// Sound Effect player:
// - public/se/{seId}.mp3 が存在すれば <audio> で再生
// - 存在しなければ Web Audio API で合成した即席 SE を鳴らす
//
// SE 一覧と用途は docs/MUSIC_DESIGN.md(または 15_MUSIC_DESIGN.md)に準拠。

export type SEId =
  // インタラクション系
  | 'correct_chime'
  | 'wrong_buzz'
  | 'hint_unlock'
  | 'button_click'
  | 'step_advance'
  // ストーリー演出系
  | 'door_creak'
  | 'omen_drone'
  | 'reveal_strike'
  | 'emotional_strike'
  | 'warm_chime'
  // 章クリア系
  | 'chapter_clear'
  | 'case_solved'
  | 'certificate_chime'
  // ボス・組織関連
  | 'villain_exit'
  | 'subtle_chime'
  | 'final_omen'
  | 'transform_omen'
  | 'victory_fanfare'
  // UI系
  | 'modal_open'
  | 'modal_close'
  | 'toast_appear';

let _ctx: AudioContext | null = null;
let _seVolume = 0.7; // ストアから上書きされる
let _muted = false;

export const setSEVolume = (v: number) => {
  _seVolume = Math.max(0, Math.min(1, v));
};
export const setSEMuted = (m: boolean) => {
  _muted = m;
};

const ensureCtx = (): AudioContext | null => {
  if (typeof window === 'undefined') return null;
  if (!_ctx) {
    const Ctx = (window.AudioContext ||
      (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext);
    _ctx = new Ctx();
  }
  return _ctx;
};

// SE のフォールバック合成プロファイル
const synthSE = (seId: SEId, ctx: AudioContext, masterVol: number) => {
  const out = ctx.createGain();
  out.gain.value = masterVol;
  out.connect(ctx.destination);
  const now = ctx.currentTime;

  const tone = (
    freq: number,
    type: OscillatorType,
    startAt: number,
    duration: number,
    attack = 0.01,
    sustain = 0.7
  ) => {
    const o = ctx.createOscillator();
    o.type = type;
    o.frequency.value = freq;
    const g = ctx.createGain();
    g.gain.setValueAtTime(0, now + startAt);
    g.gain.linearRampToValueAtTime(sustain, now + startAt + attack);
    g.gain.exponentialRampToValueAtTime(0.001, now + startAt + duration);
    o.connect(g);
    g.connect(out);
    o.start(now + startAt);
    o.stop(now + startAt + duration + 0.05);
  };

  const sweep = (
    fromHz: number,
    toHz: number,
    type: OscillatorType,
    startAt: number,
    duration: number
  ) => {
    const o = ctx.createOscillator();
    o.type = type;
    o.frequency.setValueAtTime(fromHz, now + startAt);
    o.frequency.exponentialRampToValueAtTime(toHz, now + startAt + duration);
    const g = ctx.createGain();
    g.gain.setValueAtTime(0, now + startAt);
    g.gain.linearRampToValueAtTime(0.5, now + startAt + 0.01);
    g.gain.exponentialRampToValueAtTime(0.001, now + startAt + duration);
    o.connect(g);
    g.connect(out);
    o.start(now + startAt);
    o.stop(now + startAt + duration + 0.05);
  };

  switch (seId) {
    case 'correct_chime':
      // 上行2音の明るい鐘
      tone(880, 'sine', 0, 0.18);
      tone(1318, 'sine', 0.12, 0.32);
      break;
    case 'wrong_buzz':
      // 下行ブザー(短く控えめ)
      sweep(280, 120, 'square', 0, 0.28);
      break;
    case 'hint_unlock':
      // 柔らかい1音
      tone(987, 'triangle', 0, 0.4, 0.04, 0.5);
      break;
    case 'button_click':
      tone(1200, 'square', 0, 0.04, 0.001, 0.3);
      break;
    case 'step_advance':
      tone(660, 'triangle', 0, 0.08);
      tone(880, 'triangle', 0.04, 0.14);
      break;
    case 'door_creak':
      sweep(120, 70, 'sawtooth', 0, 0.7);
      break;
    case 'omen_drone':
      tone(60, 'sine', 0, 1.4, 0.6, 0.55);
      tone(90, 'sine', 0.1, 1.3, 0.6, 0.45);
      break;
    case 'reveal_strike':
      tone(80, 'sine', 0, 0.5, 0.005, 0.9);
      tone(1500, 'sawtooth', 0, 0.18, 0.005, 0.6);
      break;
    case 'emotional_strike':
      // 重い和音
      tone(196, 'sine', 0, 1.0, 0.04, 0.6);
      tone(247, 'sine', 0, 1.0, 0.04, 0.5);
      tone(294, 'sine', 0, 1.0, 0.04, 0.5);
      break;
    case 'warm_chime':
      tone(523, 'sine', 0, 0.6, 0.04, 0.55);
      tone(659, 'sine', 0.05, 0.6, 0.04, 0.5);
      tone(783, 'sine', 0.1, 0.6, 0.04, 0.45);
      break;
    case 'chapter_clear':
      // 上行3音のファンファーレ
      tone(523, 'triangle', 0, 0.2);
      tone(659, 'triangle', 0.15, 0.25);
      tone(880, 'triangle', 0.32, 0.5);
      break;
    case 'case_solved':
      // 解決の大ファンファーレ
      tone(523, 'triangle', 0, 0.18);
      tone(659, 'triangle', 0.12, 0.18);
      tone(783, 'triangle', 0.24, 0.18);
      tone(1046, 'triangle', 0.36, 0.7);
      tone(659, 'triangle', 0.5, 0.6);
      tone(1046, 'triangle', 0.6, 0.6);
      break;
    case 'certificate_chime':
      // 厳かな鐘 + 持続音
      tone(440, 'sine', 0, 1.5, 0.05, 0.5);
      tone(660, 'sine', 0.08, 1.5, 0.05, 0.4);
      tone(880, 'sine', 0.2, 1.5, 0.05, 0.35);
      break;
    case 'villain_exit':
      sweep(900, 110, 'sawtooth', 0, 0.7);
      break;
    case 'subtle_chime':
      tone(1200, 'sine', 0, 0.25, 0.04, 0.3);
      break;
    case 'final_omen':
      tone(50, 'sine', 0, 1.8, 0.6, 0.7);
      tone(70, 'sine', 0.4, 1.4, 0.4, 0.55);
      break;
    case 'transform_omen':
      sweep(80, 800, 'sawtooth', 0, 1.2);
      tone(40, 'sine', 0, 2.0, 0.5, 0.55);
      break;
    case 'victory_fanfare':
      // 5音上昇ファンファーレ
      tone(523, 'triangle', 0, 0.18);
      tone(659, 'triangle', 0.12, 0.18);
      tone(783, 'triangle', 0.24, 0.18);
      tone(1046, 'triangle', 0.36, 0.18);
      tone(1318, 'triangle', 0.48, 0.7);
      tone(1046, 'triangle', 0.6, 0.7);
      tone(1568, 'triangle', 0.7, 0.9);
      break;
    case 'modal_open':
      sweep(660, 1100, 'sine', 0, 0.12);
      break;
    case 'modal_close':
      sweep(1100, 660, 'sine', 0, 0.12);
      break;
    case 'toast_appear':
      tone(880, 'triangle', 0, 0.15, 0.01, 0.4);
      break;
    default:
      tone(660, 'sine', 0, 0.1);
  }
};

export const playSE = (seId: SEId, volumeScale = 1) => {
  if (typeof window === 'undefined') return;
  if (_muted) return;
  const masterVol = _seVolume * volumeScale;
  if (masterVol <= 0.001) return;

  const audio = new Audio(`/se/${seId}.mp3`);
  audio.volume = Math.max(0, Math.min(1, masterVol));
  audio.play().catch(() => {
    // ファイルが無いか自動再生ブロック → Web Audio で合成
    const ctx = ensureCtx();
    if (!ctx) return;
    if (ctx.state === 'suspended') {
      ctx.resume().catch(() => {});
    }
    synthSE(seId, ctx, masterVol);
  });
};
