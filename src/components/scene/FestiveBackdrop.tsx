"use client";

import React from "react";

export function FestiveBackdrop() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      {/* Deep Midnight Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#06060A] via-[#0D0B14] to-[#170E1A]" />

      {/* Atmospheric Golden Radial Light Pools */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[700px] bg-gradient-radial from-amber-500/10 via-yellow-600/5 to-transparent rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 w-[600px] h-[350px] bg-gradient-radial from-amber-600/15 via-orange-800/10 to-transparent rounded-full blur-2xl pointer-events-none" />

      {/* Subtle Floating Ambient Bokeh Lights */}
      <div className="absolute top-[15%] left-[10%] w-3 h-3 rounded-full bg-amber-400/40 blur-xs animate-float" style={{ animationDelay: "0s", animationDuration: "7s" }} />
      <div className="absolute top-[35%] right-[12%] w-4 h-4 rounded-full bg-yellow-300/35 blur-xs animate-float" style={{ animationDelay: "1.5s", animationDuration: "8.5s" }} />
      <div className="absolute top-[60%] left-[8%] w-2.5 h-2.5 rounded-full bg-amber-500/30 blur-xs animate-float" style={{ animationDelay: "3s", animationDuration: "6s" }} />
      <div className="absolute top-[22%] right-[25%] w-2 h-2 rounded-full bg-yellow-400/40 blur-xs animate-float" style={{ animationDelay: "2s", animationDuration: "9s" }} />

      {/* Intricate Bottom Rangoli Floor Silhouette */}
      <div className="absolute bottom-0 left-0 right-0 h-44 opacity-25 flex items-end justify-center pointer-events-none">
        <svg
          viewBox="0 0 1200 180"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full max-w-5xl h-auto text-amber-500/40"
        >
          <path
            d="M600 20 C500 80, 400 120, 200 140 C100 150, 0 160, 0 180 L1200 180 C1200 160, 1100 150, 1000 140 C800 120, 700 80, 600 20 Z"
            fill="url(#rangoli-grad)"
          />
          <circle cx="600" cy="80" r="18" stroke="currentColor" strokeWidth="1.5" strokeDasharray="3 3" />
          <circle cx="600" cy="80" r="30" stroke="currentColor" strokeWidth="1" opacity="0.6" />
          <circle cx="530" cy="110" r="12" stroke="currentColor" strokeWidth="1" opacity="0.5" />
          <circle cx="670" cy="110" r="12" stroke="currentColor" strokeWidth="1" opacity="0.5" />
          <circle cx="450" cy="130" r="10" stroke="currentColor" strokeWidth="1" opacity="0.4" />
          <circle cx="750" cy="130" r="10" stroke="currentColor" strokeWidth="1" opacity="0.4" />
          <defs>
            <linearGradient id="rangoli-grad" x1="600" y1="20" x2="600" y2="180" gradientUnits="userSpaceOnUse">
              <stop stopColor="#D4AF37" stopOpacity="0.18" />
              <stop offset="1" stopColor="#FFD700" stopOpacity="0.02" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* Decorative Traditional Brass Diyas on Bottom Left & Right */}
      <div className="absolute bottom-4 left-4 md:left-12 flex items-center space-x-3 pointer-events-none select-none">
        <DiyaLamp size="md" />
        <div className="hidden sm:block">
          <DiyaLamp size="sm" />
        </div>
      </div>

      <div className="absolute bottom-4 right-4 md:right-12 flex items-center space-x-3 pointer-events-none select-none">
        <div className="hidden sm:block">
          <DiyaLamp size="sm" />
        </div>
        <DiyaLamp size="md" />
      </div>
    </div>
  );
}

function DiyaLamp({ size = "md" }: { size?: "sm" | "md" }) {
  const scale = size === "sm" ? "scale-75" : "scale-100";

  return (
    <div className={`relative flex flex-col items-center origin-bottom ${scale}`}>
      {/* Animated Flickering Diya Flame */}
      <div className="relative mb-0.5 animate-flicker flex items-center justify-center">
        {/* Outer Warm Flame Halo */}
        <div className="absolute w-8 h-8 rounded-full bg-amber-500/40 blur-md pointer-events-none" />
        <div className="absolute w-4 h-6 rounded-full bg-orange-500/60 blur-xs pointer-events-none" />

        {/* Inner Flame SVG */}
        <svg width="20" height="28" viewBox="0 0 20 28" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M10 0C10 0 17 8 17 17C17 21.5 13.9 25 10 25C6.1 25 3 21.5 3 17C3 8 10 0 10 0Z"
            fill="url(#flame-outer)"
          />
          <path
            d="M10 6C10 6 14.5 12 14.5 18C14.5 21 12.5 23 10 23C7.5 23 5.5 21 5.5 18C5.5 12 10 6 10 6Z"
            fill="url(#flame-core)"
          />
          <defs>
            <linearGradient id="flame-outer" x1="10" y1="0" x2="10" y2="25" gradientUnits="userSpaceOnUse">
              <stop stopColor="#FFF275" />
              <stop offset="0.6" stopColor="#FF7A00" />
              <stop offset="1" stopColor="#D92800" />
            </linearGradient>
            <linearGradient id="flame-core" x1="10" y1="6" x2="10" y2="23" gradientUnits="userSpaceOnUse">
              <stop stopColor="#FFFFFF" />
              <stop offset="0.8" stopColor="#FFF380" />
              <stop offset="1" stopColor="#FFA600" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* Brass / Terracotta Diya Clay Bowl */}
      <svg width="44" height="18" viewBox="0 0 44 18" fill="none" xmlns="http://www.w3.org/2000/svg">
        <ellipse cx="22" cy="7" rx="20" ry="5" fill="#582C0E" stroke="#C4883A" strokeWidth="1.2" />
        <path
          d="M2 7 C4 16, 40 16, 42 7 C38 17, 6 17, 2 7 Z"
          fill="url(#diya-bowl-grad)"
          stroke="#D4AF37"
          strokeWidth="1"
        />
        <defs>
          <linearGradient id="diya-bowl-grad" x1="22" y1="7" x2="22" y2="18" gradientUnits="userSpaceOnUse">
            <stop stopColor="#8A4213" />
            <stop offset="0.5" stopColor="#542407" />
            <stop offset="1" stopColor="#2E1102" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
}
