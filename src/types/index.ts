export type ProcessingStatus =
  | "uploaded"
  | "processing"
  | "ready"
  | "failed"
  | "expired"
  | "deleted";

export type AssetType = "original" | "cutout";

export interface MediaAsset {
  id: string;
  sessionId: string;
  blobKey: string;
  assetType: AssetType;
  mimeType: string;
  sizeBytes: number;
  width?: number | null;
  height?: number | null;
  status: ProcessingStatus;
  createdAt: Date;
  expiresAt: Date;
}

export interface GreetingConfig {
  id: string;
  title: string;
  subtitle: string;
  senderName?: string | null;
  institutionName?: string | null;
  enabledFeatures: {
    allowUploads: boolean;
    allowSharing: boolean;
    allowReplay: boolean;
    allowAudio: boolean;
    allowIntro: boolean;
  };
  themeJson: {
    ghostOpacity: number; // 0.05 - 0.15
    particleBudgetMobile: number;
    particleBudgetDesktop: number;
    accentColor: string;
  };
  publishedAt: Date;
}

export interface SparkParticle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  gravity: number;
  drag: number;
  size: number;
  color: string;
  alpha: number;
  life: number;
  maxLife: number;
  decay: number;
  sparkleRate: number;
  trail: Array<{ x: number; y: number; alpha: number }>;
}

export interface BurstSpec {
  x: number;
  y: number;
  count: number;
  baseHue: number;
  speedMultiplier?: number;
}

export type ScenePhase =
  | "arrival"       // 0 - 1.5s: Ambient night backdrop, diyas flicker, distant dust
  | "ghost_reveal"  // 1.0 - 2.5s: Faint duplicate cutout emerges in background (5-12% opacity)
  | "golden_build"  // 2.0 - 5.0s: Warm illumination & rim-light animate onto the main human cutout
  | "cracker_burst" // 3.0 - 6.0s: Real-time particle fireworks burst with outward arcing sparks
  | "finale"        // 5.0 - 7.0s: Golden festive typography resolves with soft glow
  | "completed";    // Looping ambient diyas and subtle floating particles

