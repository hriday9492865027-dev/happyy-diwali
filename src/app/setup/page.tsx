"use client";

import React, { useState } from "react";
import { PhotoUploader } from "@/components/upload/PhotoUploader";
import { FestiveBackdrop } from "@/components/scene/FestiveBackdrop";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";

export default function SetupPage() {
  const router = useRouter();

  const handleCutoutReady = (cutoutUrl: string) => {
    // Store in session storage for the client greeting experience
    if (typeof window !== "undefined") {
      sessionStorage.setItem("deepavali_cutout", cutoutUrl);
    }
    router.push("/?personalized=true");
  };

  const handleSkip = () => {
    if (typeof window !== "undefined") {
      sessionStorage.removeItem("deepavali_cutout");
    }
    router.push("/?personalized=false");
  };

  return (
    <div className="relative min-h-screen min-h-[100dvh] flex flex-col justify-between items-center bg-festival-dark px-4 py-6 overflow-hidden">
      <FestiveBackdrop />

      {/* Top Header */}
      <header className="relative w-full max-w-lg mx-auto flex items-center justify-between z-20 mb-4 safe-padding-top">
        <Link
          href="/"
          className="min-h-[44px] px-3 py-1.5 rounded-full border border-festival-border bg-festival-surface/70 text-festival-text-muted hover:text-festival-gold text-xs flex items-center space-x-1 transition-colors"
        >
          <ChevronLeft className="w-4 h-4" />
          <span>Home</span>
        </Link>

        <span className="font-cinematic text-xs tracking-wider text-festival-gold uppercase">
          ✦ Festive Studio ✦
        </span>
      </header>

      {/* Main Upload Box */}
      <main className="relative w-full flex-1 flex items-center justify-center z-20">
        <PhotoUploader onSuccess={handleCutoutReady} onSkip={handleSkip} />
      </main>

      {/* Bottom Footer */}
      <footer className="relative w-full text-center text-[11px] text-festival-text-dim z-20 mt-4 safe-padding-bottom">
        Happy Deepavali • Personalized Interactive Experience
      </footer>
    </div>
  );
}

