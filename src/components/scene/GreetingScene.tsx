"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { FestiveBackdrop } from "./FestiveBackdrop";
import { ParticleBurstCanvas, type ParticleBurstCanvasHandle } from "./ParticleBurstCanvas";
import { PortraitReveal } from "./PortraitReveal";
import { GreetingFinale } from "./GreetingFinale";
import { FastForward } from "lucide-react";
import { soundEngine } from "@/lib/audio/sound";
import type { ScenePhase } from "@/types";

interface GreetingSceneProps {
  cutoutUrl?: string | null;
  title?: string;
  subtitle?: string;
  allowSharing?: boolean;
  allowAudio?: boolean;
}

export function GreetingScene({
  cutoutUrl,
  title = "Happy Deepavali",
  subtitle = "May the radiant light of Deepavali illuminate your life with infinite joy, peace, and good health.",
  allowSharing = true,
  allowAudio = false,
}: GreetingSceneProps) {
  const [phase, setPhase] = useState<ScenePhase>("arrival");
  const [reducedMotion, setReducedMotion] = useState(false);
  const particleCanvasRef = useRef<ParticleBurstCanvasHandle | null>(null);
  const timeoutsRef = useRef<NodeJS.Timeout[]>([]);

  // Check prefers-reduced-motion media query
  useEffect(() => {
    if (typeof window !== "undefined") {
      const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
      setReducedMotion(mediaQuery.matches);

      const listener = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
      mediaQuery.addEventListener("change", listener);
      return () => mediaQuery.removeEventListener("change", listener);
    }
  }, []);

  const clearAllTimeouts = useCallback(() => {
    timeoutsRef.current.forEach(clearTimeout);
    timeoutsRef.current = [];
  }, []);

  // Choreographed timeline runner per PRD Section 7.2
  const runSequence = useCallback(() => {
    clearAllTimeouts();

    if (reducedMotion) {
      setPhase("completed");
      return;
    }

    setPhase("arrival");

    // Phase: Ghost reveal (1.2s)
    const t1 = setTimeout(() => {
      setPhase("ghost_reveal");
    }, 1200);

    // Phase: Golden build (2.4s)
    const t2 = setTimeout(() => {
      setPhase("golden_build");
    }, 2400);

    // Phase: Cracker bursts (3.4s - 5.0s)
    const t3 = setTimeout(() => {
      setPhase("cracker_burst");
      // Fire choreographed cracker bursts on left & right sides (keeping face safe)
      particleCanvasRef.current?.burstNormalized(0.2, 0.35, "gold");
      particleCanvasRef.current?.burstNormalized(0.8, 0.35, "gold");
      soundEngine.playSparkle();
    }, 3400);

    const t4 = setTimeout(() => {
      particleCanvasRef.current?.burstNormalized(0.28, 0.22, "maroon");
      particleCanvasRef.current?.burstNormalized(0.72, 0.22, "maroon");
      soundEngine.playSparkle();
    }, 4200);

    const t5 = setTimeout(() => {
      particleCanvasRef.current?.burstNormalized(0.5, 0.18, "gold");
      soundEngine.playSparkle();
    }, 4800);

    // Phase: Greeting finale (5.4s)
    const t6 = setTimeout(() => {
      setPhase("finale");
      soundEngine.playGoldenChime();
    }, 5400);

    // Phase: Completed / Idle loop (7.0s)
    const t7 = setTimeout(() => {
      setPhase("completed");
    }, 7000);

    timeoutsRef.current = [t1, t2, t3, t4, t5, t6, t7];
  }, [clearAllTimeouts, reducedMotion]);

  useEffect(() => {
    runSequence();
    return () => clearAllTimeouts();
  }, [runSequence, clearAllTimeouts]);

  const handleSkip = () => {
    clearAllTimeouts();
    setPhase("completed");
  };

  const handleReplay = () => {
    runSequence();
  };

  return (
    <div className="relative w-full min-h-screen min-h-[100dvh] flex flex-col justify-between items-center overflow-hidden bg-festival-dark">
      {/* 1. Festive Backdrop & Diyas */}
      <FestiveBackdrop />

      {/* 2. Interactive Canvas for Cracker Sparks & Golden Dust */}
      <ParticleBurstCanvas ref={particleCanvasRef} reducedMotion={reducedMotion} />

      {/* Top Controls / Skip Bar */}
      <header className="relative w-full max-w-5xl mx-auto px-4 py-3 flex items-center justify-between z-30 select-none safe-padding-top">
        <div className="flex items-center space-x-2">
          <span className="w-2 h-2 rounded-full bg-festival-gold animate-ping" />
          <span className="font-cinematic text-xs tracking-wider text-festival-gold/90 font-semibold uppercase">
            Deepavali 2026
          </span>
        </div>

        {phase !== "finale" && phase !== "completed" && (
          <button
            onClick={handleSkip}
            className="px-3 py-1.5 rounded-full border border-festival-border/80 bg-festival-surface/60 hover:bg-festival-surface text-festival-text-muted hover:text-festival-gold text-xs flex items-center space-x-1.5 transition-all duration-100"
            title="Skip sequence"
          >
            <span>Skip Intro</span>
            <FastForward className="w-3 h-3" />
          </button>
        )}
      </header>

      {/* Center Stage: Signature Ghost & Golden Reveal Portrait */}
      <main className="relative w-full flex-1 flex flex-col items-center justify-center px-4 py-2 z-20">
        <PortraitReveal cutoutUrl={cutoutUrl} phase={phase} />
      </main>

      {/* Bottom Section: Greeting Typography & Action Controls */}
      <footer className="relative w-full z-30 pb-4">
        <GreetingFinale
          title={title}
          subtitle={subtitle}
          phase={phase}
          onReplay={handleReplay}
          allowSharing={allowSharing}
          allowAudio={allowAudio}
        />
      </footer>
    </div>
  );
}

