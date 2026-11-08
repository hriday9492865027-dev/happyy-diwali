"use client";

import React, { useEffect, useRef, useImperativeHandle, forwardRef } from "react";
import { ParticleEngine } from "@/lib/particles/engine";

export interface ParticleBurstCanvasHandle {
  burst: (x: number, y: number, colorTheme?: "gold" | "maroon") => void;
  burstNormalized: (nx: number, ny: number, colorTheme?: "gold" | "maroon") => void;
}

interface ParticleBurstCanvasProps {
  reducedMotion?: boolean;
}

export const ParticleBurstCanvas = forwardRef<
  ParticleBurstCanvasHandle,
  ParticleBurstCanvasProps
>(({ reducedMotion = false }, ref) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const engineRef = useRef<ParticleEngine | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const isMobile = window.innerWidth < 768;
    const engine = new ParticleEngine({
      canvas,
      isMobile,
      reducedMotion,
    });
    engineRef.current = engine;
    engine.start();

    const handleResize = () => {
      engine.resize();
    };

    const handleVisibilityChange = () => {
      if (document.hidden) {
        engine.stop();
      } else {
        engine.start();
      }
    };

    window.addEventListener("resize", handleResize);
    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      engine.stop();
      window.removeEventListener("resize", handleResize);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [reducedMotion]);

  useImperativeHandle(ref, () => ({
    burst: (x: number, y: number, colorTheme = "gold") => {
      engineRef.current?.triggerCrackerBurst(x, y, colorTheme);
    },
    burstNormalized: (nx: number, ny: number, colorTheme = "gold") => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const x = nx * (canvas.clientWidth || window.innerWidth);
      const y = ny * (canvas.clientHeight || window.innerHeight);
      engineRef.current?.triggerCrackerBurst(x, y, colorTheme);
    },
  }));

  // Interactive tap / click creates festive spark bursts!
  const handlePointerDown = (e: React.PointerEvent<HTMLCanvasElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    engineRef.current?.triggerCrackerBurst(x, y, Math.random() > 0.5 ? "gold" : "maroon");
  };

  return (
    <canvas
      ref={canvasRef}
      onPointerDown={handlePointerDown}
      className="absolute inset-0 w-full h-full pointer-events-auto z-20 cursor-pointer"
      title="Tap anywhere to burst crackers!"
    />
  );
});

ParticleBurstCanvas.displayName = "ParticleBurstCanvas";

