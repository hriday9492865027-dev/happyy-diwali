import type { SparkParticle } from "@/types";

export interface ParticleEngineOptions {
  canvas: HTMLCanvasElement;
  isMobile: boolean;
  reducedMotion?: boolean;
}

export class ParticleEngine {
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;
  private particles: SparkParticle[] = [];
  private ambientParticles: SparkParticle[] = [];
  private animationFrameId: number | null = null;
  private isMobile: boolean;
  private reducedMotion: boolean;
  private isRunning = false;
  private lastTime = 0;

  // Face Safe Zone in normalized coordinates [minX, minY, maxX, maxY]
  private safeZone = { minX: 0.25, minY: 0.15, maxX: 0.75, maxY: 0.65 };

  constructor(options: ParticleEngineOptions) {
    this.canvas = options.canvas;
    const context = this.canvas.getContext("2d");
    if (!context) throw new Error("Could not acquire 2D canvas context");
    this.ctx = context;
    this.isMobile = options.isMobile;
    this.reducedMotion = options.reducedMotion ?? false;

    this.resize();
    this.initAmbientParticles();
  }

  public resize() {
    const dpr = typeof window !== "undefined" ? Math.min(window.devicePixelRatio || 1, 2) : 1;
    const rect = this.canvas.getBoundingClientRect();
    this.canvas.width = rect.width * dpr;
    this.canvas.height = rect.height * dpr;
    this.ctx.scale(dpr, dpr);
  }

  private initAmbientParticles() {
    const count = this.isMobile ? 25 : 60;
    this.ambientParticles = [];
    const width = this.canvas.clientWidth || 400;
    const height = this.canvas.clientHeight || 700;

    for (let i = 0; i < count; i++) {
      this.ambientParticles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.4,
        vy: -0.2 - Math.random() * 0.5,
        gravity: 0,
        drag: 0.99,
        size: 1 + Math.random() * 2,
        color: Math.random() > 0.3 ? "#FFD700" : "#F5A623",
        alpha: 0.1 + Math.random() * 0.4,
        life: Math.random() * 100,
        maxLife: 150 + Math.random() * 100,
        decay: 0.003,
        sparkleRate: 0.05,
        trail: [],
      });
    }
  }

  /**
   * Triggers a cracker burst with outward arcing sparks
   */
  public triggerCrackerBurst(x: number, y: number, colorTheme = "gold") {
    if (this.reducedMotion) return;

    const count = this.isMobile ? 35 : 85;
    const colors =
      colorTheme === "maroon"
        ? ["#FFD700", "#FF4500", "#F5A623", "#FF8C00", "#FFF6E5"]
        : ["#FFD700", "#FFE082", "#F5A623", "#FFA000", "#FFFFFF"];

    for (let i = 0; i < count; i++) {
      const angle = Math.random() * Math.PI * 2;
      // Exponential distribution for natural speed variance
      const speed = Math.pow(Math.random(), 0.5) * (this.isMobile ? 5.5 : 8.5) + 1.2;
      const vx = Math.cos(angle) * speed;
      const vy = Math.sin(angle) * speed;
      const color = colors[Math.floor(Math.random() * colors.length)];
      const maxLife = 40 + Math.random() * 55;

      this.particles.push({
        x,
        y,
        vx,
        vy,
        gravity: 0.12 + Math.random() * 0.05,
        drag: 0.965,
        size: 1.8 + Math.random() * 2.2,
        color,
        alpha: 1,
        life: 0,
        maxLife,
        decay: 1 / maxLife,
        sparkleRate: 0.15,
        trail: [],
      });
    }
  }

  public start() {
    if (this.isRunning) return;
    this.isRunning = true;
    this.lastTime = performance.now();
    this.loop();
  }

  public stop() {
    this.isRunning = false;
    if (this.animationFrameId !== null) {
      cancelAnimationFrame(this.animationFrameId);
      this.animationFrameId = null;
    }
  }

  private loop = () => {
    if (!this.isRunning) return;

    this.update();
    this.render();

    this.animationFrameId = requestAnimationFrame(this.loop);
  };

  private update() {
    const width = this.canvas.clientWidth || 400;
    const height = this.canvas.clientHeight || 700;

    // 1. Update Cracker Sparks
    for (let i = this.particles.length - 1; i >= 0; i--) {
      const p = this.particles[i];
      p.life++;

      // Store trail point
      p.trail.unshift({ x: p.x, y: p.y, alpha: p.alpha });
      if (p.trail.length > (this.isMobile ? 3 : 6)) {
        p.trail.pop();
      }

      p.vx *= p.drag;
      p.vy = p.vy * p.drag + p.gravity;
      p.x += p.vx;
      p.y += p.vy;

      p.alpha = Math.max(0, 1 - p.life / p.maxLife);

      if (p.life >= p.maxLife || p.alpha <= 0.01) {
        this.particles.splice(i, 1);
      }
    }

    // 2. Update Ambient Golden Dust
    for (const p of this.ambientParticles) {
      p.x += p.vx;
      p.y += p.vy;

      if (p.y < 0) {
        p.y = height + 10;
        p.x = Math.random() * width;
      }
      if (p.x < 0) p.x = width;
      if (p.x > width) p.x = 0;
    }
  }

  private render() {
    const width = this.canvas.clientWidth || 400;
    const height = this.canvas.clientHeight || 700;

    this.ctx.clearRect(0, 0, width, height);

    // 1. Render Ambient Golden Dust
    for (const p of this.ambientParticles) {
      this.ctx.save();
      this.ctx.globalAlpha = p.alpha;
      this.ctx.fillStyle = p.color;
      this.ctx.beginPath();
      this.ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      this.ctx.fill();
      this.ctx.restore();
    }

    // 2. Render Cracker Trails & Sparks
    this.ctx.save();
    for (const p of this.particles) {
      // Draw trailing spark line
      if (p.trail.length > 1) {
        this.ctx.beginPath();
        this.ctx.moveTo(p.trail[0].x, p.trail[0].y);
        for (let t = 1; t < p.trail.length; t++) {
          this.ctx.lineTo(p.trail[t].x, p.trail[t].y);
        }
        this.ctx.strokeStyle = p.color;
        this.ctx.lineWidth = Math.max(0.7, p.size * 0.6);
        this.ctx.globalAlpha = p.alpha * 0.45;
        this.ctx.stroke();
      }

      // Draw primary glowing spark head
      this.ctx.globalAlpha = p.alpha;
      this.ctx.fillStyle = p.color;
      this.ctx.beginPath();
      this.ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      this.ctx.fill();

      // Soft glow ring
      if (!this.isMobile && p.alpha > 0.4) {
        this.ctx.beginPath();
        this.ctx.arc(p.x, p.y, p.size * 2.2, 0, Math.PI * 2);
        this.ctx.fillStyle = "rgba(255, 215, 0, 0.25)";
        this.ctx.fill();
      }
    }
    this.ctx.restore();
  }
}

