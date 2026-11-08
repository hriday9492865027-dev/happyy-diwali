/**
 * Procedural Web Audio API sound generator for DEEPAVALI
 * Zero external audio assets, zero bandwidth, 100% procedural.
 * Starts strictly muted by default per PRD Section 7.5.
 */

class SoundController {
  private ctx: AudioContext | null = null;
  private isMuted = true;
  private ambientGain: GainNode | null = null;

  private initContext() {
    if (typeof window === "undefined") return null;
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === "suspended") {
      this.ctx.resume();
    }
    return this.ctx;
  }

  public setMuted(muted: boolean) {
    this.isMuted = muted;
    if (!muted) {
      this.initContext();
      this.startAmbientWarmth();
    } else {
      this.stopAmbientWarmth();
    }
  }

  public getMuted(): boolean {
    return this.isMuted;
  }

  /**
   * Starts a warm, peaceful harmonic drone symbolizing divine light
   */
  public startAmbientWarmth() {
    if (this.isMuted) return;
    const ctx = this.initContext();
    if (!ctx) return;

    if (this.ambientGain) return; // already active

    try {
      const masterGain = ctx.createGain();
      masterGain.gain.setValueAtTime(0.01, ctx.currentTime);
      masterGain.gain.exponentialRampToValueAtTime(0.08, ctx.currentTime + 3);
      masterGain.connect(ctx.destination);
      this.ambientGain = masterGain;

      // Harmonic golden frequencies (C#3, G#3, C#4)
      const freqs = [138.59, 207.65, 277.18];
      freqs.forEach((freq) => {
        const osc = ctx.createOscillator();
        osc.type = "sine";
        osc.frequency.setValueAtTime(freq, ctx.currentTime);

        const oscGain = ctx.createGain();
        oscGain.gain.setValueAtTime(0.3, ctx.currentTime);

        osc.connect(oscGain);
        oscGain.connect(masterGain);
        osc.start();
      });
    } catch (e) {
      console.warn("Could not start ambient audio:", e);
    }
  }

  public stopAmbientWarmth() {
    if (this.ambientGain && this.ctx) {
      try {
        this.ambientGain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + 0.5);
        setTimeout(() => {
          this.ambientGain?.disconnect();
          this.ambientGain = null;
        }, 500);
      } catch (e) {
        this.ambientGain = null;
      }
    }
  }

  /**
   * Plays a delicate golden chime during the reveal finale
   */
  public playGoldenChime() {
    if (this.isMuted) return;
    const ctx = this.initContext();
    if (!ctx) return;

    try {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = "triangle";
      osc.frequency.setValueAtTime(523.25, ctx.currentTime); // C5
      osc.frequency.exponentialRampToValueAtTime(1046.5, ctx.currentTime + 0.15); // C6

      gain.gain.setValueAtTime(0.12, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 2.2);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + 2.3);
    } catch (e) {
      // Audio playback suppressed or blocked
    }
  }

  /**
   * Plays a gentle, pleasant spark burst sound
   */
  public playSparkle() {
    if (this.isMuted) return;
    const ctx = this.initContext();
    if (!ctx) return;

    try {
      const bufferSize = ctx.sampleRate * 0.15; // 150ms of sparkling noise
      const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (bufferSize * 0.4));
      }

      const noise = ctx.createBufferSource();
      noise.buffer = buffer;

      const filter = ctx.createBiquadFilter();
      filter.type = "bandpass";
      filter.frequency.setValueAtTime(2500 + Math.random() * 1500, ctx.currentTime);
      filter.Q.setValueAtTime(3, ctx.currentTime);

      const gain = ctx.createGain();
      gain.gain.setValueAtTime(0.08, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.15);

      noise.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);

      noise.start();
    } catch (e) {
      // Audio playback suppressed or blocked
    }
  }
}

export const soundEngine = new SoundController();

