// BGM player:public/bgm/{trackId}.mp3 が存在すれば <audio> でループ再生、
// 取得失敗時は Web Audio API で合成した BGM へ自動フォールバック。
//
// トラック一覧と用途は docs/MUSIC_DESIGN.md(または 15_MUSIC_DESIGN.md)に準拠。

export type TrackId =
  | 'commission_noir'
  | 'commission_emotion'
  | 'commission_political'
  | 'commission_homely'
  | 'crime_scene_tense'
  | 'crime_scene_light'
  | 'investigation_pulse'
  | 'underworld'
  | 'deduction_revelation'
  | 'villain_theme'
  | 'solution_calm'
  | 'solution_uplift'
  | 'omen_outro'
  | 'final_call'
  | 'infiltration'
  | 'final_battle_part1'
  | 'final_battle_part2'
  | 'finale'
  | 'credits_theme';

// 旧 Mood 互換(既存 CaseRunner からは Mood 文字列で呼ばれることがあるため残す)
export type Mood =
  | 'commission'
  | 'crime_scene'
  | 'investigation'
  | 'deduction'
  | 'solution';

// 各トラックのフォールバック合成プロファイル(調・テンポ・楽器系)
type SynthProfile = {
  rootHz: number; // 基音(Hz)
  scale: number[]; // 半音オフセット
  tempoMs: number; // ノートあたりの間隔
  oscType: OscillatorType;
  filterHz: number; // ローパスのカットオフ
  ambient: 'minor' | 'major' | 'mystery' | 'tension' | 'epic';
};

const PROFILES: Record<TrackId, SynthProfile> = {
  commission_noir:        { rootHz: 110, scale: [0, 3, 5, 7, 10],   tempoMs: 480, oscType: 'sine',     filterHz: 800,  ambient: 'mystery' },
  commission_emotion:     { rootHz: 98,  scale: [0, 2, 3, 5, 7, 10], tempoMs: 520, oscType: 'sine',     filterHz: 1000, ambient: 'minor' },
  commission_political:   { rootHz: 92,  scale: [0, 1, 5, 6, 10],    tempoMs: 380, oscType: 'sawtooth', filterHz: 700,  ambient: 'tension' },
  commission_homely:      { rootHz: 196, scale: [0, 2, 4, 5, 7, 9],  tempoMs: 320, oscType: 'triangle', filterHz: 2200, ambient: 'major' },
  crime_scene_tense:      { rootHz: 110, scale: [0, 1, 5, 6, 10],    tempoMs: 320, oscType: 'sawtooth', filterHz: 900,  ambient: 'tension' },
  crime_scene_light:      { rootHz: 165, scale: [0, 2, 4, 5, 7, 9],  tempoMs: 240, oscType: 'triangle', filterHz: 2400, ambient: 'major' },
  investigation_pulse:    { rootHz: 130, scale: [0, 3, 5, 7, 10],    tempoMs: 280, oscType: 'sine',     filterHz: 1200, ambient: 'minor' },
  underworld:             { rootHz: 82,  scale: [0, 3, 5, 6, 10],    tempoMs: 320, oscType: 'sawtooth', filterHz: 600,  ambient: 'mystery' },
  deduction_revelation:   { rootHz: 92,  scale: [0, 2, 3, 7, 8],     tempoMs: 320, oscType: 'sawtooth', filterHz: 1100, ambient: 'tension' },
  villain_theme:          { rootHz: 73,  scale: [0, 1, 3, 6, 8, 10], tempoMs: 320, oscType: 'sawtooth', filterHz: 700,  ambient: 'tension' },
  solution_calm:          { rootHz: 130, scale: [0, 4, 7, 9, 11],    tempoMs: 280, oscType: 'triangle', filterHz: 1800, ambient: 'major' },
  solution_uplift:        { rootHz: 147, scale: [0, 4, 7, 9, 11],    tempoMs: 220, oscType: 'triangle', filterHz: 2400, ambient: 'epic' },
  omen_outro:             { rootHz: 65,  scale: [0, 1, 6, 8],        tempoMs: 600, oscType: 'sine',     filterHz: 500,  ambient: 'mystery' },
  final_call:             { rootHz: 82,  scale: [0, 4, 7, 9, 11],    tempoMs: 280, oscType: 'sawtooth', filterHz: 1500, ambient: 'epic' },
  infiltration:           { rootHz: 98,  scale: [0, 2, 3, 7, 8, 10], tempoMs: 200, oscType: 'square',   filterHz: 1300, ambient: 'tension' },
  final_battle_part1:     { rootHz: 92,  scale: [0, 1, 3, 6, 8, 10], tempoMs: 240, oscType: 'sawtooth', filterHz: 900,  ambient: 'tension' },
  final_battle_part2:     { rootHz: 73,  scale: [0, 4, 7, 9, 11],    tempoMs: 200, oscType: 'sawtooth', filterHz: 1800, ambient: 'epic' },
  finale:                 { rootHz: 130, scale: [0, 4, 7, 9, 11],    tempoMs: 320, oscType: 'triangle', filterHz: 2200, ambient: 'epic' },
  credits_theme:          { rootHz: 175, scale: [0, 4, 7, 9, 11],    tempoMs: 360, oscType: 'sine',     filterHz: 2000, ambient: 'major' },
};

// ケース×幕 → TrackId の対応(MUSIC_DESIGN.md の早見表)
type ActType = 'commission' | 'crime_scene' | 'investigation' | 'deduction' | 'solution';
const TRACK_MAP: Record<string, Partial<Record<ActType, TrackId>>> = {
  'case-01-buzz': {
    commission: 'commission_noir',
    crime_scene: 'crime_scene_tense',
    investigation: 'investigation_pulse',
    deduction: 'deduction_revelation',
    solution: 'solution_calm',
  },
  'case-02-gacha': {
    commission: 'commission_noir',
    crime_scene: 'crime_scene_tense',
    investigation: 'investigation_pulse',
    deduction: 'deduction_revelation',
    solution: 'solution_calm',
  },
  'case-03-followers': {
    commission: 'commission_emotion',
    crime_scene: 'crime_scene_tense',
    investigation: 'investigation_pulse',
    deduction: 'deduction_revelation',
    solution: 'solution_uplift',
  },
};

export const resolveTrackForCase = (caseId: string, actType: ActType): TrackId => {
  const map = TRACK_MAP[caseId];
  if (map?.[actType]) return map[actType]!;
  // フォールバック:幕に応じた汎用トラック
  const fallback: Record<ActType, TrackId> = {
    commission: 'commission_noir',
    crime_scene: 'crime_scene_tense',
    investigation: 'investigation_pulse',
    deduction: 'deduction_revelation',
    solution: 'solution_calm',
  };
  return fallback[actType];
};

type StopFn = () => void;

class BGMPlayer {
  private ctx: AudioContext | null = null;
  private masterGain: GainNode | null = null;
  private currentSynthStop: StopFn | null = null;
  private currentAudio: HTMLAudioElement | null = null;
  private bgmVolume = 0.5;
  private muted = false;
  private currentTrackId: TrackId | null = null;

  setBgmVolume(v: number) {
    this.bgmVolume = Math.max(0, Math.min(1, v));
    if (this.currentAudio) this.currentAudio.volume = this.muted ? 0 : this.bgmVolume * 0.5;
    if (this.masterGain && this.ctx) {
      this.masterGain.gain.cancelScheduledValues(this.ctx.currentTime);
      this.masterGain.gain.linearRampToValueAtTime(
        this.muted ? 0 : this.bgmVolume * 0.18,
        this.ctx.currentTime + 0.2
      );
    }
  }

  setMuted(muted: boolean) {
    this.muted = muted;
    this.setBgmVolume(this.bgmVolume);
  }

  isMuted() {
    return this.muted;
  }

  resume() {
    this.ctx?.resume().catch(() => {});
    if (this.currentAudio && this.currentAudio.paused && !this.muted) {
      this.currentAudio.play().catch(() => {});
    }
  }

  // 旧 API:Mood 互換。Mood → デフォルトトラックに解決して playTrack に委譲
  play(mood: Mood) {
    const fallback: Record<Mood, TrackId> = {
      commission: 'commission_noir',
      crime_scene: 'crime_scene_tense',
      investigation: 'investigation_pulse',
      deduction: 'deduction_revelation',
      solution: 'solution_calm',
    };
    this.playTrack(fallback[mood]);
  }

  // 新 API:任意のトラックを再生
  async playTrack(trackId: TrackId) {
    if (typeof window === 'undefined') return;
    if (this.currentTrackId === trackId) return; // 既に同じ曲が再生中
    this.stop();
    this.currentTrackId = trackId;

    // まずはファイル再生を試す
    const audio = new Audio(`/bgm/${trackId}.mp3`);
    audio.loop = true;
    audio.volume = 0;
    audio.preload = 'auto';

    try {
      await audio.play();
      this.currentAudio = audio;
      // フェードイン
      const target = this.muted ? 0 : this.bgmVolume * 0.5;
      const startAt = performance.now();
      const fadeMs = 800;
      const tick = () => {
        if (this.currentAudio !== audio) return;
        const t = Math.min(1, (performance.now() - startAt) / fadeMs);
        audio.volume = target * t;
        if (t < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    } catch {
      // ファイルなし or 自動再生ブロック → 合成へフォールバック
      this.playSynth(trackId);
    }
  }

  private playSynth(trackId: TrackId) {
    const profile = PROFILES[trackId];
    if (!profile) return;
    if (!this.ctx) {
      const Ctx = (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext);
      this.ctx = new Ctx();
      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.value = this.muted ? 0 : this.bgmVolume * 0.18;
      this.masterGain.connect(this.ctx.destination);
    }
    const ctx = this.ctx;
    const master = this.masterGain!;

    // ドローン(基音 + 5度)
    const drone1 = ctx.createOscillator();
    drone1.type = 'sine';
    drone1.frequency.value = profile.rootHz;
    const drone2 = ctx.createOscillator();
    drone2.type = 'sine';
    drone2.frequency.value = profile.rootHz * 1.5;
    const droneGain = ctx.createGain();
    droneGain.gain.value = 0.4;
    const lp = ctx.createBiquadFilter();
    lp.type = 'lowpass';
    lp.frequency.value = profile.filterHz;
    drone1.connect(droneGain);
    drone2.connect(droneGain);
    droneGain.connect(lp);
    lp.connect(master);
    drone1.start();
    drone2.start();

    // 旋律
    let beatHandle: number | null = null;
    let beat = 0;
    const playNote = () => {
      const stepIdx = (beat * 7919) % profile.scale.length;
      const semis = profile.scale[stepIdx] + (beat % 3 === 0 ? 12 : 0);
      const f = profile.rootHz * 4 * Math.pow(2, semis / 12);

      const o = ctx.createOscillator();
      o.type = profile.oscType;
      o.frequency.value = f;
      const g = ctx.createGain();
      const now = ctx.currentTime;
      g.gain.setValueAtTime(0, now);
      g.gain.linearRampToValueAtTime(0.13, now + 0.02);
      g.gain.exponentialRampToValueAtTime(0.001, now + 0.5);
      o.connect(g);
      g.connect(master);
      o.start(now);
      o.stop(now + 0.6);

      // 偶発装飾(epic と major のとき多め)
      const ornamentChance = profile.ambient === 'epic' ? 0.5 : profile.ambient === 'major' ? 0.4 : 0.3;
      if (beat % 4 === 0 && Math.random() < ornamentChance) {
        const o2 = ctx.createOscillator();
        o2.type = 'sine';
        o2.frequency.value = f * 1.5;
        const g2 = ctx.createGain();
        g2.gain.setValueAtTime(0, now + 0.1);
        g2.gain.linearRampToValueAtTime(0.06, now + 0.12);
        g2.gain.exponentialRampToValueAtTime(0.001, now + 0.4);
        o2.connect(g2);
        g2.connect(master);
        o2.start(now + 0.1);
        o2.stop(now + 0.5);
      }

      beat++;
      beatHandle = window.setTimeout(playNote, profile.tempoMs);
    };
    playNote();

    this.currentSynthStop = () => {
      if (beatHandle !== null) clearTimeout(beatHandle);
      try {
        drone1.stop();
        drone2.stop();
      } catch { /* ignore */ }
    };
  }

  stop() {
    if (this.currentSynthStop) {
      this.currentSynthStop();
      this.currentSynthStop = null;
    }
    if (this.currentAudio) {
      try {
        this.currentAudio.pause();
        this.currentAudio.src = '';
      } catch { /* ignore */ }
      this.currentAudio = null;
    }
    this.currentTrackId = null;
  }
}

let _player: BGMPlayer | null = null;
export const getBGM = (): BGMPlayer => {
  if (typeof window === 'undefined') {
    return {
      play: () => {},
      playTrack: () => {},
      stop: () => {},
      setMuted: () => {},
      setBgmVolume: () => {},
      isMuted: () => true,
      resume: () => {},
    } as unknown as BGMPlayer;
  }
  if (!_player) _player = new BGMPlayer();
  return _player;
};
