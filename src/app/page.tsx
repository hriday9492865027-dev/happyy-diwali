"use client";

import React, { useState, useEffect } from "react";
import { GreetingScene } from "@/components/scene/GreetingScene";
import { FestiveBackdrop } from "@/components/scene/FestiveBackdrop";
import Link from "next/link";
import { Sparkles, Camera, Play, Shield } from "lucide-react";

export default function HomePage() {
  const [cutoutUrl, setCutoutUrl] = useState<string | null>(null);
  const [showScene, setShowScene] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedCutout = sessionStorage.getItem("deepavali_cutout");
      const urlParams = new URLSearchParams(window.location.search);
      const isPersonalized = urlParams.get("personalized");

      if (savedCutout && isPersonalized !== "false") {
        setCutoutUrl(savedCutout);
        setShowScene(true);
      } else if (isPersonalized === "false") {
        setCutoutUrl(null);
        setShowScene(true);
      }
    }
    setIsLoading(false);
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-festival-dark flex items-center justify-center">
        <div className="w-8 h-8 rounded-full border-2 border-festival-gold border-t-transparent animate-spin" />
      </div>
    );
  }

  // Active Cinematic Greeting Scene
  if (showScene) {
    return (
      <GreetingScene
        cutoutUrl={cutoutUrl}
        title="Happy Deepavali"
        subtitle="May the divine glow of Deepavali illuminate your world with health, joy, and endless prosperity."
        allowSharing={true}
        allowAudio={true}
      />
    );
  }

  // Hero Landing Page (FR-01)
  return (
    <div className="relative min-h-screen min-h-[100dvh] flex flex-col justify-between items-center bg-festival-dark text-festival-text-bright px-4 py-8 overflow-hidden select-none">
      <FestiveBackdrop />

      {/* Header */}
      <header className="relative w-full max-w-5xl mx-auto flex items-center justify-between z-20 safe-padding-top">
        <div className="flex items-center space-x-2">
          <div className="w-2.5 h-2.5 rounded-full bg-festival-gold animate-pulse" />
          <span className="font-cinematic text-xs tracking-widest text-festival-gold font-bold uppercase">
            ✦ DEEPAVALI 2026 ✦
          </span>
        </div>

        <Link
          href="/setup"
          className="text-xs text-festival-text-muted hover:text-festival-gold transition-colors py-2 px-3"
        >
          Create Greeting
        </Link>
      </header>

      {/* Main Hero Content */}
      <main className="relative w-full max-w-2xl mx-auto flex flex-col items-center text-center z-20 my-auto py-8">
        <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full border border-festival-gold/30 bg-festival-gold/10 text-festival-gold-light text-xs mb-6 shadow-sm">
          <Sparkles className="w-3.5 h-3.5 text-festival-gold" />
          <span>Cinematic Golden Portrait Reveal</span>
        </div>

        <h1 className="font-cinematic text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-b from-[#FFFDF0] via-[#FFD700] to-[#E69500] text-glow-title leading-tight">
          Illuminate Your Celebration
        </h1>

        <p className="mt-4 text-sm sm:text-base text-festival-text-muted max-w-lg leading-relaxed">
          Step into a dark cinematic Deepavali night. Upload your photo to watch your portrait emerge through a golden reveal, surrounded by radiating spark cracker bursts.
        </p>

        {/* Primary Action Buttons */}
        <div className="mt-8 flex flex-col sm:flex-row items-center gap-4 w-full max-w-md justify-center">
          <Link
            href="/setup"
            className="w-full sm:w-auto min-h-[48px] px-7 py-3 rounded-full bg-festival-gold text-festival-dark font-semibold text-sm sm:text-base flex items-center justify-center space-x-2.5 shadow-xl shadow-amber-500/25 hover:bg-festival-gold-light active:scale-95 transition-all duration-200"
          >
            <Camera className="w-4 h-4 text-festival-dark" />
            <span>Personalize with Photo</span>
          </Link>

          <button
            onClick={() => {
              setCutoutUrl(null);
              setShowScene(true);
            }}
            className="w-full sm:w-auto min-h-[48px] px-6 py-3 rounded-full border border-festival-border bg-festival-surface/90 hover:bg-festival-card hover:border-festival-gold/50 text-festival-text-bright font-medium text-sm flex items-center justify-center space-x-2 active:scale-95 transition-all duration-200"
          >
            <Play className="w-4 h-4 text-festival-gold fill-festival-gold" />
            <span>Watch Greeting</span>
          </button>
        </div>

        {/* Feature Highlights */}
        <div className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-3 w-full max-w-lg text-left">
          <div className="p-3.5 rounded-xl bg-festival-surface/60 border border-festival-border/60">
            <span className="text-festival-gold text-xs font-semibold block mb-1">
              ✨ Human Cutout
            </span>
            <span className="text-[11px] text-festival-text-dim block">
              Background scenery is removed cleanly.
            </span>
          </div>
          <div className="p-3.5 rounded-xl bg-festival-surface/60 border border-festival-border/60">
            <span className="text-festival-gold text-xs font-semibold block mb-1">
              🎆 Cracker Sparks
            </span>
            <span className="text-[11px] text-festival-text-dim block">
              Real-time Canvas bursts with drifting sparks.
            </span>
          </div>
          <div className="p-3.5 rounded-xl bg-festival-surface/60 border border-festival-border/60">
            <span className="text-festival-gold text-xs font-semibold block mb-1">
              🔒 Private & Safe
            </span>
            <span className="text-[11px] text-festival-text-dim block">
              No photos stored permanently or shared publicly.
            </span>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="relative w-full max-w-5xl mx-auto flex items-center justify-center text-xs text-festival-text-dim z-20 safe-padding-bottom">
        <div className="flex items-center space-x-2">
          <Shield className="w-3.5 h-3.5 text-festival-gold/60" />
          <span>Private & Secure • Built for Deepavali 2026</span>
        </div>
      </footer>
    </div>
  );
}

