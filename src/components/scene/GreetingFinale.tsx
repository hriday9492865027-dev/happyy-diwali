"use client";

import React, { useState } from "react";
import { RotateCcw, Share2, Upload, Check, Volume2, VolumeX } from "lucide-react";
import Link from "next/link";
import type { ScenePhase } from "@/types";

interface GreetingFinaleProps {
  title?: string;
  subtitle?: string;
  phase: ScenePhase;
  onReplay: () => void;
  allowSharing?: boolean;
  allowAudio?: boolean;
}

export function GreetingFinale({
  title = "Happy Deepavali",
  subtitle = "May the divine light illuminate your heart and bring boundless happiness, health, and prosperity.",
  phase,
  onReplay,
  allowSharing = true,
  allowAudio = false,
}: GreetingFinaleProps) {
  const [copied, setCopied] = useState(false);
  const [isMuted, setIsMuted] = useState(true);

  const isVisible = phase === "finale" || phase === "completed";

  const handleShare = async () => {
    if (typeof navigator !== "undefined" && navigator.share) {
      try {
        await navigator.share({
          title: "Happy Deepavali Greeting",
          text: `${title} — Experience this festive golden portrait reveal!`,
          url: window.location.href,
        });
        return;
      } catch (e) {
        // Fallback to copy link if user dismisses or share fails
      }
    }

    if (typeof navigator !== "undefined" && navigator.clipboard) {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  return (
    <div
      className={`relative w-full max-w-xl mx-auto px-4 text-center transition-all duration-1000 ease-out z-30 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6 pointer-events-none"
      }`}
    >
      {/* Decorative Golden Arch / Motif */}
      <div className="flex items-center justify-center space-x-3 mb-2">
        <div className="h-[1px] w-12 bg-gradient-to-r from-transparent to-festival-gold/60" />
        <span className="text-festival-gold text-xs tracking-widest uppercase font-cinematic">
          ✦ Festival of Lights ✦
        </span>
        <div className="h-[1px] w-12 bg-gradient-to-l from-transparent to-festival-gold/60" />
      </div>

      {/* Main Greeting Typography */}
      <h1 className="font-cinematic text-3xl sm:text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-[#FFF6E5] via-[#FFD700] to-[#F5A623] tracking-wide text-glow-title leading-tight">
        {title}
      </h1>

      <p className="mt-3 text-xs sm:text-sm md:text-base text-festival-text-muted max-w-md mx-auto leading-relaxed">
        {subtitle}
      </p>

      {/* Interactive Spark Hint */}
      <p className="mt-3 text-[11px] text-festival-gold/70 animate-pulse select-none">
        ✨ Tap anywhere to burst festive spark crackers ✨
      </p>

      {/* Responsive Action Bar (44px min touch target) */}
      <div className="mt-6 flex flex-wrap items-center justify-center gap-3 safe-padding-bottom">
        <button
          onClick={onReplay}
          className="min-h-[44px] px-5 py-2.5 rounded-full bg-festival-gold text-festival-dark font-medium text-xs sm:text-sm flex items-center space-x-2 shadow-lg shadow-amber-500/20 hover:bg-festival-gold-light active:scale-95 transition-all duration-200"
        >
          <RotateCcw className="w-4 h-4" />
          <span>Replay Reveal</span>
        </button>

        <Link
          href="/setup"
          className="min-h-[44px] px-5 py-2.5 rounded-full border border-festival-gold/40 bg-festival-surface/90 text-festival-text-bright font-medium text-xs sm:text-sm flex items-center space-x-2 hover:border-festival-gold hover:bg-festival-card active:scale-95 transition-all duration-200"
        >
          <Upload className="w-4 h-4 text-festival-gold" />
          <span>Change Photo</span>
        </Link>

        {allowSharing && (
          <button
            onClick={handleShare}
            className="min-h-[44px] px-4 py-2.5 rounded-full border border-festival-border bg-festival-surface/80 text-festival-text-muted hover:text-festival-text-bright text-xs sm:text-sm flex items-center space-x-2 active:scale-95 transition-all duration-200"
          >
            {copied ? (
              <>
                <Check className="w-4 h-4 text-emerald-400" />
                <span className="text-emerald-400">Link Copied!</span>
              </>
            ) : (
              <>
                <Share2 className="w-4 h-4" />
                <span>Share</span>
              </>
            )}
          </button>
        )}

        {allowAudio && (
          <button
            onClick={() => setIsMuted(!isMuted)}
            className="min-h-[44px] min-w-[44px] p-2.5 rounded-full border border-festival-border bg-festival-surface/80 text-festival-text-muted hover:text-festival-gold flex items-center justify-center active:scale-95 transition-all duration-200"
            aria-label={isMuted ? "Unmute festive audio" : "Mute audio"}
          >
            {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
          </button>
        )}
      </div>
    </div>
  );
}
