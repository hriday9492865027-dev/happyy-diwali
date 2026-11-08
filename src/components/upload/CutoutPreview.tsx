"use client";

import React from "react";
import { Check, RefreshCw, AlertTriangle } from "lucide-react";

interface CutoutPreviewProps {
  cutoutUrl: string;
  onConfirm: () => void;
  onRetry: () => void;
}

export function CutoutPreview({
  cutoutUrl,
  onConfirm,
  onRetry,
}: CutoutPreviewProps) {
  return (
    <div className="w-full max-w-md mx-auto p-4 sm:p-6 rounded-2xl bg-festival-surface border border-festival-border shadow-2xl flex flex-col items-center">
      <div className="w-full flex items-center justify-between mb-3">
        <h3 className="text-sm font-semibold text-festival-text-bright font-cinematic uppercase tracking-wider">
          Review Cutout
        </h3>
        <span className="text-[11px] text-festival-gold bg-festival-gold/10 px-2.5 py-0.5 rounded-full border border-festival-gold/20">
          Scenery Removed
        </span>
      </div>

      <p className="text-xs text-festival-text-muted text-center mb-4">
        Verify that the background has been removed cleanly. The website will supply its own festive atmosphere.
      </p>

      {/* Transparency Checkerboard Box */}
      <div className="relative w-full h-72 sm:h-80 rounded-xl overflow-hidden transparency-grid border border-festival-border/80 flex items-center justify-center p-3">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={cutoutUrl}
          alt="Extracted human cutout preview"
          className="w-full h-full object-contain filter drop-shadow-lg"
        />
      </div>

      <div className="mt-3 w-full flex items-center space-x-2 text-[11px] text-festival-text-dim px-1">
        <AlertTriangle className="w-3.5 h-3.5 text-amber-500 shrink-0" />
        <span>Ensure your face and edges look sharp before continuing.</span>
      </div>

      {/* Action Buttons */}
      <div className="mt-6 w-full flex flex-col sm:flex-row items-center gap-3">
        <button
          onClick={onRetry}
          className="w-full sm:w-1/2 min-h-[44px] px-4 py-2.5 rounded-xl border border-festival-border bg-festival-card hover:bg-festival-surface text-festival-text-muted hover:text-festival-text-bright text-xs sm:text-sm font-medium flex items-center justify-center space-x-2 active:scale-95 transition-all"
        >
          <RefreshCw className="w-4 h-4" />
          <span>Try Another</span>
        </button>

        <button
          onClick={onConfirm}
          className="w-full sm:w-1/2 min-h-[44px] px-4 py-2.5 rounded-xl bg-festival-gold text-festival-dark text-xs sm:text-sm font-semibold flex items-center justify-center space-x-2 shadow-lg shadow-amber-500/20 hover:bg-festival-gold-light active:scale-95 transition-all"
        >
          <Check className="w-4 h-4" />
          <span>Looks Great!</span>
        </button>
      </div>
    </div>
  );
}
