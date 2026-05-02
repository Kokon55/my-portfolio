// Web Audio API でその場合成する BGM。
// 各幕の雰囲気(commission/crime_scene/investigation/deduction/solution)に対応。
// 外部音源ファイルなし、CC ライセンス問題ゼロ。

export type Mood = 'commission' | 'crime_scene' | 'investigation' | 'deduction' | 'solution';

type Stop = () => void;

// 各 Mood のスケール(マイナースケール基調 + solution は明るく)
const SCALES: Record<Mood, number[]> = {
  // ペンタトニックや短調で雰囲気を作る
  commission:    [0, 3, 5, 7, 10],   // C minor pentatonic 風(神秘)
  crime_scene:   [0, 1, 5, 6, 10],   // フリギアン色(緊張)
  investigation: [0, 3, 5, 7, 10],   // 短調ペンタ(集中)
  deduction:     [0, 2, 3, 7, 8],    // 半音含み(緊迫)
  solution:      [0, 4, 7, 9, 11],   // 長調ペンタ(勝利)
};

const ROOT_HZ: Record<Mood, number> = {
  commission: 110,    // A2
  crime_scene: 98,    // G2
  investigation: 130, // C3
  deduction: 92,      // F#2
  solution: 130,      // C3 (major)
};

class BGMPlayer {
  private ctx: AudioContext | null = null;
  private master: GainNode | null = null;
  private currentStop: Stop | null = null;
  private muted = false;

  private ensureCtx(): AudioContext {
    if (!this.ctx) {
      const Ctx = (window.AudioContext || (window as any).webkitAudioContext);
      this.ctx = new Ctx();
      this.master = this.ctx.createGain();
      this.master.gain.value = this.muted ? 0 : 0.18;
      this.master.connect(this.ctx.destination);
    }
    return this.ctx;
  }

  setMuted(muted: boolean) {
    this.muted = muted;
    if (this.master && this.ctx) {
      this.master.gain.cancelScheduledValues(this.ctx.currentTime);
      this.master.gain.linearRampToValueAtTime(
        muted ? 0 : 0.18,
        this.ctx.currentTime + 0.4
      );
    }
  }

  isMuted(): boolean {
    return this.muted;
  }

  play(mood: Mood) {
    this.stop();
    if (typeof window === 'undefined') return;
    const ctx = this.ensureCtx();
    const master = this.master!;
    const scale = SCALES[mood];
    const root = ROOT_HZ[mood];

    // ── 1. 持続音(ドローン)──
    const droneOsc1 = ctx.createOscillator();
    droneOsc1.type = 'sine';
    droneOsc1.frequency.value = root;
    const droneOsc2 = ctx.createOscillator();
    droneOsc2.type = 'sine';
    droneOsc2.frequency.value = root * 1.5; // 5度
    const droneGain = ctx.createGain();
    droneGain.gain.value = 0.4;
    // ローパスフィルタ
    const lp = ctx.createBiquadFilter();
    lp.type = 'lowpass';
    lp.frequency.value = mood === 'solution' ? 1800 : 800;
    droneOsc1.connect(droneGain);
    droneOsc2.connect(droneGain);
    droneGain.connect(lp);
    lp.connect(master);
    droneOsc1.start();
    droneOsc2.start();

    // ── 2. メロディの単音シーケンス ──
    let beatHandle: number | null = null;
    let beat = 0;
    const tempo = mood === 'deduction' ? 320 : mood === 'solution' ? 280 : 480; // ms
    const playNote = () => {
      const stepIdx = (beat * 7919) % scale.length; // 疑似ランダム選択
      const semis = scale[stepIdx] + (beat % 3 === 0 ? 12 : 0);
      const f = root * 4 * Math.pow(2, semis / 12);

      const o = ctx.createOscillator();
      o.type = mood === 'solution' ? 'triangle' : 'sine';
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

      // 偶発的な装飾音
      if (beat % 4 === 0 && Math.random() > 0.6) {
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
      beatHandle = window.setTimeout(playNote, tempo);
    };
    playNote();

    this.currentStop = () => {
      if (beatHandle !== null) clearTimeout(beatHandle);
      try {
        droneOsc1.stop();
        droneOsc2.stop();
      } catch {
        /* ignore */
      }
    };
  }

  stop() {
    if (this.currentStop) {
      this.currentStop();
      this.currentStop = null;
    }
  }

  resume() {
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }
}

let _player: BGMPlayer | null = null;
export const getBGM = (): BGMPlayer => {
  if (typeof window === 'undefined') {
    return { play: () => {}, stop: () => {}, setMuted: () => {}, isMuted: () => true, resume: () => {} } as unknown as BGMPlayer;
  }
  if (!_player) _player = new BGMPlayer();
  return _player;
};
