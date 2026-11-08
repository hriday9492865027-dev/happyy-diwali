"use client";

import React from "react";
import Image from "next/image";
import { Sparkles } from "lucide-react";
import type { ScenePhase } from "@/types";

interface PortraitRevealProps {
  cutoutUrl?: string | null;
  phase: ScenePhase;
  ghostOpacity?: number; // default 0.08 (8%)
}

export function PortraitReveal({
  cutoutUrl,
  phase,
  ghostOpacity = 0.08,
}: PortraitRevealProps) {
  // Determine animation states based on timeline phase
  const isGhostVisible =
    phase === "ghost_reveal" ||
    phase === "golden_build" ||
    phase === "cracker_burst" ||
    phase === "finale" ||
    phase === "completed";

  const isMainVisible =
    phase === "golden_build" ||
    phase === "cracker_burst" ||
    phase === "finale" ||
    phase === "completed";

  const isFullGlow =
    phase === "cracker_burst" || phase === "finale" || phase === "completed";

  // Fallback visual when visitor chooses no-photo or image processing fallback
  if (!cutoutUrl) {
    return (
      <div className="relative w-full h-[320px] sm:h-[420px] md:h-[480px] max-w-md mx-auto flex items-center justify-center z-10">
        <div
          className={`relative flex flex-col items-center transition-all duration-1000 ${
            isMainVisible ? "opacity-100 scale-100" : "opacity-0 scale-90"
          }`}
        >
          {/* Ambient Golden Core Halo */}
          <div className="absolute w-64 h-64 rounded-full bg-gradient-radial from-amber-400/25 via-yellow-500/10 to-transparent blur-2xl animate-glow" />
          
          <div className="relative p-6 rounded-full border border-amber-500/30 bg-festival-surface/80 backdrop-blur-md shadow-2xl glow-gold">
            <Sparkles className="w-20 h-20 text-festival-gold animate-float" />
          </div>

          <div className="mt-6 text-center space-y-1">
            <p className="font-cinematic text-lg text-festival-gold tracking-widest uppercase">
              Light & Prosperity
            </p>
            <p className="text-xs text-festival-text-muted">
              May the festive radiance fill your home with joy
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-full h-[360px] sm:h-[440px] md:h-[520px] max-w-md lg:max-w-lg mx-auto flex items-center justify-center select-none z-10">
      {/* 1. GHOST PORTRAIT LAYER (Back Layer) */}
      <div
        className="absolute inset-0 flex items-center justify-center pointer-events-none transition-all duration-1000 ease-out"
        style={{
          opacity: isGhostVisible ? ghostOpacity : 0,
          transform: isGhostVisible ? "scale(1.05) translateY(-8px)" : "scale(1.01) translateY(0)",
          filter: "blur(2px) drop-shadow(0 0 25px #FFD700)",
        }}
      >
        <div className="relative w-full h-full max-h-[95%]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={cutoutUrl}
            alt="Ghost Silhouette"
            className="w-full h-full object-contain mx-auto"
            style={{
              filter: "brightness(1.2) sepia(0.6) hue-rotate(-10deg) saturate(1.8)",
            }}
          />
        </div>
      </div>

      {/* Golden Aura / Rim Backlight */}
      <div
        className="absolute inset-x-8 inset-y-12 rounded-full pointer-events-none transition-all duration-1000 ease-in-out"
        style={{
          background: "radial-gradient(ellipse at center, rgba(255, 215, 0, 0.22) 0%, rgba(245, 166, 35, 0.1) 45%, transparent 70%)",
          opacity: isMainVisible ? 1 : 0,
          transform: isFullGlow ? "scale(1.08)" : "scale(0.95)",
        }}
      />

      {/* 2. MAIN HUMAN CUTOUT LAYER (Front Layer) */}
      <div
        className="relative w-full h-full max-h-[95%] flex items-center justify-center transition-all duration-1000 ease-out"
        style={{
          opacity: isMainVisible ? 1 : 0,
          transform: isMainVisible ? "scale(1) translateY(0)" : "scale(0.96) translateY(12px)",
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={cutoutUrl}
          alt="Personalized Deepavali Portrait"
          className="w-full h-full object-contain mx-auto transition-all duration-700"
          style={{
            filter: isFullGlow
              ? "drop-shadow(0 0 15px rgba(255, 215, 0, 0.45)) drop-shadow(0 0 35px rgba(245, 166, 35, 0.25)) contrast(1.05)"
              : "drop-shadow(0 0 8px rgba(255, 215, 0, 0.2))",
          }}
        />
      </div>
    </div>
  );
}

